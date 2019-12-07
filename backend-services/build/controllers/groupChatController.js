"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.show = exports.index = void 0;

var _groupChat = _interopRequireDefault(require("../models/groupChat"));

var _User = _interopRequireDefault(require("../models/User"));

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

          if (groupChat) {
            _context2.next = 5;
            break;
          }

          throw new _error["default"](404, 'Group Chat not found');

        case 5:
          res.json(groupChat);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.show = show;

var create = function create(req, res) {
  var participants, params, groupChat, error;
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_User["default"].find({
            email: {
              $in: req.body.invited_emails
            }
          }));

        case 2:
          participants = _context3.sent;
          participants = participants.map(function (p) {
            return p._id.toHexString();
          });
          params = {
            title: req.body.title,
            participants: participants,
            invitations: req.body.invited_emails
          };
          console.log("PARAMS: ", params);
          groupChat = new _groupChat["default"](params);
          error = groupChat.validateSync();

          if (error) {
            _context3.next = 12;
            break;
          }

          groupChat.save(function (err, chat) {
            res.json(groupChat);
          });
          _context3.next = 13;
          break;

        case 12:
          throw new _error["default"](422, 'Group Chat could not be created', error.errors);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.create = create;

var update = function update(req, res) {
  var params, groupChat, result;
  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          params = {
            title: req.params.title,
            participants: req.participants
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(_groupChat["default"].findById(req.params.id));

        case 3:
          groupChat = _context4.sent;

          if (groupChat) {
            _context4.next = 6;
            break;
          }

          throw new _error["default"](404, 'Group Chat not found');

        case 6:
          groupChat.set(params);
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(groupChat.save());

        case 10:
          result = _context4.sent;
          res.json(groupChat);
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](7);
          throw new _error["default"](422, 'Group Chat could not be updated', _context4.t0.errors);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.update = update;