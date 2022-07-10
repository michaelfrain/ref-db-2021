var express = require('express');
var passport = require('passport');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    let active = "\"nav-link active\"";
    let inactive = "\"nav-link\"";
    res.render('login', { title: 'Login to the SCIAC Portal', homeStatus: inactive, loginStatus: active, registerStatus: inactive });
});

router.post('/',passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.status(200).json({
        status: "logged in!"
    });
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

module.exports = router;