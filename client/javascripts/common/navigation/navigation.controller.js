(function () {

  angular
    .module('beerBook')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', '$scope', 'authenticationService'];
  function navigationCtrl($location, $scope, authenticationService) {
    var vm = this;

    vm.isLoggedIn = authenticationService.isLoggedIn();

    vm.currentUser = authenticationService.currentUser();

    vm.isNotLoggedIn = !authenticationService.isLoggedIn();

    vm.logout = function(){
      authenticationService.logout();
    }
  }

})();