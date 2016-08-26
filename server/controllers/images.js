
var shortid = require('shortid');
var path = require('path');
var fs = require("fs");

var mv = require('mv');

var multiparty = require('connect-multiparty');
var multipartyOptions = multiparty();

//Saves image
module.exports.saveImage = function(req, res){
  var file = req.files.file;

  var filename = shortid.generate() + path.extname(file.path);

  mv(file.path, './client/resources/images/beers/' + filename, function(err){
    if(err) throw err;
  });

  res.status(200).json({filename: filename}); //send filename so it cane be saved to db

};

//Deletes image
module.exports.deleteImage = function(req, res){

  var filename = req.query.imgName;
  console.log(filename);

  fs.unlink('./client/resources/images/beers/' + filename, function(err){
    console.log("atUnlink");
    if(err){
      return res.send({
        status:"200",
        response: "failed to delete image"
      })
    }

    res.send({
      status: "200",
      responseType: "string",
      response: "image deleted"
    });
  
  });
};