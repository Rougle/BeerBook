var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  user: {
    type: String,
    required: false,
    unique: false
  },
  beer: {
    type: String,
    required: false,
    unique: false
  },
  content: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    required: true,
    unique: false
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;