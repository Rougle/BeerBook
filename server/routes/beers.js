var express = require('express');
var router = express.Router();

var Beer = require('../models/beer');
var passport = require('passport');

// Get all beers
router.get('/', function(req, res){
  Beer.find({}, function(err, beers) {
    if(err) throw err;

    res.json(beers);
  });
});

// Add beer
router.post('/', function(req, res){
  var newBeer = new Beer({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description
  });

  newBeer.save(function(err, newBeer){
    if(err) throw err;

    res.json(newBeer);
  });
});

// Get beer by id
router.get('/:id', function(req, res){
  Beer.findOne({ _id: req.params.id}, function(err, beer){
    if (err) throw err;

    res.json(beer);
  });
});

// Edit beer by id
router.put('/:id', function(req, res){
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
});

// Delete beer by id
router.delete('/:id', function(req, res){
  
  Beer.findById(req.params.id, function(err, beer){
    if(err) throw err;

    beer.remove(function(err, beer){
      if (err) throw err;
      res.json(beer);
    });
  });
});

module.exports = router;