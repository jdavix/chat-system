import socket from 'socket.io';
import Message from '../models/message';
import User from '../models/user';

import { NOTIFICATIONS_QUEUE } from '../queues/constants';
import queue from '../queues';

const configureSockets = (server) => {
  const io = socket(server);

  io.on('connection', (skt) => {
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
      skt.broadcast.in(data.chat_id).emit('TYPING', data);
    });
  });
};

export default configureSockets;
