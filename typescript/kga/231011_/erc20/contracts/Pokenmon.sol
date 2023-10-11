// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Pokenmon is ERC20 {

    // 그러면, 이제 ERC20 의 내용이 POKEMON 안에 있게 된다 👇👇👇 
    constructor() ERC20("Pokenmon" , "PTK" , 1000000) {

    }

    // 포켓몬 객체를 만들것
    // 이 객체 하나가 포켓몬의 데이터 
    // 유사 NFT |
    // STRUCT 를 사용할 것 📛📛📛📛📛📛📛 
    
    // 포켓몬 객체
    struct Pokens {
        string url;
        string name;
    }

    // 포켓몬을 구매한 사람들의 주소를 담아놓을 것
    struct Users {
        address account;
    }

    // ERC20 으로 토큰을 지불해서 포켓몬 빵 구매하게 할 것 
    // 빵 하나에 얼마? 
        uint256 private tokenPrice = 1000 ether;
            // 단위를 이더! 로 지정한 것 
            // 10 ** 18 소수점 단위 
            // 그러면, 가격이 1000 토큰임 - 1000 토큰 내야 - 빵 하나 살 수 있음 📛📛📛📛📛📛

    // 우리가 포켓몬 빵을 사면, 랜덤한 스티커가 들어있음 
        // 배열 안에, 나올 수 있는, 포켓몬의 이름을 선언해두자. | 포켓몬들 이미지 넣어두기
    string[] pokenmonName = ["Pikachu" , "Kobuki", "lucky chance!" ] ; 
        // 솔리디티에서는 인코딩된 값을 쓰다 보니, 한글을 쓰려면, '유니코드' 를 써야 함 📛📛📛 

    // 포켓몬 예쁜 이미지 
    string[] pokenmonUrl = [
        "https://mblogthumb-phinf.pstatic.net/MjAxODA3MjZfMTI0/MDAxNTMyNTY5NDAxNDMy.5TsbScgIhQCt_7I8DV7CFEixJuxwoLT9miM5-Cn7vDEg.Q55jll_vB16coM8Sgjhk-6lrNzFcAuXWGi1EV8bCXTwg.PNG.capture23c/1532569378737.png?type=w800", 
        "https://i.namu.wiki/i/qxW3nOx3cDu6UGSaGTKm7CkJgbpI5CMJHIqll3YMAH7DhCNJI2e60D5vMOrepRacs4SsZHE_fx3J0JfKy4NNNQ.gif", 
        "https://i.namu.wiki/i/yV_wSbekYPIfx-TPt75r0CflCNEiw63qEimQu2wgp8qlZj5J03S8vB1hdxqG9t86HVSrUoD1UFuubAEKEjm1E3tNw7lZfL7vd9xfkmtH-VXhubQ5AwaOlzCvLVqrMM9cg1rYoRZHqR7i6VaunQbrCw.webp"
    ];

    // 포켓몬 소유권 
        // 값을 주소에 넣어줌 ❓❓❓❓❓❓ 
        // 구매하면, 한 개를 얻는데, 또 사면 2개 -> so, pokenmons 의 타입이 배열 - so, 포켓몬들! 을 가질 수 있음.
        mapping ( address => Pokens[]) public pokenmons;
        // {
        //     "A주소" : [pokens { url : "" , name :""} , pokens { url : "" , name :""}, pokens { url : "" , name :""}]
        // }
            // A 주소가 , 포켓몬을 3개 갖고 있는 것 

        // 한번이라도, 포켓몬 빵을 구매한 사람들의 주소를 가지고 있는 Users 객체
        Users[] public users;

        // 지갑 주소가 가지고 있는 포켓몬 조회 | 어떤 포켓몬을 갖고 있는지 조회
        function getPokenmon() public view returns( Pokens[] memory ) {
            return pokenmons[msg.sender];
        }
        // Pokens[] memory : 얼마나 길지 모르면 -> memory 써야❓❓❓ 
        // public view 접근 지정자 접근 제한자 📛📛📛📛📛📛 

        function getPokenmonUsers() public view returns (Users[] memory ) {
            return users;
        }

        function buyPokenmon() public {
            // 빵 살만 돈 있는지 확인 
            require(balances[msg.sender] >= tokenPrice );

            // 돈 있으면 
            balances[msg.sender] -= tokenPrice;

            // 총 발행량에서 제거 | 그냥 지워버림 | ❓❓❓❓❓❓ 왜 ? 
            totalSupply -= tokenPrice;

            // 랜덤값 얻기
            uint random = uint(keccak256(
                abi.encodePacked(block.timestamp, block.coinbase , block.number)
            ));

            // 0 ~ 2 까지의 3가지 랜덤값
            random = uint ( random % 3 );
            
            // 누가 포켓몬 빵 갖고 있는지 | 이 사람이 샀고, 그 안에 구조체 형태가 배열로 담김
            // pokens 구조체 형태로 객체를 만들어서, 배열에 푸쉬
            pokenmons[msg.sender].push(Pokens( pokenmonUrl[random] , pokenmonName[random]  ));
                // Pokens() : 구조체 형태의 객체를 만듦 -> 이때, url,name 을 순서대로 넣어야 함 | 📛📛📛📛📛📛📛📛📛📛📛📛📛📛📛📛
                

            // 유저가 포켓몬 빵을 산적이 있는지 
                // 소유권 조회할 때, 추가할 건데, 
                // 만약에 , 있는 사람이면, 추가가 안 되어야 하니까 
                // 한번이라도, 산적이 있는지 확인 | 📛📛📛📛📛
                bool isUser = false;
                
                for( uint256 i = 0; i < users.length; i++ ) {
                    if(users[i].account == msg.sender) {
                        // 유저가 있으면 - true 되고 - 끝! 
                        isUser = true;
                        break;
                    }
                }

                if (!isUser) {
                    users.push(Users(msg.sender));
                    // Users(msg.sender) : 구초체를 만들어서, 주소는 msg.sender 로 추가 📛📛📛📛📛📛
                }

            return 
        }

        /*
            클릭해서 get pokenmon 까지 


        */

}