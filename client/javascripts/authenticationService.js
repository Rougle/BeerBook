angular.module('beerBook').factory('authenticationService',
  ['$http', '$window',
  function ($http, $window) {
    
    var saveToken = function (token) {
      $window.localStorage['beer-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['beer-token'];
    };

    logout = function() {
      $window.localStorage.removeItem('beer-token');
    };

    isLoggedIn = function(){
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }

    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          username : payload.username
        };
      }
      return null;
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      register : register,
      login : login
    };
  }
]);
