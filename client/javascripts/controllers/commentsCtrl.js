angular.module('BeerBook').controller('ViewCommentsCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Comments = $resource('/api/comments');
    Comments.query(function(comments){
      $scope.comments = comments;
    })
}]);

angular.module('BeerBook').controller('AddCommentCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){

    $scope.stars = ["1", "2", "3", "4", "5"];

    $scope.save = function(){
      var Comments = $resource('/api/comments');
      Comments.save($scope.comment, function(){
        $location.path('/beers');
      });
    }
}]);