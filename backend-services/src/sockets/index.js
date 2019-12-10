import socket from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/message';
import User from '../models/user';
import env from '../config/env';
import queue from '../queues';
import { NOTIFICATIONS_QUEUE } from '../queues/constants';

const configureSockets = (server) => {
  const io = socket(server);

  io.use(function(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, env.secret, function(err, decoded) {
        if(err) return next(new Error('Authentication error'));
        socket.currentUserId = decoded.id;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  })
  .on('connection', (skt) => {
    skt.on('JOIN', (data) => {
      console.log("JOINED: ", data.chat._id);
      skt.join(data.chat._id);
    });

    skt.on('SEND_MESSAGE', (data) => {
      let message = data.message;
      // Note: currently it is not blocking the event emission by storing into the database first
      // writing the messages to the database can be ensured by retrying through background jobs.
      try {
        const msg = new Message(message);
        msg.save().then(async (msg) => {
          const notificationQueue = queue(NOTIFICATIONS_QUEUE);

          const participants = await User.find({ _id: { $in: data.participants } });
          participants.forEach((user) => {
            if (data.from !== user.email) {
              notificationQueue.performLater({ text: msg.text, from: data.from, to: user.email });
            }
          });
        });
      } catch (e) {
        console.log(e);
      }

      console.log("Emitting: ", message.text);
      io.in(message.group_chat).emit('RECEIVE_MESSAGE', message);
    });
    skt.on('TYPING', (data) => {
      io.in(data.chat_id).emit('TYPING', data);
    });
  });
};

export default configureSockets;
