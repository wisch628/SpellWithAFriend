const Words = require('../db/models/words');
const Messages = require('../db/models/messages');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-word', word => {
      socket.broadcast.emit('new-word', word);
    });

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('new-user', users => {
      socket.broadcast.emit('new-user', users);
    });
  });

};
