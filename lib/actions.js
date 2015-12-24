'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearHighlight = exports.setHighlight = exports.CLEAR_HIGHLIGHT = exports.SET_HIGHLIGHT = exports.selectItem = exports.SELECT_ITEM = exports.clearItems = exports.setItems = exports.CLEAR_ITEMS = exports.SET_ITEMS = exports.closeList = exports.openList = exports.CLOSE_LIST = exports.OPEN_LIST = exports.clearText = exports.setText = exports.CLEAR_TEXT = exports.SET_TEXT = exports.init = exports.INIT = undefined;

var _reduxActions = require('redux-actions');

var prefix = function prefix(name) {
  return 'redux-tooltip/' + name;
};

var INIT = exports.INIT = prefix('INIT');
var init = exports.init = (0, _reduxActions.createAction)(INIT);

var SET_TEXT = exports.SET_TEXT = prefix('SET_TEXT');
var CLEAR_TEXT = exports.CLEAR_TEXT = prefix('CLEAR_LIST');
var setText = exports.setText = (0, _reduxActions.createAction)(SET_TEXT);
var clearText = exports.clearText = (0, _reduxActions.createAction)(CLEAR_TEXT);

var OPEN_LIST = exports.OPEN_LIST = prefix('OPEN_LIST');
var CLOSE_LIST = exports.CLOSE_LIST = prefix('CLOSE_LIST');
var openList = exports.openList = (0, _reduxActions.createAction)(OPEN_LIST);
var closeList = exports.closeList = (0, _reduxActions.createAction)(CLOSE_LIST);

var SET_ITEMS = exports.SET_ITEMS = prefix('SET_ITEMS');
var CLEAR_ITEMS = exports.CLEAR_ITEMS = prefix('CLEAR_ITEMS');
var setItems = exports.setItems = (0, _reduxActions.createAction)(SET_ITEMS);
var clearItems = exports.clearItems = (0, _reduxActions.createAction)(CLEAR_ITEMS);

var SELECT_ITEM = exports.SELECT_ITEM = prefix('SELECT_ITEM');
var selectItem = exports.selectItem = (0, _reduxActions.createAction)(SELECT_ITEM);

var SET_HIGHLIGHT = exports.SET_HIGHLIGHT = prefix('SET_HIGHLIGHT');
var CLEAR_HIGHLIGHT = exports.CLEAR_HIGHLIGHT = prefix('CLEAR_HIGHLIGHT');
var setHighlight = exports.setHighlight = (0, _reduxActions.createAction)(SET_HIGHLIGHT);
var clearHighlight = exports.clearHighlight = (0, _reduxActions.createAction)(CLEAR_HIGHLIGHT);