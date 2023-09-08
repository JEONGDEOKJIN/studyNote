
import { IBlock , IBlockHeader } from "@core/interface/block.interface";

class BlockHeader implements IBlockHeader {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
        // implements(상속) 받은 것들은 자동완성 된다.
    
    constructor(_previousBlock : IBlock){
        this.version = BlockHeader.getVersion()
        this.timestamp = BlockHeader.getTimestamp()
        this.height = _previousBlock.height + 1;
        this.previousHash = _previousBlock.hash

    }

    static getVersion(){
        return "1.0.0"
    }

    static getTimestamp(){
        return new Date().getTime();
    }
}

    /* [BlockHeader 클래스 거치면 나오는 것]  
        BlockHeader 의 인스턴스 = {
            version : "BlockHeader 의 getVersion 메소드 실행해서 나옴", 
            height : "이전 블록의 height + 1"   // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
            timestamp : "BlockHeader 의 getTimestamp 메소드 실행해서 나옴",
            previousHash : "이전블록의 hash"    // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
        }
    */

    /* [수업 필기]
        이전 블록의 해시값, 이전 블록에서 높이 1 을 증가시켜서 넣어줘야 할 것 이기 때문
        블록을 생성할 때, 이전 블록 정보가 필요 
        이전 블록의 해시, 다르면 -> 중간에 비었다는 의미 
        이전 블록 높이,
    */


export default BlockHeader