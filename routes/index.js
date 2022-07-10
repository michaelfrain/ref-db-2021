var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let active = "\"nav-link active\""
  let inactive = "\"nav-link\""
  res.render('index', { title: 'SCIAC Home', homeStatus: active, registerStatus: inactive, loginStatus: inactive });
});

module.exports = router;
