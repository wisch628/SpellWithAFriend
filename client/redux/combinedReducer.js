import todaysData from './todaysData';
import correctWords from './correctWords';
import { combineReducers } from 'redux';
import game from './game';
import userReducer from './userReducer';
import gameUsersReducer from './gameUsers';
import allGames from './allGames';

const appReducer = combineReducers ({
  data: todaysData,
  words: correctWords,
  game: game, 
  user: userReducer,
  gameUsers: gameUsersReducer,
  allGames: allGames
})

export default appReducer;