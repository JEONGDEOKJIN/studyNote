// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Pokemon is ERC20 { 

    constructor() ERC20( "Pokemon" , "PTK" , 10000000 ) { }
        /*
            ERC20 의 생성자 함수는 아래와 같음 👇👇 | 따라서, Pokemon의 생성자함수를 실행하면, 바로, 코인이 만들어진다. 
                constructor( string memory _name , string memory _symbol, uint256 _amount ) {
                    owner = msg.sender;
                    name = _name;
                    symbol = _symbol;
                mint(_amount * (10 ** uint256(decimals)) );
                }
            그러면, 코인이 만들어진다는 건, 뭘 의미하는 걸까? 그림을 그려서 생각해보면... #📛
        */

    // 포켓몬 객체 
    struct Pokens {
        string url;
        string name;
    }
        /*
            포켓몬 객체를 만들것
            이 객체 하나가 포켓몬의 데이터 
            유사 NFT |
            STRUCT 를 사용할 것 #📛 
        */
    

    // 포켓몬을 구매한 사람들의 주소를 담아놓을 것
    struct Users {
        address account;
    }

    // 포켓몬 빵 가격 | ERC20 으로 토큰을 지불해서, 포켓몬 빵을 구매하게 할 것 
    uint256 private tokenPrice = 1000 ether;
        // 포켓몬 빵 1개 == 1000 토큰 
            // 10 ** 18 소수점 단위 
            // 그러면, 가격이 1000 토큰임 - 1000 토큰 내야 - 빵 하나 살 수 있음 📛📛📛📛📛📛
            // 1000 토큰을 주면, 포켓몬 빵 하나 라는 건 알겠음. 근데, 여기서 왜 10**18 이게 나오지?  #📛

    // 포켓몬 빵을 사면, '랜덤' 으로 나오게 될 스티커
        // 배열 안에, 나올 수 있는 포켓몬의 이름을 선언하기 | 포켓몬들 이미지 넣어두기
        string[] pokemonName = ["Happy Pikachu" , "Cute Kobuki", "lucky chance!" ] ; 
            // [참고] ✅ 솔리디티에서는 인코딩된 값을 씀. so, 한글을 쓰려면, '유니코드' 를 써야 함 
    
        // 포켓몬 예쁜 이미지 
        string[] pokemonUrl = [
            "https://mblogthumb-phinf.pstatic.net/MjAxODA3MjZfMTI0/MDAxNTMyNTY5NDAxNDMy.5TsbScgIhQCt_7I8DV7CFEixJuxwoLT9miM5-Cn7vDEg.Q55jll_vB16coM8Sgjhk-6lrNzFcAuXWGi1EV8bCXTwg.PNG.capture23c/1532569378737.png?type=w800", 
            "https://i.namu.wiki/i/qxW3nOx3cDu6UGSaGTKm7CkJgbpI5CMJHIqll3YMAH7DhCNJI2e60D5vMOrepRacs4SsZHE_fx3J0JfKy4NNNQ.gif", 
            "https://i.namu.wiki/i/yV_wSbekYPIfx-TPt75r0CflCNEiw63qEimQu2wgp8qlZj5J03S8vB1hdxqG9t86HVSrUoD1UFuubAEKEjm1E3tNw7lZfL7vd9xfkmtH-VXhubQ5AwaOlzCvLVqrMM9cg1rYoRZHqR7i6VaunQbrCw.webp"
        ];

    // '특정 주소' 가 갖고 있는 포켓몬을 mapping 객체 안에 넣기 | 포켓몬 소유권
    mapping (address => Pokens[]) public pokemons;
        /* - address 키에, 위에서 설정한 Pokens 구조체가, 값으로 들어가게 된다. 
            - A 주소에 포켓몬이 3개 들어가 있음.
            {
                "0x12398989(간략화된 A 주소)" : [
                    {url : " ", name : " " }, 
                    {url : " ", name : " " }, 
                    {url : " ", name : " " } 
                ]
            }
        */

    // '한번 이라도, 포켓몬 빵을 구매한 사람들' 을 담아놓을 users 객체
    Users[] public users;
        // [해석] 위에서 Users struct 설정한 타입을 따라간다. -> so, users 변수에는 address 타입인 account 가 담긴다.

    // 해당 지갑 주소가 갖고 있는 포켓몬 조회 | 어떤 포켓몬 갖고 있는지 조회
    function getPokemon() public view returns( Pokens[] memory ) {
        return pokemons[msg.sender];
            // [해석] pokemons[보낸사람의주소] 를 입력하면 ->  pokemons 객체의 특성에 따라, Pokens[] , 이 Pokens[] 구조체 값이 나온다.
    }
        // [해석] Pokens[] 의 값이 얼마나 길지 모르니까, memory 를 사용한다. | #📛 memory 에 대해 아직 모르겠음
        // [해석] public view 접근지정자, 접근제한자 | #📛 접근지정자, 접근제한자 아직 모르겠음.


    // 이것만 가지고 포켓몬 유저를 갖고 오는게 가능했었나? | #📛 
    function getPokemonUsers() public view returns (Users[] memory) {
        return users;
    }


    function buyPokemon() public {

        // 빵 살만한 돈이 있는지 확인 
        require(balances[msg.sender] >= tokenPrice );

        // 돈 있으면, '보낸 사람의 계정' 에서 '빵 가격(tokenPrice)' 만큼 빼기
        balances[msg.sender] -= tokenPrice;

        // 총 발행량에서 제거 
        totalSupply -= tokenPrice;
            // '토큰이 일정한 개수' 안에서 관리될 수 있게 하고자 함. 
            // [궁금한 것] 왜 토큰이 일정한 개수 안에서 관리되야 하나? 뭔가 통화 정책이랑 비슷해 보이는데 #❓

        // 랜덤값 얻기 
        uint random = uint(keccak256(
            abi.encodePacked(block.timestamp, block.coinbase, block.number)
        ));

        // 0 ~ 2 까지의 3가지 랜덤값 
        random = uint (random % 3);

        // '특정 주소가 갖고 있는 포켓몬들' 을 나타내는 pokemons 객체에, '신청한 주소' 와 '만들어진 객체' 넣어주기
        pokemons[msg.sender].push(Pokens( pokemonUrl[random] , pokemonName[random]   ));
            /* 구매가 만들어지는 로직 ⭐⭐⭐⭐⭐
                pokemons[msg.sender] : 방금 구매한 사람의 주소를 기반으로, pokemons 객체에서, 새로운 주소를 넣는다.
                pokemons[msg.sender]. : pokemons 객체의 구조에 따라, '빈 배열' 을 가리킨다. 
                pokemons[msg.sender].push(Pokens()) : struct 문법에 따라, Pokens 인스턴스를 새롭게 생성한다. 
                pokemons[msg.sender].push(Pokens( pokemonUrl[random]  , pokemonName[random]  )) : 이미 만들어진 url 및 name 중, random 수를 기반으로 선택한다. | 순서대로 넣어야 함 
            */

        // 첫 구매 고객이면 -> 포켓몬 구매자 명단에 추가 하기  | #📛 이 기능이 왜 필요할까
            // 구매하지 않았음을 가정 
            bool isUser = false;    

            // 전체 유저 중 동일한 계정이 있는지 여부를 확인             
            for (uint256 i = 0; i < users.length; i++) {
                if(users[i].account == msg.sender) {
                    isUser = true;
                    break;
                }
            }

            // 지금 구매한 유저가, 첫 구매 고객 이면 -> '포켓몬 구매자 명단' 에 push 를 한다?! 
            if(!isUser){
                users.push(Users(msg.sender));
            }

    }

}

