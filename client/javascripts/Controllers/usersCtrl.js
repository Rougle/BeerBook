angular.module('GuitarShop').controller('HomeCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Users = $resource('/api/users');
    Users.query(function(users){
      $scope.users = users;
    })
}]);

angular.module('GuitarShop').controller('RegisterUserCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){
    $scope.save = function(){
      var Users = $resource('/api/users');
      Users.save($scope.user, function(){
        $location.path('/');
      });
    }
}]);

angular.module('GuitarShop').controller('EditUserCtrl', ['$scope', '$resource', '$location', '$routeParams',
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

angular.module('GuitarShop').controller('DeleteUserCtrl', ['$scope', '$resource', '$location','$routeParams',
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


angular.module('GuitarShop').controller('LoginCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.user.username, $scope.user.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

angular.module('GuitarShop').controller('LogoutCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);
/*
angular.module('GuitarShop').controller('registerUserCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.user.username, $scope.user.password, $scope.user.role)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
*/