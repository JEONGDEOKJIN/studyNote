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

    // 메타데이터 내용 확정하기 
        // tokenId 랑, URI 를 mapping 할  _tokenURIs
        mapping(uint256 tokenId => string tokenURI) private _tokenURIs;
        uint256 totalSupply = 0;

    // '유저의 주소' 를 넣으면 -> tokenId 를 알 수 있고 -> 메타데이터(_tokenURIs) 알 수 있게 하기 
        mapping(address => uint256[]) private addressIDs;
            /* addressIDs = {
                '0x123' : [7, 10, 15]
            } */

    // 민팅 | 'ERC721 토큰' 과 '구매자 msg.sender' 를 연결
        function minting(string memory _tokenURI) public returns (string memory) {
            _tokenURIs[totalSupply] = _tokenURI; // tokenId 자리에 totalSupply 가 들어감 | tokenId 를 정의하고, 곧이 곧대로 그걸 활용하지 않아도 된다는 말 ⭐⭐⭐ 
            
            _mint(msg.sender, totalSupply);  // 이 순간 tokenId 지정 ⭐⭐

            addressIDs[msg.sender].push(totalSupply); // 해당 주소의 토큰 목록에 추가 ⭐⭐ 

            totalSupply += 1;   

            return _tokenURIs[totalSupply -1];   // 이걸 하면, 방금만든걸, 바로 볼 수 있음 ✅
            // return _tokenURIs[totalSupply -1];   // 이걸 하면, 방금만든걸, 바로 볼 수 있음 ✅
        }

    // tokenId 넣으면 -> 해당 토큰의 URI 얻기  
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
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
            ownerURIs[i] = _tokenURIs[tokenIds[i]];
            /* 
            ownerURIs : [ 7번 id 의 URI, 10번 id 의 URI, 15번 id 의 URI]
                _tokenURIs = { 1 : '0x123주소' ... } 
                _tokenURIs : 토큰을 넣으면 -> URIs 값이 나오는 객체
                _tokenURIs[tokenIds[i]] : 'tokenId 7'을 넣으면 -> _tokenURIs 매핑 객체 안의 저장소를 거쳐서 -> URI 를 가져옴
            */
        }
        return ownerURIs;        
    }



        // url 값을 읽어서 - nft 내용을 띄워준다. 
            // 내용이 이미 있는 
            // tokenURI 에 있는 함수 내용을 '수정(덮어쓰기)' 한 것 ⭐⭐⭐⭐⭐ 
        function tokenURI( uint256 _tokenId) public view override returns(string memory){
            // return _tokenURIs[_tokenId];     
            return _tokenURIs[_tokenId];     // 여기에서는 mint 함수에서 정한 tokenId 를 사용 ⭐⭐ 
                // [원래 하드코딩으로 할 때 버전] json 을 피나타에 올려서 -> 해시 값을 여기에 넣어야 함 ex) "QmVWKyvPRDTteewR2A4KDeXhBUsDo1HJhUCXksTEJXFHik"
        }

        function _baseURI() internal view override returns(string memory) {
            return "https://ipfs.io/ipfs/";  // 베이스 url 값을 따로 지정 
        }

}






    // nft 관련 메서드는 여기에 ⭐⭐⭐ 에 작성
    // 여기에서 판매 관련 적고 
    
    // [위임 개념] ⭐⭐⭐⭐⭐ OPENSEA 를 보면, ERC721 에 보면 SETapporovalforall 로 권한을 위임 to 오픈씨 -> 그 다음에 오픈씨가 판매 가능 
    // SO, 여기에서 위임된 내용을 갖고 있음. 왜냐면, ERC721 을 상속했으니까, 

    // 이걸 실행시키는 곳은 판매 컨트랙트! saleNFT!
    // function setAppAll(address owner, address operator, bool approved) public {
    //     _setApprovalForAll(owner, operator, approved);  // erc721 안에 있는 함수 임 
    //     // 이걸 실행하면? 
    //         // 매핑 객체에, 위임받은 사람, 위임 사람, 안에 넣는 것 
    //         // 매핑의 키에 매핑이 잇는데, 그 안에 주소랑 true, false  수정 
    //         // 그 안에 있는 걸 비교 하는 것. 
    //         // 값 변경에 대한 함수 
    //         // 매핑 안에 있는 매핑 객체를 수정하는 함수 
    //     // 판매 컨트랙트로 판매 등록을 할 수 있게 

    // }

    // nft 소유 권한에 대한 내용 