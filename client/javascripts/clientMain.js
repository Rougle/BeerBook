var app = angular.module('GuitarShop', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/partials/home.html',
      controller: 'HomeCtrl',
      access: {restricted: false}
    })
    .when('/user/register', {
      templateUrl: 'views/partials/user-form.html',
      controller: 'RegisterUserCtrl',
      access: {restricted: false}
    })
    .when('/user/edit/:id', {
      templateUrl: 'views/partials/user-form.html',
      controller: 'EditUserCtrl',
      access: {restricted: true}
    })
    .when('/user/delete/:id', {
      templateUrl: 'views/partials/user-delete.html',
      controller: 'DeleteUserCtrl',
      access: {restricted: true}
    })
    .when('/auth/login', {
      templateUrl: 'views/partials/login-form.html',
      controller: 'LoginCtrl',
      access: {restricted: false}
    })
    .when('/auth/logout', {
      controller: 'LogoutCtrl',
      access: {restricted: true}
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