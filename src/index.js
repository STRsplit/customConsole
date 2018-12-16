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

var _default = function _default(action, globalCondition) {
  action = action || 'log';

  console[action] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var condition = args[args.length - 1];

    if (args[args.length - 1] === '~true' && args.pop()) {
      oldConsole[action].apply(_this, args);
    } else if (args[args.length - 1] === '~false') {
      return;
    } else {
      var passesGlobal = typeof globalCondition === 'undefined';

      if (!passesGlobal) {
        passesGlobal = typeof globalCondition === 'function' ? iterateText(args, globalCondition) : Boolean(globalCondition);
      }

      if (!passesGlobal) {
        return;
      } else {
        if (typeof condition === 'string' || args.length === 1) {
          oldConsole[action].apply(_this, args);
        } else if (typeof condition === 'function' && args.pop()) {
          iterateText(args, condition) && oldConsole[action].apply(_this, args);
        } else {
          args.pop() && Boolean(condition) && oldConsole[action].apply(_this, args);
        }
      }
    }
  };
};

exports.default = _default;