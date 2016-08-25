(function () {

  angular.module('beerBook', ['ngRoute', 'ngResource', 'ngFileUpload', 'pascalprecht.translate']);

  // Configure routes
  function config ($routeProvider, $locationProvider, $translateProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'javascripts/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/user/register', {
        templateUrl: 'javascripts/user/user-register.html',
        controller: 'RegisterCtrl'
      })
      .when('/users', {
        templateUrl: 'javascripts/user/user-list.html',
        controller: 'ListUsersCtrl'
      })
      .when('/user/edit/:id', {
        templateUrl: 'javascripts/user/user-form.html',
        controller: 'EditUserCtrl'
      })
      .when('/user/profile', {
        templateUrl: 'javascripts/user/user-profile.html',
        controller: 'ProfileCtrl'
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
        templateUrl: 'javascripts/beer/beer-list.html',
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

    $translateProvider.useStaticFilesLoader({
      prefix: '/locales/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('fi');
    $translateProvider.useSanitizeValueStrategy('escape');
  }


  // Limit access of some routes
  function run ($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      //Routes reserved for admin only
      if (($location.path() === '/beers/add' |
          $location.path() === '/users/list' |
          $location.path() === '/user/delete/:id' |  
          $location.path() === '/beers/edit/:id' |  
          $location.path() === '/beers/delete/:id') & !authentication.currentUserIsAdmin()){
        $location.path('/beers');
      } 
    });
  }

  angular
    .module('beerBook')
    .config(['$routeProvider', '$locationProvider', '$translateProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
