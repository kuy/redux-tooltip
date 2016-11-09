'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _utils = require('./utils');

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initial = {
  show: false,
  place: 'top',
  origin: null,
  el: null,
  auto: true,
  content: null,
  timeout: null
};

var SHOW_PROPS = ['origin', 'el', 'place', 'content'];

var handlers = (_handlers = {}, _defineProperty(_handlers, _actions.SHOW, function (state, action) {
  var props = {};
  SHOW_PROPS.forEach(function (name) {
    if (action.payload[name]) {
      props[name] = action.payload[name];
    } else {
      props[name] = initial[name];
    }
  });
  return _extends({}, state, { show: true }, props);
}), _defineProperty(_handlers, _actions.HIDE, function (state) {
  return _extends({}, state, { show: false });
}), _defineProperty(_handlers, _actions.TOGGLE, function (state) {
  return _extends({}, state, { show: !state.show });
}), _defineProperty(_handlers, _actions.KEEP, function (state) {
  return _extends({}, state, { timeout: null });
}), _defineProperty(_handlers, _actions.CONTENT, function (state, action) {
  return _extends({}, state, { content: action.payload });
}), _defineProperty(_handlers, _actions.PLACE, function (state, action) {
  return _extends({}, state, { place: action.payload });
}), _defineProperty(_handlers, _actions.START_TIMEOUT, function (state, action) {
  return _extends({}, state, { timeout: action.payload.token });
}), _defineProperty(_handlers, _actions.END_TIMEOUT, function (state) {
  return _extends({}, state, { timeout: null });
}), _handlers);

function tooltip() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments[1];

  // Check usage of deprecated props
  (0, _utils.deprecatedWarning)(action);

  var handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var newState = _extends({}, state);
  var names = (0, _utils.resolve)(action);
  names.forEach(function (name) {
    newState = _extends({}, newState, _defineProperty({}, name, tooltip(newState[name], action)));
  });
  return newState;
}