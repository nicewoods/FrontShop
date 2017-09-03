pragma solidity ^0.4.2;

import "./Owned.sol";

contract Stoppable is Owned
{
    bool public isPaused;
 
    function Stoppable()
    {
        isPaused = false;
    }
    
    event LogSetPause(bool s);
    
    function setPause(bool s)
    OnlyForOwner
    {
        isPaused = s;
        LogSetPause(s);
    }
    
    modifier OnlyIfActive()
    {
        if (isPaused)
            throw;
        _;
    }
    
}