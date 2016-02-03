var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/GuitarShop');

var userSchema = new Schema({
  name: String,
  role: String
});

var User = mongoose.model('User', userSchema);


module.exports = User;