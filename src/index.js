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
  if (!console.original) {
    console.original = _objectSpread({}, oldConsole);
  }

  action = action || 'log';

  console[action] = function () {
    var passesGlobal = typeof globalCondition === 'undefined';

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!passesGlobal) {
      passesGlobal = typeof globalCondition === 'function' ? iterateText(args, globalCondition) : Boolean(globalCondition);
    }

    if (!passesGlobal) {
      return;
    }

    oldConsole[action].apply(_this, args);
  };
};

exports.default = _default;