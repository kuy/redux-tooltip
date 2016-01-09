'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endTimeout = exports.startTimeout = exports.END_TIMEOUT = exports.START_TIMEOUT = exports.place = exports.content = exports.keep = exports.toggle = exports.hide = exports.show = exports.PLACE = exports.CONTENT = exports.KEEP = exports.TOGGLE = exports.HIDE = exports.SHOW = undefined;
exports.delay = delay;

var _reduxActions = require('redux-actions');

var prefix = function prefix(name) {
  return 'redux-tooltip/' + name;
};

var SHOW = exports.SHOW = prefix('SHOW');
var HIDE = exports.HIDE = prefix('HIDE');
var TOGGLE = exports.TOGGLE = prefix('TOGGLE');
var KEEP = exports.KEEP = prefix('KEEP');
var CONTENT = exports.CONTENT = prefix('CONTENT');
var PLACE = exports.PLACE = prefix('PLACE');

var show = exports.show = (0, _reduxActions.createAction)(SHOW);
var hide = exports.hide = (0, _reduxActions.createAction)(HIDE);
var toggle = exports.toggle = (0, _reduxActions.createAction)(TOGGLE);
var keep = exports.keep = (0, _reduxActions.createAction)(KEEP);
var content = exports.content = (0, _reduxActions.createAction)(CONTENT);
var place = exports.place = (0, _reduxActions.createAction)(PLACE);

var DEFAULT_DURATION = 1500;
function delay(action) {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_DURATION : arguments[1];

  if (!action.meta) {
    action.meta = {};
  }
  if (duration === true) {
    duration = DEFAULT_DURATION;
  }
  action.meta.delay = parseInt(duration);
  return action;
}

var START_TIMEOUT = exports.START_TIMEOUT = prefix('START_TIMEOUT');
var END_TIMEOUT = exports.END_TIMEOUT = prefix('END_TIMEOUT');

var startTimeout = exports.startTimeout = (0, _reduxActions.createAction)(START_TIMEOUT);
var endTimeout = exports.endTimeout = (0, _reduxActions.createAction)(END_TIMEOUT);