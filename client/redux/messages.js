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
  
  export const gotNewMessageFromServerThunkCreator = (gameId, thisMessage, userId) => {
    return async (dispatch) => {
        const response = await axios.post(`/api/messages/${gameId}`, {message: thisMessage, userId: userId});
        const message = response.data;
        dispatch(gotNewMessageFromServer(message));
        socket.emit('new-message', message);
    };
  };
  
  export default function messages (messages = [], action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER:
        return action.messages;
      case GOT_NEW_MESSAGE_FROM_SERVER:
        return [ ...messages, action.message];
      case WRITE_NEW_MESSAGE:
        return [ ...messages, action.message];
      default:
        return messages;
    }
  };