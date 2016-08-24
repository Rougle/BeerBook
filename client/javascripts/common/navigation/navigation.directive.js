(function () {

  angular
    .module('beerBook')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/javascripts/common/navigation/navigation.html',
      controller: 'navigationCtrl as vm'
    };
  }

})();