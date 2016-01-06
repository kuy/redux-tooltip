import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import { middleware as tooltip } from '../../src/index';

const list = [tooltip];
if (window && !window.__karma__) {
  list.push(logger());
}

export default applyMiddleware(...list)(createStore)(reducer);
