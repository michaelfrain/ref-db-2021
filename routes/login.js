var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login to the SCIAC Portal' });
});

router.post('/', function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = router;