pragma solidity ^0.4.2;

import "./Stoppable.sol";
import "./Administrated.sol";

contract ShopFront is Stoppable,  Administrated
{
    struct ProductStruct {
        uint price;
        uint stock;
        uint soldQuantity;
    }

    struct OwnerMovementStruct {
        uint totalCredited;
        uint totalDebited;
    }
    
    uint public totalAmountSold; // What has been paid for products
    OwnerMovementStruct public ownerMovements;

    mapping(uint => ProductStruct) public products;
    
    event LogBuy(address, uint);
    event LogNewProduct(address sender, uint reference, uint stock, uint price);
    event LogPriceUpdate(address, uint, uint, uint) ;
    event LogAddStock(address, uint, uint, uint); 
    event LogRetrieval(address, uint);    
    event LogAddCredit(address, uint);    
    event LogAdminChanged(address oldAdministrator, address administrator);    

    function ShopFront(address administrator) 
    {
    }
    
    function buy(uint productReference) 
    payable 
    public
    OnlyIfActive
    returns (bool)
    {
        if ((msg.value < products[productReference].price) ||
            (products[productReference].stock == 0))
            throw;
            
        uint remainingAmount = msg.value - products[productReference].price;
        
        totalAmountSold += products[productReference].price;
        products[productReference].stock -= 1;
        products[productReference].soldQuantity += 1;
        
        if (remainingAmount != 0)
        {
            if (!msg.sender.send(remainingAmount))
                throw;
        }
        LogBuy (msg.sender, productReference);
        return true;
    }
    
    modifier OnlyIfProductRegistered(uint productReference) 
    {
        if (products[productReference].price == 0) // ie product already registered with a price
            throw;
        _;    
    }
    
    modifier OnlyIfNewProduct(uint productReference) 
    {
        if (products[productReference].price != 0) // ie product already registered with a price
            throw;
        _;    
    }

    function addNewProduct(uint productReference, uint stock, uint price) 
    OnlyForAdmin
    OnlyIfActive
    OnlyIfNewProduct(productReference)
    returns (bool)
    {
        products[productReference].price = price;
        products[productReference].stock = stock;
        LogNewProduct(msg.sender, productReference, stock, price);
        return true;
    }

    function addStock(uint productReference, uint stock) 
    OnlyIfProductRegistered(productReference)
    OnlyIfActive
    OnlyForAdmin
    {
        uint oldStock = products[productReference].stock;
        products[productReference].stock += stock;
        LogAddStock(msg.sender, productReference, oldStock, stock);
    }
    
    function updatePrice(uint productReference, uint price) 
    OnlyIfProductRegistered(productReference)
    OnlyIfActive
    OnlyForAdmin
    {
        uint oldPrice = products[productReference].price;
        products[productReference].price = price;
        LogPriceUpdate(msg.sender, productReference, oldPrice, price);
    }

    function withdraw(uint amount)
    OnlyForOwner
    OnlyIfActive
    returns (bool)
    {
        if (this.balance < amount) // condition might not be enough as gas will be needed to transfer
            throw;
        ownerMovements.totalDebited += amount;
        if (!owner.send(amount))
            throw;
        LogRetrieval(owner, amount);
        return true;
        
    }    

    function addCredit()
    OnlyForOwner payable
    OnlyIfActive
    {
        ownerMovements.totalCredited += msg.value;
        LogAddCredit(owner, msg.value);
    }   

    function getStockInformation(uint productReference) 
    OnlyIfProductRegistered(productReference)
    public returns (uint, uint, uint) 
    {
        return (products[productReference].price,
                products[productReference].stock, 
                products[productReference].soldQuantity);
    }

    function setAdministrator(address a)
    OnlyForOwner
    {
        address oldAdmin = administrator;
        administrator = a;
        LogAdminChanged(oldAdmin, a);
    }

}