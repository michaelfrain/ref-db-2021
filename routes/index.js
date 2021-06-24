var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { yourmom: 'Express', image: 'images/sciac-logo.png' });
});

module.exports = router;
