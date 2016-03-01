var express = require('express');
var router = express.Router();

// database
var User = require('../models/user');

// Passport
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    
    res.json(users);
  });
});

// POST user
router.post('/', function(req, res) {

  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  newUser.save(function(err, newUser){
    if (err) throw err;
    
    res.json(newUser);
  });
});

// GET user id
router.get('/:id', function(req, res){
  User.findOne({ _id: req.params.id}, function(err, user){
    if (err) throw err;

    res.json(user);
  });
});

// PUT user id
router.put('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err) throw err;
    
    user.username = req.body.username;
    user.password = req.body.password;
    user.role = req.body.role;
    
    user.save(function(err, user) {
      if (err) throw err;
      res.json(user);
    });
  
  });
});


// DELETE user
router.delete('/:id', function(req, res){
  
  User.findById(req.params.id, function(err, user){
    if(err) throw err;

    user.remove(function(err, user){
      if (err) throw err;
      res.json(user);
    });
  });
});

//=========AUTHENTICATION========

// test if logged in
router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// login route

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

// logout route
router.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

module.exports = router;

