"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hide = exports.update = exports.create = exports.show = exports.index = void 0;

var _message = _interopRequireDefault(require("../models/message"));

var _error = _interopRequireDefault(require("../lib/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var index = function index(req, res, next) {
  var result;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_message["default"].find({
            group_chat: req.params.chat_id
          }));

        case 2:
          result = _context.sent;
          res.json(result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.index = index;

var show = function show(req, res, next) {
  var message;
  return regeneratorRuntime.async(function show$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_message["default"].findById(req.params.id));

        case 2:
          message = _context2.sent;

          if (message) {
            _context2.next = 5;
            break;
          }

          throw new ApiError(404, 'Message not found');

        case 5:
          res.json(message);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.show = show;

var create = function create(req, res) {
  var params, message, error;
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          params = {
            text: req.params.text,
            sent_at: req.params.sent_at,
            group_chat: req.params.group_chat_id
          };
          message = new _message["default"](params);
          error = message.validateSync();

          if (error) {
            _context3.next = 7;
            break;
          }

          res.json(message);
          _context3.next = 8;
          break;

        case 7:
          throw new ApiError(422, 'Message could not be created', error.errors);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.create = create;

var update = function update(req, res) {
  var params, message, result;
  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          params = {
            text: req.params.text,
            sent_at: req.params.sent_at,
            group_chat: req.params.group_chat_id
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(_message["default"].findById(req.params.id));

        case 3:
          message = _context4.sent;

          if (message) {
            _context4.next = 6;
            break;
          }

          throw new ApiError(404, 'Message not found');

        case 6:
          message.set(params);
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(message.save());

        case 10:
          result = _context4.sent;
          res.json(message);
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](7);
          throw new ApiError(422, 'Group Chat could not be updated', _context4.t0.errors);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.update = update;

var hide = function hide(req, res) {// pending
};

exports.hide = hide;