export const shopFrontManageAccountCtrl = angular.module('ManageAccountCtrlModule', []).controller("shopFrontManageAccountCtrl",
([ '$scope', '$location', '$http', '$q', '$window', '$timeout', 'shopFrontFactory',
  ($scope, $location, $http, $q, $window, $timeout, shopFrontFactory) => {

  	$scope.accounts = shopFrontFactory.accounts;

  	$scope.adminChanged = (() => {
    	shopFrontFactory.setAdministrator($scope.administrator);
    });
}]));
