import io from 'socket.io-client';
import { getNewServerWord } from './redux/correctWords';
import store from './redux/store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('new-word', (word) => {
  store.dispatch(getNewServerWord(word));
});


export default socket;
