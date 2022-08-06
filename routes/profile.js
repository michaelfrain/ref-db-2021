var express = require('express');
var passport = require('passport-local');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      res.render('profile-basic', { 
        title: 'SCIAC Home',
        layout: 'authlayout',
        username: `${req.user.firstname} ${req.user.lastname}`, 
        userLevel: req.user.userLevel,
        layout: 'authlayout',
        basic: active,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email
     });
    } else {
        res.redirect('./login');
    }

  });

  router.get('/password', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      res.render('profile-password', {
        title: 'Basic information',
        layout: 'authlayout',
        password: active
       });
    } else {
      res.redirect('./login');
    }
  });

  router.post('/', async function(req, res, next) {
    const userDoc = await User.findOne({ email: req.user.email }).exec();
    if (!userDoc) {
      res.json({ success: false, message: 'User not found' });
      return;
    }

    if (req.body.firstname != '') {
      userDoc.firstname = req.body.firstname;
    }
    if (req.body.lastname != '') {
      userDoc.lastname = req.body.lastname;
    }
    if (req.body.email != '') {
      userDoc.email = req.body.email
    }

    userDoc.save();

    res.json({ success: true, message: userDoc });
  });

  router.post('/password', function(req, res, next) {
  let active = "active"
   if (req.body.oldPassword == '' || req.body.newPassword == '' || req.body.newPassword != req.body.newPasswordConfirm) {
    // res.status(400).json( {
    //   success: false,
    //   message: "Passwords do not match."
    // });
    res.render('profile-password', {
      title: 'Basic information',
      layout: 'authlayout',
      password: active,
      message: 'Passwords do not match.'
    });
    return;
   }
    User.findOne({ email: req.user.email }, function (err, user) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found' });
        } else {
          user.changePassword(req.body.oldPassword, req.body.newPassword, function(err) {
            if(err) {
              res.json({ success: false, message: 'Password error' });
            } else {
              res.json({ success: true, message: 'Your password has been changed successfully' });
            }
          });
        }
      }
    });
  });
  
  module.exports = router;