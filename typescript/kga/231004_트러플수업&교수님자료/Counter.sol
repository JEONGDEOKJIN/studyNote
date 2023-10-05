// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Counter {
    uint256 value;      
        // 상태 변수 | unsigned int, 부등호가 없는 정수, 마이너스로 떨어질 수 없는 정수 
        // 바이트를 낭비하지 않기 위해서 이렇게 작성 

    address sender = 0x0000000000000000000000000000000000050000;    // 자리수는 40개 
        // 지값의 주소, ca 를 담을 수 있는 자료의 형태가 address 임

    constructor() {}

    function setValue( uint256 _value ) public {
        value = _value;
            // 가스비 발생
            // 원격 프로시저 호출에서 send 로 보냄 
    }
    // public : 어디에서나 접근할 수 있게 됨.


    function getValue() public view returns(uint256) {
        return value;
    }

    // view : 상태변수 변경하지 않고, 읽기 전용! 
    
}