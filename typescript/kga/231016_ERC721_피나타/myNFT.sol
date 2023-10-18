// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 직접 폴더 경로 하드코딩
import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor( string memory _name, string memory _symbol ) ERC721(_name, _symbol) {

    }

    // 1. tokenId 안에, ca 주소 뿐 아니라, hash 값 있게 하기  
        // mapping(uint256 tokenId => address) private _owners;
        // mapping(  tokenID =>  CA 주소? ) public owner
        // 적을 때, 조금 변형해서, 적어야 해? 
        // 아니면, 그대로 적어야 해? 
        // 아. 그러면, _tokenId 안에, ca 주소랑, hash 값을 같이 넣어두면 되겠네 


    // 메타데이터 내용 확정하기 
        // tokenId 랑, URI 를 mapping 할  _tokenURIs
        mapping(uint256 tokenId => string tokenURI) private _tokenURIs;
        uint256 totalSupply = 777;

        // 민팅 | 'ERC721 토큰' 과 '구매자 msg.sender' 를 연결
        function minting(string memory _tokenURI) public {
            _tokenURIs[totalSupply] = _tokenURI;
            _mint(msg.sender, totalSupply);  // 이 순간 tokenId 지정 ⭐⭐
            totalSupply += 1;   
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




    // nft 관련 메서드는 여기에 ⭐⭐⭐ 에 작성
    // 여기에서 판매 관련 적고 
    
    // [위임 개념] ⭐⭐⭐⭐⭐ OPENSEA 를 보면, ERC721 에 보면 SETapporovalforall 로 권한을 위임 to 오픈씨 -> 그 다음에 오픈씨가 판매 가능 
    // SO, 여기에서 위임된 내용을 갖고 있음. 왜냐면, ERC721 을 상속했으니까, 

    // 이걸 실행시키는 곳은 판매 컨트랙트! saleNFT!
    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);  // erc721 안에 있는 함수 임 
        // 이걸 실행하면? 
            // 매핑 객체에, 위임받은 사람, 위임 사람, 안에 넣는 것 
            // 매핑의 키에 매핑이 잇는데, 그 안에 주소랑 true, false  수정 
            // 그 안에 있는 걸 비교 하는 것. 
            // 값 변경에 대한 함수 
            // 매핑 안에 있는 매핑 객체를 수정하는 함수 
        // 판매 컨트랙트로 판매 등록을 할 수 있게 

    }

    // nft 소유 권한에 대한 내용 


}