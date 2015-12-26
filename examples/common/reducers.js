import { combineReducers } from 'redux';
import tooltip from '../../src/reducer';

function app(state = {}, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default combineReducers(
  { app, tooltip }
);
