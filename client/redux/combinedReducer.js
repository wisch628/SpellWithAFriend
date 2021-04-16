import todaysData from './todaysData';
import correctWords from './correctWords';
import { combineReducers } from 'redux';

const appReducer = combineReducers ({
  data: todaysData,
  words: correctWords
})

export default appReducer;