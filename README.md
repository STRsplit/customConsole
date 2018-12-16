# customConsole
Globally overwrite console methods - silence all, filter individually.

## Motivation
Just debugging a legacy project and I had too many logs / warnings printing to the console. I started to remove / comment them, but realized they could be useful later on. This module is just an extension of the code I wrote for that use.

## Usage
### Install
```
npm install --save-dev customconsole
```

### How to Implement
You can use it at the file level, but it is best for importing at top level (usually your main entry ie index.js) and using for global silencing / filtering of console output. 

#### Globally silence console.log and console.warn
```javascript
import customConsole from 'customconsole';
customConsole('log', false);
customConsole('warn', false);

console.log('foo'); // will not print to console
console.warn('foo'); // will not print to console
console.info('foo'); // will print 'foo' to console
```

#### Globally filter console.log and console.warn with filter method as second argument to customConsole

```javascript
import customConsole from 'customconsole';
customConsole('log', (text) => !text.includes('bar'));
customConsole('warn', (text) => !text.includes('baz'));

console.log('foo'); // will print 'foo' to console
console.log('bar'); // will not print to console

console.warn('foo bar'); // will print 'foo bar' to console
console.warn('foo bar baz'); // will not print to console

```

#### Globally silence console.log, but print / don't print one specific instance of a console.log
A special argument of `'~true'` will allow a single instance of a console method to work as expected. A special argument of `'~false'` will override the a global true.

```javascript
import customConsole from 'customconsole';
customConsole('log', false);

console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

console.log('foo', '~true'); // will print 'foo' to console

customConsole('log', true);
console.log('foo'); // will print 'foo' to console
console.log('bar', '~false'); // will not print to console

```
#### No global setting, allow each log to determine if it should print or not
Obviously, if you have some weird use case where you pass a boolean into your console.log as the last argument you will see some unexpected console statements.

```javascript
import customConsole from 'customconsole';
customConsole('log');

console.log('foo'); // will print 'foo' to console
console.log('bar'); // will print 'bar' to console

console.log('foo', (text) => text.includes('foo')); // will print 'foo' to console
console.log('bar', (text) => typeof text === 'function'); // will not print to console

```
#### Prints all arguments passed like a standard console method
Even if you setup the custom log, you can still pass in multiple arguments. The printed results will be a bit different depending on what you pass as last argument.

```javascript
import customConsole from 'customconsole';
customConsole('log');

console.log('foo', 'bar', 'baz'); // will print 'foo bar baz' to console
console.log('foo', 'bar', true); // will print 'foo bar' to console
// bad example, but concept is same
console.log('foo', 'bar', (text) => text !== 'baz')); // will print 'foo bar' to console
/*** Considered changing to individual args, but as of now, all or none conditional ***/
console.log('foo', 'bar', 'baz', (text) => text !== 'baz')); // will not print to console

```

## Author
[![STRsplit](https://github.com/STRsplit.png?size=100)](https://github.com/STRsplit)
---|---|---
[Steve Reed](https://github.com/STRsplit)
