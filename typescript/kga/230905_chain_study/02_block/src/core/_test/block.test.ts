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


// 'block 검증' 그룹 테스트 하기
    describe("block 검증" , () => {

        let newBlock : Block;
        let newBlock2 : Block;

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



    })