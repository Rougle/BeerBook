var app = angular.module('BeerBook', ['ngResource', 'ngRoute', 'ngFileUpload']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/home',
      controller: 'HomeCtrl'
    })
    .when('/user/register', {
      templateUrl: 'views/partials/user/user-form',
      controller: 'RegisterCtrl'
    })
    .when('/user/edit/:id', {
      templateUrl: 'views/partials/user/user-form',
      controller: 'EditUserCtrl'
    })
    .when('/user/delete/:id', {
      templateUrl: 'views/partials/user/user-delete',
      controller: 'DeleteUserCtrl'
    })
    .when('/user/login', {
      templateUrl: 'views/partials/user/user-login',
      controller: 'LoginCtrl'
    })
    .when('/beers', {
      templateUrl: 'views/partials/beer/beers',
      controller: 'ViewBeersCtrl'
    })
    .when('/beers/add', {
      templateUrl: 'views/partials/beer/beer-form',
      controller: 'AddBeerCtrl'
    })
    .when('/beers/edit/:id', {
      templateUrl: 'views/partials/beer/beer-form',
      controller: 'EditBeerCtrl'
    })
    .when('/beers/delete/:id', {
      templateUrl: 'views/partials/beer/beer-delete',
      controller: 'DeleteBeerCtrl'
    })
    .when('/beers/:id', {
      templateUrl: 'views/partials/beer/beer-info',
      controller: 'ViewBeerCtrl'
    })    
    .otherwise({
      redirectTo: '/'
    });
}]);