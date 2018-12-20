"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _this = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var oldConsole = _objectSpread({}, console);

var iterateText = function iterateText(logValues, globalCondition) {
  if (Array.isArray(logValues)) {
    return logValues.every(globalCondition);
  }

  return globalCondition(logValues);
};

var hasMethod = new Map();

var _default = function _default(action, globalCondition) {
  action = action || 'log';
  var globalFunction = typeof globalCondition === 'function';

  if (hasMethod.has(action) && globalCondition !== false) {
    if (globalFunction) {
      hasMethod.set(action, 'true');
    } else {
      hasMethod.delete(action);
    }
  } else {
    hasMethod.set(action, 'true');
  }

  console[action] = function () {
    var passesGlobal = !hasMethod.has(action);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!passesGlobal) {
      var caller = new Error().stack.split("at ")[2].trim().split(' ')[0];
      var selfCalled = caller.split('.')[1] && oldConsole[caller.split('.')[1]];
      passesGlobal = Boolean(selfCalled);

      if (!passesGlobal && !globalFunction && caller !== 'console') {
        passesGlobal = typeof globalCondition === 'undefined';
      }

      if (!passesGlobal) {
        passesGlobal = globalFunction ? iterateText(args, globalCondition) : Boolean(globalCondition);
      }
    }

    passesGlobal && oldConsole[action].apply(_this, args);
  };

  if (!console.original) {
    console.original = _objectSpread({}, oldConsole);
  }
};

exports.default = _default;