var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.user != undefined) {
        let active = "active";
        res.render('reports-fouls', {
            title: "Reports",
            layout: 'authlayout',
            reports: active,
            userLevel: req.user.userLevel
        });
    } else {
        res.app.locals.message = "Please log in.";
        res.redirect('./login');
    }
});

router.get('/evaluations', function(req, res, next) {
    if (req.user != undefined) {
        let active = "active";
        res.render('reports-evals', {
            title: "Reports",
            layout: 'authlayout',
            evals: active,
            userLevel: req.user.userLevel
        });
    } else {
        res.app.locals.message = "Please log in.";
        res.redirect('./login');
    }
});

router.get('/documents', function(req, res, next) {
    if (req.user != undefined) {
        let active = "active";
        res.render('reports-documents', {
            title: "Documents",
            layout: 'authlayout',
            documents: active,
            userLevel: req.user.userLevel
        });
    } else {
        res.app.locals.message = "Please log in.";
        res.redirect('./login');
    }
});

module.exports = router;