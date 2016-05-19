var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Routes
var authRoute = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var beers = require('./routes/beers');



//===========Passport==============================================
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var User = require('./models/user');

// Define passportJS strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err)
        return done(err);
      
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });

      user.comparePassword(password, function(err, isMatch){
        console.log(password);
        if(isMatch)
          return done(null, user);
        else
          return done(null, false, { message: 'Incorrect password.' });
      });
    });
  }
));


// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


//================================================================

var app = express();

// All Environments //

// view engine setup
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// Session
app.use(session({
  secret: 'securedsession',
  resave: false,
  saveUninitialized: true 
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); 

// Routes
app.use('/', routes);
app.use('/api/auth', authRoute);
app.use('/api/users', users);
app.use('/api/beers', beers);

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

//Connect to database
mongoose.connect('mongodb://localhost:27017/BeerBook');

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
