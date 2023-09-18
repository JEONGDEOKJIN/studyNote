
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

            for (let i = 0; i < 1; i++) {
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


    // 지갑 구성 
        // 개인키, 공개키, 서명
        // 지갑 주소, 계정 만들기
        // 개인키와, 공개키 서명을 이용한 신원 인증 방식은, 분산 원장, 이라는 이해가 필요. 

        // '분산 원장'
            // - 장부를 모두가 관리하는 것.
            // 데이터 '합의' 기술 임. 

        // crypto, elliptic, crypto-js

        // npm i -D crypto
        // npm i -D crypto @types/elliptic
        // npm i -D crypto @types/crypto-js


    import {randomBytes} from "crypto"
        // ❓❓랜덤값이 왜 필요하지? 256 랜덤값을 16진수로 만든게 필요하기 때문에, 랜덤 값이 필요

    import elliptic  from "elliptic"

    import {SHA256} from "crypto-js"


    const ec = new elliptic.ec("secp256k1");
        // 비트코인, 이더리움은 '타운 곡선 알고리즘' 을 사용함 
            // secp256k1 이건, 비트코인, 이더리움에서 사용되는 '타운 곡선 알고리즘의 별명'
            // 별명은 '기준점' 에 따라서, 붙인다. 
                // http://wiki.hash.kr/index.php/%ED%83%80%EC%9B%90%EA%B3%A1%EC%84%A0%EC%95%94%ED%98%B8
                // 이 곡선 중에서, 기준점을 어디에서 사용할지! 를 의미함 
            // 키 생성 및 디지털 서명!(서명 쓰는 이유는, 진짜 네가 한게 맞는지 확인하기 위해서⭐⭐), 주소 생성, 
            // 타원 곡선의 별명 

        
        // 전달하는 사람과 받는 사람 등 모든 사람들은, 공통적으로, 타운곡선의 한 점을 알고 있어야 함 ⭐⭐ 
        // 이 점을 '타원 곡선의 기준점(base point)' 이라고 함. 
        // 타원곡선의 기준점 좌표가 뭐냐에 따라, -> 타원 곡선에 별명을 붙여준다. 

        // 비트코인과 이더리움에서 사용되는 타원 곡선 별명 secp256k1 임. 

        // y^2 = x^3 + ax + b
            // 이 방정식에 만족하는 곡선이 그어짐
            // secp256k1이 친구가 사용하는 곡선 
                // a 가 0, b 가 7, 기준점 G 는 X 및 Y 좌표를 ✅ 16진수로 표현한 것
                // G 는 '02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798' 이것 임 
            // 대입하면 
                // y^2 = x^3 + 7    // 이 방정식을 사용하게 된다. 

        // A 가 트랜잭션 만들고, 서명을 만들고(영수증)
            // 본인들 볼펜이 하나씩 있어서, (개인키, 본인만 서명할 수 있음)
            // 볼펜 준비. 타원곡선의 지정 범위 내의 값으로 정한다. 
                // 결국, 이게 정수 하나 임
                // 즉, (1 ~ n-1) 까지의 정수 범위. (범위 내의 정수)
                // secp256k1의 n 은 1.157920892373162e+77(과학표기법으로 작성)
                // 이 값을 16진수로 변환하면 FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

        // FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 에서 -1 을 해서 
            // 즉, 타운 곡선, 개인키의, 정수값이 지정될 수 있는 범위는 
            // 1 ~ FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 -1(1을 빼서 뒷 부분이 40이 된다.) 을 한 범위 까지의 숫자 하나를 쓰는 것 
            // 이 범위가 넘어가면 -> 개인키 에러 ⭐⭐⭐⭐⭐
            // 즉 개인키는, 이 범위 중, 한개의 정수값, 을 갖고 사용 ⭐⭐⭐

            // 개인키를 하나, 임시로, 지정 해보면, ⭐⭐⭐ 임시로 지정한다는 것 ⭐⭐⭐ 
                // 이게 임시 값 = FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140

        // 전자 서명을 만들 때 2개의 서명이 필요함.
            // 서명 r 과 s 

            // 서명 r : 트랜잭션을 보낼 때, 개인키 처럼, 정수를 뽑아서, 이 값을, k 라고 함. 
                // 서명 r 구하는 공식 : r = k * G(기준점)

            // 서명 s : k 를 역순으로 구함. 
                // 공식 : k⁻¹ = (z + r * private key) mod n == k
                // k 를 역수 계산
                // z + r * 개인키의 나머지 n 를 구한 것. 
                // k = 서명 r 을 만들 때 뽑은 랜덤값
                // z = 만든 트랜잭션 정보
                // r = 위에서 만든 서명
                // 개인키 = 범위에서 지정하고, 본인만 알고 있는 개인키
                // mod n = n 으로 나눈 나머지 값
                // 포인트 
                    // 공식을 보고 이렇게 이해하는게 중요하지 않음!!!!!!!!
                    // 서명 s 를 만드는데, 개인키를 사용했다는 것 ⭐⭐⭐⭐⭐⭐ 
                    // 즉, 개인키로 서명을 만드는 구나! ⭐⭐⭐⭐⭐ 라는 것. 
                    // 그래서, 서명을 검증하는 식, 은, 
                        // [검증공식] U1 * G(기준점, 모두가 알고 있음) + U2 + 공개키
                        // 서명 r 과 같은지, 비교해서 검증 한다. 
                        
                        // w 동일한 서명을 만들지 않기 위해서, 임의이 값을 추가 | nonce 값이라고 보면 됨 
                        // w = k⁻¹ mod n 
                        // U1 = z * w mod n 
                            // 만든 서명을 사용했다 
                        // U2 = r * w mod n
                        // U1 * G + U2 + 공개키 값을 구해서, 서명 r 과 같은지 비교해서 검증 

                // 전부 이해할 필요는 없음 
                // 포인트는 ⭐⭐⭐⭐⭐
                    // 개인키로 서명을 만든거고 (이러이러한 공식을 통해)
                    // 이 서명을 갖고, 공개키를 통해, 서명을 검증할 수 있음. (검증 공식도 이러이러함) | 무척 복잡한 암호화임

            // 데이터 전송 ⭐⭐⭐⭐⭐⭐⭐
                // [보내는 사람]
                    // 1. 트랜잭션 생성 
                    // 2. 개인키 생성 | 본인이 갖고 있어야 함
                    // 3. 서명 r, 서명 s 를 생성 (개인키를 갖고 서명을 만든다.)

                // [받는 사람]
                    // 1.'U1 * G + U2 + 공개키' 이 공식으로 값을 구해서 -> 서명 r 과 비교(⭐⭐검증) 한다. 


    describe( "지갑 만들기" , () => {
        let privKey : string;
        let pubKey : string;
        let signature : elliptic.ec.Signature;
            // BN : BIG NUMBER 라는 뜻

        it("개인키 생성" , () => {
            
            // 2진수의 랜덤값을 만들자 
            // 16진수로 나타냄
            privKey = randomBytes(32).toString("hex")
        
            console.log("개인키 : " + privKey)
            // 개인키의 길이는 64 자리의 문자열
            console.log("개인키 길이: " + privKey.length)

            // [해석]
                // privateKey = G(기준점) * privateKey 이기 때문에 -> privateKey 만들고 -> 그걸로 공개키를 만든다. 

        })
    
        it("공개키 생성" , () => {
            // 타운 곡선 사용할 수 있는 라이브러리 가져와서 이제 사용
            const keyPair = ec.keyFromPrivate(privKey);

            // 개인키로 공개키를 생성!
            pubKey = keyPair.getPublic().encode("hex" , false)
                // false : 문자열 압축 여부| 중요하지 않음|무조건 false
        

            console.log("공개키 : " , pubKey)
                // 공개키는 130 자의 문자열 | 개인키는 64자리 
            console.log("공개키 길이 : " , pubKey.length)

        })

        it("서명 만들기" , () => {
            const keyPair = ec.keyFromPrivate(privKey);

            // 트랜잭션이 없기 때문에, 임시의 문자열을 암호화해서 사용할 것 임
                // 임시 트랜잭션 내용
            const hash = SHA256("임시로 넣는 transaction data").toString();

            // sign 서명 생성 | 개인키를 가지고 서명을 만듦
            signature = keyPair.sign(hash , "hex")
        
            console.log("서명 : " , signature)

            // r 서명, s 서명 | 전자서명을 만들었음. 
                // BN : Big number (굉장히 큰! number type)
                // 'negative : 0' 양수! 라는 의미 
                // words : r 서명, s 서명의 값을, 32비트, 정수 배열, 로 표시한 값
                // length : 배열의 길이를 보여준다. 
                // red : 중복에 대한 내용 | 안 중요. | 

            /* 서명 을 붙여넣기 | 

            서명 :  Signature {
                r: BN {
                    negative: 0,
                    words: [
                    39679251, 11071254,
                    5863785, 58907792,
                    7216647, 23847830,
                    38075903, 32365258,
                    22783130,   859670
                    ],
                    length: 10,
                    red: null
                },
                s: BN {
                    negative: 0,
                    words: [
                    44963674, 22520246, 8423735, 40105446,
                    40157147, 40843660, 3782732,  4666848,
                    4469064,  2130224,       0,        0,
                            0,        0,       0,        0,
                            0,        0,       0,        0,
                            0,        0,       0,        0,
                            0,        0,       0,        0,
                            0,        0
                    ],
                    length: 10,
                    red: null
                },
                recoveryParam: 1
                }
            */

        })


        it("서명 검증하기" , ( ) => {
            
            // 검증할 때 받는 것 1) message 2) 공개키 3) 서명 결과

            // 위에서 만든 트랜잭션 그대로! 
            const hash = SHA256("transaction data").toString();

            const verify = ec.verify(hash, signature , ec.keyFromPublic(pubKey , "hex"))
                // 이게 이 사람이 이걸 갖고 한게 맞나 

            console.log("검증됨?" , verify)
            
        })


        // 지갑 주소 생성 
        it( "지갑 주소" , () => {
            // 계정 만드는 방법은 공개키의 값에서, 26개의 문자열을, 앞에서 잘라서, 40자리 만큼을 남겨서, 주소로 사용
            
            // 불필요한 부분 제거하고, 주소 앞에 0x 를 붙인다. 그 이유는 '가독성' 을 위해
                // 16진수의 지갑 주소다! 라는 의미
            const address = pubKey.slice(26).toString();

            console.log("주소 : " , `0x${address}` );
        } )


    } )