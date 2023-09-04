
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
        
        // 테스트할 코드의 최소 단위
        it("블록 추가" , () => {
            const data = ["Block 1"];
            newBlock = Block.generateBlock(GENESIS, data)

            // 블록의 난이도에 따른 마이닝을 동작해서, 조건에 맞을 때 까지, 연산을 반복한 뒤, 
            // 생성된 블록을, newBlock에 받아온다. 
            // 이전 블록은 GENESIS(최초블록)
            console.log(newBlock);
            

            // 새로운 데이터 
            const data2 = ["Block2"]

            newBlock2 = Block.generateBlock(newBlock , data2);
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


        
    }  )