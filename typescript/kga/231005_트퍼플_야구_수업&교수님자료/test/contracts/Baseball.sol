// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Baseball {
    // 이 컨트랙트를 배포한 사람(소유한 사람, 야구게임 만든 사람, 콘텐츠 소유자) 을 지정  
        // 이 소유자는 
            // 1) CA 에 있는 BALANCE 를 자기 주소로 전달 
            // 2) 게임 진행할 때 , RESET 해주거나 
            // SO. 소유자 권한을 갖고 있는 사람만 작성할 수 있는 함수를 적을 것 ⭐⭐⭐

        // 컴퓨터가 숫자 3개를 랜덤하게 뽑고, 
        // 이 숫자를 플레이어들이 맞추는 게임. 
        // 숫자를 입력해서, 값을 비교하고, 틀리면, 그 사람은, 이더를 CA 에 보낸다. 

        // CA 플레이어들이, 게임을 하면서, 모인 이더를 , 최종적으로 맞춘 사람에게 보상으로 주고 
        // 게임 플레이 횟수가 있는데, 횟수 만큼 진행됐는데 못 맞췄다면! 
            // 보상은 아무도 못 받고, 컨트랙트 소유자가 이더를 가져간다! 

    // '컨트랙트 배포자' 의 주소를 갖고 있는 상태변수
    address private owner;

    // 게임의 횟수 
    uint256 private constant GAME_COUNT = 5;
        // constant : 변수를 CONST 로 하는 것 처럼 | 이 구분을 추가하면, 상태를 변경하지 않을 상태 변수! 라는 말 ⭐⭐

    // ticket 은 게임을 하고 싶으면, 지불해야 하는 ether
    uint256 private ticket = 5 ether;
        // 5를 썼지만, wei 단위로 넘어간다.

    // 정답의 값을 담아놓을 변수
        // 컴퓨터가 정할 랜덤값
        // 3자리수의 숫자 
    uint256 private random;


    // 게임의 진행도
    uint256 private progress;


    // 총 모여있는 상금 
    uint256 private reward;


    // 게임의 현재 상태 
    enum GameStatus {
        Playing,    // 0 
        GameOver   // 1
    }
        // 상태 값을 개발자가 알아보기 쉽게 하기 위해서

    // 최초의 상태값은 0 = 게임 플레이 중!!! 
    GameStatus gameStatus;      // 0 

    // 컨트랙트 생성자
    constructor() {
        // 최초에 딱 한번 배포자가 상태변수에 담긴다
        owner = msg.sender;

        // 해시값 활용한 랜덤값
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
            // keccak256(x) : 솔리디티에서 랜덤값을 뽑을 때 사용 
                // 매개변수를 해시값으로 만들어줌 -> 해시값을 uint256 으로 형변환 해서 사용! 
                // SHA-3 알고리즘을 사용한다. 
                
                // block 객체의 내용을 갖고 랜덤값을 뽑아보기
                    // abi.encodePacked(arg) : 매개변수로 전달된 내용들을, 바이트 배열로 만들어준다. 
                    // 매개변수로 전달된 내용 -> 바이트 -> 해시값 -> 256 으로 형변환 ❓❓❓❓❓❓
            // uint256( ) : uint 256 으로 형변환 해줌 

            // 엄청 큰 숫자가 나오는데 
            // 이 숫자를 가지고, 나머지 연산을 통해, 원하는 자리수의 숫자를 구하자
            
            // 100 ~ 999 까지의 범위를 지정할거야. 
            random = (random % 900 ) + 100;
            // 100 ~ 99 까지의 랜덤값

    }
        // 유저의 값을 받아서, 비교를 통해, 값이 맞았는지, 게임의 정답을 맞췄는지, 비교할 함수 
        function gameStart(uint256 _value) public payable {
            
            // 이 야구 게임을 진행할 조건은? 
                // GAME_COUNT 에 따라서 5 까지 할 수 있음. 
                // progress 은 1 씩 올라가게 됨 
            require(progress < GAME_COUNT , "Game Over");
            
            // 이 사람이 티겟 구매 할 만큼, 이더리움 있는지 확인 
                // 이 컨트랙트를 실행한 사람은 msg 객체에 들어가 있음. 
            require(msg.value == ticket , "ticket amount error (give me 5 ether)" );

            // 입력된 숫자가 3자리 인지 확인 
            require(
                ( _value >= 100) && (_value <= 999) , 
                "(99 < _value < 1000)"
            );

            // 여기까지 오면 게임 한번 진행된거니까 
            progress += 1;

            // 정답을 맞췄는지, 안 맞췄는지 
                // value 랑 랜덤값이랑 맞는지 비교 
            if(_value == random) {
                // 게임 끝 -> 정답!

                // CA 의 잔액이 보상 만큼, 있는지, 검사
                require(reward <= address(this).balance);
                    // this. 이 컨트랙트 
                    // address 는 balance 가 있음 
                    // 즉, 이 컨트랙트에 잔액이 있는지 확인 

                // msg 갖고 있고 등등 되고 하면 -> transfer 를 실행 
                    // 메타마스크에서 보내기 누르면 -> trnasfer 실행 
                payable(msg.sender).transfer(address(this).balance);
                    // 이 컨트랙터가 msg.sender(정답 맞춘 사람) 한테 보낸디 
                    // address.this(balance) : balance 를 보내게 한다. 
                    // 한판에 25가 최대인데, balance 를 넣으면, 50을 넣어
                    // balance 를 넣어서, 정답을 다 맞춘 사람이 가져가게❓❓❓ 

                reward = 0;

                // gameStatus 상태가 상수값 1로 들어감 
                    // 1 의 의미 : 게임이 끝났다는 의미!! 
                gameStatus = GameStatus.GameOver;

            }else{
                // 정답을 못 맞췄으면
                reward += msg.value;
                    // 이렇게 리워드를 쌓는다. 
            }
        }
        // _value : 유저 값이 들어오면 비교 
        // payable : 참가하는 사람이 지불해야 하니까, payable 필요함



        // ⭐⭐⭐ 컨트랙트가 배포되었을 때! 딱 한번만! 실행됨 ⭐⭐⭐⭐⭐⭐⭐ 
        // 그때, 배포시킨 사람이, 소유자 일 것

        // msg. 이거 배포한 사람을 받을 수 있음 
        // 최초에 딱 한번 배포자가 상태 변수에 담김


        // 지금 현재 쌓인 보상을 보여줄 함수
        // 이제 유저가 보는 함수 
        function getReward() public view returns (uint256) {
            return reward;
        }

        // 게임이 얼마나 진행됐는지를 보여줄 함수
        function getProgress() public view returns (uint256) {
            return progress;
        }
        // 접근 제한자 ❓❓❓ : public ?
        // 접근 지정자 ❓❓❓ : view ? 


        // 티켓의 금액을 보여줄 함수
        function getTicketPrice() public view returns (uint256) {
            return ticket;      // 현재 5이더 단위. 이걸 5이더의 웨이 단위로 변환해서 사용하면 될 것
        }


        // 어드민 모드 로 정답을 확인하는 함수 
        function getRandom() public view returns(uint256) {
            // 컨트랙트 배포한 사람만 ⭐⭐⭐ 볼 수 있게 
                require(owner == msg.sender , "admin"); // 에러나서 지움 
                
                    // owner위에서 owner 에 담았어!
                    // 지금 실행시킨 사람이 sender 인지 확인, 어드민만 볼 수 있어

                return random;
        }

        // 게임 진행 중 인지, 확인할 함수 
        function getPlaying() public view returns (uint256) {
            // 상태를 반환. 다만, 상수 값이 아닌 상태로 ⭐⭐⭐ 

            // 게임이 진행되고 있는 상수값이 0 
            uint256 Playing = 0;      // 함수 안에 설정한건 메모리에 저장 됨. -> so, 실행중에 한번 저장되고 사라짐
                                        // 메모리에 저장되는 이유가 대문자를 써서? 아니면 타입 때문? 
            
            // 종료 조건 
                // 1) 게임이 끝났거나 2)  
            if( (gameStatus != GameStatus.Playing) || (progress == GAME_COUNT) ) {
                // 게임이 끝났다.
                Playing = 1;
            }
            return Playing;
        }
                    // 0 이면 게임 진행중 

        }

        // 게임중인지 확인할 함수 





