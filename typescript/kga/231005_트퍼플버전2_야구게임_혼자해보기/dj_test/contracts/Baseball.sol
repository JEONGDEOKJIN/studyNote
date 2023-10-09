// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

    /* [이 컨트랙트를 배포한 사람(소유한 사람, 야구게임 만든 사람, 콘텐츠 소유자)의 역할]
        이 소유자는 
            1) CA 에 있는 balance(계정 잔액)을❓❓ 자기 주소로 전달
            2) 게임 진행할 때, reset 해줌
            3) 소유자 권한을 갖고 있는 사람만 작성할 수 있는 함수를 적게 됨 
    */

    /* [게임 rule]
        - 컴퓨터가 숫자 3개를 랜덤으로 뽑는다. 
        - 플레이어는 숫자를 입력 -> 1) 맞추면 상금, 2) 틀리면, 이더를, CA 에 보낸다. | 상금이 누적된다. 
        - 게임 플레이 횟수가 있는데, 아무도 못 맞추면, '컨트랙트 소유자' 가 이더를 가져간다. 
    */

    /* [들어가기 전 궁금증]
        - '컨트랙트 배포자' 가 누구고, 배포자가 아닌 사람으 누구고, 어떻게 구분할까? 
        - public, private 은 안과 밖. 인데, 구체적으로 어디를 의미할까?  
        - enum 이 뭐지? 
    */


contract Baseball {

    // '컨트랙트 배포자' 의 주소를 갖고 있는 상태 변수 
    address private owner;

    // 게임 횟수 
    uint256 private constant GAMEOVER_COUNT = 5;
        // const : 변수를 const 로 하는 것과 비슷 | 이 구문을 추가하면, 상태를 변경하지 않을 상태 변수! 라는 말 

    // ticket : 게임을 하고 싶으면 지불해야 하는 이더(ether)
    uint256 private ticket = 5 ether;
        // [특징] 현재, 5 라고 썼지만, ⭐wei 단위로 넘어간다. 

    // random : 컴퓨터가 정할 랜덤값(정답 임) | 3자리수의 숫자 
    uint256 private random;

    // 게임의 진행도 
    uint256 private progress;

    // 총 모여있는 상금 
    uint256 private reward;

    // 게임의 현재 상태 | enum : 1) 개발자가 상태값을 쉽게 알아보기 위해서 사용함, 2) ⭐사용자 정의 타입⭐을 만들 수 있음. 
    enum GameStatus {
        Playing,    // 0
        GameOver   // 1
    }

    // 최초의 상태값은 0 == 게임 play 중!!! 이라는 의미
    GameStatus gameStatus;
        // [해석] 
            // ⭐enum 을 사용하면 -> '사용자 정의 타입'⭐ 을 만들 수 있음! 
            // 타입이 'GameStatus' 인 gameStatus 상태 변수를 선언
            // 타입이 'GameStatus' 라면, 해당 변수가, Playing 또는 GameOver 값 중 하나만 가질 수 있다는 의미. 
            // 초기값으로는, solidity 는 기본적으로 0 으로 초기화 되므로 -> Playing 으로 설정됨


    // 컨트랙트 생성자 : 1) owner : 배포자 정보 담게 하기 2) random 값 뽑기 
    constructor() {

        // 최초에 딱 한번, 배포자가 상태변수에 담긴다 
        owner = msg.sender;
            // [궁금증] msg 는 어디에서 온거지❓❓❓

        // 해시값을 활용해서 랜덤값 뽑기 
            // 1) 큰 숫자 뽑기 
                random = uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.difficulty, 
                            block.coinbase, 
                            block.number
                        )
                    )
                );
                /* [해석]
                    - keccak256
                        : 솔리디티에서, 랜덤값을 뽑을 때, 사용한다. 
                        : '매개변수' 를 '해시값' 으로 변경해준다.
                        : SHA-3 알고리즘 사용
                    - abi.encodePacked | 
                        : '매개변수'로 전달된 내용들을 가지고, '바이트 배열' 로, 만들어준다. 
                        : 매개변수로 전달된 내용 -> 바이트 -> 해시값 -> uint256 으로 형변환 (❓❓맞나)
                        : 궁금증 | 여기는 solidity 인데, abi 라는게, 어떻게 들어올 수 있는거지❓❓❓ 
                    
                    - block 이 포함하고 있는 다양한 값들을 넣어서 -> 랜덤값의 재료가 되게 한다. 
                */

            // 2) 큰 숫자에서, 원하는 만큼의 숫자, 를 뽑기 | 100 ~ 999 사이의 랜덤값
            random = (random % 900) + 100;
    
    }

    // 유저의 값을 받아서 -> 비교 -> 게임의 정답을 맞췄는지를 계산  
    function gameStart(uint256 _value) public payable {
        
        // '게임 진행 조건 1 : 몇 판 했니?' 확인
        require(progress < GAMEOVER_COUNT , "Game Over");
            // [해석] 현재 진행 정도가, GAMEOVER_COUNT 보다 적으면 -> 게임 진행 | 넘으면, GAME OVER 띄우기

        // '게임 진행 조건 2 : 티겟, 구매할 만큼, 이더리움 있니?' 확인
        require( msg.value == ticket , "ticket amount error (give me 5 ether)" );
            // [궁금증] 컨트랙트를 실행한 사람은, msg 객체에 들어가 있다고 하는데, 무슨 의미지❓❓❓ | msg 객체가 이해가 안 돼 😥😥😥 

        // '게임 진행 조건 3 : 입력된 숫자가 3자리 인가?' 확인
        require(
            (_value >= 100) && (_value < 1000), "Not between 100 and 999"
        );

        // 게임 진행 count 1 증가 
        progress += 1;

        // 플레이어가 정답을 맞췄는지 비교 
            // 정답인 경우 
            if(_value == random){
                    // CA 의 잔액(address(this).balance)이, 보상(reward) 만큼 있는지! 검사 
                    require(reward <= address(this).balance);
                        /* [해석] 
                            - this : 이 컨트랙트 를 의미 
                            - address : '타입 캐스팅' 임 
                                - 타입 캐스팅 : '하나의 데이터 타입' 을 '다른 데이터 타입' 으로 변환하는 프로세스
                            - address(this) : 이 컨트랙트의 '주소' 를 반환
                            - balance : 해당 주소의 잔액을 'wei' 단위로 반환 
                        */

                    // 정답을 맞춘 사람(msg.sender) 에게 CA 의 잔액(address(this).balance) 을 보상으로 준다. 
                        // (궁금증) 'address(this).balance' 이게 'CA 의 잔액' 이 맞나❓❓❓ 
                            // CA 가 아니라, 지갑 주소 여야 하는 건 아닌가❓❓❓ | 그러면, 탈락하고 남은 돈은 CA 로 쌓이게 되는 건가❓❓❓ 
                    payable(msg.sender).transfer(address(this).balance);
                        /* [해석]
                            - msg.sender 
                                : 현재 함수를 호출한 주소
                                : gameStart 함수를 호출한 플레이어의 주소
                                : (궁금증) 이 부분이 잘 이해가 안 됨 😥😥😥 | ❓❓❓ 
                            - payable(msg.sender)
                                : solidity 에서는 ⭐기본적으로 '이더를 받을 수 없음'⭐ -> 이더를 받으려면, 'payable' 타입으로 캐스팅 해야 함. 
                                : payable(msg.sender) 로 이더를 받을 수 있는 주소 타입으로 변경함
                            - transfer 
                                : 이더를 받을 수 있는 주소(payable(msg.sender))로, transfer 의 매개변수 만큼의 값을 전달한다! 라는 의미. 
                            - address(this).balance 
                                : 현재 컨트랙트(this)의 주소(address)의 잔액(balance) 를 가져온다. 
                        */  

                    // 보상 금액을 초기화
                    reward = 0;

                    // gameStatus 상태 변수 업데이트 
                    gameStatus = GameStatus.GameOver;
                        // [해석] enum 타입에서 GameOver 은 '1' 을 의미. 게임이 끝났다! 는 것을 의미 

            } else {
                // 정답을 못 맞췄으면, 리워드를 쌓는다. 
                reward += msg.value;
                    // [궁금증] reward 변수에, 현재 플레이어의 값을 넣는건가❓❓❓ 
                        // msg : solidity 에서 제공하는 전역 변수 | 현재 호출하는 트랜잭션에 대한 정보가 있음 
                        // msg.value : 함수를 호출할 때 전송한 값 
                        /*  지금 코드에서는, 여기에서 전송한 ether 5 을 의미 👇👇👇 
                            await baseballContract.methods.gameStart(Number(value)).send({
                                from: user.account,
                                value: web3.utils.toWei("5", "ether"),
                            });

                        */

                    // value 는 숫자를 찍은 값인데, reward 에는 다른 값이 들어가야 하는거 아니야❓❓❓ 
            }
    }
        /* [해석]
            - _value : 유저값이 들어오면 비교! 
            - payable : 결과값이 payable 인 이유는, 틀리면, 해당 값 만큼 지불 해야 해서. 

            - 컨트랙트가 배포되었을 때, 딱 한번만! 실행됨. ⭐⭐⭐⭐⭐ 
            - 이때, '배포 시킨 사람' 이 '소유자' 일 것. ⭐⭐⭐ 
            - msg : '배포한 사람' 을 받을 수 있음. | ❓❓❓❓❓❓❓❓❓❓❓❓❓❓
            - 최초, 딱 한번, 배포자가, 상태변수에 담김. 
        */

    // 현재 쌓인 보상을 보여주는 함수 
    function getReward() public view returns (uint256) {
        return reward;
    }
        /* [궁금증] 
            - getReward() 가 언제 불리는 거지❓❓❓
                - 이게 솔리디티니까, 맞아, 나중에 불려져서 다뤄지겠지? 
            접근 제한자 ❓❓❓ : public ?
            접근 지정자 ❓❓❓ : view ? 
        */

    // 게임이 얼마나 진행 됐는지를 보여주는 함수 
    function getProgress() public view returns (uint256) {
        return progress;
    }

    // 티겟의 금액을 보여주는 함수 
    function getTicketPrice() public view returns (uint256) {
        return ticket;
    }

    // 어드민 모드로 정답을 확인하는 함수 
    function getRandom() public view returns(uint256) {
        // 컨트랙트 배포한 사람인지 여부' 를 확인 ⭐⭐⭐ | 😥😥😥 작동되는지 아직 모르겠음. 수업 중에는 에러가 났었음
            require(owner == msg.sender , "admin");

        // 소유자가 맞으면, 정답을 확인
            return random;
    }

    // 게임중 인지 확인할 함수
    function getPlaying() public view returns (uint256) {
        // 게임이 진행되고 있는 상수값이 0 
        uint256 Playing = 0;

        if( (gameStatus != GameStatus.Playing) || (progress == GAMEOVER_COUNT) ) {
            // 게임 끝났다 
            Playing = 1;
        }
        return Playing;
    }
}