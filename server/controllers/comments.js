
var Comment = require('../models/comment');
var Beer = require('../models/beer');

// Get all comments
module.exports.getComments = function(req, res){
  Comment.find({}, function(err, comments) {
    if(err) throw err;

    res.json(comments);
  });
};

// Add comment
module.exports.addComment = function(req, res){

  var newComment = new Comment({
    user: req.body.user,
    beerId: req.body.beerId,
    content: req.body.content,
    rating: req.body.rating
  });

  newComment.save(function(err, newComment){
    if(err) throw err;

    res.json(newComment);
  });
};

//get comments related to beer
module.exports.getBeerComments = function(req, res){
  Comment.find(
  {'beerId': req.params.id}, 'user content rating',
    function(err, comments) {
      if(err) throw err;

      res.json(comments);
    });
};

// Delete comment by id
module.exports.deleteComment = function(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if(err) throw err;

    comment.remove(function(err, comment){
      if (err) throw err;
      res.json(comment);
    });
  });
};

//delete comments related to beer
module.exports.deleteBeerComments = function(req, res){
  Comment.remove(
  {'beerId': req.params.id},
  function(err, comments) {
    if(err) throw err;
      res.send({
        status: "200",
        responseType: "string",
        response: "comments deleted"
      });
    });
}