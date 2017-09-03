pragma solidity ^0.4.0;

contract Administrated 
{
    address public administrator; // the admin contract key is linked to several real users on the client side, where the audit is made at the application level
    
    function Administrated ()
    {
    }

    modifier OnlyForAdmin ()
    {
        if (msg.sender != administrator)
        throw;
        _;
    }
}