var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register new user', image: "images/sciac-logo.png", homeStatus: "\"nav-link\"", registerStatus: "\"nav-link active\"" });
});

router.post('/', async function(req, res) {
    let { firstname, lastname, email, password } = req.body;

    try {
      let testEmail = email;
      if (await User.exists({ email: testEmail })) {
        res.status(200).json({
          status: 'User already exists'
        });
        return;
      }
      let user = new User({
        firstname,
        lastname,
        email,
        password
      });
      let createdUser = await user.save()
      res.status(201).json({
        status: 'Success',
        data: {
          createdUser
        }
      });
    } catch(err) {
      console.log(err);
      res.status(500);
    }
});

module.exports = router;