import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";
import { Failable } from "@core/interface/failable.interface";
    /*  [궁금증] 
        Failable 이 현재, 어떤 기능을 하는지 잘 이해 안 됨
    */


class Chain {

    private chain : Block[] = [GENESIS]
    /* [해석]
        ' : Block' = Block 클래스를 타입으로 사용한다 = Block 클래스의 인스턴스가 chain의 타입으로 온다
        ': Block[]' = 그 인스턴스 타입들이 배열에 담긴다. 

        즉, chain 은 1) 'Block 클래스의 인스턴스 or 인스턴스들' 이 담긴 2)⭐'배열'⭐ 이다. 
        이것을 가능하게 하는 문법은 Block[] 이것임 | 😥 몰랐었음!!
        이걸, '배열 타입 표기법' 이라고 함 | 😥 명확히 몰랐었음 !!  
    */

    private readonly INTERVAL = 10;
    /* [해석]
        readonly : '읽기 전용' 이라는 의미. 한번 설정하면, 다른 곳에서 수정 불가 
        INVERVAL : 변화하지 않는 '상수' 라는 의미에서 대문자로 작성
    */

    // 현재 인스턴스에 있는 chain 반환
    get(){
        return this.chain       
    }

    // 길이 반환 
    length(){
        return this.chain.length
    }

    // 체인에 마지막으로 추가된 블록 반환 함수 
    latestBlock(){
        return this.chain[this.length() - 1]
            // [해석] length() 는 1부터 카운트를 함 -> 그래서, 배열 안에서 '끝 인덱스' 를 가져오려면, -1 을 해야 함.
    }

    // 새로운 데이터로 만든 'block' 을 'chain' 에 추가하는 메서드 
    addToChain(receivedBlock : Block){
        this.chain.push(receivedBlock)
            // [궁금증] 그러면, 언제, receivedBlock 을 받게 되는거지?  

        // 블록을 검증하고 추가!
        return this.latestBlock()
    }

    // 블록을 조회
    getBlock( callbackFn : (block : Block) => boolean ){
        
        const findBlock = this.chain.find(callbackFn)

        // 블록이 없으면 -> "찾은 블록 없음" 을 보냄
        if(!findBlock) throw new Error("찾은 블록이 없음!")
        // 블록 있으면 -> findBlock 을 던짐
        return findBlock
    }
        /* [해석]
            매개변수로 'callbackFn' 함수가 온다. 
            'callbackFn 함수' 는 (block : Block) => boolean 이러한 타입 이어야 한다. 
            ⭐매개변수로 정했다는 건, 구체적인 함수 기능은, 함수 호출할 때 정의하게 된다.⭐
            
        */

    // 블록의 높이로, 블록 조회하는 함수
    getBlockByHeight(height : number){
        return this.getBlock( (block : Block) => block.height === height )
    }
        /*
            여기에서 this 는, chain (block 들의 배열) 을 의미.  
        */

        /* [궁금증] 😥😥😥 
            이게 블록의 높이로 블록을 조회할 수 있는 건지 모르겠어..😥😥 
            👇👇👇 여기는 우선 실행 하는 거 보고 다시 와보겠음. 👇👇👇 
            이해 안 하고 그냥 씀 👇👇👇👇👇👇👇👇👇 
        */

    // 블록의 해시로 찾는 함수 
    getBlockByHash(hash : string){
        return this.getBlock( (block : Block) => block.hash === hash )
    }
        // [해석] 실행맥락에서 hash = newBlock 의 hash
        // getBlock 으로 갈 때, '확정된 매개변수의 hash 와, 어떤게 올지 모르는 block 의 hash와 같은지 여부' 라는 불확실한 매개변수를 들고 간다. 


    // 10번째 블록들을 찾는 함수
    getAdjustBlock(){
        const {height} = this.latestBlock();
        const findHeight = height < this.INTERVAL ? 1 : Math.floor(height / this.INTERVAL) * this.INTERVAL;
            // [해석] 
                // 바로 height 를 하지 않고, 나눴다가, 곱한 이유는, 17인 경우 -> 10으로 '내림'! 하기 위해서 
                // Math.floor(height / this.INTERVAL) * this.INTERVAL

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
        // [매개변수 해석] 함수를 실행하는 맥락에서, receivedChain 매개변수 = newChain(예전에 있던 chain) 의 block 들이 있는 배열
        // [output 해석] Input 이 들어와서 -> 1) 받은걸로 replace 가 되면, undefined 2) replace 안 되면, string 

            // 상대방의 체인의 마지막 블록
                const latestReceivedBlock : Block = receivedChain[receivedChain.length -1];

            // 본인의 마지막 블록 
                const latestBlock : Block = this.latestBlock();

            // 상대방의 블록이, 최초블록 이라면 -> 현재 체인이 더 나중의 것이기 때문에 -> replace 하지 않는다 -> error 를 보내!  
            if(latestReceivedBlock.height === 0)
                return {isError : true, value : "상대방 네트워크 체인은 마지막 블록이 최초 블록이다."}
                // [if 문법] {} 괄호 없으면 -> 바로 밑에줄만! 유효 범위! 임! ⭐⭐⭐⭐⭐
                // 따라서, 그 밑에 밑에 줄에 코드가 있어도, 유효하지가 않음⭐⭐⭐ 

            // 상대방의 높이가 내가 가진 것보다, 작거나 같으면 -> 현재 체인이 더 나중의 것이기 때문에 -> replace 하지 않는다 -> error 를 보내!
            if(latestReceivedBlock.height <= latestBlock.height)
            return {isError : true, value : "상대방 네트워크 체인보다, 내 체인이, 같거나, 크다"}

            // 위의 2가지 경우가 아니라면, 'replace' 해야 하는 경우
                // 상대방의 체인이, 내 체인보다 길면, 내 체인을 교체한다. | 업데이트 한다!
            this.chain = receivedChain;
            return {isError : false, value : undefined}
    }
        /* 수업 필기 
            실제 네트워크에서는 좀 더 복잡한 로직이 들어가겠지만, 지금은 체인의 길이를 비교하는 로직을 구현할 것. 
            머클루트, 해시값, 체인 전체 검증 등등의 로직이 더 추가되어 있을 것 임. 
            중요한 건, 체인의 길이를 비교하는 것. : longest chain rule 
            '길이' 는 'heigt' 로 판단한다.! 
            ⭐전체 배경(맥락)⭐ 이 중요하다. 
        */


    getAdjustmentBlock(){
        // [실행맥락] for 문이 20번 돌아갔으니까 -> newChain 에는 20개 block 이 있고 -> this.length() 는 20 임. 

        // 이전의 10번째 블록 가져오는 함수 
        const currentLength = this.length();
        const adjustmentBlock : Block = this.length() < this.INTERVAL? GENESIS : this.chain[currentLength - this.INTERVAL]

        // 최초 블록 or -10번째 반환
        return adjustmentBlock
    }

        /* [수업필기]
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
        */
}

export default Chain