const customLog = require('./customConsole');
const example = require('./example');
const assert = require('assert');
const sinon = require('sinon');

const outPut = sinon.stub(process.stdout, 'write');
customLog('log', true);
console.log('testing');
process.stdout.write.restore();
assert(outPut.called, 'output called');
// customLog('warn');
// example();
console.log('test');
assert(true, 'false');
// process.stdout.write.restore();
// const test = async () => {
//     // process.stdout.write.restore();
//     // console.log(outPut);
//     await assert(outPut.called, 'output called');
// }
// console.log('hello', false);

console.warn('please work');
// assert.ok(true, 'true');
// console.log('whats up', true)
// test();