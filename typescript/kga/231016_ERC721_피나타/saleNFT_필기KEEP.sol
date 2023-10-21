// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.20;

import "./myNFT.sol";


contract SaleNFT {
    // 교수님이 올려주신 파일 버전이 있음 ⭐⭐⭐ | 꼭 확인 ⭐⭐⭐ 

    // SaleNFT 이게 왜 있어야 해? 
        // 누가 판매 등록을 한 nft 들이 보여야 함 
        // 판매 등록된 객체들, 판매 금액, 이 얼마인지를 다루는 컨트랙트
        // myNFT 는 권한만 관리 
        // SaleNFT 는 객체, 판매 관리, 금액 등 에서 다룬다. 

    
    // 상호작용할 CA 의 주소가 필요 
    MyNFT public _nft; 


    // 상호작용할 컨트랙트를 담을 상태 변수
    constructor(address _nftCA) {
        // 상호작용할 ca 인스턴스 생성 ⭐⭐⭐⭐⭐⭐⭐⭐ 
            // 상태 변수에 담아놓는다.| 이미 배포된 ca 주소 담겨 있는거 
        _nft = MyNFT(_nftCA);
            // [해석] 이렇게 MyNFT 인스턴스를 생성하면, SaleNFT 안에서, 인스턴스를 통해, MyNFT 컨트랙트의 내부 함수를 사용할 수 있게 됨. ⭐⭐  
    }


    // 이렇게 담긴 것 사용하기 | ca 와 ca 간 ⭐⭐⭐⭐⭐ 
    function _saleNFTmint(string url) public  {
        // ca 에서 ca 로 메시지 전송 | 메서드 실행 | 민팅 함수를 sale nft 에서 실행할 수 잇음. 
        _nft.minting(url);
    }

    // 판매에 대한 함수를 작성하고 - nft 관련 메서드는 myNFT.sol 에 작성
        // saleNFT 에서 myNFT 메시지를 보내서 NFT 권한을 위임받는 함수를 실행해보기

    function setApprovalForAll() public {
        // mynft 에 있는 ca 실행시키려면, 메시지 보내야 해 
        _nft.setAppAll(msg.sender , address(this) , true);
            // msg.sender : 지금 컨트랙트 신청
            // address (this) : 지금 보고 있는, 이 SaleNFT 주소에게, 권한을 위임하니까
            // 이 내용은 
                // 판매 컨트랙트가, 지금 컨트랙트를 실행시킨 사람의 NFT 모든 권한을 위임 받았다. 는 값을 ERC721 안에 넣음 
                // 권한 위임 받을 때, 이렇게 받음 
    }

    // 권한을 받았는지 확인 | 검증 | 값이 있는지 없는지만 확인 
    function salesNFT() public view returns (bool) {
        return _nft.isApprovedForAll(msg.sender , address(this));
        // ERC721 에서, isApproval뭐시기 메소드 -> 이걸 확인하면, 매핑 객체 안에, 또 매핑 객체가 있음. 주인, 위임 받은 사람, 에 대한 true false 나 나옴  
    
    }   


    // 판매 내용
    // 누가 판매 등록했는지를 다루는 상태변수 등 
    // 금액은 얼마로 설정했는지 
    // 판매 등록 시기 
        // 블록이 하나 생성될 때 라던지 
        // 올려놓고, 구매자가 들어왔다 던지 
        // 구매자가 발생하면, 판매자가 확인할 수 있고 
        // 수락 확인 버튼을 누르면, 판매자는 이더리움을 가져오면 된다. 
        // 판매 확인 버튼을 누르면, 이더를 받고, 소유권을 구매자에게 넘긴다. 
        // 블록 시기는 경매 붙이면 -> 기간, 날짜, 시간 등 
            

        // ca 가 eoa 에게 뭘 못 해 ?
        // 돈응ㅇ커 ?
        // 구매 ca 판매 ca 에 보내놔 판매가 판매 확인 누르면 ca에서 보냄❓❓❓ 

    // 구매자 가 발생하면 
        // 구매 신청 하면, 상품의 금액 만큼, ca 에 이더를 보낸다. 
        // 판매 컨트랙트에는 이 사람이 보낸 이더가 들어았음 
        // ca 에서 이더리움을 받고, 소유권을 구매자에게 넘김 
        // 그러면, 거래 끝 ! 하 ! 



}