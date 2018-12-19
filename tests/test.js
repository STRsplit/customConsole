import test from 'ava';
import sinon from 'sinon';
import customLog from '../src/index.js';

test('console log is correctly overwritten', t => {
    const nativeLog = sinon.stub(process.stdout, 'write');
    console.log('testing before instance of customLog');
    process.stdout.write.restore();

    const overrideLog = sinon.stub(process.stdout, 'write');
    customLog('log', false);
    console.log('testing after instance of customLog');
    process.stdout.write.restore();
    t.true(nativeLog.called, 'native console.log is called before the custom instance overwrites it');
    t.false(overrideLog.called, 'the custom override is applied and native console.log doesn\'t get called');
});

test('console info is correctly overwritten', t => {
    const nativeInfo = sinon.stub(process.stdout, 'write');
    console.info('testing before instance of customLog');
    process.stdout.write.restore();

    const overrideInfo = sinon.stub(process.stdout, 'write');
    customLog('info', false);
    console.log('testing after instance of customLog');
    process.stdout.write.restore();

    t.true(nativeInfo.called, 'native console.info is called before the custom instance overwrites it');
    t.false(overrideInfo.called, 'the custom override is applied and native console.info doesn\'t get called');
});

test('global condition can be a function that verifies truthiness', t => {
    let allArgs = ['testing after instance of customLog', 'function method should allow this to be called', 'three args'];
    const overrideLog = sinon.stub(process.stdout, 'write');
    customLog('log', (text) => !text.includes('error'));

    console.log('testing after instance of customLog', 'function method should allow this to be called', 'three args');
    console.log('testing after instance of customLog', 'function method should allow this to be called', 'error');
    process.stdout.write.restore();

    t.true(overrideLog.called, 'the custom override is applied and native console.log doesn\'t get called');
    t.true(overrideLog.calledOnce, 'the custom override is applied and native console.log doesn\'t get called');
    t.false(overrideLog.calledTwice, 'the custom override is applied and native console.log doesn\'t get called');
    t.is(overrideLog.firstCall.args[0], allArgs.join(' ') + '\n', 'this worked');
})

test('Testing customLog overwrites the console.warn method', t => {
    const overrideWarn = sinon.stub(process.stderr, 'write');
    customLog('warn', true);
    console.warn('warning: this method works like standard console.warn');
    customLog('warn', false);
    console.warn('warning: this method should not call the standard console.warn');
    process.stderr.write.restore();
    t.true(overrideWarn.calledOnce, 'output called once');
    t.is(overrideWarn.firstCall.args[0], 'warning: this method works like standard console.warn' + '\n', 'the first argument should be the one passed in first call')
});

test('Testing overwritten console can be called with console.original[action]', t => {
    const overrideWarn = sinon.stub(process.stderr, 'write');
    customLog('warn', false);
    console.warn('warning: this warn should not log');
    console.original.warn('warning: the second warn should log');
    t.true(overrideWarn.calledOnce, 'console.warn is called once');

    console.original.warn('warning: this should work as a standard warn would');
    console.warn('warning: this should not reach the stderr');
    process.stderr.write.restore();

    t.true(overrideWarn.calledTwice, 'console.warn has now been called twice');
    t.is(overrideWarn.firstCall.args[0], 'warning: the second warn should log' + '\n', 'the first argument should be the one passed in first call')
    t.is(overrideWarn.lastCall.args[0], 'warning: this should work as a standard warn would' + '\n', 'the first argument should be the one passed in first call')

    const overrideLog = sinon.stub(process.stdout, 'write');

    customLog('log', false);
    console.log('This should not log');
    console.original.log('The call to console.original.log should produce output');
    t.true(overrideLog.calledOnce, 'stdout is called once as a result of the call to console.original.log');

    console.original.log('Second successful log');
    console.log('This second attempt calling the native console.log should not write to stdout');
    process.stdout.write.restore();

    t.true(overrideLog.calledTwice, 'console.log has now been called twice');
    t.is(overrideLog.firstCall.args[0], 'The call to console.original.log should produce output' + '\n', 'the first argument should be the one passed in first call to original')
    t.is(overrideLog.lastCall.args[0], 'Second successful log' + '\n', 'the first argument should be the one passed in first call')
});

test('Testing the original console methods will work as expected', t => {
    const overrideCount = sinon.stub(process.stdout, 'write');
    console.count('a');
    console.count('a');

    process.stdout.write.restore();
    t.true(overrideCount.calledTwice, 'console.log has now been called twice');
    t.is(overrideCount.firstCall.args[0], 'a: 1' + '\n', 'the count should reflect the times it was called. First call would be 1.');
    t.is(overrideCount.lastCall.args[0], 'a: 2' + '\n', 'the count should reflect the times it was called. Last call would be 2.');
});

test('Testing the original console methods are available', t => {
    t.truthy(console.assert, 'native method console.assert is still available');
    t.truthy(console.clear, 'native method console.clear is still available');
    t.truthy(console.error, 'native method console.error is still available');
    t.truthy(console.count, 'native method console.count is still available');
    t.truthy(console.countReset, 'native method console.countReset is still available');
    t.truthy(console.debug, 'native method console.debug is still available');
    t.truthy(console.dir, 'native method console.dir is still available');
    t.truthy(console.group, 'native method console.group is still available');
    t.truthy(console.table, 'native method console.group is still available');
    t.truthy(console.time, 'native method console.group is still available');
    t.truthy(console.trace, 'native method console.trace is still available');
});

