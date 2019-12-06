"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configureSockets = function configureSockets(server) {
  var io = (0, _socket["default"])(server);
  io.on('connection', function (skt) {
    skt.on('SEND_MESSAGE', function (data) {
      console.log('received data: ', data);
      io.emit('RECEIVE_MESSAGE', data);
    });
  });
};

var _default = configureSockets;
exports["default"] = _default;