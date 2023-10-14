// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './IERC20.sol';

contract ERC20 is IERC20 {
    // 인터페이스 가져와서 사용해주기

    // 토큰의 이름 
    string public name;

    // 토큰의 단위 지정 | 심볼 | ex) ETH
    string public symbol;

    // 토큰의 소수점 자리 | 기본 18 자리로 구성 
    uint public decimals = 18;

    // 현재 토큰의 총 발행량 
        // 상속받은 걸 '덮어써서' 발행량 지정하기
    uint public override totalSupply;

    address private owner;


    // 매핑 객체 📛📛📛📛📛📛 
    mapping( address => uint ) public balances;
    // {
    //     "0x123123123123(주소)" : 1000 개
    // },
    

    // 위임 받을 때 
    mapping( address => mapping(address => uint)) public override allowance;
    // 매핑 객체 안에, 매핑 객체가 있음 
    // {
    //     "0x123123123123(주소)" : {
            // "0x123123123123" : 500개 (위임 받은 양 | 1000개 중 500개를 위임)
    // }
    // }


    // CA 에 이더를 받으면 자동으로 실행되는 메소드
    receive() external payable {
        // CA가 이더를 받았을 때, 실행되는 동작
        // uint amount 

        // 배포자가 토큰의 발행량을 모두 관리하고, | 배포자 개념 😥😥😥😥😥😥😥 발목 잡히지 않게
        // 다른 이용자들이 토큰을 얻고 싶으면, 
        // 컨트랙트 배포자가, 정한, 비율, 에 따라, 토큰을 가져갈 수 있게 
        // 토큰 발행자가 이더리움을 받고, 갖고 있는 걸 넘김, 
        
        // 소유권을 줄 토큰의 양 
            // 받은 이더 비율로
        uint amount = msg.value * 200;
            // msg.value 는 보낸 이더리움 양 -> so, 1개 이더에 대해 200개 토큰을 지부랗는 것 

        require(balances[owner] >= amount );
            // balances[owner] : 오너가 갖고 있는 토큰의 양 확인 

        balances[owner] -= amount;
        balances[msg.sender] += amount;

        // 만약, 토큰을, 다 소유권을 넘겨서, 배포자가 들고 있는 토큰이 없다. 
        // 만약, 배포자가, 이더를, 보냈으면, 토큰을 더 발행할 수 있게 | 총 발행량이 늘어남
        if(msg.sender == owner ) {
            mint(amount);        
                // 보낸 것 만큼 민트 실행
                // 부족하면, 또 이제, 토큰을 발행
        }
    }


    // 컨트랙트 생성자 | 이걸 실행하면, 포켓몬 토큰이 생성됨 
    constructor(string memory _name, string memory _symbol, uint256 _amount ){
        
        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        // 민트를 실행하고, 소수점 단위 맞춰서  | 그러면, 소수점 단위가 18개 붙을 것
        mint(_amount * (10 ** uint256(decimals)));

    }
        // string memory : 스트링은 가변적이기 때문에 memory 를 붙여야 함 ❓❓❓


    // 토큰 발행량을 지정하는 함수 📛📛📛📛📛📛 
    function mint(uint amount) internal {

        balances[msg.sender] += amount;     // 📛📛📛 
        totalSupply += amount;      // 총발행량이 계속 늘어남 
    }

    // 남은 토큰 확인 하는 함수 
    function balanceOf(address account) external view override returns(uint){
        return balances[account];       // 토큰 잔액을 확인 해서 내보내기
    }
    // external view 📛📛📛📛📛📛 접근 지정자? 읽기 전용? 


    // 누군가에게 내가 갖고 있는 토큰 전송하기 
    function transfer(address to, uint amount) external override returns(bool) {
        // 매핑 객체 안에 있는 본인의 토큰 양을 빼고 
        balances[msg.sender] -= amount;
        balances[to] += amount;     // 이 사람에게 보냄
        return true;
    }

    // 위임 하는 함수 📛📛📛📛📛📛 
    function approve(address spender, uint amount) external override returns(bool) {

        allowance[msg.sender][spender] = amount; // 위임 받는 내용을 받는 객체 
        return true;
    }
    // external override

    function transferFrom(address spender, address to, uint amount) external override returns(bool) {
        require(allowance[spender][msg.sender] >= amount );     // 📛📛📛📛📛
        
        // sender == A 
        // msg.sender == B
        // to == C
        // A 가 B 에게 위임한 경우 
        //     {
        //         A : {
        //             B : 100
        //         }
        //     }

        // // 50개 위임하면 ????????//
        //     {
        //         A : {
        //             B : 50
        //         }
        //     }

        // // 50개 위임하면 ????????
        //     {
        //         A : 950
        //         C : 50
                
        //     }



        allowance[spender][msg.sender] -= amount;

        balances[spender] -= amount;
        balances[to] += amount;

        return true;
    }

    // 어제꺼 보고 적기 
    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }



    // 사용하는 사람들이 토큰 어떻게 얻는지 를 추가 할 것 | 이제 오늘 수업 추가 ✅✅✅
    // CA 주소로, 이더가 전송되었을 때, 실행 시키고 싶은 동작이 있어. 
        // CA 가 이더를 받았을 때, 실행시키는 함수를 만들고 싶으면
        // 솔리디티에는 익명함수가 있어 
        // CA 에 이더를 받으면 자동으로 실행되는 메소드
        // receive 익명함수 


}