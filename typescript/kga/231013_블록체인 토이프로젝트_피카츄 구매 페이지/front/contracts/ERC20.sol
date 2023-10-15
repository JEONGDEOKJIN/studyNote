// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20 {

    // 토큰의 이름 
    string public name;

    // 토큰 단위 지정 | 심폴 | ex) ETH
    string public symbol;

    // 토큰의 소수점 자리 | 기본 18자리로 구성 | #📛 잘 이해가 안 됨 
    uint public decimals = 18;

    // 현재 토큰의 총 발행량 | 상속 받은걸 덮어써서, 발행량 지정하기 
    uint public override totalSupply;

    address private owner;

    // 매핑 객체 | 특정 계정 | 해당 계정에, 몇 개의 토큰이 있는가. 
    mapping(address => uint) public balances;
        /* [해석] balances 는 '객체' 의 일종
            - address : 는 객체에서 key 와 비슷 
            - uint으로 들어온 값을, address의 value 로 매핑(mapping) 하겠다, 라는 의미. 
            - public : 외부에서 값을 읽을 수 있음. | 외부에서 값 수정하려면, solidity 거쳐야 함 | 내부에서 값 읽고, 수정 가능 |  
                    : 여기에서, 외부, 내부는 클래스에서, 클래스를 실행하면 나오게 되는 클래스 인스턴스에서, 접근할 수 있는 메소드인지 여부를 의미하는 것과 비슷.
            - 예시 형태 
                {
                    "key 로 주소가 옴" " 100000(100000개 라는 의미) 
                }
        */

    // 위임 받을 때 | #📛 이해 안 돼
    mapping( address => mapping( address => uint ) ) public override allowance;
        /* 매핑 객체 안에, 매핑 객체가 있음. 
            {
                "A주소" : {
                    "B주소" : 500 (위임 받은 양 | 1000개 중 500개 위임)
                }
            }
        */

    // CA 에 이더를 받으면 자동으로 실행되는 메소드 
    receive() external payable {

        // 소유권을 줄 토큰의 양 | 받은 이더 비율로 | 이더 1개로, 200개 포켓몬 토큰을 사간다.  
        uint amount = msg.value * 200;
            // [해석] msg.value : 사용자가 낸(지불한) 이더리움의 양 

        // 누군가 포켓몬 코인을 산 상황에서, owner 가 갖고 있는 코인이, 200개 보다 많은지 확인
        require(balances[owner] >= amount );
            /* - balances[owner] 해석
                : balances 매핑 객체에서, owner(지갑 주소를 의미하는 owner) 는 key 로 들어감 -> 그러면, 해당 owner 주소가 갖고 있는 포켓몬 토큰 개수가 나오게 될 것  

                - 만약, balances[owner] 이 갖고 있는 코인이, 200개 보다 부족하면, 포켓몬 코인을 못 사는거 겠네!? 👉 그러함 👉 이 순간, 경제학적 개념이 들어감 ⭐⭐⭐⭐⭐⭐
            */

        // '주인이 갖고 있는 코인의 개수' 에서 '신청받은 코인 개수' 만큼 뺀다.
        balances[owner] -= amount;

        // '보낸 주소' 에서, '신청한 코인' 만큼, 더해서 받는다. 
        balances[msg.sender] -= amount;

        // mint 조건 | 아직 이해를 다 못 함 #📛
        if(msg.sender == owner) {
            // 보낸 것 만큼, mint 실행 | 부족하면, 또, 이제, 토큰을 발행
            mint(amount);
        }
        /* 지난번 파일에 달린 주석임 👇👇 
            만약, 토큰을, 다 소유권을 넘겨서, 배포자가 들고 있는 토큰이 없다. 
            만약, 배포자가, 이더를, 보냈으면, 토큰을 더 발행할 수 있게 | 총 발행량이 늘어남
        */
    }
        /*
            external : 외부 호출만! 가능. 내부 호출은 불가

            - 이해 부족한 부분 👇👇👇 
            배포자가 토큰의 발행량을 모두 관리하고, | 배포자 개념 😥😥😥😥😥😥😥 발목 잡히지 않게
            다른 이용자들이 토큰을 얻고 싶으면, 
            컨트랙트 배포자가, 정한, 비율, 에 따라, 토큰을 가져갈 수 있게 
            토큰 발행자가 이더리움을 받고, 갖고 있는 걸 넘김, 
        */

    // 컨트랙트 생성자 | 이걸 실행하면, 포켓몬 토큰이 생성됨 
    constructor( string memory _name , string memory _symbol, uint256 _amount ) {

        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        // 민트를 실행하고, 소수점 단위에 맞춰서 끊어준다? | 그러면, 소수점 단위가 18개 붙을 것
        mint(_amount * (10 ** uint256(decimals)) );

    }
        /* [해석]
        - string memory : 스트링은 가변적이기 때문에, memory 를 붙여야 함
        
        - msg.sender | 
            : 여기에서, sender 라는 말은, 이미 존재하는 CA 에게, 뭔가를 보냈다. 라는 의미? 
            : 즉, 여기에서 msg 는 트랜잭션 입장에서, 받게 되면, 이거 할게~ 라는 의미? 
        */

    // 토큰 발행량을 지정하는 함수 
    function mint(uint amount) internal {
        // send를 한 누군가의 계정에, amount 가 들어가게 된다.
        balances[msg.sender] += amount;

        // 총발행량에 들어가게 된다. 
        totalSupply += amount;
    }

    // 남은 토큰을 확인하는 함수 
    function balanceOf( address account) external view override returns(uint) {
        return balances[account];
    }

    // 누군가에게, 내가 갖고 있는 토큰을 전송 하기 
    function transfer(address to, uint amount) external override returns(bool) {
        // 매핑 객체 안에 있는 본인의 토큰 양을 빼고
        balances[msg.sender] -= amount;

        // to 계정 사람에게 보냄 
        balances[to] += amount;

        return true;
    }

    // 위임 하는 함수 | #📛 
    function approve(address spender, uint amount) external override returns(bool) {

        // 위임 받는 내용을 받는 객체
        allowance[msg.sender][spender] = amount;

        return true;
    }

    // 모르겠어 #📛
    function transferFrom( address spender , address to, uint amount ) external override returns(bool) {
        require(allowance[spender][msg.sender] >= amount);

        allowance[spender][msg.sender] -= amount ;

        balances[spender] -= amount;
        balances[to] += amount;

        return true;
        /*
            sender == A 
            msg.sender == B
            to == C
            A 가 B 에게 위임한 경우 
                {
                    A : {
                        B : 100
                    }
                }

            // 50개 위임하면 ????????//
                {
                    A : {
                        B : 50
                    }
                }

            // 50개 위임하면 ????????
                {
                    A : 950
                    C : 50
                    
                }
        */
    }

    // 어제것 보고 적기 
    function burn (uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }


}