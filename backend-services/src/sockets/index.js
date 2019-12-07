import socket from 'socket.io';
import Message from '../models/message';

const configureSockets = (server) => {
  const io = socket(server);

  io.on('connection', (skt) => {
    skt.on('JOIN', (data) => {
      console.log("JOINED: ", data.chat._id);
      skt.join(data.chat._id);
    });

    skt.on('SEND_MESSAGE', (message) => {
      // Note: currently it is not blocking the event emission by storing into the database first
      // writing the messages to the database can be ensured by retrying through background jobs.
      try {
        const msg = new Message(message);
        msg.save();
      } catch (e) {
        console.log(e);
      }
      console.log("Emitting: ", message.text);
      io.in(message.group_chat).emit('RECEIVE_MESSAGE', message);
    });
    skt.on('TYPING', (data) => {
      skt.broadcast.in(data.chat_id).emit('TYPING', data);
    });
  });
};

export default configureSockets;
