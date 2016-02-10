import { createAction } from 'redux-actions';

const prefix = (name) => `redux-tooltip/${name}`;

export const SHOW = prefix('SHOW');
export const HIDE = prefix('HIDE');
export const TOGGLE = prefix('TOGGLE');
export const KEEP = prefix('KEEP');
export const CONTENT = prefix('CONTENT');
export const PLACE = prefix('PLACE');

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const toggle = createAction(TOGGLE);
export const keep = createAction(KEEP);
export const content = createAction(CONTENT);
export const place = createAction(PLACE);

export const DELAY = prefix('delay');
const DURATION = 1500;
export function delay(action, { duration, callback } = { duration: DURATION }) {
  if (!action.meta) {
    action.meta = {};
  }
  if (typeof duration === 'undefined' || duration === true) {
    duration = DURATION;
  }
  action.meta[DELAY] = { duration: parseInt(duration), callback };
  return action;
}

export const START_TIMEOUT = prefix('START_TIMEOUT');
export const END_TIMEOUT = prefix('END_TIMEOUT');

export const startTimeout = createAction(START_TIMEOUT);
export const endTimeout = createAction(END_TIMEOUT);
