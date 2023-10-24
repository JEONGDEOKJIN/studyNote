// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 직접 폴더 경로 하드코딩
import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor( string memory _name, string memory _symbol ) ERC721(_name, _symbol) {

    }

    // tokenId 안에, ca 주소 뿐 아니라, hash 값 있게 하기  
        // mapping(uint256 tokenId => address) private _owners;
        // mapping(  tokenID =>  CA 주소? ) public owner
        // 적을 때, 조금 변형해서, 적어야 해? 
        // 아니면, 그대로 적어야 해? 
        // 아. 그러면, _tokenId 안에, ca 주소랑, hash 값을 같이 넣어두면 되겠네 


    // 특정 tokenId 가 가질 모든 메타 데이터의 저장소 
    struct TokenMetaData {
        string tokenURI;
        uint256 ranking;
    }

    // 특정 TokenId 와 MetaData를 하나의 변수로 Wrapper 
    struct TokenIdMetaDataWrapper {
    uint256 tokenId;
    TokenMetaData metaData;
    }

    // nft 판매에 필요한 요소 리스팅
    struct Listing {
        uint256 tokenId;
        address owner;
        uint256 price;
    }


    // 테스트    
        // mapping (uint256 tokenId => uint256) tokensprice;

        // function test(uint256 tokenId , uint256 price)(){
        //     tokensprice[tokenId] = price;
        // }

    // tokenId 를 넣으면 => TokenMetaData 가 나오는 _tokenMetaData 매핑 객체 
    mapping(uint256 => TokenMetaData) private _tokenMetaData;

            // 예전 코드 
            // // 메타데이터 내용 확정하기 
            //     // tokenId 랑, URI 를 mapping 할  _tokenURIs
            //     mapping(uint256 tokenId => string tokenURI) private _tokenURIs;
            //     /*   _tokenMetaData = {
            //         tokenId = {
            //             tokenURI : "해시값", 
            //             ranking : "숫자값"
            //         }
            //     }
            //     */

            // 해당 토큰의 ranking 담아둘 저장소
            // mapping(uint256 tokenId => uint256 ranking) private _tokenRanking;
                /* _tokenRanking = {
                    tokenId : ranking
                }
                */

        // tokenId 가 될 totalSupply
        uint256 totalSupply = 0;

    // '지갑이 소유한 NFT 가 몇개 있는지' 내용을 담을 mapping 객체 
    // 0x1231254 이 지갑이 소유하고 있는 NFT 가 몇개 있는지! 
    mapping(uint256 tokenId => address) private _owners;
        /* _owners = {
            tokenId : "0x123232"
        }
        */


    // '유저의 주소' 를 넣으면 -> tokenId 를 알 수 있고 -> 메타데이터(_tokenURIs) 알 수 있게 하기 
    mapping(address => uint256[]) private addressIDs;
        /* addressIDs = {
            '0x123' : [7, 10, 15]
        } */


    // tokenId 넣으면 -> 토큰 판매 관련 정보 나오게 하기 
    mapping(uint256 => Listing) public listings;
    /* 
        listings = {
            tokenId(1) : {listings
                tokenId : "", 
                owner : "0x123", 
                price : "123"
        }, ... }
    */

    // 최종 판매 의사 결정 
    mapping( uint256 tokenId => bool ) public isApprovedForSale;
        /* {
                tokenId (1) : true, false, ... 
            }
        */



    // 1 ~ 10 랜덤 난수 생성 | pure 는 '상태변수를 읽거나, 변경하지 않음!' 이 특징 ⭐⭐ 
    function makeRandom(string memory seed) public pure returns (uint256) {
        return (uint256(keccak256(abi.encodePacked(seed))) % 10 ) + 1; // 1에서 10까지의 숫자
            // keccak256 : 특정 값을 넣으면 -> 해시로 변환함 
            // abi.encodePacked(seed) : seed 매개변수를 잘게 쪼갠다. 그래서 한번에 전달한다.  
    }

    // tokenId 랑 ranking 매핑 | mapping 시키는 곳은 상태변수를 변경하는 거니까, pure 가 될 수 없음. | so, pure 는 난수 생성에서 
    // function setRanking(uint256 tokenId , uint256 ranking) public {
    //     _tokenRanking[tokenId] = ranking;
    // }


    // // owner 설정하기 => mint 가 하기 때문에 필요 없음
    // function setOwnerOf(uint256 tokenId, address owner) internal {
    //     _owners[tokenId] = owner;
    // }
    //     /* _owners = {
    //             tokenId : "0x123232(이더리움 계좌주소)"
    //         }
    //     */

    // 해당 토큰의 주소 확인하기
    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }
        /* _owners = {
                tokenId : "0x123232(이더리움 계좌주소)"
            }
        */



    // 민팅 | 'ERC721 토큰' 과 '구매자 msg.sender' 를 연결
        function minting(string memory _tokenURI , string memory seed) public returns (string memory) {
            // _tokenURI 를 seed 로 해서 랜덤숫자 만들기
            uint256 randomRanking = makeRandom(seed);

            // 해당 tokenId 에 1) metadata 주소의 hash(_tokenURI) 2) ranking 할당
            _tokenMetaData[totalSupply] = TokenMetaData({
                tokenURI : _tokenURI,       // 토큰json 에 접근할 수 있는 hash 저장
                ranking : randomRanking     // 랜덤 숫자를 ranking 으로 저장
            }); 
                // [코드 스킬] tokenId 자리에 totalSupply 가 들어감 | tokenId 를 정의하고, 곧이 곧대로 그걸 활용하지 않아도 된다는 말 ⭐⭐⭐ 

            _mint(msg.sender, totalSupply);  // 이 순간 tokenId 지정 ⭐⭐

            addressIDs[msg.sender].push(totalSupply); // 해당 주소의 토큰 목록에 tokeId(totalSupply) 를 추가 ⭐⭐ 

                // owner 설정하기
            setOwnerOf(totalSupply, msg.sender);

            totalSupply += 1;   

            return _tokenMetaData[totalSupply -1].tokenURI;   // 이걸 하면, 방금만든걸, 바로 볼 수 있음 ✅
        }




    // tokenId 넣으면 -> 해당 토큰의 URI 얻기  
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenMetaData[tokenId].tokenURI;
    }

    // 여기에 tokenId 넣으면 -> ranking 을 반환하고 싶어
    function getTokenRanking(uint256 tokenId) public view returns (uint256 ranking){
        return _tokenMetaData[tokenId].ranking;
    }
    
    // owner 의 주소(address) 를 넣으면 -> '메타데이터 주소 배열' 을 반환
    function getOwnerURIs(address owner) public view returns (string[] memory) {
        // 특정 owner(지갑주소) 가 갖고 있는 tokenId들을 '배열' 에 담기
        uint256[] memory tokenIds = addressIDs[owner];
            // tokenIds = [7, 10, 15]
            // [해석] tokenIds 배열이 생김 | 그 안에 있는 요소는 숫자 | 해당 숫자는 memory 에 저장 

        // tokenIds의 개수만큼 tokenURIs 배열의 원소 개수 만들기 | #📛📛 동적 배열을 메모리에 할당 
        string[] memory ownerURIs = new string[](tokenIds.length);
            // ownerURIs = [ null, null, null ]
            // [해석] tokenURIs 이름의 배열 변수 선언 (그 안에 있는 요소는, 얼마나 길어질지 모르는 string 이니까 memory 에 저장)
            // [해석] 'tokenURIs 배열' 의 '길이(원소개수)'는, 'tokenIds.length' 만큼 생김 

        for (uint256 i = 0; i < tokenIds.length; i++) {
            ownerURIs[i] = _tokenMetaData[tokenIds[i]].tokenURI;
            /* 
            ownerURIs : [ 7번 id 의 URI, 10번 id 의 URI, 15번 id 의 URI]
                _tokenURIs = { 1 : '0x123주소' ... } 
                _tokenURIs : 토큰을 넣으면 -> URIs 값이 나오는 객체
                _tokenURIs[tokenIds[i]] : 'tokenId 7'을 넣으면 -> _tokenURIs 매핑 객체 안의 저장소를 거쳐서 -> URI 를 가져옴
            */
        }
        return ownerURIs;        
    }

    // 주어진 owner의 tokenId 배열에 대한 모든 _tokenMetaData 반환
    function getOwnerTokenMetaData(address owner) public view returns (TokenIdMetaDataWrapper[] memory) {
        uint256[] memory tokenIds = addressIDs[owner]; // 해당 owner의 모든 tokenId 가져오기
            // tokenIds = [7, 10, 15]   

        // 동적 배열을 메모리에 할당하기 위해 TokenMetaData의 배열 생성
        TokenIdMetaDataWrapper[] memory ownerMetaData = new TokenIdMetaDataWrapper[](tokenIds.length);
            // tokenIds 의 개수만큼 ownerMetaData 의 배열 안에, TokenIdMetaDataWrapper 타입으로, 요소를 만듦 
                /* TokenIdMetaDataWrapper = [
                    {
                        tokenId(ex 7) = {
                            "tokenURI" : "해시값", 
                            "ranking" : 1, 
                        }
                    }, 
                    { } , { }
                ]
                */

        for (uint256 i = 0; i < tokenIds.length; i++) {
            ownerMetaData[i] = TokenIdMetaDataWrapper({
                tokenId : tokenIds[i], 
                metaData : _tokenMetaData[tokenIds[i]]
            });
        }
            /*   _tokenMetaData = {
                    tokenId = {
                        tokenURI : "해시값", 
                        ranking : "숫자값"
                    }
                }
                */

        return ownerMetaData;
        /* ownerMetaData = [
            {
                tokenId(ex 7) = {
                    "tokenURI" : "해시값", 
                    "ranking" : 1, 
                }
            }, 
            { } , { }
        ]
        */
    }


        // url 값을 읽어서 - nft 내용을 띄워준다. 
            // 내용이 이미 있는 
            // tokenURI 에 있는 함수 내용을 '수정(덮어쓰기)' 한 것 ⭐⭐⭐⭐⭐ 
        function tokenURI( uint256 _tokenId) public view override returns(string memory){
            // return _tokenURIs[_tokenId];     
            return _tokenMetaData[_tokenId].tokenURI;     // 여기에서는 mint 함수에서 정한 tokenId 를 사용 ⭐⭐ 
                // [원래 하드코딩으로 할 때 버전] json 을 피나타에 올려서 -> 해시 값을 여기에 넣어야 함 ex) "QmVWKyvPRDTteewR2A4KDeXhBUsDo1HJhUCXksTEJXFHik"
        }

        function _baseURI() internal view override returns(string memory) {
            return "https://ipfs.io/ipfs/";  // 베이스 url 값을 따로 지정 
        }

    // nft 관련 메서드는 여기에 ⭐⭐⭐ 에 작성
    // 여기에서 판매 관련 적고 
    
    // [위임 개념] ⭐⭐⭐⭐⭐ OPENSEA 를 보면, ERC721 에 보면 SETapporovalforall 로 권한을 위임 to 오픈씨 -> 그 다음에 오픈씨가 판매 가능 
    // SO, 여기에서 위임된 내용을 갖고 있음. 왜냐면, ERC721 을 상속했으니까, 

    // 이걸 실행시키는 곳은 판매 컨트랙트! saleNFT!
    function setAppAll(address owner, address operator, bool approved) public {
        // address owner : NFT 소유자의 이더리움 주소 
        // address operator : NFT 판매 권한을 받을 saleNFT
        // bool approved : true 로 해야, 권한이 넘어감
        // ApprovalForAll : 권한 위임 완료되면, ApprovalForAll 이벤트 발생

        setApprovalForAll(operator, approved);  // erc721 안에 있는 함수 임 
        // 이걸 실행하면? 
            // 매핑 객체에, 위임받은 사람, 위임 사람, 안에 넣는 것 
            // 매핑의 키에 매핑이 있는데, 그 안에 주소랑 true, false  수정 
            // 그 안에 있는 걸 비교 하는 것. 
            // 값 변경에 대한 함수 
            // 매핑 안에 있는 매핑 객체를 수정하는 함수 
        // 판매 컨트랙트로 판매 등록을 할 수 있게 
    }


    // 토큰 정보 리스팅 하기 
    function listingTokenInfo(uint256 tokenId , uint256 price) public { 

    require(ownerOf(tokenId) == msg.sender , "Token owner mismatch");
    require(price > 0 , "Over 0 ether or wei");

    listings[tokenId] = Listing({
        tokenId : tokenId, 
        owner : msg.sender, 
        price : price
    });

    }


    // 판매 승인 여부 변경 | isApprovedForSale 변경 | 
    function setIsApprovedForSale(uint256 tokenId, bool approved) external {
        require(_ownerOf(tokenId) == msg.sender , "differ owner and sender");
        isApprovedForSale[tokenId] = approved;
    }


    function buyNFT(uint256 tokenId) public payable  {

        // listings 중 tokenId 에 해당하는 값 가져오기
        Listing memory targetNFT = listings[tokenId];
            /*  targetNFT : {
                    tokenId : "", 
                    owner : "0x123", 
                    price : "123"
            } */

        // 정확한 금액을 넣었는지 체크 
        require(msg.value == targetNFT.price , "price");
            // require(listing.seller != address(0), "Token not listed"); | 이건 우선 패스

        // 판매자 승인 받았는지 확인 | 우선 승인 없어도 넘어가게 하기 
        require(isApprovedForSale[tokenId] == true , "판매자 승인이 아직 안 됨. 확인 필요");

        // 이더를 판매자에게 전송 | 
        payable(targetNFT.owner).transfer(msg.value);

        // NFT 를 구매자에게 전송
        _transfer( targetNFT.owner, msg.sender , tokenId )  ;
            // payable :  Ether를 보내거나 받을 수 있는 주소
            /* 
                listings = {
                    tokenId(1) : {
                        tokenId : "", 
                        owner : "0x123", 
                        price : "123"
                }, ... }
            */

    }



}



