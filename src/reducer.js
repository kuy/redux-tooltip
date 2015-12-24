import {
  SHOW, HIDE, TOGGLE
} from './actions';

const initial = {
  show: false,
  el: null,
};

const handlers = {
  [SHOW]: function (state, action) {
    const el = action.payload || state.el;
    return { ...state, show: true, el };
  },
  [HIDE]: function (state) {
    return { ...state, show: false };
  },
  [HIDE]: function (state) {
    return { ...state, show: !state.show };
  },
};

export default function reducer(state = initial, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
