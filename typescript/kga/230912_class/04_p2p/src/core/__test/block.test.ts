
// 여기에 TDD 작성 
// 테스트 코드 작성하고 -> 그 다음 개발 
// 테스트 코드 작성하고, 실행시키는 건, JEST ! (페이스북에서 만듦)


// 테스트를 단위별로 쪼개서, 진행할 수 있음. 
// 그룹에 대한 테스트를 진행하면, 코드 품질을 올릴 수 있음. 

// 테스트 코드를 작성하면, 시간이 오래 걸리긴 하지만, 코드의 품질을 좀 더 올릴 수 있다. 
    // 단위별로 테스트를 진행하니까, 디버깅을 하고, 코드를 작성할 수 있기 때문에

// 단위가 진행될 때 
    // 1단계 코드를 실행하고 
    // 그 뒤에 2단계 코드를 실행한다. 
    // 이렇게 절차적으로 테스트를 진행해볼 수 있다. 
    // ex) 위에서 로그인 -> 내려간다. 


import { Block } from '@core/block/block';
import { GENESIS } from '@core/config';
import Chain from '@core/chain/chain'
// import Block from ''

// 이 녀석으로, 테스트들의 그룹화! 를 지정할 수 있음!
    // describe("block 테스트 코드 그룹" , () => {
    //     // 테스트들의 단위를 어떻게 작성하는가! 
    //     // 하나의 테스트 단위
    //         // 첫 번째 매개변수에는 테스트 이름 
    //         // 두 번째 매개변수는 테스트의 동작을 가지고 있는 콜백함수
    //     it("제네시스 블록 테스트" , () => {
    //         console.log(GENESIS);
    //         // console.log(GENESIS);
    //     })
    //         // 이거 끝나면 👇밑으로 가면서 테스트 하고 -> 그 다음에 밑에 테스트 하고 

    //     it("오류 테스트" , () => {
    //         // 만약, 오류가 생기면, 여기에 잡힐 것! ⭐⭐⭐
    //             // console.log(GENESIS2)
    //     } )

    //     // 블록을 검증하는 코드 




    // })
        // 이 코드들에는 블록 검증 코드가 있습니다~ 이렇게
        // 이 그룹에 대한 설명을 string 으로 작성 

        // 첫 번째 매개변수 : 그룹명. 어떤 테스트 그룹인지! 
        // 두 번째 매개변수 : 테스트들을 실행시키는 콜백함수! 



// describe : 테스트 코드의 그룹 단위
    // 이제 block 을 '검증' 하는 코드 만들기 
    describe("block 검증" , () => {

        let newBlock : Block;
        let newBlock2 : Block;
        let newChain : Chain;
        let newChain2 : Chain;
        
        // 테스트할 코드의 최소 단위
        it("블록 추가" , () => {
            const data = ["Block 1"];
            newBlock = Block.generateBlock(GENESIS, data , GENESIS)

            // 블록의 난이도에 따른 마이닝을 동작해서, 조건에 맞을 때 까지, 연산을 반복한 뒤, 
            // 생성된 블록을, newBlock에 받아온다. 
            // 이전 블록은 GENESIS(최초블록)
            console.log(newBlock);
            

            // 새로운 데이터 
            const data2 = ["Block2"]

            newBlock2 = Block.generateBlock(newBlock , data2 , GENESIS);
            console.log(newBlock2)

        } )

        it("블록 유효성 검증. 이 블록이 정상적인이 검증" , () => {
            const isValidNewBlock = Block.isValidNewBlock(newBlock, GENESIS)    // 🔵 작동함 
            // const isValidNewBlock = Block.isValidNewBlock(newBlock2, GENESIS)    // 미작동. 왜냐면, newBlock2 라는 틀린 데이터를 넣었기 때문에  😥
            if(isValidNewBlock.isError){
                // 즉, 성공한 결과가 맞는지 확인할 때 쓰는 코드  
                return expect(true).toBe(false);
                    // expect : toBe 값이 맞는지 확인할 때, 사용하는 코드
            }

            expect(isValidNewBlock.isError).toBe(false);
                /*
                    if(isValidNewBlock.isError){
                     // 즉, 성공한 결과가 맞는지 확인할 때 쓰는 코드  
                        return expect(true).toBe(false);
                    expect : toBe 값이 맞는지 확인할 때, 사용하는 코드
                    이전 블록인 new 블록을 쓰면 유효성 검사를 통화할 것 
                }
                */
        })

        it("블록 체인 추가" , () => {
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
                newChain.addToChain(newBlock)            
                console.log(newChain.get())     // 현재, 전체 체인 (block 들의 배열) 을 확인
                console.log(newChain.getBlockByHeight(1))   // block 들 중에서, 높이가 1 인 값, 을 가져오기
                /* [실행순서]
                    1. getBlockByHeight 에 매개변수 1 이 들어감 
                    2. getBlockByHeight 함수에서 this 가 확정되고 -> 매개변수가 확정된 상황에서 getBlock 이 호출 
                    3. getBlock 에서 this 확정 -> chain 이 배열이라는 게 확정 -> find 메소드 를 만나서 배열을 하나씩 콜백함수로 던져서 '콜백함수' 를 실행
                */


            // 이거 해시 조회는 나중에! 테스트 코드를 추가할 때 마다 해시가 바뀌기 때문에! 
            // 생성될 때 해시가 바뀌기 때문에! 
            // 현재 테스트 코드에서는 못 할 듯. 
            // 할거면, newBlock 의 해시로 넣거나 해야 할 듯 
            // console.log(newChain.getBlockByHash('1a27cf7fbd14bdb2fb7a6b8ed97bda79165b2c46160ec5948a0710229a32ed24'))
            console.log(newChain.getBlockByHash(newBlock.hash))     // 이거 해도 찾아짐🔵
            console.log("🚀🚀newchain" , newChain.get())
        })
        



        it("네트워크 체인 비교(longest chain rule (롱기스트 체인 룰)" , () => {
            newChain2 = new Chain();
            newChain2.replaceChain(newChain.get())

            console.log(newChain2.get())
                // 첫번째 체인이 좀 더 기니까, 본인 체인을 갈아 꼈음.
        })


        // 블록 난이도 조절할 때! 
            // 그 블록 생성 주기 난이도를 올리고, 내리고
        it("이전 10번째 블록 or 최초 블록" , () => {
            // 지금 현재 블록을 생성한다고 가정하고 
            // 현재 블록이 생성된 시간이, 이전 10번째 블록으로 부터, 얼마나 걸렸는지 확인! 
            // 블록의 정해진 생성 주기 보다, 빠르면, 난이도를 올리고, 아니면 내린다. 

            for (let i = 0; i < 55; i++) {
                let block = Block.generateBlock(newChain.latestBlock(), ["block"], newChain.getAdjustmentBlock())
                newChain.addToChain(block)                
            }

            // for문이 20번 실행 되었으므로, newChain 에는 20개의 block 들이 있음!   
            console.log(newChain.getAdjustmentBlock());
                // 길이가 10번째 인 블록! 
        })

        
        // 이후에 peer to peer 연결해서, 비교 
        // 그 다음 지갑에 뭐가 있고, 
        // 트랜잭션의 내용을 좀 더 들어갈 것 
        // 여기까지 한거 해서, 

        // 코드를 보기보다는 
        // '흐름도' 를 보는게 중요 
            // 블록은 뭐로 구성되고 
            // 블록 생성, 체인 추가할 때 블록 검증해서 추가하고, 검증할 때 높이 해쉬 등으로 확인하고 
            // 블록 해시가 뭐고, 머클루트가 뭔지, 
            // 제인 긴 체인이 정답이다, 
            // 본인 체인보다 더 길면, 그게 정답이다, 

    }  )