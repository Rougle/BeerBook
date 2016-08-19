var app = angular.module('beerBook', ['ngResource', 'ngRoute', 'ngFileUpload']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'javascripts/user/user-list.html',
      controller: 'ListUsersCtrl'
    })
    .when('/user/register', {
      templateUrl: 'javascripts/user/user-form.html',
      controller: 'RegisterCtrl'
    })
    .when('/user/edit/:id', {
      templateUrl: 'javascripts/user/user-form.html',
      controller: 'EditUserCtrl'
    })
    .when('/user/delete/:id', {
      templateUrl: 'javascripts/user/user-delete.html',
      controller: 'DeleteUserCtrl'
    })
    .when('/user/login', {
      templateUrl: 'javascripts/user/user-login.html',
      controller: 'LoginCtrl'
    })
    .when('/beers', {
      templateUrl: 'javascripts/beer/beers.html',
      controller: 'ViewBeersCtrl'
    })
    .when('/beers/add', {
      templateUrl: 'javascripts/beer/beer-form.html',
      controller: 'AddBeerCtrl'
    })
    .when('/beers/edit/:id', {
      templateUrl: 'javascripts/beer/beer-form.html',
      controller: 'EditBeerCtrl'
    })
    .when('/beers/delete/:id', {
      templateUrl: 'javascripts/beer/beer-delete.html',
      controller: 'DeleteBeerCtrl'
    })
    .when('/beers/:id', {
      templateUrl: 'javascripts/beer/beer-info.html',
      controller: 'ViewBeerCtrl'
    })    
    .otherwise({
      redirectTo: '/'
    });
}]);