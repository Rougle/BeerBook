angular.module('beerBook').controller('ListUsersCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Users = $resource('/api/users');
    Users.query(function(users){
      $scope.users = users;
    })
}]);

angular.module('beerBook').controller('RegisterCtrl', ['$scope', '$location', 'authenticationService',
  function($scope, $location, authenticationService){
    $scope.save = function(){

      authenticationService
        .register($scope.user)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('/')
        })
    }
}]);

angular.module('beerBook').controller('LoginCtrl', ['$scope', '$location', 'authenticationService',
  function($scope, $location, authenticationService){

    $scope.login = function(){
      
      authenticationService
        .login($scope.user)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('/beers')
        })
    }
}]);



angular.module('beerBook').controller('EditUserCtrl', ['$scope', '$resource', '$location', '$routeParams',
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

angular.module('beerBook').controller('DeleteUserCtrl', ['$scope', '$resource', '$location','$routeParams',
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

