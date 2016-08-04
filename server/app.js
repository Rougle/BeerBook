var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// Routes
var routesApi = require('./routes/api');
var routesIndex = require('./routes/index');

// Passport
var session = require('express-session');
var passport = require('passport');

// Database
require('./models/db');
require('./config/passport');

//================================================================

var app = express();

// All Environments //

// view engine setup
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'b.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Static routes
app.use(express.static(path.join(__dirname, '../client')));
app.use('/static', express.static((path.join(__dirname, '../node_modules/ng-file-upload/dist'))));
app.use('/resources', express.static((path.join(__dirname, '../client/resources'))));

// Session
app.use(session({
  secret: 'securedsession',
  resave: false,
  saveUninitialized: true 
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); 

// Routes for API
app.use('/api', routesApi);
app.use('/', routesIndex);

//Angular partials are rendered at server. Jade stuff.
app.get('/views/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('views/partials/' + name);
});

app.get('/views/partials/beer/:name', function (req, res){
  var name = req.params.name;
  res.render('views/partials/beer/' + name);
});

app.get('/views/partials/user/:name', function (req, res){
  var name = req.params.name;
  res.render('views/partials/user/' + name);
});

//===================================================================
// ERROR HANDLERS
//===================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

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
