var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title : 'Register new user' });
});

router.post('/create', function(req, res) {
    res.send(res.data);
    console.log(req.body.data);
});

module.exports = router;