var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');


//===========Passport==============================================
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Define passportJS strategy
passport.use(new LocalStrategy(
  function(username, password, done){
    if (username === "admin" && password === "admin") //Just a test
      return done(null,{username: "admin"});

    return done(null, false, {message: 'Login failed.'});
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

// Middleware function to be used with routes
var auth = function(req, res, next){
  if(!req.isAuthenticated())
    res.send(401);
  else
    next();
};

//================================================================

var app = express();

// All Enviironments //

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({ 
  secret: 'securedsession',
  resave: false,
  saveUninitialized: true 
}));

// Passport
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// Routes
app.use('/', routes);
app.use('/api/users', users);

//========================================================


//==================================================================
//==================================================================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
