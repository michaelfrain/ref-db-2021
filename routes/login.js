var express = require('express');
var passport = require('passport');
const { options } = require('.');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    let active = "active";
    var message = '';
    var alertLevel = '';
    if (res.app.locals.message != undefined && res.app.locals.message != '') {
        message = res.app.locals.message
        alertLevel = 'success';
    } else if (req.session.messages != undefined && req.session.messages[0] != undefined) {
        message = req.session.messages[0];
        alertLevel = 'danger';
    }
    res.render('login', { 
        title: 'Login to the SCIAC Portal', 
        login: active,
        message: message,
        alertLevel: alertLevel
    });
});

router.post('/',passport.authenticate('local', {
    failureMessage: true,
    failureRedirect: './login'
}), function(req, res) {
    res.redirect('../profile');
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

module.exports = router;