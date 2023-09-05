export interface IBlockHeader {
    version : string 
    height : number
    timestamp : number
    previousHash : string
}

export interface IBlock extends IBlockHeader {

    // IBlockHeader 를 상속 했으므로, IBlockHeader 의 키 : value 가 들어가 있음.
        /*
            version : string
            height : number
            timestamp : number
            previousHash : string
            이렇게 들어가있는 것 
        */

        // 들어온 data 의 '최종 부모 노드의 해시값'
        merkleRoot : string;
        
        // 이건 어떤 hash 지? 
        hash : string;

        // 블록을 채굴하기 위해, 연산을 몇 번 돌렸는가?
        nonce : number;
            // [궁금증] 몇 번 돌렸는지는, 최종적으로 알게 되는 값 아닐까❓❓

        // 채굴 난이도
        difficulty : number
            // 구체적으로, 어떤 의미가 더 있었던 것 같은데

        // 들어오는 데이터
        data : string[]
    
        /* CF. 블록이란, '헤더' + '해당 news data 의 머클루트' 의 '해시값'  
            따라서, 이전 버전에 있었던 것은 | 😥 추측 😥 
                1) data : ex) news 기사 
                2) 해당 data 를 기반으로 뽑은 merkleRoot
                3) 이제 추가된 게 nonce, difficulty
        */
}