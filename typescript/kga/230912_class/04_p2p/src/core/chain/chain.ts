import { Block } from '@core/block/block';
import { GENESIS } from '@core/config';
import { Failable } from '@core/interface/failable.interface';

class Chain {

    private chain : Block[] = [GENESIS];

    private readonly INTERVAL = 10;
        // 이번 10번째 블록, 
        // 값으로 사용하려고 미리 선언해둔 것 

    // 현재 체인을 반환하는 함수 | 현재, 전체 체인 (block 들의 배열) 을 확인
    get(){
        return this.chain       // 체인 확인
    }

    // 길이를 반환하는 함수
    length(){
        return this.chain.length
    }

    // 체인에 마지막으로 추가된 블록 반환 함수
    latestBlock(){
        return this.chain[this.length() - 1]
            // 마지막 블록을 반환 
    }

    // 블록 추가 메서드 
    addToChain(receivedBlock : Block) {
        this.chain.push(receivedBlock);

        // 블록을 검증하고 추가! 
        return this.latestBlock();
    }
        // 블록을 받는다. 

    // 블록을 조회하는 메서드 
    getBlock(callbackFn : (block : Block) => boolean ){
        const findBlock = this.chain.find(callbackFn);
        
        // 블록이 없으면 -> 블록 없음! 이라고 내보냄! 
        if(!findBlock) throw new Error("찾은 블록이 없음!")
        
        // 블록이 있으면! findBlock 을 던짐
        return findBlock
    }

    // 블록의 높이로 블록 조회 하는 함수
    getBlockByHeight(height : number){
        return this.getBlock((block : Block ) => block.height === height );
    }

    // 블록의 해시로 찾는 함수 
    getBlockByHash(hash : string){
        return this.getBlock( (block : Block) => block.hash === hash )
    }

    // 10번째 블록들을 찾는 함수
    getAdjustBlock(){
        const {height} = this.latestBlock();
        const findHeight = height < this.INTERVAL ? 1 : Math.floor(height / this.INTERVAL) * this.INTERVAL;

        // 10번째들의 블록의 높이로 블록을 조회해서 블록을 반환
        return this.getBlockByHeight(findHeight)
    }

    // 다른 네트워크로 체인을 보낼 때
        // 길이가 더 긴 체인이 맞는 거니까, 이걸 교체할 거야 
        // 데이터를 주고 받을 때는, 문자열로 주고 받음. 
    serialize(){
        return JSON.stringify(this.chain);
    }

    // 다른 네트워크에서 체인을 받을 때
    deserialize(chunk : string){
        return JSON.parse(chunk);
    }

    // 상대방 체인과 본인의 체인을 비교 
    replaceChain(receivedChain : Block[]):Failable<undefined , string>  {

        // 정상처리 되면 -> 
        
        // 본인의 체인과 상대방의 체인을 검사하는 로직!
            // 길이를 비교하는 로직! 이 들어갈 것 임.
            // 실제 네트워크에서는 좀 더 복잡한 로직이 들어가겠지만, 지금은 체인의 길이를 비교하는 로직을 구현할 것. 
            // ⭐전체 배경(맥락)⭐ 이 중요하다. 
            // 머클루트, 해시값, 체인 전체 검증 등등의 로직이 더 추가되어 있을 것 임. 
            // 중요한 건, 체인의 길이를 비교하는 것. : longest chain rule 
                // 즉, 더 긴 체인이 정답이다. 
            
            // 상대방의 체인의 마지막 블록
                const latestReceivedBlock : Block = receivedChain[receivedChain.length -1];

            // 본인의 마지막 블록 
                const latestBlock : Block = this.latestBlock();

            // 최초블록 이라면, error 를 보내!  
            if(latestReceivedBlock.height === 0)
            return {isError : true, value : "상대방 네트워크 체인은 마지막 블록이 최초 블록이다."}
                // {} 괄호 없으면 -> 바로 밑에줄만! 유효 범위! 임! ⭐⭐⭐⭐⭐
                // 따라서, 그 밑에 밑에 줄에 코드가 있어도, 유효하지가 않음⭐⭐⭐ 

                // [DJ] Error 인 이유 : 네가 바꾸려, replaceChain 메소드에 방문했는데, 못 바꾼다! -> 그러니까, 에러다!

            // 상대방의 높이가 내가 가진 것보다, 작거나 같으면 -> 업데이트 필요 없음
            if(latestReceivedBlock.height <= latestBlock.height)
            return {isError : true, value : "상대방 네트워크 체인보다, 내 체인이, 같거나, 크다"}
                // 이렇게 되면, 업데이트를 할 필요가 없다! 

            // 상대방의 체인이, 내 체인보다 길면, 내 체인을 교체한다.
                // 새로 전달받은 체인으로 업데이트!
            this.chain = receivedChain;
            return {isError : false, value : undefined}
    }
    

    // 현재 블록 생성 시점에서, 이전 -10 번째 블록 구하기
    // 현재 높이값 < 10 : 최초 블록을 반환하고 
    // 현재 높이값 > 10 : -10번째 블록을 반환
    // 이전 10번째 블록의 생성 시간의 차이를 구해서, 
        // 그 차이가 블록 생성 주기보다 빠르면, 난이도를 증가!!!!!!!!!!!!! 
    // 생성 주기가 느리면, 난이도 하락!!
    // 비트코인 기준으로, 블록의 생성 시간은 10분에 1개 
    // 10개가 생성되는 시간은 100분
        // 100분 보다 빠르면, 난이도를 상승 
        // 100분 보다 느리면, 난이도를 하락
    getAdjustmentBlock(){

        // 이전의 10번째 블록 가져오는 함수 
        const currentLength = this.length();
        const adjustmentBlock : Block = this.length() < this.INTERVAL? GENESIS : this.chain[currentLength - this.INTERVAL]

        // 최초 블록 or -10번째 반환

        return adjustmentBlock
    }
}


export default Chain

