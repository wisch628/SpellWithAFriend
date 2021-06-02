import Axios from "axios";
import socket from "../socket";
import { handleNotifications } from "./toast";

const GET_WORDS = "GET_WORDS";
const GOT_NEW_SERVER_WORD = "GOT_NEW_SERVER_WORD";
const ADD_WORD = "ADD_WORD";

const getWords = (words) => ({
  type: GET_WORDS,
  words,
});

export const addWord = (word) => ({
  type: ADD_WORD,
  word,
});

export const getNewServerWord = (word) => ({
  type: GOT_NEW_SERVER_WORD,
  word,
});

export const getWordsThunkCreator = (id) => {
  return async (dispatch) => {
    const response = await Axios.get(`/api/today/correct/${id}`);
    let words = response.data;
    dispatch(getWords(words));
  };
};

export const addWordThunkCreator = (word, gameId, userId, data) => {
  return async (dispatch) => {
    const response = await Axios.post("/api/today/add", {
      word: word,
      gameId: gameId,
      userId: userId,
      data,
    });
    let newWord = response.data;
    if (newWord.word) {
      dispatch(getNewServerWord(newWord.word));
      socket.emit("new-word", newWord.word);
    }
    dispatch(handleNotifications(newWord.toast));
  };
};

export default function correctWords(words = [], action) {
  switch (action.type) {
    case GET_WORDS:
      return action.words;
    case GOT_NEW_SERVER_WORD:
      return [...words, action.word];
    case ADD_WORD:
      return [...words, action.word];
    default:
      return words;
  }
}
