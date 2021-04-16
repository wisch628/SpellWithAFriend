const CorrectWord = require('../db/models/correct-words');
//const Channel = require('../db/models/channel');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-word', word => {
      socket.broadcast.emit('new-word', word);
    });

    // socket.on('new-channel', channel => {
    //   socket.broadcast.emit('new-channel', channel);
    // });

  });

};
