"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.position = position;
function position(el) {
  var pos = el.getBoundingClientRect();
  var _window = window;
  var pageYOffset = _window.pageYOffset;
  var pageXOffset = _window.pageXOffset;
  var _document$documentEle = document.documentElement;
  var scrollTop = _document$documentEle.scrollTop;
  var clientTop = _document$documentEle.clientTop;
  var scrollLeft = _document$documentEle.scrollLeft;
  var clientLeft = _document$documentEle.clientLeft;

  var winTop = (pageYOffset || scrollTop) - clientTop;
  var winLeft = (pageXOffset || scrollLeft) - clientLeft;

  return {
    top: pos.top + winTop,
    left: pos.left + winLeft,
    right: pos.right + winLeft,
    bottom: pos.bottom + winTop,
    width: pos.width,
    height: pos.height
  };
}