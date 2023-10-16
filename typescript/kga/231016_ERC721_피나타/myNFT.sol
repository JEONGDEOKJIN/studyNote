// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 직접 폴더 경로 하드코딩
import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor( string memory _name, string memory _symbol ) ERC721(_name, _symbol) {

    }

    function minting(uint256 _tokenId) public {
        _mint(msg.sender, _tokenId);
    }

    // url 값을 읽어서 - nft 내용을 띄워준다. 
        // 내용이 이미 있는 
        // tokenURI 에 있는 함수 내용을 '수정(덮어쓰기)' 한 것 ⭐⭐⭐⭐⭐ 
    function tokenURI( uint256 _tokenId) public view override returns(string memory){
        return "QmXYZfqe2JVbHP28JdUj1AWcZpJKUa2GMFgEmUYg2iMY1N";     
            // json 을 피나타에 올려서 -> 해시 값을 여기에 넣어야 함 

    }

    function _baseURI() internal view override returns(string memory) {
        return "https://coffee-managing-crow-891.mypinata.cloud/ipfs/";  // 베이스 url 값을 따로 지정 
        

    }

}