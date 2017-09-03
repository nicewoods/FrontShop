var ShopFront = artifacts.require("./ShopFront.sol");

contract ('ShopFront', function(accounts) {

  it ("Should add one new product into the stock", () => {
    
    var shopFront;

    return ShopFront.deployed().then((instance) => {
      shopFront = instance;
      return shopFront.setAdministrator(accounts[1]);
    }).then (() => {
        return shopFront.addNewProduct(1, 10, web3.toWei(0.1, "ether"), {from:accounts[1]})
      }).then (() => {
      return shopFront.products.call(1);  // Access mapping strucutre corresponding to key1
    }).then((v) => {
        assert.equal(v[0], web3.toWei(0.1, "ether"), "The product was not correctly inserted in the stock");
      });
  });

  it ("Should retrieve 1 unit of product from the stock", () => {
    
    var shopFront;
    return ShopFront.deployed().then((instance) => {
      shopFront = instance;
    }).then (() => {
        return shopFront.addNewProduct(2, 10, web3.toWei(0.5, "ether"), {from:accounts[1]})
    }).then (() => {
        return shopFront.buy(2, {from:accounts[2], value : web3.toWei(0.5, "ether")})
    }).then (() => {
      return shopFront.products.call(2);
    }).then((v) => {
        assert.equal(v[1], 9, "The stock after purchase is incorrect");
      });
  });
 
  it ("Should add 0.1 ether credit on the owner's balance", () => {
    
    var shopFront;
    var initialCredit, finalCredit;

    return ShopFront.deployed().then((instance) => {
      shopFront = instance;
      return shopFront.ownerMovements.call();
    }).then((r) => {
        initialCredit = r[0].toNumber();
        return shopFront.addCredit({from:accounts[0], value: web3.toWei(0.1, "ether") });
    }).then (() => {
      return shopFront.ownerMovements.call();
    }).then((r) => {
        finalCredit = r[0].toNumber();
        assert.equal(finalCredit, (initialCredit + web3.toWei(0.1, "ether")), "The owner's balance after addCredit is incorrect");
    });
  });

  it ("Should retrieve 0.1 ether credit on the owner's balance", () => {
    
    var shopFront;
    var initialDebit, finalDebit;

    return ShopFront.deployed().then((instance) => {
      shopFront = instance;
      return shopFront.ownerMovements.call();
    }).then((r) => {
        initialDebit = r[1].toNumber(); // Access struct  field 1 (debit)
        return shopFront.withdraw(web3.toWei(0.5, "ether") , {from:accounts[0]}); 
    }).then (() => {
      return shopFront.ownerMovements.call();
    }).then((r) => {
        finalDebit = r[1].toNumber();
        assert.equal(finalDebit, (initialDebit + web3.toWei(0.5, "ether")), "The owner's balance after addCredit is incorrect");
    });
  });
 
});

