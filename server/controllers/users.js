var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');

// Get users
module.exports.getUsers = function(req, res){
  User.find({}, function(err, users) {
    if (err) throw err;
    console.log("response sent");
    res.json(users);
  });
};

// Get user by id
module.exports.getUser = function(req, res){
  User.findOne({ _id: req.params.id}, function(err, user){
    if (err) throw err;

    res.json(user);
  });
};

// Get user by id
module.exports.getProfile = function(req, res){

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
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