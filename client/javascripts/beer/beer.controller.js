angular.module('beerBook').controller('ViewBeersCtrl', ['$scope', '$resource', 'authentication',
  function($scope, $resource, authentication){
    var Beers = $resource('/api/beers');
    
    $scope.userIsAdmin = authentication.currentUserIsAdmin();

    Beers.query(function(beers){
      $scope.beers = beers;
    })
}]);

angular.module('beerBook').controller('AddBeerCtrl', ['$scope', '$resource', '$location', 'Upload', '$timeout',
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

angular.module('beerBook').controller('EditBeerCtrl', ['$scope', '$resource', '$location', '$routeParams',
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

angular.module('beerBook').controller('ViewBeerCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Beers = $resource('/api/beers/:id');
    
    Beers.get({ id: $routeParams.id }, function(beer){
      $scope.beer = beer;
      $scope.beer.imagePath = 'resources/images/beers/' + beer.img_name;
    });
}]);

angular.module('beerBook').controller('DeleteBeerCtrl', ['$scope', '$resource', '$location','$routeParams',
  function($scope, $resource, $location, $routeParams){

    var Beers = $resource('/api/beers/:id');

    Beers.get({ id: $routeParams.id }, function(beer){
      $scope.beer = beer;
    });

    $scope.delete = function(){
      //Delete image
      var img_name = $scope.beer.img_name;
      var Image = $resource('/api/images');
      Image.delete({imgName:img_name}, function(res){});

      //Delete all beer comments
      var Comments = $resource('/api/comments/beer/:beerId')
      Comments.delete({ beerId: $routeParams.id }, function(res){

      });
      //Delete beer
      Beers.delete( { id: $routeParams.id }, function(beer){
        $location.path('/beers');
      });
    }

}]);
