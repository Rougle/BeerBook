angular.module('BeerBook').controller('ViewBeersCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Beers = $resource('/api/beers');
    Beers.query(function(beers){
      $scope.beers = beers;
    })
}]);

angular.module('BeerBook').controller('AddBeerCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){
    $scope.save = function(){
      var Beers = $resource('/api/beers');
      Beers.save($scope.beer, function(){
        $location.path('/beers');
      });
    }
}]);

angular.module('BeerBook').controller('EditBeerCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Beers = $resource('/api/beers/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
    });
    
    Beers.get({ id: $routeParams.id }, function(beer){
      $scope.beer = beer;
    });

    $scope.save = function(){
      Beers.update($scope.beer, function(){
        $location.path('/beers');
      });
    }
}]);

angular.module('BeerBook').controller('ViewBeerCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Beers = $resource('/api/beers/:id');
    
    Beers.get({ id: $routeParams.id }, function(beer){
      $scope.beer = beer;
    });
}]);

angular.module('BeerBook').controller('DeleteBeerCtrl', ['$scope', '$resource', '$location','$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Beers = $resource('/api/beers/:id');

    Beers.get({ id: $routeParams.id }, function(beer){
      $scope.beer = beer;
    });

    $scope.delete = function(){
      Beers.delete( { id: $routeParams.id }, function(beer){
        $location.path('/beers');
      });
    }
}]);
