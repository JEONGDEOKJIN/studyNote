// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import './IERC20.sol';

// implements 처럼 js class 에서 인터페이스 상속을 한 것 처럼, 여기에서도 상속! 을 함 
// 솔리디티는 'is 구문' 을 사용해서 상속

contract ERC20 is IERC20{
    // ERC20 토큰의 규약
    
    // 토큰의 이름을 담을 상태변수, 풀 네임 | 이더리움 이겠지 |  
    string public name;

    // 토큰의 심볼 | 토큰의 단위를 표현 ㄴ| ETH 등 
    string public symbol;

    // 토큰의 소수점 자리 | 소수점을 얼마나 할지 | 
        // 기본 소수점 자리는 18 단위 | 이더리움 단위와 동일 
        uint8 public decimals = 18;     // 토큰의 단위를 10의 18승 해야 하니까 상태 변수로 빼놓는 것

    // 토큰의 총 발행량 | 이미 선언이 되어 있는 함수(interface 😥😥 함수는 virtual 로 되어 있음 😥😥)
    // 기본 선언하면, virtual 함수임 
    // 상속 받은 함수를 새로 정의해서 사용 (덮어쓰기)
    uint public override totalSupply;

    // 컨트랙트 배포자 | 현재 버전엔 상속 받아서 사용중 | 현재 ERC20 에 작성할 필요가 없어 졌음. 왜냐면 업데이트 하면서 빼버렸음
    address private owner;


    // 생성자 함수 | 컨트랙트 배포자가 실행을 할 함수
    constructor(string memory _name , string memory _symbol, uint256 _amount ) {
        // 어떤 이름의 토큰을 발행하고 있고, 어떤 단위의 심볼을 사용할지 
        // 처음 총 발행량을 얼마나 설정할지, 에 대한 내용을 constructor 에 적는다. 

        // SOONTOKEN 
        owner = msg.sender;     // 컨트랙트 배포자를 onwer 에 넣어준다. 
        name = _name;       // SOONTOKEN 이면 이게 _name 으로 들어간다.
        symbol = _symbol;    // STK 라는 단위

        // 토큰 발행할 때, 사용할, 메서드 작성 
            // _amount * (10 ** uint256(decimals))
            // 발행할 단위를 넣는다. 

        // 최초로 있는 개수❓❓❓
        mint (_amount * (10 ** uint256(decimals)));

    }
        // ERC20 총 개수, 심볼 등 
    // string memory : '메모리 영역에서 사용되고 👉 해제 된다!' 라는 의미를 갖는 구문
        // uint 는 안 쓰는데, 이건 쓰는 이유는, uint 는 uint256 이렇게, 사용하는 바이트 양이 정해져 있음. 
        // 그런데, 문자열은 가변적임. 얼마나 쓸지 모름 👉 이럴 때는 memory 를 다 붙인다! ⭐⭐⭐ 

    // ⭐⭐ 발행하면, 어디에 담기냐 -> mapping 객체에 담김 

    // balance : 토큰을, 누가, 얼만큼, 가지고 있는지의 내용을 담을 객체 
    mapping(address => uint) public balances; 
        // 어떤 key :  address, value : unit 를 갖고 있을 것 인가 
        /* 
            balance 라는 변수 명 안에 객체가 들어감 | 누군가가 갖고 있는지를 갖고 있음 | 
            balance = {
                0x123123123123123123123(지갑주소 40자리) : 100개, 
                0x127777123123123123123(지갑주소 40자리) : 100개, 
                0x127777123166666777777(지갑주소 40자리) : 200개, 
            }
                - 0x123123123123123123123 이 사람을 조회하면 -> 100개 갖고 있다는게 나옴 
                - UTXO 랑 비슷 ⭐⭐⭐⭐⭐
        */

        // '토큰의 권한'을 '위임' 받은 내용이 들어가 있는 객체
        mapping(address => mapping(address => uint)) public override allowance;
        /*
            balance = {
                0x123123123123123123123(지갑주소 40자리) : {
                    0x1231231231231231211777773 : 50개 (이 사람이 100개 중 50개 받음)  
                },

                0x127777123123123123123(지갑주소 40자리) : {
                    0x1231231231231231211777773 : 70개 (이 사람이 100개 중 70개 받음)
                }, 
                0x127777123166666777777(지갑주소 40자리) : {
                    0x1231231231231231211777773 : 75개 
                }, 
            }
        */

        // 잔액을 조회하는 함수 
        function balanceOf(address account) external view override returns(uint) {
            return balances[account];   // 지갑주소를 넣으면, balance 가 몇개 인지를 반환 

        } 
        
        // 다른 지갑으로 잔액을 전달하는 함수 | a 가 b 에게, 토큰, 을 보냈을 때, 작성하는 함수 
        function transfer(address to, uint amount) external override returns(bool){
            // 누가 전달하는지 | 전달하는 사람의 잔액이 감소해야 한다 | 첫번째! 
            balances[msg.sender] -= amount;
                // 자기가 전달한 만큼 빠지게 될 것 | balances 안에 있는 게 빠질 것 

            // '전달받는 사람의 잔액' 이 증가!
            balances[to] += amount;
                // 전달한 만큼! 증가되어야 함 

            // transfer 이벤트를 실행시킨 로그를 트랜잭션에서 확인! 
                // 이벤트를 발생시킬 때는 emit 를 사용한다 ⭐⭐⭐ | socket 에서도 이걸 씀 
            emit Transfer(msg.sender , to, amount);
                // to : 내가 보낸 사람 
                // value : 얼마를 보냈는지

            // 성공은 true 가 반환되는 함수
            // 실패는 false 
            return true;
        }

        // 토큰의 소유권을 위임하는 함수 | 그 사람이 소유권을 가질 수 있게
        function approve(address sender , uint amount) external override returns (bool) {
            // 소유권을 추가 
            allowance[msg.sender][sender] = amount;
                // 지금 위임 전달하는 주소 :[msg.sender][sender]
            
            // 이제 이벤트 발생 시켜서 확인 
            emit Approval(msg.sender , sender, amount);

            // 성공은 true | 실패는 false 가 반환
            return true;
        }

        // 권한을 가지고 있는 제3자가, 토큰을 보낼 때 사용하는 함수 
        function transferFrom(address sender,  address to,  uint amount) external override returns(bool) {
                // 권한을 갖고 있는 사람(sender) 이, 누구 에게 (to), 얼마(amount) 를
            
            // 이 사람이 권한을 갖고 있는지, 토근의 량을 검사를 하고 
            require(allowance[sender][msg.sender] >= amount);

            allowance[sender][msg.sender] -= amount;
            balances[sender] -= amount;     // 권한을 받은 사람의 것을 빼고
        
            balances[to] += amount;     // 토큰 전달받은 사람은, 그 만큼을 받는다.
            return true;
        }
        




        // 토큰을 발행 하는 함수 : 총 개수에 추가 되면서, 소유권을 컨트랙트 배포한 사람이 갖고 있다가 -> 다른 사람에게 토큰을 전송해줌 
            // internal : 컨트랙트 내부에서만 실행시킬 함수
        function mint(uint amount) internal {
            balances[msg.sender] += amount;     // 실행시킨 사람이 개수를 갖는다.
            totalSupply += amount;      // 발행된 개수가 점점 늘어날 것
            
            // 민팅을 하면, 토탈 개수가 쌓이고, 얼만큼 됐는지는, amount 에 넣으면 됨. 
        }

        // 토큰을 소각 시키는 함수 
            // 토큰을 너무 많이 발행하면, 가치가 떨어지기 때문에, 소각 시킨다. 
        function burn(uint amount) external {
            balances[msg.sender] -= amount;
            totalSupply -= amount;

        }


}