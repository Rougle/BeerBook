var express = require('express');
var router = express.Router();
var path = require('path');

//var Image = require('../models/image');
var Beer = require('../models/beer');

var multiparty = require('connect-multiparty');
var multipartyOptions = {autoFile: true, 
  uploadDir: ('./client/resources/images/beers')};

router.post('/', multiparty(multipartyOptions), function(req, res){
  var file = req.files.file;

  console.log(file.name);
  console.log(file.type);
  console.log(file.path);
  res.status(200).send('OK')

  /*
  var newImage = new Image({
    name: file.name,
    location: file.location
  });

  newImage.save(function(err, newImage){
    if(err) throw err;

    res.json(newImage);
  });
  */
});


module.exports = router;