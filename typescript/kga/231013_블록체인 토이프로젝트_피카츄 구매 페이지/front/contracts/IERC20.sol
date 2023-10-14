// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface IERC20 {
    // 토큰의 총 공급량
    function totalSupply() external view returns (uint);

    // 주어진 account 에 대해서, '토큰 잔액' 을 반환
    function balanceOf(address account) external view returns (uint);

    // 발신자로(msg.sender) 부터, 지정된 to 주소로, amount 만큼의 토큰 전달 | return 은 true, false
    function transfer(address to , uint amount) external returns (bool);

    // spender 가 owner 의 토큰을 얼마나 전송할 수 있는지에 대한 '허용량' |
    function allowance(address owner, address spender) external returns (uint);

    // 메시지 발신자가 spender에게 최대 amount만큼의 토큰 전송을 허용 | #📛 잘 이해가 안 됨
    function approve(address spender, uint amount) external returns (bool);

    // approve 함수를 통해 허용된 만큼의 토큰을 to 주소로 전송 | #📛 잘 이해가 안 됨
    function transferFrom(
        address spender, 
        address to, 
        uint amount
    ) external returns(bool);
}

