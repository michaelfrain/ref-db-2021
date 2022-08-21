var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.app.locals.message = '';
  let active = "active"
  if (req.user != undefined) {
    res.render('authindex', { 
      title: 'SCIAC Officials Home', 
      home: active,
      layout: 'authlayout',
      userLevel: req.user.userLevel
     })
  } else {
    res.render('index', { 
      title: 'SCIAC Home',
      home: active
    });
  }
});

module.exports = router;
