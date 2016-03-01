var app = angular.module('GuitarShop', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/user/register', {
      templateUrl: 'views/partials/user-form.html',
      controller: 'RegisterUserCtrl'
    })
    .when('/user/edit/:id', {
      templateUrl: 'views/partials/user-form.html',
      controller: 'EditUserCtrl'
    })
    .when('/user/delete/:id', {
      templateUrl: 'views/partials/user-delete.html',
      controller: 'DeleteUserCtrl',
      access: {restricted: true}
    })
    .when('/user/login', {
      templateUrl: 'views/partials/login-form.html',
      controller: 'LoginCtrl'
    })
    .when('/user/logout', {
      controller: 'LogoutCtrl',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// THIS HAS ERRORS
app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});