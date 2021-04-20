import todaysData from './todaysData';
import correctWords from './correctWords';
import { combineReducers } from 'redux';
import game from './game';

const appReducer = combineReducers ({
  data: todaysData,
  words: correctWords,
  game: game
})

export default appReducer;