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
        
        require(value != 0 , "value 0 error");    
            // 이걸 해야, 감소 버튼 클릭 할 때, 오류가 안남 | 이걸 안 하면, 감소 되면 에러남
            // "value 0 error" 여기에서 걸렸다! 라는 걸 알게 됨. 
            // 조건문 통과가 안 되면 -> 가스비 지불 x , "value 0 error" 구문이 나옴 

        value -= 1;
    } 

    // 값 가져오기
    function getValue( ) public view returns (uint256) {
        
        return value;
    }
        // view : 상태 변수 변경하지 않고 읽기 전용!
}

