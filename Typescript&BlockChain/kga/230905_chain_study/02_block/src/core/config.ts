
// 제네시스 블록 
    // 최초의 블록은 하드 코딩 

import { IBlock } from "./interface/block.interface";

export const GENESIS : IBlock = {

    version : "1.0.0",
    
    height : 0,     // 최초니까 0번째 라는 의미 (0층에 쌓여있다.)

    timestamp : new Date().getTime(),   // 현재 날짜와 시간

    hash : "0".repeat(64),   // 0 이 64번 반복되는 hash값

    previousHash : "0".repeat(64),      // 이전 hash는 제네시스 블록이니까, 존재할 수가 없으니까, 우선, 기본으로

    merkleRoot : "0".repeat(64), 

    difficulty : 0,     // 최초 난이도 
        /* [생성주기와 블록 난이도]
            - 이상적인 생성주기는 10분 (예시)
            - 10분 보다 빠르면, 
                1) [fork 이슈] 모든 블록이 최종 업데이트를 받기 전에, 추가 블록이 생겨서, 각 블록이 서로 다른 데이터를 갖게 된다.
                2) 따라서, 난이도(difficulty)를 상승 시킨다.
            10분 보다 느리면 
                1) 참여자들의 동기부여가 낮아짐
                2) 난이도(difficulty)를 낮춘다.
        */

    nonce : 0,      // 최초 블록은 0 

    data : ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']

}