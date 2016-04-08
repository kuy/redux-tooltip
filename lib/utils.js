'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.position = position;
exports.placement = placement;
exports.complete = complete;
exports.intersection = intersection;
exports.strip = strip;
exports.amend = amend;
exports.overDirs = overDirs;
exports.adjust = adjust;
exports.resolve = resolve;
exports.deprecatedWarning = deprecatedWarning;
exports.originOrEl = originOrEl;

var _isDom = require('is-dom');

var _isDom2 = _interopRequireDefault(_isDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function dimension(el) {
  var rect = el.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

/**
 * Returns a position of given DOM element.
 *
 * @param {Object} el - DOM element.
 * @return {Object}
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
 * Calculates a position of the tooltip.
 *
 * @param {string} place - 'top', 'right', 'bottom', or 'left'.
 * @param {Object} content - DOM element that contains a content.
 * @param {Object} origin - DOM element or position object.
 * @return {Object} contains 'top', 'left', and extra keys.
 */
function placement(place, content, origin) {
  var gap = 12;
  var dim = dimension(content);
  var pos = (0, _isDom2.default)(origin) ? position(origin) : { top: origin.y, right: origin.x, bottom: origin.y, left: origin.x, width: 0, height: 0 };

  var offset = { width: dim.width, height: dim.height };
  switch (place) {
    case 'top':case 'bottom':
      offset.left = pos.left + pos.width * 0.5 - dim.width * 0.5 + 'px';
      break;
    case 'left':case 'right':
      offset.top = pos.top + pos.height * 0.5 - dim.height * 0.5 + 'px';
      break;
  }

  switch (place) {
    case 'top':
      offset.top = pos.top - dim.height - gap + 'px';
      break;
    case 'right':
      offset.left = pos.right + gap + 'px';
      break;
    case 'bottom':
      offset.top = pos.top + pos.height + gap + 'px';
      break;
    case 'left':
      offset.left = pos.left - dim.width - gap + 'px';
      break;
  }

  return offset;
}

/**
 * Completes missing directions in given direction(s).
 *
 * @param {string|Array} dir - a direction or a list of directions.
 * @return {Array}
 */
var DIRS = ['top', 'right', 'bottom', 'left'];
function complete(dir) {
  if (typeof dir === 'string') {
    dir = [dir];
  } else {
    dir = [].concat(_toConsumableArray(dir));
  }

  var missings = DIRS.filter(function (d) {
    return dir.indexOf(d) === -1;
  });
  return dir.concat(missings);
}

/**
 * Calculates an intersection of two areas.
 *
 * @param {Object} area1
 * @param {Object} area2
 * @return {Object} an intersection.
 */
function intersection(area1, area2) {
  var area = {};
  area.top = Math.max(area1.top, area2.top);
  area.right = Math.min(area1.left + area1.width, area2.left + area2.width);
  area.bottom = Math.min(area1.top + area1.height, area2.top + area2.height);
  area.left = Math.max(area1.left, area2.left);
  area.height = area.bottom - area.top;
  area.width = area.right - area.left;
  return area;
}

function scrollOffset() {
  var list = [document.documentElement, document.body.parentNode, document.body];
  return {
    top: list.map(function (el) {
      return el.scrollTop;
    }).reduce(function (p, v) {
      return p || v;
    }),
    left: list.map(function (el) {
      return el.scrollLeft;
    }).reduce(function (p, v) {
      return p || v;
    })
  };
}

// Returns current content area
function contentArea() {
  return _extends({}, scrollOffset(), {
    height: window.innerHeight,
    width: window.innerWidth
  });
}

// Strip unit string from property values and convert to float
var STRIP_FOR = ['top', 'left', 'right', 'bottom', 'width', 'height'];
function strip(obj) {
  var data = _extends({}, obj);
  STRIP_FOR.forEach(function (prop) {
    if (typeof data[prop] === 'string') {
      data[prop] = parseFloat(data[prop].replace('px', ''));
    }
  });
  return data;
}

// Make full area data from minimum data
function amend(area) {
  var data = strip(area);
  if (typeof data.top !== 'number') {
    data.top = 0;
  }
  if (typeof data.left !== 'number') {
    data.left = 0;
  }
  if (typeof data.right !== 'number' && typeof data.width === 'number') {
    data.right = data.left + data.width;
  }
  if (typeof data.bottom !== 'number' && typeof data.height === 'number') {
    data.bottom = data.top + data.height;
  }
  return data;
}

// Returns directions which are not in target rectangle
function overDirs(tip, el) {
  tip = amend(tip);
  var area = amend(contentArea());
  if (el && (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object') {
    area = intersection(area, position(el));
  }

  var dirs = [];
  if (tip.top < area.top) {
    dirs.push('top');
  }
  if (area.right < tip.right) {
    dirs.push('right');
  }
  if (area.bottom < tip.bottom) {
    dirs.push('bottom');
  }
  if (tip.left < area.left) {
    dirs.push('left');
  }

  return dirs;
}

/**
 * Places and adjusts a tooltip.
 *
 * @param {Object} content - DOM element which contans a content.
 * @param {Object} props - props set from Tooltip component.
 * @return {Object} 'offset': style data to locate, 'place': final direction of the tooltip
 */
function adjust(content, props) {
  var auto = props.auto;
  var within = props.within;

  var origin = originOrEl(props);
  var place = props.place;

  if (typeof place === 'string') {
    place = place.split(',').map(function (p) {
      return p.trim();
    });
  }
  if (auto) {
    place = complete(place);
  }

  var pos = void 0,
      dirs = void 0,
      current = void 0,
      first = void 0;
  var tries = [].concat(_toConsumableArray(place));
  while (0 < tries.length) {
    current = tries.shift();
    pos = placement(current, content, origin);
    if (typeof first === 'undefined') {
      first = { offset: pos, place: current };
    }
    dirs = overDirs(pos, within && within());
    if (dirs.length === 0) {
      return { offset: pos, place: current };
    }
  }
  return first;
}

/**
 * Resolves names of target tooltip from action or props.
 *
 * @param {Object} action or props.
 * @return {Array} a list of tooltip names.
 */
function resolve(obj) {
  var names = void 0;
  if (obj && obj.payload && obj.payload.name) {
    names = obj.payload.name;
  } else if (obj && obj.name) {
    names = obj.name;
  } else {
    names = ['default'];
  }

  if (typeof names === 'string') {
    names = [names];
  }

  return names;
}

function deprecatedWarning(props) {
  if (props && props.el) {
    console.warn('DEPRECATED: Use \'origin\' instead of \'el\' in props for Tooltip component or \'show\' action.');
  }
  if (props && props.el && props.origin) {
    console.warn('Do not pass both \'origin\' and \'el\' props at the same time.');
  }
}

function originOrEl(props) {
  return props.origin || props.el;
}