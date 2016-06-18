var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var passport = require('passport');

// Get all comments
router.get('/', function(req, res){
  Comment.find({}, function(err, comments) {
    if(err) throw err;

    res.json(comments);
  });
});

// Add comment
router.post('/', function(req, res){
  console.log(req.body.filename);
  var newComment = new Comment({
    user: req.body.user,
    beer: req.body.beer,
    content: req.body.content,
    rating: req.body.rating
  });

  newComment.save(function(err, newComment){
    if(err) throw err;

    res.json(newComment);
  });
});

module.exports = router;