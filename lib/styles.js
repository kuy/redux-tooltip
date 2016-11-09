'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.border = exports.arrow = exports.content = exports.base = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var theme = themes.simple;

var base = exports.base = {
  padding: 0,
  fontSize: 0,
  lineHeight: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 9999,
  width: 'auto',
  overflow: 'visible'
};

var content = exports.content = {
  overflow: 'hidden'
};

var arrow = exports.arrow = {
  display: 'block',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1
};

var vertical = {
  left: 0,
  right: 0,
  margin: '0 auto'
};

var horizontal = {
  top: '50%',
  marginTop: '-8px'
};

var border = exports.border = {
  base: {
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    borderStyle: 'solid'
  },
  top: _extends({
    borderColor: theme.border.borderColor + ' transparent transparent transparent',
    borderWidth: '9px 9px 0px 9px',
    bottom: '-7px'
  }, vertical),
  right: _extends({
    borderColor: 'transparent ' + theme.border.borderColor + ' transparent transparent',
    borderWidth: '9px 9px 9px 0px',
    left: '-7px'
  }, horizontal),
  bottom: _extends({
    borderColor: 'transparent transparent ' + theme.border.borderColor + ' transparent',
    borderWidth: '0px 9px 9px 9px',
    top: '-7px'
  }, vertical),
  left: _extends({
    borderColor: 'transparent transparent transparent ' + theme.border.borderColor,
    borderWidth: '9px 0px 9px 9px',
    right: '-7px'
  }, horizontal)
};