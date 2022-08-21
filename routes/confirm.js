var express = require('express');
var passport = require('passport');
const { options } = require('.');
var User = require ('../models/user');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('confirm', { 
        title: 'Confirm your e-mail address'
    });
});

router.post('/', function(req, res, next) {
    let email = req.body.email;

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        res.redirect('/confirm/' + user._id);
    });
});

router.get('/:id', function(req, res, next) {
    res.render('profile-password-new-only', {
        userid: req.params.id
    });
});

router.post('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }

        user.setPassword(req.body.newPassword, async function(err, result) {
           if (err) {
            console.log(err);
            return;
           }

           result.status = 'confirmed';
           await result.save();
        });
    });
});

module.exports = router;