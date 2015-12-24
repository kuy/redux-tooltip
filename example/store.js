import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

export default applyMiddleware(
  logger()
)(createStore)(reducer);
