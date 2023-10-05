// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./Counter.sol";


contract Counter2 {
    uint256 value;      
        // 상태 변수 | unsigned int, 부등호가 없는 정수, 마이너스로 떨어질 수 없는 정수 
        // 바이트를 낭비하지 않기 위해서 이렇게 작성 

    Counter counter;    // Counter 컨트랙트의 구조를 가지고 있는, counter 상태 변수를 선언

    constructor() {
        // Counter 인스턴스를 하나 생성
        counter = new Counter();
            // Counter counter; 에서 가져와서 인스턴스로 쓸 수 있음 
            // 이때, public 인 메소드만 사용할 수 있음. 
    }

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
    


    function getValue2() public view returns(unit256) {
        return counter.getValue();
    } 
    // 이렇게 하면, 하나의 파일에서 한 걸 가져와서 쓸 수 있음❓❓❓ 

}