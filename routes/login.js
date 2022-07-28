var express = require('express');
var passport = require('passport');
const { options } = require('.');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    let active = "active";
    res.render('login', { 
        title: 'Login to the SCIAC Portal', 
        login: active,
        message: req.session.messages ? req.session.messages[0] : ''
    });
});

router.post('/',passport.authenticate('local', {
    failureRedirect: './login',
    failureMessage: true
}), function(req, res) {
    res.redirect('/');
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

module.exports = router;