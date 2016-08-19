var app = angular.module('beerBook', ['ngResource', 'ngRoute', 'ngFileUpload']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/user/register', {
      templateUrl: 'views/partials/user/user-form.html',
      controller: 'RegisterCtrl'
    })
    .when('/user/edit/:id', {
      templateUrl: 'views/partials/user/user-form.html',
      controller: 'EditUserCtrl'
    })
    .when('/user/delete/:id', {
      templateUrl: 'views/partials/user/user-delete.html',
      controller: 'DeleteUserCtrl'
    })
    .when('/user/login', {
      templateUrl: 'views/partials/user/user-login.html',
      controller: 'LoginCtrl'
    })
    .when('/beers', {
      templateUrl: 'views/partials/beer/beers.html',
      controller: 'ViewBeersCtrl'
    })
    .when('/beers/add', {
      templateUrl: 'views/partials/beer/beer-form.html',
      controller: 'AddBeerCtrl'
    })
    .when('/beers/edit/:id', {
      templateUrl: 'views/partials/beer/beer-form.html',
      controller: 'EditBeerCtrl'
    })
    .when('/beers/delete/:id', {
      templateUrl: 'views/partials/beer/beer-delete.html',
      controller: 'DeleteBeerCtrl'
    })
    .when('/beers/:id', {
      templateUrl: 'views/partials/beer/beer-info.html',
      controller: 'ViewBeerCtrl'
    })    
    .otherwise({
      redirectTo: '/'
    });
}]);