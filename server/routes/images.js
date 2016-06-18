var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var path = require('path');

var mv = require('mv');

var multiparty = require('connect-multiparty');
var multipartyOptions = multiparty();

//Saves image
router.post('/', multiparty(multipartyOptions), function(req, res){
  var file = req.files.file;

  var filename = shortid.generate() + path.extname(file.path);

  mv(file.path, './client/resources/images/beers/' + filename, function(err){
    if(err) throw err;
  });

  res.status(200).json({filename: filename}); //send filename so it cane be saved to db

});


module.exports = router;