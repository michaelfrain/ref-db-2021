var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SCIAC Home', image: "images/sciac-logo.png", homeStatus: "\"nav-link active\"", registerStatus: "\"nav-link\"" });
});

module.exports = router;
