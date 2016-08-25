var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    unique: false,
    default: 'user'
  },
  hash: String,
  salt: String
});

// Sets password
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Checks if passoword is correct
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

// Generate JWT token
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); //SET THIS AS AN ENVIRONMENT VARIABLE LATER
};


var User = mongoose.model('User', userSchema);

module.exports = User;