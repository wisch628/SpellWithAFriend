import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './combinedReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

let middleware = [];
const logger = createLogger();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunkMiddleware, logger];
} else {
  middleware = [...middleware, thunkMiddleware];
}

const store = createStore(
  combinedReducer,
  applyMiddleware(
    ...middleware
  )
);

export default store;