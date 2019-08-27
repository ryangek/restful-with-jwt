var express = require("express");
var app = express();
var db = require("./db");
var version = "v1";
var api = `/api/${version}`;

var UserController = require("./api/user/UserController");
app.use(`${api}/users`, UserController);

var AuthController = require("./api/auth/AuthController");
app.use(`${api}/auth`, AuthController);

module.exports = app;
