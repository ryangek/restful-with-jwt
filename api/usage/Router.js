var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;
