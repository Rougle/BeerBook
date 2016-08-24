(function () {

  angular
    .module('beerBook')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', '$scope', '$translate', 'authentication'];
  function navigationCtrl($location, $scope, $translate, authentication) {
    
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    vm.isNotLoggedIn = !authentication.isLoggedIn();
    vm.currentLang = $translate.proposedLanguage();
    
    // User logs out
    vm.logout = function(){
      authentication.logout();
    };

    // Sets new lang
    vm.setLang = function(langKey){
      $translate.use(langKey)
    };


  }
})();