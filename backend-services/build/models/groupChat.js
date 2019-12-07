"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = _interopRequireDefault(require("../config/mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GroupChatSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: [true, "Title can't be blank"]
  },
  participants: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }],
  // TODO: invitations objects.
  invitations: [String]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
var connection = (0, _mongodb["default"])();

var _default = connection.model('GroupChat', GroupChatSchema);

exports["default"] = _default;