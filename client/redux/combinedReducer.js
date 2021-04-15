import todaysData from './todaysData';
import { combineReducers } from 'redux';

const appReducer = combineReducers ({
  data: todaysData
})

export default appReducer;