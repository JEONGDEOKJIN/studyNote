/*  [TDD]
    - 특징
        - 여기에 테스트 코드 작성하고 -> 그 다음 개발로 들어간다. 
        - 실행시키는 건 JEST! (페이스북에서 만듦)    
        - 테스트 단위 별로 쪼개서 진행할 수 있음. 
    
    - 효과 
        - 코드 품질을 올릴 수 있음. 
        - '단위별 테스트' 를 진행하기 때문에, 디버깅을 하고, 코드 작성을 할 수 있음. 

    - 방법 
        - 1단계 코드를 실행하고 -> 그 뒤에, 2단계 코드를 실행 
        - ex) 상위 카테고리에서 실행하고 -> 그 아래로 내려간다. 

    - 궁금증 
        - 테스트 하지 않는거랑, 테스트 하는 거랑 어떻게 다르지? 
        - 블록체인 말고 다른 것도 테스트 가능? 👉 알아가보기 
        - 하향식 테스트랑 관련이 있나?
*/

/* [jest 로 테스트 하기]

    [테스트 하려면 필요한 요소]
        - describe : 테스트 하고 싶은 '그룹' 을 지정한다.
        - it : 해당 그룹 안에서, 테스트 하고 싶은 '케이스' 를 지정한다. 
        - expect(변수).toBe(값) : 특정 변수의 값이, toBe 의 값인지 여부를 테스트 한다. 
        - 검사 결과는 IDE 창에 나옴

    [describe 문법]
        describe( "그룹 지정" , () => {검증 하고자 하는 함수!} )

    [it 문법]
        it("테스트 케이스 지정" , () => {검증 하고자 하는 함수!} )
    
    [expect, toBe 문법]
        expect(isValidNewBlock.isError).toBe(false);
            [해석] 나는 isValidNewBlock.isError 의 값이 이상적으로(toBe) false가 되기를 기대한다(expect)

*/


// 모듈 import
import { Block } from '@core/block/block'
import { GENESIS } from '@core/config'
import Chain from '@core/chain/chain';


// 'block 검증' 그룹 테스트 하기
describe("block 검증" , () => {

    let newBlock : Block;
    let newBlock2 : Block;
    let newChain : Chain;

    // 테스트할 코드의 최소 단위

    // '블록이 잘 추가 되는지 여부' 를 테스트 | 이 테스트가 맞나❓ | 
    it("블록 추가" , () => {
        const data = ["Block 1"];       // "뉴스 기사" 처럼 새로운 data 를 가져올거야
        newBlock = Block.generateBlock(GENESIS, data)   
            // [해석] '문제를 맞혀서, nonce 가 업데이트된' block 이 newBlock 에 들어감. 
        console.log(newBlock)
            
        const data2 = ["Block 2"];
        newBlock2 = Block.generateBlock(newBlock, data2);
            // [해석] '문제를 맞혀서, nonce 가 업데이트된' block 이 newBlock2 에 들어감. 
        console.log(newBlock2)
    })
        /* [단위를 이렇게 나눈 이유는?]
            - 여기에서는, 단순히, 블록을 이렇게 나누는 구나! 를 테스트?
        */

    
    it("블록 유효성 검증 | 정상적인 블록인지 검증 |" , () => {
        const isValidNewBlock = Block.isValidNewBlock(newBlock , GENESIS)
    
        if(isValidNewBlock.isError){
            // 성공한 결과가 맞는지 확인할 때 쓰는 코드 ❓
            return expect(true).toBe(false);
                // return expect(isValidNewBlock.isError).toBe(false); -> 이거 여야 하는거 아닌가?
                // expect : toBe 값이 맞는지 확인할 때 사용하는 코드 
        }

        expect(isValidNewBlock.isError).toBe(false)
            /* [해석]
                나는 isValidNewBlock.isError 의 값이, 이상적으로(toBe), false 가 되기를 기대한다(expect)
            */
            /* [수업 필기]
                if(isValidNewBlock.isError){        
                 // 즉, 성공한 결과가 맞는지 확인할 때 쓰는 코드  
                    return expect(true).toBe(false);
                expect : toBe 값이 맞는지 확인할 때, 사용하는 코드
                이전 블록인 new 블록을 쓰면 유효성 검사를 통화할 것 
           */
    })



    it( "chain 에 블록 추가" , () => {
        // Chain 인스턴스 생성
        newChain = new Chain();
            /*
                Chain 의 인스턴스 = {
                    chain : [GENESIS] 
                    get : function(){ } 
                    length : function(){}
                    latestBlock : function(){}
                    addToChain : (receivedBlock) => {}
                    getBlock : (callbackFn) => {}
                    getBlockByHeight : (height) => {} 
                    getBlockByHash : (hash) => {} 
                    getAdjustBlock : () => {} 
                    serialize : () => {}
                    deserialize : (chunk) => {}
                    replaceChain : (receivedChain) => {}
                    getAdjustmentBlock : () => {}
                }
            */

        // 새로운 data 를 추가해서 만든 block 을 chain 에 추가
        newChain.addToChain(newBlock); 
            // [궁금증]
                // addToChain 의 return 은 this.latestBlock() 임. 
                // 그러면, 방금 막 추가한 block 만 나오나? 어떻게 확인하지❓❓
                console.log(newChain)
    
    
        console.log(newChain.get());        // 현재, 전체 체인 (block 들의 배열) 을 확인
        
        console.log(newChain.getBlockByHeight(1));      // block 들 중에서, 높이가 1 인 값, 을 가져오기
            /* [실행순서]
                    1. getBlockByHeight 에 매개변수 1 이 들어감 
                    2. getBlockByHeight 함수에서 this 가 확정되고 -> 매개변수가 확정된 상황에서 getBlock 이 호출 
                    3. getBlock 에서 this 확정 -> chain 이 배열이라는 게 확정 -> find 메소드 를 만나서 배열을 하나씩 콜백함수로 던져서 '콜백함수' 를 실행
            */
    
        console.log(newChain.getBlockByHash(newBlock.hash));        // 새로운 블록의 hash 를 넣어서, block 가져오기 
            // [궁금증] 찾으면, 뭘 내보내는 거야?
                // find 메서드에 의해서, 해당 조건에 만족하는, block 이 나오게 됨. 
                // 단, find 메서드 특성상, 아마도 첫 번째 block. | 혹시나 나중에 더 정교하게 해야할 수도
    })
    

    // 네트워크 간 체인 비교
    it( "네크워크 간 체인 비교(longest chain rule, 롱기스트 체인 룰)" , () => {     
        let newChain2 = new Chain()
        newChain2.replaceChain(newChain.get())
            // [해석] newChain.get() = newChain(예전에 있던 chain) 의 block 들이 있는 배열

    })


    // 블록 난이도 조절
    it("이전 10번째 블록 or 최초 블록" , () => {
        
        for(let i = 0; i < 20; i++){
            let block = new Block(GENESIS , ['block'])
            newChain.addToChain(block)
        }

            // for문이 20번 실행 되었으므로, newChain 에는 20개의 block 들이 있음!   
            console.log(newChain.getAdjustmentBlock());
                // 길이가 10번째 인 블록! 
    })
        /* [난이도 조절 해석]
            모든 블록의 높이가 1로 통일되어 있는데, 정말 그러한지 확인
            이렇게 코드를 치면, 동일한 GENESIS 만 20번 생성됨
            그래서, previousBlock 매개변수에, 이전에 생성된 블록을 넣을거고, 
            그걸 배열에 넣고, 끝에걸 가져와준다. 
        */

        /* [향후 학습 포인트]
            코드를 보기보다는 '흐름도' 를 보는게 중요 
                블록은 뭐로 구성되고 
                블록 생성, 체인 추가할 때 블록 검증해서 추가하고, 검증할 때 높이 해쉬 등으로 확인하고 
                블록 해시가 뭐고, 머클루트가 뭔지, 
                제인 긴 체인이 정답이다, 
                본인 체인보다 더 길면, 그게 정답이다, 
        */


        

} )

    
