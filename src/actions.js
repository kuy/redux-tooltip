import { createAction } from 'redux-actions';

const prefix = (name) => `redux-tooltip/${name}`;

export const INIT = prefix('INIT');
export const init = createAction(INIT);

export const SET_TEXT = prefix('SET_TEXT');
export const CLEAR_TEXT = prefix('CLEAR_LIST');
export const setText = createAction(SET_TEXT);
export const clearText = createAction(CLEAR_TEXT);

export const OPEN_LIST = prefix('OPEN_LIST');
export const CLOSE_LIST = prefix('CLOSE_LIST');
export const openList = createAction(OPEN_LIST);
export const closeList = createAction(CLOSE_LIST);

export const SET_ITEMS = prefix('SET_ITEMS');
export const CLEAR_ITEMS = prefix('CLEAR_ITEMS');
export const setItems = createAction(SET_ITEMS);
export const clearItems = createAction(CLEAR_ITEMS);

export const SELECT_ITEM = prefix('SELECT_ITEM');
export const selectItem = createAction(SELECT_ITEM);

export const SET_HIGHLIGHT = prefix('SET_HIGHLIGHT');
export const CLEAR_HIGHLIGHT = prefix('CLEAR_HIGHLIGHT');
export const setHighlight = createAction(SET_HIGHLIGHT);
export const clearHighlight = createAction(CLEAR_HIGHLIGHT);
