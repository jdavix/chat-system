"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configureConnection = function configureConnection() {
  _mongoose["default"].connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = _mongoose["default"].connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('successfully connected to mongodb');
  });
  return db;
};

var _default = configureConnection;
exports["default"] = _default;