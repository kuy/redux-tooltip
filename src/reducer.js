import { resolve } from './utils';

import {
  SHOW, HIDE, TOGGLE, KEEP,
  CONTENT, PLACE,
  START_TIMEOUT, END_TIMEOUT
} from './actions';

const initial = {
  show: false,
  place: 'top',
  origin: null,
  el: null,
  auto: true,
  content: null,
  timeout: null,
};

const handlers = {
  [SHOW]: function (state, action) {
    const names = ['origin', 'el', 'place', 'content'];
    const props = {};
    names.forEach(name => {
      if (action.payload[name]) {
        props[name] = action.payload[name];
      } else {
        props[name] = initial[name];
      }
    });
    return { ...state, show: true, ...props };
  },
  [HIDE]: function (state) {
    return { ...state, show: false };
  },
  [TOGGLE]: function (state) {
    return { ...state, show: !state.show };
  },
  [KEEP]: function (state) {
    return { ...state, timeout: null };
  },
  [CONTENT]: function (state, action) {
    return { ...state, content: action.payload };
  },
  [PLACE]: function (state, action) {
    return { ...state, place: action.payload };
  },
  [START_TIMEOUT]: function (state, action) {
    return { ...state, timeout: action.payload.token };
  },
  [END_TIMEOUT]: function (state) {
    return { ...state, timeout: null };
  },
};

function tooltip(state = initial, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

export default function reducer(state = {}, action) {
  let newState = { ...state };
  const names = resolve(action);
  names.forEach(name => {
    newState = { ...newState, [name]: tooltip(newState[name], action) };
  });
  return newState;
}
