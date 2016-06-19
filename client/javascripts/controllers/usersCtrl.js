angular.module('BeerBook').controller('HomeCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Users = $resource('/api/users');
    Users.query(function(users){
      $scope.users = users;
    })
}]);

angular.module('BeerBook').controller('RegisterCtrl', ['$scope', '$location', 'authenticationService',
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

angular.module('BeerBook').controller('LoginCtrl', ['$scope', '$location', 'authenticationService',
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



angular.module('BeerBook').controller('EditUserCtrl', ['$scope', '$resource', '$location', '$routeParams',
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

angular.module('BeerBook').controller('DeleteUserCtrl', ['$scope', '$resource', '$location','$routeParams',
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

