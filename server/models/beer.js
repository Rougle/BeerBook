var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  img_name: {
    type: String,
    required: false,
    unique: false
  }
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;