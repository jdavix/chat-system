"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _error = require("./lib/error");

var _sockets = _interopRequireDefault(require("./sockets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Adding features:

app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])('combined')); // Setup port

var port = process.env.PORT || 3001; // Setup router:

var router = _express["default"].Router();

(0, _routes["default"])(router);
app.use('/api/v1', router); // Error middleaware

app.use(function (err, req, res, next) {
  (0, _error.handleError)(err, res);
}); // starting server:

var server = app.listen(port, function () {
  console.log("server running on port ".concat(port));
}); // socket io setup:

(0, _sockets["default"])(server);