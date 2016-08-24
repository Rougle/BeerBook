(function() {

  angular
    .module('beerBook')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getUsers = function () {
      return $http.get('/api/users', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getUsers : getUsers
    };
  }

})();