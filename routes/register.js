var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  let active = "\"nav-link active\""
  let inactive = "\"nav-link\""
  res.render('register', { 
    title: 'Register new user', 
    home: inactive, 
    login: inactive, 
    register: active 
  });
});

router.post('/', async function(req, res) {
  let { firstname, lastname, email, password } = req.body;

  User.register({ firstname: firstname, lastname: lastname, email: email }, password, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500);
      return;
    }

    res.status(201).json({
      status: 'Success',
      data: {
        user
      }
    });
  });
});

module.exports = router;