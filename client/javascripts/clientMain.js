var app = angular.module('BeerBook', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/home',
      controller: 'HomeCtrl',
      access: {restricted: false}
    })
    .when('/user/register', {
      templateUrl: 'views/partials/user/user-form',
      controller: 'RegisterUserCtrl',
      access: {restricted: false}
    })
    .when('/user/edit/:id', {
      templateUrl: 'views/partials/user/user-form',
      controller: 'EditUserCtrl',
      access: {restricted: false}
    })
    .when('/user/delete/:id', {
      templateUrl: 'views/partials/user/user-delete',
      controller: 'DeleteUserCtrl',
      access: {restricted: false}
    })
    .when('/auth/login', {
      templateUrl: 'views/partials/user/user-login',
      controller: 'LoginCtrl',
      access: {restricted: false}
    })
    .when('/auth/logout', {
      template: '<h1>Angular forced me to show you something ;_;</h1>',
      controller: 'LogoutCtrl',
      access: {restricted: false}
    })
    .when('/beers', {
      templateUrl: 'views/partials/beer/beers',
      controller: 'ViewBeersCtrl',
      access: {restricted: false}
    })
    .when('/beers/add', {
      templateUrl: 'views/partials/beer/beer-form',
      controller: 'AddBeerCtrl',
      access: {restricted: false}
    })
    .when('/beers/edit/:id', {
      templateUrl: 'views/partials/beer/beer-form',
      controller: 'EditBeerCtrl',
      access: {restricted: false}
    })
    .when('/beers/delete/:id', {
      templateUrl: 'views/partials/beer/beer-delete',
      controller: 'DeleteBeerCtrl',
      access: {restricted: false}
    })
    .when('/beers/:id', {
      templateUrl: 'views/partials/beer/beer-info',
      controller: 'ViewBeerCtrl',
      access: {restricted: false}
    })    
    .otherwise({
      redirectTo: '/'
    });
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.access.restricted && !AuthService.isLoggedIn()) {
        $location.path('/auth/login');
        $route.reload();
      }
  });
});