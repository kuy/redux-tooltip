'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placement = placement;
/**
 * @param {Object} el - DOM element
 */
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

/**
 * @param {string} place - 'top', 'right', 'bottom', or 'left'.
 * @param {Object} tooltip - DOM element.
 * @param {Object} origin - DOM element.
 * @return {Object} contains 'top' and 'left' keys.
 */
function placement(place, tooltip, origin) {
  var gap = 12;
  var tip = position(tooltip);
  var pos = position(origin);

  var offset = {};

  switch (place) {
    case 'top':case 'bottom':
      offset.left = pos.left + pos.width * 0.5 - tip.width * 0.5 + 'px';
      break;
    case 'left':case 'right':
      offset.top = pos.top + pos.height * 0.5 - tip.height * 0.5 + 'px';
      break;
  }

  switch (place) {
    case 'top':
      offset.top = pos.top - tip.height - gap + 'px';
      break;
    case 'right':
      offset.left = pos.right + gap + 'px';
      break;
    case 'bottom':
      offset.top = pos.top + pos.height + gap + 'px';
      break;
    case 'left':
      offset.left = pos.left - tip.width - gap + 'px';
      break;
  }

  return offset;
}