import io from 'socket.io-client';
import { getNewServerWord } from './redux/correctWords';
import { gotNewMessageFromServer } from './redux/messages';
import store from './redux/store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('new-word', (word) => {
  store.dispatch(getNewServerWord(word));
});

socket.on('new-message', (message) => {
  store.dispatch(gotNewMessageFromServer(message));
});



export default socket;
