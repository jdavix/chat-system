"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.show = void 0;

var show = function show(req, res) {
  return regeneratorRuntime.async(function show$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.json({
            message: 'hooray! welcome to our api!'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.show = show;

var create = function create(req, res) {
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.json({
            message: 'hooray! welcome to our api!'
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.create = create;

var update = function update(req, res) {
  return regeneratorRuntime.async(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.json({
            message: 'hooray! welcome to our api!'
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.update = update;