var express = require('express');
var passport = require('passport');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    let active = "active";
    res.render('login', { 
        title: 'Login to the SCIAC Portal', 
        login: active,  
    });
});

router.post('/',passport.authenticate('local', { 
    successRedirect: './profile',
    failureRedirect: './login'
}), function (req, res) {
    res.status(200).json({
        status: "logged in!"
    });
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

module.exports = router;