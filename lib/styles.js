'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    position: 'absolute'
  },
  top: _extends({
    borderLeft: '9px solid transparent !important',
    borderRight: '9px solid transparent !important',
    borderTop: '9px solid',
    bottom: '-7px'
  }, vertical),
  right: _extends({
    borderTop: '9px solid transparent !important',
    borderBottom: '9px solid transparent !important',
    borderRight: '9px solid',
    left: '-7px'
  }, horizontal),
  bottom: _extends({
    borderLeft: '9px solid transparent !important',
    borderRight: '9px solid transparent !important',
    borderBottom: '9px solid',
    top: '-7px'
  }, vertical),
  left: _extends({
    borderTop: '9px solid transparent !important',
    borderBottom: '9px solid transparent !important',
    borderLeft: '9px solid',
    right: '-7px'
  }, horizontal)
};