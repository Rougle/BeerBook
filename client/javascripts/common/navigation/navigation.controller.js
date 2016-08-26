(function () {

  angular
    .module('beerBook')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', '$scope', '$route', '$translate', 'authentication'];
  function navigationCtrl($location, $scope, $route, $translate, authentication) {
    
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    vm.userIsAdmin = authentication.currentUserIsAdmin();
    if(authentication.isLoggedIn()){
      vm.username = authentication.currentUser().username;
    }
    
    if($translate.proposedLanguage() == "en"){
      vm.currentLangIsEn = true;
    }
    else{
      vm.currentLangIsEn = false;
    }

    // User logs out
    vm.logout = function(){
      authentication.logout();
      $route.reload();
    };

    // Sets new lang
    vm.setLang = function(langKey){
      $translate.use(langKey);
      if(langKey === 'en'){
        vm.currentLangIsEn = true;
      }
      else{
        vm.currentLangIsEn = false;
      }
    };
  }
})();