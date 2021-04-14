import dummyReducer from './dummyReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers ({
  dummyReducer: dummyReducer
})

export default appReducer;