"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = _interopRequireDefault(require("../config/mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MessageSchema = new _mongoose["default"].Schema({
  text: String,
  creator_username: String,
  sent_at: Date,
  group_chat: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'GroupChat'
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
var connection = (0, _mongodb["default"])();

var _default = connection.model('Message', MessageSchema);

exports["default"] = _default;