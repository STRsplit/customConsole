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
`original` will be added to the console object storing all of the original methods of console.

```javascript
import customConsole from 'customconsole';
customConsole('log', false);

console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

console.original.log('foo'); // will print 'foo' to console

```
#### Globally set as false, restore to make further statements work
This is not a good use.

```javascript
import customConsole from 'customconsole';
customConsole('log', false);
console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

customConsole('log', true);
console.log('foo'); // will print 'foo' to console
console.log('bar'); // will print 'bar' to console


```
#### Prints all arguments passed like a standard console method
Even if you setup the custom log, you can still pass in multiple arguments. The printed results will be a bit different depending on what you pass as last argument.

```javascript
import customConsole from 'customconsole';
customConsole('log', (text) => !text.includes('test'));

console.log('foo', 'bar', 'baz'); // will print 'foo bar baz' to console
console.log('foo', 'bar'); // will print 'foo bar' to console

```

## Author
[![STRsplit](https://github.com/STRsplit.png?size=100)](https://github.com/STRsplit) | 
---|
[Steve Reed](https://github.com/STRsplit) |

