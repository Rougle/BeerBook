(function() {

  angular
    .module('beerBook')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    //Get userlist
    var getUsers = function () {
      return $http.get('/api/users', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    //Get users profile
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getUsers : getUsers,
      getProfile : getProfile
    };
  }

})();