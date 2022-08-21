var express = require('express');
var passport = require('passport-local');
const app = require('../app');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      if (req.user.needsPassword == true) {
        res.render('profile-password-new-only', {
        title: 'Create new password',
        layout: 'authlayout',
        username: `${req.user.firstname} ${req.user.lastname}`, 
        userLevel: req.user.userLevel,
        layout: 'layout',
        basic: active,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email
        });
        res.app.locals.message = 'Create a new password.';
      }
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
     res.app.locals.message = '';
    } else {
      res.app.locals.alertLevel = "danger";
      res.app.locals.message = "Please log in.";
      res.redirect('./login');
    }

  });

  router.get('/password', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      res.render('profile-password', {
        title: 'Basic information',
        layout: 'authlayout',
        password: active,
        userLevel: req.user.userLevel
       });
       res.app.locals.message = '';
    } else {
      res.app.locals.alertLevel = "danger";
      res.app.locals.message = "Please log in.";
      res.redirect('./login');
    }
  });

  router.post('/', async function(req, res, next) {
    const userDoc = await User.findOne({ email: req.user.email }).exec();
    if (!userDoc) {
      res.app.locals.success = false;
      res.app.locals.message = "No user found.";
      res.render('profile-basic', {
        title: 'SCIAC Home',
        layout: 'authlayout',
        username: `${req.user.firstname} ${req.user.lastname}`, 
        userLevel: req.user.userLevel,
        layout: 'authlayout',
        basic: active,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
      })
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
    res.app.locals.success = false;
    res.app.locals.message = "Passwords do not match.";
    res.redirect('/profile/password');
    return;
   }
    User.findOne({ email: req.user.email }, function (err, user) {
      if (err) {
        res.app.locals.alertLevel = "danger";
        res.app.locals.message = err.message;
      } else {
        if (!user) {
          res.app.locals.alertLevel = "danger";
          res.app.locals.message = "User not available.";
        } else {
          user.changePassword(req.body.oldPassword, req.body.newPassword, function(err) {
            if(err) {
              res.app.locals.alertLevel = "danger";
              res.app.locals.message = err.message;
            } else {
              res.app.locals.alertLevel = "success";
              res.app.locals.message = "Your password was changed successfully.";
            }
          });
        }
      }
      res.redirect('/profile/password');
    });
  });
  
  module.exports = router;