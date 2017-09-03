pragma solidity ^0.4.2;

contract Owned 
{
    address public owner;
    
    function Owned()
    {
        owner = msg.sender;
    }
    
    event LogChangeOwner (address, address);

    modifier OnlyForOwner ()
    {
        if (msg.sender != owner)
        throw;
        _;
    }
    
    function ChangeOwner  (address newOwner)
    OnlyForOwner
    returns (bool)
    {
        address formerOwner = owner;
        owner = newOwner;
        LogChangeOwner (formerOwner, owner);
    }
    
}