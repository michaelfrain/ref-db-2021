var express = require('express');
var passport = require('passport');
const { options } = require('.');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    let active = 'active';
    res.render('confirm', { 
        title: 'Confirm your e-mail address',
        message: res.app.locals.message,
        alertLevel: res.app.locals.alertLevel,
        confirm: active
    });
    res.app.locals.message = '';
    res.app.locals.alertLevel = '';
});

router.post('/', function(req, res, next) {
    let email = req.body.email;

    const user = User.findOne({ email: email });

    if (user === undefined) {
        res.app.locals.message = 'User not found.';
        res.app.locals.alertLevel = 'danger';
        res.redirect('/confirm');
        return;
    }
      
    if (user.status === 'confirmed') {
        res.app.locals.message = 'User already confirmed.';
        res.app.locals.alertLevel = 'warning';
        res.redirect('/confirm');
        return;
    }

    res.redirect('/confirm/' + user._id);
});

router.get('/:id', function(req, res, next) {
    res.render('profile-password-new-only', {
        userid: req.params.id,
        message: res.app.locals.message,
        alertLevel: res.app.locals.alertLevel
    });
    res.app.locals.message = '';
    res.app.locals.alertLevel = '';
});

router.post('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
            res.app.locals.message = 'Unknown error.';
            res.app.locals.alertLevel = 'danger';
            res.redirect('/confirm');
            return;
        }

        if (user == undefined) {
            res.app.locals.message = 'User not found.';
            res.app.locals.alertLevel = 'danger';
            res.redirect('/confirm');
            return;
        }

        user.setPassword(req.body.newPassword, async function(err, result) {
           if (err) {
            console.log(err);
            res.app.locals.message = 'Unknown error.';
            res.app.locals.alertLevel = 'danger';
            res.redirect('/confirm');
            return;
           }

           result.status = 'confirmed';
           await result.save();
           res.app.locals.message = 'User confirmed. Please log in.';
           res.app.locals.alertLevel = 'success';
           res.redirect('/login');
        });
    });
});

module.exports = router;