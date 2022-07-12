var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let active = "\"nav-link active\""
  let inactive = "\"nav-link\""
  if (req.user != undefined) {
    res.render('index', { 
      title: 'SCIAC Home', 
      username: `${req.user.firstname} ${req.user.lastname}`,
      home: active,
      profile: inactive,
      layout: 'authlayout' });
  } else {
    res.render('index', { 
      title: 'SCIAC Home',
      home: active,
      login: inactive,
      register: inactive 
    });
  }
});

module.exports = router;
