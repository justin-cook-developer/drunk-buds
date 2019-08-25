import { createStore, applyMiddleware, compose } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers/index';
import axios from './axios';

const middleware = [
  loggingMiddleware,
  thunkMiddleware.withExtraArgument(axios),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
