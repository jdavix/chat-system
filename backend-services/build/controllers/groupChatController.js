"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hide = exports.update = exports.create = exports.show = exports.index = void 0;

var _groupChat = _interopRequireDefault(require("../models/groupChat"));

var _error = _interopRequireDefault(require("../lib/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var index = function index(req, res, next) {
  var result;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_groupChat["default"].find({}));

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
  var groupChat;
  return regeneratorRuntime.async(function show$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_groupChat["default"].findById(req.params.id));

        case 2:
          groupChat = _context2.sent;
          res.json(message);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.show = show;

var create = function create(req, res) {
  var eventParams, groupChat, errors;
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          eventParams = {
            title: req.params.title,
            participants: req.participants
          };
          groupChat = new _groupChat["default"](eventParams);
          errors = groupChat.validateSync();

          if (!errors) {
            res.json(groupChat);
          } else {}

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.create = create;

var update = function update(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
};

exports.update = update;

var hide = function hide(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
};

exports.hide = hide;