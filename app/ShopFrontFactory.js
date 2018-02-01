const Web3            = require("web3");
const Promise         = require("bluebird");
const truffleContract = require("truffle-contract");
const shopFrontJson   = require("../build/contracts/ShopFront.json");

export const shopFrontFactory = angular.module('ShopFrontFactoryModule', []).factory('shopFrontFactory', ['$q', ($q) => {
  
  var factory = { 
    products: [],
    accounts: [],
    administrator: "",
    owner: ""
  };

  var web3;
  var ShopFrontContract;
  var shopFront;
  var initialised = false;

  factory.init = (()=> {

    // Supports Mist, and other wallets that provide 'web3'.
    if (typeof web3 !== 'undefined') {
        // Use the Mist/wallet/Metamask provider.
        factory.web3 = new Web3(web3.currentProvider);
    } 
    else {
        // Your preferred fallback.
        factory.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
    }

    Promise.promisifyAll(factory.web3.eth, { suffix: "Promise" });
    Promise.promisifyAll(factory.web3.version, { suffix: "Promise" });

    factory.ShopFrontContract = truffleContract(shopFrontJson);
    factory.ShopFrontContract.setProvider(factory.web3.currentProvider);

    factory.ShopFrontContract.deployed().then((instance) => {
      factory.shopFront = instance;
      var newProductWatcher = instance.LogNewProduct({}, {fromBlock:0})
      .watch((err, newProduct) => {
        if (err){
          console.log("Issue watching for new products");
        }
        else {
          factory.products.push({
            "productId": newProduct.args.reference.toString(10), 
            "productPrice": newProduct.args.price.toString(10), 
            "productStock" :newProduct.args.stock.toString(10)
          });
        }
      });
      var newAdminWatcher = instance.LogAdminChanged({}, {fromBlock:0})
      .watch((err, change)=>{
        if (err){
          console.log("Issue watching for new products");
        }
        else {
          factory.administrator = change.args.administrator.toString(10);
        }
      });
     }).then(() => {
        return factory.shopFront.administrator.call();
    }).then((a) => {
      factory.administrator = a;
      return factory.shopFront.owner.call();
    }).then((o) => {
      factory.owner = o;
    });

    factory.web3.eth.getAccounts((err, res) => {
      if (err) {
        console.log("There was an issue getting the list of accounts");
      }
      else {
        factory.accounts = res;
      }
    });
  })

  factory.addProduct = ((tmpProductId, tmpProductStock, tmpProductPrice) => {
        factory.shopFront.addNewProduct(tmpProductId, tmpProductStock, tmpProductPrice, {from: factory.administrator, gas:900000}) // TODO: user access management
        .then((trans) =>{
          console.log("Transaction Receipt: ", trans);
        });
      });

  factory.setAdministrator = ((admin) => {
      factory.shopFront.setAdministrator(admin, {from:factory.accounts[0]}).then((err, tx) => {
        if (err)
        {
          console.log("there was an issue changing the administrator")
        }
      });
  })

  return factory;
}]);
