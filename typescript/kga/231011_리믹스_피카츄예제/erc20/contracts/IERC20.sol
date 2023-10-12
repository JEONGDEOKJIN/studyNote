// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {

    function totalSupply() external view returns(uint);

    // 잔액 조회 함수
    function balanceOf( address account ) external view returns(uint);
        // external : 외부 전송 | 내부에서 안 되고, 외부의 CA 또는 EOA 에서 실행

    // 다른 계정으로 보내는 함수 
    function transfer(address to , uint amount) external returns (bool);

    // 위임 😥😥😥 약해 
    function allowance(address owner , address spender) external returns (uint);

    // 위임 받아서 사용할 수 있게 
    function approve(address spender , uint amount) external returns (bool);

    // 제3자가 위임받은 토큰을, 누군가에게, 보낼 때
    function transferFrom (address spender , address to, uint amount) external returns (bool) ;
        // to : 위임 받은 사람 
        // amount : 얼마나 보낼지

}