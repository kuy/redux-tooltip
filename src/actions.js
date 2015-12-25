import { createAction } from 'redux-actions';

const prefix = (name) => `redux-tooltip/${name}`;

export const SHOW = prefix('SHOW');
export const HIDE = prefix('HIDE');
export const TOGGLE = prefix('TOGGLE');
export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const toggle = createAction(TOGGLE);

export function delay(action, duration=1500) {
  if (!action.meta) {
    action.meta = {};
  }
  action.meta.delay = duration;
  return action;
}

export const START_TIMEOUT = prefix('START_TIMEOUT');
export const END_TIMEOUT = prefix('END_TIMEOUT');
export const startTimeout = createAction(START_TIMEOUT);
export const endTimeout = createAction(END_TIMEOUT);
