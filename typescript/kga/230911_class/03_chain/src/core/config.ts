// 제네시스 블록 
    // 최초 블록은 하드 코딩! 


import { IBlock } from "./interface/block.interface";

export const GENESIS : IBlock = {
    version : "1.0.0", 
    height : 0, 
    timestamp : new Date().getTime(), 
    hash : "0".repeat(64), 
    previousHash : "0".repeat(64), 
    merkleRoot : "0".repeat(64), 
    difficulty : 0,     // 최초 난이도 
        // 블록 채굴할 때, 이전 블록 난이도로 마이닝을 함! 
        // 이 블록의 생성 주기를 검사하는데, 생성 주기가 빠르면, 블록의 난이도를 상승시키고, 
        // 블록의 생성 주기가 느리면, 블록의 난이도를 하락 시킨다. 
        // 난이도는 추가한 블록에 기재가 된다. 

    nonce : 0,  // 최초 블록은 0 
    
    data : ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']
    

}