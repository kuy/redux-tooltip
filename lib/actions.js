'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = prefix;
exports.createAction = createAction;
exports.delay = delay;
function prefix(name) {
  return 'redux-tooltip/' + name;
}

// NOTE: No compatibility with redux-actions.
function createAction(type) {
  return function (payload) {
    return { type: type, payload: payload };
  };
}

var SHOW = exports.SHOW = prefix('SHOW');
var HIDE = exports.HIDE = prefix('HIDE');
var TOGGLE = exports.TOGGLE = prefix('TOGGLE');
var KEEP = exports.KEEP = prefix('KEEP');
var CONTENT = exports.CONTENT = prefix('CONTENT');
var PLACE = exports.PLACE = prefix('PLACE');

var show = exports.show = createAction(SHOW);
var hide = exports.hide = createAction(HIDE);
var toggle = exports.toggle = createAction(TOGGLE);
var keep = exports.keep = createAction(KEEP);
var content = exports.content = createAction(CONTENT);
var place = exports.place = createAction(PLACE);

var DELAY = exports.DELAY = prefix('DELAY');
var DURATION = 1500;
function delay(action) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { duration: DURATION },
      duration = _ref.duration,
      callback = _ref.callback;

  if (!action.meta) {
    action.meta = {};
  }
  if (typeof duration === 'undefined' || duration === true) {
    duration = DURATION;
  }
  action.meta[DELAY] = { duration: parseInt(duration), callback: callback };
  return action;
}

var START_TIMEOUT = exports.START_TIMEOUT = prefix('START_TIMEOUT');
var END_TIMEOUT = exports.END_TIMEOUT = prefix('END_TIMEOUT');

var startTimeout = exports.startTimeout = createAction(START_TIMEOUT);
var endTimeout = exports.endTimeout = createAction(END_TIMEOUT);