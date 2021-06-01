import todaysData from './todaysData';
import correctWords from './correctWords';
import { combineReducers } from 'redux';
import game from './game';
import userReducer from './userReducer';
import gameUsersReducer from './gameUsers';
import allGames from './allGames';
import messages from './messages';
import auth from './auth';
import toast from './toast';

const appReducer = combineReducers ({
  data: todaysData,
  words: correctWords,
  game: game, 
  user: userReducer,
  gameUsers: gameUsersReducer,
  allGames: allGames,
  messages: messages,
  auth: auth,
  toast: toast
})

export default appReducer;