var express = require('express');
var router = express.Router();

// Database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/guitars');


router.post('/', function(req, res) {
  var guitarSchema = new Schema({
    name: String
  });
  var User = mongoose.model('Guitar', userSchema);
})