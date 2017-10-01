pragma solidity ^0.4.13;

contract SmartToken {
    mapping(address => uint) tokens;

    uint time = 0;


    event OnValueChanged(address indexed _from, uint _value);

    function depositToken(address recipient, uint value) returns (bool success) {
        tokens[recipient] += value;
        time = 5 * value;
        OnValueChanged(recipient, tokens[recipient]);
        return true;
    }

    function getTime() constant returns(uint nTime){
    	//nTime = time;
    	return time*1000;
    } 

    function getTokens(address recipient) constant returns (uint value) {
        return tokens[recipient];
    }
}