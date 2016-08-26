
var Beer = require('../models/beer');
var passport = require('passport');

// Get all beers
module.exports.getBeers = function(req, res){
  Beer.find({}, function(err, beers) {
    if(err) throw err;
    res.json(beers);
  });
};

// Add beer
module.exports.addBeer = function(req, res){
  var newBeer = new Beer({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    img_name: req.body.filename
  });

  newBeer.save(function(err, newBeer){
    if(err) throw err;

    res.json(newBeer);
  });
};

// Get beer by id
module.exports.getBeer = function(req, res){
  Beer.findOne({ _id: req.params.id}, function(err, beer){
    if (err) throw err;

    res.json(beer);
  });
};

// Edit beer by id
module.exports.editBeer = function(req, res){
  Beer.findById(req.params.id, function(err, beer){
    if(err) throw err;
    
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.description = req.body.description;

    beer.save(function(err, beer) {
      if (err) throw err;
      res.json(beer);
    });
  
  });
};

// Delete beer by id
module.exports.deleteBeer = function(req, res){
  
  Beer.findById(req.params.id, function(err, beer){
    if(err) throw err;

    beer.remove(function(err, beer){
      if (err) throw err;
      res.json(beer);
    });
  });
};
