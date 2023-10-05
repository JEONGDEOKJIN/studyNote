// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    // 상태 변수 
    uint256 private value;
        // [uint256]
            // 의미 : unsigned int, 부등호가 없는 정수, 마이너스로 떨어질 수 없는 정수
            // 필요성 : 바이트를 낭비하지 않기 위해 작성

    // 지갑의 주소
    address sender = 0x0123456789012345678901234567890123456789;
        // address 타입 
            // [특징] ca 를 담을 수 있음. -> so, 40자리가 와야 함. 
            // [특징] 지갑주소를 만들 때 봤음 
            // [특징] address 타입으로 변수를 만들 경우, 내부 인스턴스가 있어서, 내부 메소드를 사용할 수 있음.  
                // ex) sender.balance : 해당 주소의 이더 잔액 조회 가능 
                // ex) sender.transfer("보낼금액") : 이 지갑에, 얼마를 전송해~ 라는 의미 | 실패시 '예외' 를 발생시킴 
                // ex) sender.send("보낼금액") : 이 지갑에, 얼마를 전송해~ 라는 의미 | 성공시 true, 실패시 false

    constructor() {}

    function setValue( uint256 _value ) public {
        value = _value;
    }
        /*  [해석]
            - 내용 변경이니까 -> 가스비 발생 
            - '원격 프로시저 호출' 에서 send 로 보낸다. 
                - 스마트 컨트랙트 함수를 호출할 때, 이더리움 네트워크에 트랜잭션을 전송하려면, send 나 sendTransaction 메소드를 사용 
                - 여기에서 send 는 이더리움 네트워크에, 트랜잭션을 전송하는 메소드로 사용된건가? 
                - 그러면, 이 setValue 를 send 로 보내주는 과정이 있는 건가? ❓❓❓❓❓❓ 
            - public 접근자 : 어디서나 접근 가능
        */

    function getValue( ) public view returns (uint256) {
        return value;
    }
        // view : 상태 변수 변경하지 않고 읽기 전용! 

}