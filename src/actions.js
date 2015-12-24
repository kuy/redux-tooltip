import { createAction } from 'redux-actions';

const prefix = (name) => `redux-tooltip/${name}`;

export const SHOW = prefix('SHOW');
export const HIDE = prefix('HIDE');
export const TOGGLE = prefix('TOGGLE');
export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const toggle = createAction(TOGGLE);
