import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { createLogger } from 'redux-logger';
import { middleware as tooltip } from '../../src/index';

const list = [tooltip];
if (window && !window.__karma__) {
  list.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...list)));

export default store;
