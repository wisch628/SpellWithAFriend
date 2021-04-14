import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './combinedReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  combinedReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;