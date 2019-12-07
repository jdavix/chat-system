"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _message = _interopRequireDefault(require("../models/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configureSockets = function configureSockets(server) {
  var io = (0, _socket["default"])(server);
  io.on('connection', function (skt) {
    skt.on('JOIN', function (chat) {
      skt.join(chat._id);
    });
    skt.on('SEND_MESSAGE', function (message) {
      // Note: currently it is not blocking the event emission by storing into the database first
      // writing the messages to the database can be ensured by retrying through background jobs.
      try {
        var msg = new _message["default"](message);
        msg.save();
      } catch (e) {
        console.log(e);
      }

      io["in"](message.group_chat).emit('RECEIVE_MESSAGE', message);
    });
    skt.on('TYPING', function (data) {
      skt.broadcast["in"](data.chat_id).emit('TYPING', data);
    });
  });
};

var _default = configureSockets;
exports["default"] = _default;