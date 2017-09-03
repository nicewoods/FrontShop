var ShopFront = artifacts.require("./ShopFront.sol");
var Owned = artifacts.require("./Owned.sol");
var Administrated = artifacts.require("./Administrated.sol");
var Stoppable = artifacts.require("./Stoppable.sol");

module.exports = function(deployer) {
  deployer.deploy(ShopFront);
  deployer.deploy(Owned);
  deployer.deploy(Administrated);
  deployer.deploy(Stoppable);
};

