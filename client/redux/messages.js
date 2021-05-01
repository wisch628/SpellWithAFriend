import axios from 'axios';
import socket from '../socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_NEW_MESSAGE = 'WRITE_NEW_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

export const gotMessagesFromServer = (messages) => ({
    type: GOT_MESSAGES_FROM_SERVER,
    messages,
  });
  
  export const gotNewMessageFromServer = (message) => ({
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message,
  });
  
  export const writeNewMessage = (inputContent) => ({
    type: WRITE_NEW_MESSAGE,
    newMessageEntry: inputContent,
  });
  
  const initialState = {
    messages: [],
    newMessageEntry: ''
  };
  
  export const fetchMessagesThunkCreator = (gameId) => {
    return async (dispatch) => {
        const response = await axios.get(`/api/messages/${gameId}`);
        const messages = response.data;
        dispatch(gotMessagesFromServer(messages));
    };
  };
  
  export const gotNewMessageFromServerThunkCreator = (gameId, message, userId) => {
    return async (dispatch) => {
        console.log(gameId, message, userId);
        const response = await axios.post(`/api/messages/${gameId}`, {message: message, userId: userId});
        const newMessage = response.data;
        dispatch(gotNewMessageFromServer(newMessage));
        socket.emit('new-message', newMessage);
    };
  };
  
  export default function messages (messages = [], action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER:
        return [ ...messages, action.messages];
      case GOT_NEW_MESSAGE_FROM_SERVER:
        return [ ...messages, action.messages];
      case WRITE_NEW_MESSAGE:
        return [ ...messages, action.newMessageEntry];
      default:
        return messages;
    }
  };