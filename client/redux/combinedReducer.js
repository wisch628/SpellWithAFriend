import todaysData from './todaysData';
import correctWords from './correctWords';
import { combineReducers } from 'redux';
import game from './game';
import userReducer from './userReducer';

const appReducer = combineReducers ({
  data: todaysData,
  words: correctWords,
  game: game, 
  user: userReducer
})

export default appReducer;