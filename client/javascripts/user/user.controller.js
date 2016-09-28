angular.module('beerBook').controller('ListUsersCtrl', ['$scope', '$resource', 'meanData',
  function($scope, $resource, meanData){
    
    meanData.getUsers()
      .success(function(data){
        $scope.users = data;
      })
      .error(function(e){
        console.log(e);
      });
}]);

angular.module('beerBook').controller('RegisterCtrl', ['$scope', '$location', 'authentication',
  function($scope, $location, authentication){
    $scope.save = function(){

      authentication
        .register($scope.user)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('/')
        })
    }
}]);

angular.module('beerBook').controller('ProfileCtrl', ['$scope', '$routeParams', '$route', 'authentication', 'meanData',
  function($scope, $routeParams, $route, authentication, meanData){
    
    $scope.user = {};

    meanData.getProfile()
      .success(function(data) {
        $scope.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

    $scope.save = function () {

      meanData.updateProfile($scope.user)
        .success(function(data){
          $route.reload();
        })
        .error(function(e){
          console.log(e);
        });
    };
}]);

angular.module('beerBook').controller('LoginCtrl', ['$scope', '$location', 'authentication',
  function($scope, $location, authentication){

    $scope.error;

    $scope.login = function(){
      
      authentication
        .login($scope.user)
        .error(function(err){
          $scope.error = "Incorrect username or password.";
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

