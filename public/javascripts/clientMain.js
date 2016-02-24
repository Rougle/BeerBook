var app = angular.module('GuitarShop', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/user/add', {
      templateUrl: 'partials/user-form.html',
      controller: 'AddUserCtrl'
    })
    .when('/user/edit/:id', {
      templateUrl: 'partials/user-form.html',
      controller: 'EditUserCtrl'
    })
    .when('/user/delete/:id', {
      templateUrl: 'partials/user-delete.html',
      controller: 'DeleteUserCtrl'
    })
    .when('/user/login', {
      templateUrl: 'partials/login-form.html',
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

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});