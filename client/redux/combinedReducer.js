import dummyReducer from './dummyReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers ({
  samples: dummyReducer
})

export default appReducer;