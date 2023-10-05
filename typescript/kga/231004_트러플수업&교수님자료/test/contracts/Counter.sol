// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;    // config 에서 13 버전 쓴다고 적었기 때문

contract Counter{
    uint256 private value;

    function setValue(uint256 _value) public {
        value = _value;
    }

    // 누르면 1 증가 | Counter 가 시작 과 끝 
    function increment() public {
        value += 1;
    }

    // 누르면 1 감소 
    function decrement() public {
        value -= 1;
    }



    function getValue() public view returns(uint256) {
        return value;
    }
}