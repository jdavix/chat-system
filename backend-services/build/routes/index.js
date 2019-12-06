"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _messagesRoutes = _interopRequireDefault(require("./messagesRoutes"));

var _usersRoutes = _interopRequireDefault(require("./usersRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var applyRoutes = function applyRoutes(router) {
  (0, _messagesRoutes["default"])(router);
  (0, _usersRoutes["default"])(router);
};

var _default = applyRoutes;
exports["default"] = _default;