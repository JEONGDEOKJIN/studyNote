// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    mapping(uint256 tokenId => string tokenURI) _tokenURIs;
    uint256 totalSupply = 0;

    function minting(string memory tokenURI) public {
        _tokenURIs[totalSupply] = tokenURI;
        _mint(msg.sender, totalSupply);
        totalSupply += 1;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    // nft 정보를 opensea
    // _baseURI() + tokenURI(0) {}
    // _baseURI() + tokenURI(1)
    // _baseURI() + tokenURI(2)

    function _baseURI() internal view override returns (string memory) {
        return "https://copper-wrong-haddock-919.mypinata.cloud/ipfs/";
    }

    // NFT에 관련된 메서드는 여기에
    // NFT의 판매 권한을 줄 함수를 여기에 작성을 해서
    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);
    }

    // NFT의 소유권 및 권한 설정
    // 민팅 
}
