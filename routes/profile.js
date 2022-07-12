var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let active = "active"
    if (req.user != undefined) {
      res.render('profile', { 
        title: 'SCIAC Home', 
        username: `${req.user.firstname} ${req.user.lastname}`, 
        layout: 'authlayout',
        profile: active
     });
    } else {
        res.redirect('./login');
    }

  });
  
  module.exports = router;