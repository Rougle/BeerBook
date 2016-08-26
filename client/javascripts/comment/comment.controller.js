angular.module('beerBook').controller('ViewCommentsCtrl', ['$scope', '$resource', 
  function($scope, $resource){
    var Comments = $resource('/api/comments');
    Comments.query(function(comments){
      $scope.comments = comments;
    })
}]);

angular.module('beerBook').controller('AddCommentCtrl', ['$scope', '$resource', '$route', '$routeParams', 'authentication',
  function($scope, $resource, $route, $routeParams, authentication){

    $scope.isLoggedIn = authentication.isLoggedIn();
    if($scope.isLoggedIn == true){
      $scope.stars = ["1", "2", "3", "4", "5"];
      $scope.save = function(){
        var Comments = $resource('/api/comments');
        $scope.comment.beerId = $routeParams.id;
        $scope.comment.user = authentication.currentUser().username;
        Comments.save($scope.comment, function(){
          $route.reload();
        });
      }
    }
}]);

//Gets beer comments, ability to delete
angular.module('beerBook').controller('GetBeerCommentsCtrl', ['$scope', '$resource', '$routeParams', 'authentication',
  function($scope, $resource, $routeParams, authentication){
    var Comments = $resource('/api/comments/beer/:id');

    $scope.userIsAdmin = authentication.currentUserIsAdmin();

    Comments.query({ id: $routeParams.id }, function(comments){
      $scope.comments = comments;
    });

    $scope.delete = function(commentId){
      var Comment = $resource('/api/comments/comment/:id');
      Comment.delete( { id: commentId }, function(comment){
        Comments.query({ id: $routeParams.id }, function(comments){
          $scope.comments = comments;
        });
      });
    }
}]);
