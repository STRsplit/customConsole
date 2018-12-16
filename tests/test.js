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

test('individual console.log statements can overwrite global rule', t => {
    const globalSilent = sinon.stub(process.stdout, 'write');
    customLog('log', false);
    console.log('testing');
    console.log('testing');
    process.stdout.write.restore();

    const singleInstance = sinon.stub(process.stdout, 'write');
    console.log('testing', '~true');
    console.log('testing');
    process.stdout.write.restore();

    const secondInstance = sinon.stub(process.stdout, 'write');
    customLog('log');
    console.log('testing');
    console.log('testing');
    process.stdout.write.restore();

    t.false(globalSilent.called, 'output called');
    t.true(singleInstance.called, 'output called');
    t.false(singleInstance.calledTwice, 'output called');
    t.true(secondInstance.calledTwice, 'output called');
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

test('Testing overwritten console.warn can individually allow instances to act as the standard console.warn', t => {
    const overrideWarn = sinon.stub(process.stderr, 'write');
    customLog('warn', false);
    console.warn('warning: this warn should not log');
    console.warn('warning: the second warn should log', '~true');
    t.true(overrideWarn.calledOnce, 'console.warn is called once');

    customLog('warn');
    console.warn('warning: this should work as a standard warn would', (text) => true);
    console.warn('warning: this should not reach the stderr', (text) => false);
    process.stderr.write.restore();

    t.true(overrideWarn.calledTwice, 'console.warn has now been called twice');
    t.is(overrideWarn.firstCall.args[0], 'warning: the second warn should log' + '\n', 'the first argument should be the one passed in first call')
    t.is(overrideWarn.lastCall.args[0], 'warning: this should work as a standard warn would' + '\n', 'the first argument should be the one passed in first call')
});
