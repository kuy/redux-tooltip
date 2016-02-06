/**
 * Returns a position of given DOM element.
 *
 * @param {Object} el - DOM element.
 * @return {Object}
 */
export function position(el) {
  const pos = el.getBoundingClientRect();
  const { pageYOffset, pageXOffset } = window;
  const { scrollTop, clientTop, scrollLeft, clientLeft } = document.documentElement;
  const winTop = (pageYOffset || scrollTop) - clientTop;
  const winLeft = (pageXOffset || scrollLeft) - clientLeft;

  return {
    top: pos.top + winTop,
    left: pos.left + winLeft,
    right: pos.right + winLeft,
    bottom: pos.bottom + winTop,
    width: pos.width,
    height: pos.height,
  };
}

/**
 * Calculates a position of the tooltip.
 *
 * @param {string} place - 'top', 'right', 'bottom', or 'left'.
 * @param {Object} tooltip - DOM element.
 * @param {Object} origin - DOM element.
 * @return {Object} contains 'top', 'left', and extra keys.
 */
export function placement(place, tooltip, origin) {
  const gap = 12;
  const tip = position(tooltip);
  const pos = position(origin);

  let offset = { width: tip.width, height: tip.height };

  switch(place) {
  case 'top': case 'bottom':
    offset.left = `${pos.left + (pos.width * 0.5) - (tip.width * 0.5)}px`;
    break;
  case 'left': case 'right':
    offset.top = `${pos.top + (pos.height * 0.5) - (tip.height * 0.5)}px`;
    break;
  }

  switch(place) {
  case 'top':
    offset.top = `${pos.top - tip.height - gap}px`;
    break;
  case 'right':
    offset.left = `${pos.right + gap}px`;
    break;
  case 'bottom':
    offset.top = `${pos.top + pos.height + gap}px`;
    break;
  case 'left':
    offset.left = `${pos.left - tip.width - gap}px`;
    break;
  }

  return offset;
}

/**
 * Returns an opposite direction based on the given.
 *
 * @param {string|Array} dir - 'top', 'right', 'bottom', or 'left'.
 * @return {string} an opposite direction.
 * @throw
 */
export function opposite(dir) {
  let place = dir;

  // Alrays use first direction if Array is passed
  if (typeof place === 'object' && typeof place.length === 'number' && 0 < place.length) {
    place = place[0];
  }

  switch (place) {
  case 'top':
    return 'bottom';
  case 'bottom':
    return 'top';
  case 'right':
    return 'left';
  case 'left':
    return 'right';
  }

  throw new Error(`Unknown direction: "${dir}"`);
}

/**
 * Calculates an intersection of two areas.
 *
 * @param {Object} area1
 * @param {Object} area2
 * @return {Object} an intersection.
 */
export function intersection(area1, area2) {
  let area = {};
  area.top = Math.max(area1.top, area2.top);
  area.right = Math.min(area1.left + area1.width, area2.left + area2.width);
  area.bottom = Math.min(area1.top + area1.height, area2.top + area2.height);
  area.left = Math.max(area1.left, area2.left);
  area.height = area.bottom - area.top;
  area.width = area.right - area.left;
  return area;
}

function scrollOffset() {
  const list = [document.documentElement, document.body.parentNode, document.body];
  return {
    top: list.map(el => el.scrollTop).reduce((p, v) => p || v),
    left: list.map(el => el.scrollLeft).reduce((p, v) => p || v),
  };
}

// Returns current content area
function contentArea() {
  return {
    ...scrollOffset(),
    height: window.innerHeight,
    width: window.innerWidth,
  };
}

// Strip unit string from property values and convert to float
const STRIP_FOR = ['top', 'left', 'right', 'bottom', 'width', 'height'];
export function strip(obj) {
  const data = { ...obj };
  STRIP_FOR.forEach(prop => {
    if (typeof data[prop] === 'string') {
      data[prop] = parseFloat(data[prop].replace('px', ''));
    }
  });
  return data;
}

// Make full area data from minimum data
export function amend(area) {
  const data = strip(area);
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
export function overDirs(tip, el) {
  tip = amend(tip);
  let area = amend(contentArea());
  if (el && typeof el === 'object') {
    area = intersection(area, position(el));
  }

  const dirs = [];
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
 * @param {Object} tooltip - DOM element.
 * @param {string|Array} place
 * @param {Object} origin - DOM element.
 * @return {Object} 'offset': style data to locate, 'place': final direction of the tooltip
 */
export function adjust(tooltip, props) {
  const { el: origin, auto, within } = props;
  let { place } = props;
  if (typeof place === 'string') {
    place = place.split(',').map(p => p.trim());
  }
  console.log('place: ', place);
  if (auto && place.length === 1) {
    console.log(`auto enabled, opposite is ${opposite(place)}`);
    place.push(opposite(place));
  }

  let pos, dirs, current, first;
  const tries = [ ...place ];
  while (0 < tries.length) {
    console.log('tries: ', tries);
    current = tries.shift();
    console.log('current: ', current);
    pos = placement(current, tooltip, origin);
    if (typeof first === 'undefined') {
      first = { offset: pos, place: current };
    }
    console.log('pos: ', pos);
    dirs = overDirs(pos, within && within());
    console.log('over: ', dirs);
    if (dirs.length === 0) {
      console.log('ajusted: ', current);
      return { offset: pos, place: current };
    }
  }
  console.log('first: ', first);
  return first;
}

/**
 * Resolves names of target tooltip from action or props.
 *
 * @param {Object} action or props.
 * @return {Array} a list of tooltip names.
 */
export function resolve(obj) {
  let names;
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
