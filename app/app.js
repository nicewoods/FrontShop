require("file-loader?name=./index.html!./index.html");

const $ = require("jquery");

import angular from "angular"
import ngRoute from "angular-route"

import { shopFrontAdminCtrl } from "./controllers/AdminController.js"
import { shopFrontMainCtrl } from "./controllers/MainController.js"
import { shopFrontManageAccountCtrl } from "./controllers/ManageAccountController.js"
import { shopFrontFactory } from "./ShopFrontFactory.js"

var app = angular.module("ShopFrontApp", ["ngRoute", "AdminCtrlModule", "MainCtrlModule", "ManageAccountCtrlModule", "ShopFrontFactoryModule"]);

// Not to forget our built contract


/*
app.run(['shopFrontFactory', function (shopFrontFactory) {
  shopFrontFactory.init();
}]);
*/
app.config(['$routeProvider', '$locationProvider',  ($routeProvider, $locationProvider)=>{
  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controlleur: 'shopFrontMainCtrl',
  })
  .when('/admin', 
    {
      templateUrl:'partials/admin.html',
      controlleur: 'shopFrontAdminCtrl'
    })
  .when('/buy', 
    {
      templateUrl:'partials/buy.html',
    })
  .when('/manageAccount', 
    {
      templateUrl:'partials/manageAccount.html',
      controlleur: 'shopFrontManageAccountCtrl'
    }) 
  .otherwise({redirectTo : '/'});
}
]);

angular.element(document).ready(function () {
    shopFrontFactory.init();
});
