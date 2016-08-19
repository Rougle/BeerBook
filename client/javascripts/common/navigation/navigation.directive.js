(function () {

  angular
    .module('beerBook')
    .directive('navigation', navigation);

  function navigation () {
    return {
      templateUrl: '/javascripts/common/navigation/navigation.html',
      controller: 'navigationCtrl as vm'
    };
  }

})();