import { IBlock , IBlockHeader } from "@core/interface/block.interface";


class BlockHeader implements IBlockHeader {
    version : string;
    height: number;
    timestamp: number;
    previousHash: string;   // 상속 받은 것들은 자동완성된다. 
    
    constructor(_previousBlock : IBlock){
        // 이전 블록의 해시값, 이전 블록에서 높이 1 을 증가시켜서 넣어줘야 할 것 이기 때문
        // 블록을 생성할 때, 이전 블록 정보가 필요 
        // 이전 블록의 해시, 다르면 -> 중간에 비었다는 의미 
        // 이전 블록 높이,
        this.version = BlockHeader.geVersion()
        this.timestamp = BlockHeader.getTimestamp()
        this.height = _previousBlock.height + 1;
        this.previousHash = _previousBlock.hash

    }

    static geVersion(){
        return "1.0.0"
    }

    static getTimestamp(){
        return new Date().getTime();
        // return new Date.now();
    }

}

export default BlockHeader