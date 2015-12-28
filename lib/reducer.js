'use strict';

var _handlers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initial = {
  show: false,
  place: 'top',
  el: null,
  timeout: null
};

var handlers = (_handlers = {}, _defineProperty(_handlers, _actions.SHOW, function (state, action) {
  var names = ['el', 'place'];
  var props = {};
  names.forEach(function (name) {
    if (action.payload[name]) {
      props[name] = action.payload[name];
    }
  });
  return _extends({}, state, { show: true, timeout: null }, props);
}), _defineProperty(_handlers, _actions.HIDE, function (state) {
  return _extends({}, state, { show: false });
}), _defineProperty(_handlers, _actions.TOGGLE, function (state) {
  return _extends({}, state, { show: !state.show });
}), _defineProperty(_handlers, _actions.KEEP, function (state) {
  return _extends({}, state, { timeout: null });
}), _defineProperty(_handlers, _actions.START_TIMEOUT, function (state, action) {
  return _extends({}, state, { timeout: action.payload });
}), _defineProperty(_handlers, _actions.END_TIMEOUT, function (state) {
  return _extends({}, state, { timeout: null });
}), _handlers);

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];

  var handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}