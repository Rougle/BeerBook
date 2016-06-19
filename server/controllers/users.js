var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');

// Get users
module.exports.getUsers = function(req, res){
  User.find({}, function(err, users) {
    if (err) throw err;
    
    res.json(users);
  });
};

// Add new user - MOVE TO AUTH
module.exports.registerUser = function(req, res) {

  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  newUser.save(function(err, newUser){
    if (err) throw err;
    
    res.json(newUser);
  });
};

// Get user by id
module.exports.getUser = function(req, res){
  User.findOne({ _id: req.params.id}, function(err, user){
    if (err) throw err;

    res.json(user);
  });
};

// Edit user by id
module.exports.editUser = function(req, res){
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
};

// Delete user by id
module.exports.deleteUser = function(req, res){
  
  User.findById(req.params.id, function(err, user){
    if(err) throw err;

    user.remove(function(err, user){
      if (err) throw err;
      res.json(user);
    });
  });
};