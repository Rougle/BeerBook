angular.module('BeerBook').controller('ViewBeersCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Beers = $resource('/api/beers');
    Beers.query(function(beers){
      $scope.beers = beers;
    })
}]);

angular.module('BeerBook').controller('AddBeerCtrl', ['$scope', '$resource', '$location', 'Upload', '$timeout',
  function($scope, $resource, $location, Upload, $timeout){

    var filename = ''; //beer picture filename

    $scope.save = function(){
      $scope.beer.filename = filename;
      var Beers = $resource('/api/beers');
      Beers.save($scope.beer, function(){
        $location.path('/beers');
      });
    }
    // This will upload pic
    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: '/api/images',
          data: {file: file},
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            filename = response.data.filename; //get file name so we can save it
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
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
      $scope.beer.imagePath = 'resources/images/beers/' + beer.img_name;
      console.log($scope.imagePath);
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
