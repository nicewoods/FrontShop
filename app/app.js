const angular = require("angular");
const Web3 = require("web3");
const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");

require("file-loader?name=./index.html!./index.html");

// Not to forget our built contract
const shopFrontJson = require("../build/contracts/ShopFront.json");

// Supports Mist, and other wallets that provide 'web3'.
if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
}

Promise.promisifyAll(web3.eth, { suffix: "Promise" });
Promise.promisifyAll(web3.version, { suffix: "Promise" });

const ShopFront = truffleContract(shopFrontJson);
ShopFront.setProvider(web3.currentProvider);
ShopFront.setNetwork('6272');

var app = angular.module('FrontShop', []);

app.config(function( $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller("ShopfrontCtrl", 

  [ '$scope', '$location', '$http', '$q', '$window', '$timeout',   
  
  function($scope, $location, $http, $q, $window, $timeout) {

    $scope.NewProductLog = [];
    var shopFront;

    ShopFront.deployed().then((instance) => {
      shopFront = instance;
      return shopFront.administrator.call();
    }).then((a) => {
      $scope.administrator = a;
      return shopFront.owner.call();
    }).then((o) => {
      $scope.owner = o;
      $scope.$apply();
    });



}]);

/*  $scope.contract.setAdministrator(accounts[1]).then(txHash => {
        $scope.Status("Transaction on the way  " + txHash);
        // Now we wait for the tx to be mined.
        const tryAgain = () => web3.eth.getTransactionReceiptPromise(txHash)
            .then(receipt => receipt !== null ?
                receipt :
                // Let's hope we don't hit the max call stack depth
                Promise.delay(500).then(tryAgain));
        return tryAgain();
        })
        .then(receipt => {
            if (receipt.logs.length == 0) {
                console.error("Empty logs");
                console.error(receipt);
                $("#status").html("There was an error in the tx execution");
            } else {
                // Format the event nicely.
                console.log(deployed.Transfer().formatter(receipt.logs[0]).args);
                $("#status").html("Transfer executed");
            }
            // Make sure we update the UI.
            return deployed.getBalance.call(window.account);
        })
        .then(balance => $("#balance").html(balance.toString(10)))
        .catch(e => {
            $("#status").html(e.toString());
            console.error(e);
        });
};*/



