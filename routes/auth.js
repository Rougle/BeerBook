var express = require('express');
var router = express.Router();
var passport = require('passport');

// test if logged in
router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// login route
router.post('/login', passport.authenticate('local'), function(req, res){
  res.send(req.user);
});

// logout route
router.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

module.exports = router;