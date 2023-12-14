var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    var userId = req.user.userId;
    
    
});