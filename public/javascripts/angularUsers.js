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
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Users = $resource('/api/users');
    Users.query(function(users){
      $scope.users = users
    })
}]);

app.controller('AddUserCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){
    $scope.save = function(){
      var Users = $resource('/api/users');
      Users.save($scope.user, function(){
        $location.path('/');
      });
    }
}]);

app.controller('EditUserCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Users = $resource('/api/users/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
    });
    
    Users.get({ id: $routeParams.id }, function(user){
      $scope.user = user;
    });

    $scope.save = function(){
      Users.update($scope.user, function(){
        $location.path('/');
      });
    }
}]);

app.controller('DeleteUserCtrl', ['$scope', '$resource', '$location','$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Users = $resource('/api/users/:id');

    Users.get({ id: $routeParams.id }, function(user){
      $scope.user = user;
    });

    $scope.delete = function(){
      Users.delete( { id: $routeParams.id }, function(user){
        $location.path('/');
      });
    }
}]);