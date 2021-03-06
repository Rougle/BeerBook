var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartyOptions = multiparty();

var jwt = require('express-jwt');

var processjwt = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var authorizeAdmin = function(req, res, next){

  if(req.payload.role == 'admin'){
    next();
  }
  else{
    return res.sendStatus(401);
  }
};

var authorizeUser = function(req, res, next){
  if(req.payload.role == 'user' | req.payload.role == 'admin'){
    next();
  }
  else{
    return res.sendStatus(401);
  }
};



var ctrlUsers = require('../controllers/users');
var ctrlBeers = require('../controllers/beers');
var ctrlComments = require('../controllers/comments');
var ctrlImages = require('../controllers/images');
var ctrlAuth = require('../controllers/auth');

// Beer routes and controllers
router.get('/beers', ctrlBeers.getBeers);
router.get('/beers/:id', ctrlBeers.getBeer);
router.post('/beers', ctrlBeers.addBeer);
router.put('/beers/:id', ctrlBeers.editBeer);
router.delete('/beers/:id', ctrlBeers.deleteBeer);

// User routes and controllers
router.get('/users', [processjwt, authorizeAdmin], ctrlUsers.getUsers);
router.get('/users/:id', ctrlUsers.getUser);
router.get('/profile', [processjwt, authorizeUser], ctrlUsers.getProfile);
router.put('/profile', [processjwt, authorizeUser], ctrlUsers.editProfile);
router.delete('/users/:id', ctrlUsers.deleteUser);

// Comment routes and controllers
router.get('/comments', ctrlComments.getComments);
router.post('/comments', ctrlComments.addComment);
router.get('/comments/beer/:id', ctrlComments.getBeerComments);
router.delete('/comments/comment/:id', ctrlComments.deleteComment);
router.delete('/comments/beer/:id', ctrlComments.deleteBeerComments);

// Image routes and controllers, note the middleware
router.post('/images', multiparty(multipartyOptions), ctrlImages.saveImage);
router.delete('/images', ctrlImages.deleteImage);

// Auth routes and controllers
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
//router.get('/auth/logout', ctrlAuth.logout);
//router.get('/auth/user', auth, ctrlAuth.loggedUser);



module.exports = router;
