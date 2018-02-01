export const shopFrontMainCtrl = angular.module('MainCtrlModule', []).controller("shopFrontMainCtrl", 
[ '$scope', '$location', '$http', '$q', '$window', '$timeout', 'shopFrontFactory',
  ($scope, $location, $http, $q, $window, $timeout, shopFrontFactory) => {

	$scope.newProductLog = shopFrontFactory.products;
  }]);

