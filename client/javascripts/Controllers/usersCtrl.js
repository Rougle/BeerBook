angular.module('BeerBook').controller('HomeCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Users = $resource('/api/users');
    Users.query(function(users){
      $scope.users = users;
    })
}]);

angular.module('BeerBook').controller('RegisterUserCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){
    $scope.save = function(){
      var Users = $resource('/api/users');
      Users.save($scope.user, function(){
        $location.path('/');
      });
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

