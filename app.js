var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var reportsRouter = require('./routes/reports');
const { hasSubscribers } = require('diagnostics_channel');

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("if_equals", function(left, right, options) {
  if (left == right) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("if_not", function(left, right, options) {
  if (left != right) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap-js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(session({
  secret: 'fcs-west-2022',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
