var express = require('express');
var router = express.Router();

var User = require('../models/user');
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

module.exports = router;