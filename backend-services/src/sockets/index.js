import socket from 'socket.io';

const configureSockets = (server) => {
  const io = socket(server);

  io.on('connection', (skt) => {
    skt.on('SEND_MESSAGE', (data) => {
      console.log('received data: ', data);
      io.emit('RECEIVE_MESSAGE', data);
    });
  });
};


export default configureSockets;
