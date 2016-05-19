var express = require('express');
var router = express.Router();

var Beer = require('../models/beer');
var passport = require('passport');

//gets all beers
router.get('/', function(req, res){
  Beer.find({}, function(err, beers) {
    if(err) throw err;

    res.json(beers);
  });
});

//adds beer
router.post('/', function(req, res){
  var newBeer = new Beer({
    name: req.body.beername,
    type: req.body.beertype
  });

  newBeer.save(function(err, newBeer){
    if(err) throw err;

    res.json(newBeer);
  });
});

// GET beer by id
router.get('/:id', function(req, res){
  Beer.findOne({ _id: req.params.id}, function(err, beer){
    if (err) throw err;

    res.json(beer);
  });
});

// DELETE beer
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