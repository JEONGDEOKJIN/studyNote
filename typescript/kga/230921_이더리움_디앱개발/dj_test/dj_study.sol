// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
    // 0.8.0 이상의 solidity 컴파일러

// 새로운 스마트 컨트랙트 선언
contract Counter {
    // unit 256 타입의 '상태변수' 인 value 를 선언
    uint256 value;
            // [해석]
            // uint256 = 'unsigned integar(음수가 될 수 없는 정수) 가 2의 256 승 까지 들어올 수 있는 데이터' 라는 의미
            // ex) 2의 256 승이 된다. 

            // '상태변수' 의 의미 
                // 컨트랙트의 저장 공간에 '영구적' 으로 저장되는 변수를 의미. 
                // 이와 반대로, 지역 변수는, 함수 내에서만 사용 되고, 실행이 끝나면 사라진다. 

            // 종합하면, 2의 256 승의 크기를 담을 수 있는 value 는, 컨트랙트에 영구 저장 되는 변수다. 


    // 생성자 함수
    constructor(){}

    // setter 
    function setValue (uint256 _value) public { 
        // value 의 상태가 변경된다 -> 그러면, '가스비' 가 발생한다. 
        value = _value;
    }

    // getter 
    function getValue() public view returns(uint256){
        // view : 조회하기 위한 코드를 작성할 때 

        return value;
    }

}
