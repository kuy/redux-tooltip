import {
  SHOW, HIDE, TOGGLE, KEEP,
  START_TIMEOUT, END_TIMEOUT
} from './actions';

const initial = {
  show: false,
  el: null,
  timeout: null,
};

const handlers = {
  [SHOW]: function (state, action) {
    const el = action.payload || state.el;
    return { ...state, show: true, timeout: null, el };
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
  [START_TIMEOUT]: function (state, action) {
    return { ...state, timeout: action.payload };
  },
  [END_TIMEOUT]: function (state) {
    return { ...state, timeout: null };
  },
};

export default function reducer(state = initial, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
