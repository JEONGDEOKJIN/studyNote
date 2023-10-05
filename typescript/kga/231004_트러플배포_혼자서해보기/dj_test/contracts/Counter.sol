// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    // 상태 변수 
    uint256 private value;
        // [uint256]
            // 의미 : unsigned int, 부등호가 없는 정수, 마이너스로 떨어질 수 없는 정수
            // 필요성 : 바이트를 낭비하지 않기 위해 작성

    // 누르면 1 증가 
    function increment() public {
        value += 1;
    }

    // 누르면 1 감소 
    function decrement() public {
        value -= 1;
    } 

    // 값 가져오기
    function getValue( ) public view returns (uint256) {
        return value;
    }
        // view : 상태 변수 변경하지 않고 읽기 전용!

    // 값 셋팅 
    function setValue(uint256 _value) public {
        value = _value;
    }
    
}

// 왜 여기에는 1) sender 와 2) consturctor 3) setValue 가 없지?
// address sender = 0x0123456789012345678901234567890123456789;
// constructor() {}