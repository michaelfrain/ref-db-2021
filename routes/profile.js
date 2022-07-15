var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      res.render('profile-basic', { 
        title: 'SCIAC Home', 
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
  
  module.exports = router;