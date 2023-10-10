// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 오픈 재플린은 솔리디티 기반의 스마트 컨트랙트를 개발할 때 사용하는 표준 프레임워크 
    // 재플린 쓰면 좋은 점 
        // 1) 안정성 
        // 2) 표준 토큰 규약 지키면서, 빠르게 개발 가능


// 오픈 재플린에서 제공하는 ERC20 인터페이스

interface IERC20 {

    // 토큰의 현재 총 발행량을 조회할 수 있는 함수 
    function totalSupply() external view returns(uint);
        // external VS public 비교
            // [공통점] public 과 비슷 (다 접근 가능)
            // [차이점] ⭐⭐⭐
                // - external 은 외부에서도 접근이 가능한 접근 제한자 
                // external 은 EOA 또는 CA 에서 호출이 가능 (외부 호출 가능)
                // 내부 접근 불가
                // 사용하는 이유는, public 보다, 가스비 저렴 
                // 저렴한 이유는, external 은 😥😥메모리 복사를 하지 않음. 내부에서 복사를 해서 메모리 값을 사용하느냐, VS CALL DATA 를 직접 읽어서 사용하느냐, 의 차이 ⭐⭐⭐

                // - PUBLIC 
                    // 내부 외부 모두 접근 가능 
                    // public 은 함수의 변수를 메모리에 복사해놓고 사용함 -> 메모리 용량을 사용

    // 전달받은 매개변수(계정 주소) 토큰의 잔액을 조회하는 함수 | ERC20 의 표준 규격에 이렇게 저장되어 있음! ⭐⭐⭐ | 오픈 재플린에 이미 거의 비슷하게 저장되어 있음
    function balanceOf(address account) external view returns(uint);

    // 계정에서, 토큰을, 다른 계정으로, 전달하는, 함수
    function transfer(address to, uint amount) external returns(bool);
        // address to : 누군가에게 보내는 것 
        // 금액

    // 소유권을 위임받은 토큰을 관리하는 공간 
    function allowance(address owner, address spender) external returns(uint);
        // 소유권을 누구에게 넘겼을 때, 그곳에서 관리한다. 

    // 매핑 객체 
        // {a사람의 주소 0x123123123124324 : 100 개 , 사람2의 주소 0x1l2k31l2kj3 : 200 개}
        // 위임받은 내용은 매핑 객체 안에 매핑 객체가 또 있음 
            // {a사람의 주소 0x123123123124324 : {c사람의 주소 0x1231231231221 : 50개}} | c 에게 50개 위임 

    // 소유권을 제3자에게 위임하는 함수
    function approve(address spender, uint amount) external returns(bool);
    
    // 소유권을 관리하는 토큰을 보내는 함수 
        // 위임받은 소유권이 있는지 확인하고 보내는 함수 
        function transferFrom(
            address spender, 
            address to, 
            uint amount
        ) external returns (bool);

    // 이벤트 함수를 작성해서, 함수에서 실행을 시키면, 이더스캔, 같은 사이트에서, 로그 확인을 할 수 있다 ⭐⭐⭐ 
        // 트랜잭션 내용에, 로그를 만들어서, 확인 할 수 있다. | 누가 누구에게 얼마 보냈는지 확인 가능 
        // Transfer 함수를 실행했을 때, 이벤트 함수를 실행해서 발생하는 이벤트를, 트랜잭션 로그에, 확인 해볼 수 있다. 
    event Transfer(address from, address to, uint value);

    // approve 함수가 실행됐을 때, 이벤트 함수도 실행을 해서, 로그를 확인 해볼 수 있다.
    event Approval(address owner, address spender, uint value);
        // 누가 누구에게, 얼마를 위임했는지, 에 대한 이벤트




}