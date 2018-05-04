var express = require('express')
var app = express()
var db = require('./db')
var version = 'v1'
var api = `/api/${version}`

var UserController = require('./user/UserController')
app.use(`${api}/users`, UserController)

var AuthController = require('./auth/AuthController')
app.use(`${api}/auth`, AuthController)

module.exports = app
