
// database
var User = require('../models/user');

// Passport
var passport = require('passport');

//=========AUTHENTICATION========

// login route
module.exports.login =function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      return res.status(401).json({
        err: info
      });
    }
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
};

// logout route
module.exports.logout = function(req, res){
  req.logout();
  res.status(200).json({
    status: 'logged out'
  });
};

//get status
module.exports.status = function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
};
