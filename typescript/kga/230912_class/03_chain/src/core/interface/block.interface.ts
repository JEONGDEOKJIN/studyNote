export interface IBlockHeader {
    version : string
    height : number
    timestamp : number
    previousHash : string
}


export interface IBlock extends IBlockHeader {
    /*
    version : string
    height : number
    timestamp : number
    previousHash : string
    이렇게 들어가있는 것 
    */

    merkleRoot : string;
    hash : string;
    nonce : number
        // 얼마나 이 블록을 채굴하기 위해, 연산을 몇 번 돌렸는가. 

    difficulty : number
        // 채굴 하는 난이도 

    data : string[]
        // 모든 데이터가 이쪽으로 들어와서!? 
}

// 결과를 편하게 작성하기 위해 이제 interface 작성! 