# silentConsole
Globally overwrite console methods - silence all, filter individually.

## Motivation
Just debugging a legacy project and I had too many logs / warnings printing to the console. I started to remove / comment them, but realized they could be useful later on. This module is just an extension of the code I wrote for that use.

## Usage
### Install
```
npm install --save-dev silentConsole
```

### How to Implement
You can use it at the file level, but it is best for importing at top level (usually your main entry ie index.js) and using for global silencing / filtering of console output. 

#### Globally silence console.log and console.warn
```javascript
import silentConsole from 'silentConsole';
silentConsole('log');
silentConsole('warn');

console.log('foo'); // will not print to console
console.warn('foo'); // will not print to console
console.info('foo'); // will print 'foo' to console
```

#### Globally filter console.log and console.warn with filter method as second argument to silentConsole

```javascript
import silentConsole from 'silentConsole';
silentConsole('log', (text) => !text.includes('bar'));
silentConsole('warn', (text) => !text.includes('baz'));

console.log('foo'); // will print 'foo' to console
console.log('bar'); // will not print to console

console.warn('foo bar'); // will print 'foo bar' to console
console.warn('foo bar baz'); // will not print to console

```

#### Globally silence console.log, but allow it for single instances
`original` will be added to the console object storing all of the original methods of console.

```javascript
import silentConsole from 'silentConsole';
silentConsole('log');

console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

console.original.log('foo'); // will print 'foo' to console

```
#### Globally set as false, restore to make further statements work
This is not a great good use.

##### Either call method again with no 2nd parameter

```javascript
import silentConsole from 'silentConsole';  
silentConsole('log');
console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

silentConsole('log');
console.log('foo'); // will print 'foo' to console
console.log('bar'); // will print 'bar' to console


```
##### Or call method again with 2nd parameter false as in, do not override log.

```javascript
import silentConsole from 'silentConsole';  
silentConsole('log');
console.log('foo'); // will not print to console
console.log('bar'); // will not print to console

silentConsole('log', false);
console.log('foo'); // will print 'foo' to console
console.log('bar'); // will print 'bar' to console


```

#### Prints all arguments passed like a standard console method
Even if you setup the silentConsole, you can still pass in multiple arguments. The printed results will be a bit different depending on what you pass as last argument.

```javascript
import silentConsole from 'silentConsole';
silentConsole('log', (text) => !text.includes('test'));

console.log('foo', 'bar', 'baz'); // will print 'foo bar baz' to console
console.log('foo', 'bar'); // will print 'foo bar' to console

```

## Author
[![STRsplit](https://github.com/STRsplit.png?size=100)](https://github.com/STRsplit) | 
---|
[Steve Reed](https://github.com/STRsplit) |

