import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import { middleware as tooltip } from '../../src/index';

export default applyMiddleware(
  tooltip, logger()
)(createStore)(reducer);
