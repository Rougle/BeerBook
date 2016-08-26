angular.module('beerBook').controller('HomeCtrl', ['$scope', '$resource',
  function($scope, $resource){

    $scope.images=[
      {path: "resources/images/layout/slider1_s.jpg"},
      {path: "resources/images/layout/slider2_s.jpg"},
      {path: "resources/images/layout/slider3_s.jpg"}
    ]
}]);
