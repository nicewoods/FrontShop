export const shopFrontAdminCtrl = angular.module('AdminCtrlModule', []).controller("shopFrontAdminCtrl", 
 [ '$scope', '$location', '$http', '$q', '$window', '$timeout', "shopFrontFactory", 
  ($scope, $location, $http, $q, $window, $timeout, shopFrontFactory) =>{

    $scope.products = shopFrontFactory.products;
    $scope.owner = shopFrontFactory.owner;
    $scope.administrator = shopFrontFactory.administrator;

    $scope.addProduct = (()=>{
      
      var tmpProductId = parseInt($scope.newProductId);
      var tmpProductStock = parseInt($scope.newProductStock);
      var tmpProductPrice = parseInt($scope.newProductPrice);
      var tmpAdminAdress = $scope.administrator.toString();

      $scope.newProductId = "";
      $scope.newProductStock = "";
      $scope.newProductPrice = "";

      shopFrontFactory.addProduct(tmpProductId, tmpProductStock, tmpProductPrice);

    });
  }
]);
