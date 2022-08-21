var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  let active = "active"
  res.render('users', { 
    title: 'Register new user',
    layout: 'authlayout',
    register: active,
    userLevel: req.user.userLevel
  });
});

router.post('/create', async function(req, res, next) {
  let { firstname, lastname, email, userLevel } = req.body;

  User.create({ firstname: firstname, lastname: lastname, email: email }, function (err, user) {
    if (err) {
      console.log(err);
      res.status(500);
      return;
    }
    user.userLevel = userLevel;
    user.save();
    res.app.locals.message = 'User created.';
    res.app.locals.alertLevel = 'success';
    res.redirect('/users');
  });
});

module.exports = router;