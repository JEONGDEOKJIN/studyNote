// import { Block } from '@core/block/block';
// import { GENESIS } from '@core/config';
// import Chain from '@core/chain/chain'

// /* [실행방식] 
//     TDD 로 block.test.ts 파일 돌리려면, npm run test 로 돌렸어야 함 */

//     describe("block 검증" , () => {

//         let newBlock : Block;
//         let newBlock2 : Block;
//         let newChain : Chain;
//         let newChain2 : Chain;
        
//         // 테스트할 코드의 최소 단위
//         it("블록 추가" , () => {
//             const data = ["Block 1"];
//             newBlock = Block.generateBlock(GENESIS, data , GENESIS)

//             // 블록의 난이도에 따른 마이닝을 동작해서, 조건에 맞을 때 까지, 연산을 반복한 뒤, 
//             // 생성된 블록을, newBlock에 받아온다. 
//             // 이전 블록은 GENESIS(최초블록)
//             console.log(newBlock);
            

//             // 새로운 데이터 
//             const data2 = ["Block2"]

//             newBlock2 = Block.generateBlock(newBlock , data2 , GENESIS);
//             console.log(newBlock2)

//         } )

//         it("블록 유효성 검증. 이 블록이 정상적인이 검증" , () => {
//             const isValidNewBlock = Block.isValidNewBlock(newBlock, GENESIS)    // 🔵 작동함 
//             // const isValidNewBlock = Block.isValidNewBlock(newBlock2, GENESIS)    // 미작동. 왜냐면, newBlock2 라는 틀린 데이터를 넣었기 때문에  😥
//             if(isValidNewBlock.isError){
//                 // 즉, 성공한 결과가 맞는지 확인할 때 쓰는 코드  
//                 return expect(true).toBe(false);
//                     // expect : toBe 값이 맞는지 확인할 때, 사용하는 코드
//             }

//             expect(isValidNewBlock.isError).toBe(false);
//                 /*
//                     if(isValidNewBlock.isError){
//                      // 즉, 성공한 결과가 맞는지 확인할 때 쓰는 코드  
//                         return expect(true).toBe(false);
//                     expect : toBe 값이 맞는지 확인할 때, 사용하는 코드
//                     이전 블록인 new 블록을 쓰면 유효성 검사를 통화할 것 
//                 }
//                 */
//         })

//         it("블록 체인 추가" , () => {
//             // Chain 인스턴스 생성
//                 newChain = new Chain();            
//                     /*
//                         Chain 의 인스턴스 = {
//                             chain : [GENESIS] 
//                             get : function(){ } 
//                             length : function(){}
//                             latestBlock : function(){}
//                             addToChain : (receivedBlock) => {}
//                             getBlock : (callbackFn) => {}
//                             getBlockByHeight : (height) => {} 
//                             getBlockByHash : (hash) => {} 
//                             getAdjustBlock : () => {} 
//                             serialize : () => {}
//                             deserialize : (chunk) => {}
//                             replaceChain : (receivedChain) => {}
//                             getAdjustmentBlock : () => {}
//                         }
//                     */

//             // 새로운 data 를 추가해서 만든 block 을 chain 에 추가 
//                 newChain.addToChain(newBlock)            
//                 console.log(newChain.get())     // 현재, 전체 체인 (block 들의 배열) 을 확인
//                 console.log(newChain.getBlockByHeight(1))   // block 들 중에서, 높이가 1 인 값, 을 가져오기
//                 /* [실행순서]
//                     1. getBlockByHeight 에 매개변수 1 이 들어감 
//                     2. getBlockByHeight 함수에서 this 가 확정되고 -> 매개변수가 확정된 상황에서 getBlock 이 호출 
//                     3. getBlock 에서 this 확정 -> chain 이 배열이라는 게 확정 -> find 메소드 를 만나서 배열을 하나씩 콜백함수로 던져서 '콜백함수' 를 실행
//                 */


//             console.log(newChain.getBlockByHash(newBlock.hash))     // 이거 해도 찾아짐🔵
//             console.log("🚀🚀newchain" , newChain.get())
//                // 이거 해시 조회는 나중에! 테스트 코드를 추가할 때 마다 해시가 바뀌기 때문에 현재 테스트코드에서는 못 함
//                // 할거면, newBlock 의 해시로 넣거나 해야 할 듯 
//         })
        



//         it("네트워크 체인 비교(longest chain rule (롱기스트 체인 룰)" , () => {
//             newChain2 = new Chain();
//             newChain2.replaceChain(newChain.get())

//             console.log(newChain2.get())
//                 // 첫번째 체인이 좀 더 기니까, 본인 체인을 갈아 꼈음.
//         })


//         // 블록 난이도 조절할 때! 
//             // 그 블록 생성 주기 난이도를 올리고, 내리고
//         it("이전 10번째 블록 or 최초 블록" , () => {
//             // 지금 현재 블록을 생성한다고 가정하고 
//             // 현재 블록이 생성된 시간이, 이전 10번째 블록으로 부터, 얼마나 걸렸는지 확인! 
//             // 블록의 정해진 생성 주기 보다, 빠르면, 난이도를 올리고, 아니면 내린다. 

//             for (let i = 0; i < 1; i++) {
//                 let block = Block.generateBlock(newChain.latestBlock(), ["block"], newChain.getAdjustmentBlock())
//                 newChain.addToChain(block)                
//             }

//             // for문이 20번 실행 되었으므로, newChain 에는 20개의 block 들이 있음!   
//             console.log(newChain.getAdjustmentBlock());
//                 // 길이가 10번째 인 블록! 
//         })

//         /* 공부 포인트
//             코드를 보기 보다는, '흐름도' 를 보는게 중요 
//                 블록은 뭐로 구성되고 
//                 블록 생성, 체인 추가할 때 블록 검증해서 추가하고, 검증할 때 높이 해쉬 등으로 확인하고 
//                 블록 해시가 뭐고, 머클루트가 뭔지, 
//                 제인 긴 체인이 정답이다, 
//                 본인 체인보다 더 길면, 그게 정답이다, 
//         */

//     }  )

//     /* [용어 정리]
//         - 지갑 구성 요소 
//             - 개인키, 공개키, 서명
//             - 지갑 주소, 계정 만들기
//             - 개인키와, 공개키 서명을 이용한 신원 인증 방식은, 분산 원장, 이라는 이해가 필요. 

//             - '분산 원장'
//                 - 장부를 모두가 관리하는 것.
//                 - 데이터 '합의' 기술 임. 
//         */

//     /* [설치 순서]
//         crypto, elliptic, crypto-js

//         npm i -D crypto
//         npm i -D crypto @types/elliptic
//         npm i -D crypto @types/crypto-js
//     */


//     // 개인키 생성 위해 필요한 랜덤값 생성 메소드
//     import {randomBytes} from "crypto"

//     // '타원 곡선 알고리즘' 사용할 수 있게 라이브러리에서 가져오기
//     import elliptic  from "elliptic"

//     // 해시화 하게 하는 SHA256 
//     import {SHA256} from "crypto-js"

//     // 'secp256k1 별명을 가진 타원 곡선' 인스턴스 생성
//     const ec = new elliptic.ec("secp256k1");
    
//         /* 타원 곡선 알고리즘 구성요소 
//             - 타원 곡선의 기준점(base point) : '타원 곡선' 상의 '한 점' 을 '누구나' 알고 있음.
//                 - y^2 = x^3 + ax + b 이 식에서 , a 가 0, b 가 7, 기준점 G 는 X 및 Y 좌표를, 16진수로 표현한 것
//                         G 는 '02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798' 이것 임 
            
//             - 이렇게 만들어진 서명 검증하기 
//                 - 검증공식 : U1 * G(기준점, 모두가 알고 있음) + U2 + 공개키
//                 - 검증 방법
//                     - 서명 r 과 같은지, 비교해서 검증 한다.
//                     - w 동일한 서명을 만들지 않기 위해서, 임의이 값을 추가 | nonce 값이라고 보면 됨 
//                     - w = k⁻¹ mod n 
//                     - U1 = z * w mod n 
//                         - 만든 서명을 사용했다 
//                     - U2 = r * w mod n
//                     - U1 * G + U2 + 공개키 값을 구해서, 서명 r 과 같은지 비교해서 검증 

//             - 포인트 
//                 - 공식을 보고 이렇게 이해하는게 중요하지 않음!!!!!!!!
//                 - ⭐개인키로 서명을 만든거고⭐ (이러이러한 공식을 통해)
//                 - 이 서명을 갖고, ⭐공개키를 통해, 서명을 검증할 수 있음.⭐ (검증 공식도 이러이러함)
            
            
//             - 데이터 전송 과정 ⭐⭐⭐⭐⭐⭐⭐
//                 [보내는 사람]
//                     1. 트랜잭션 생성 
//                     2. 개인키 생성 | 본인이 갖고 있어야 함
//                     3. 서명 r, 서명 s 를 생성 (개인키를 갖고 서명을 만든다.)
//                     4. 메시지(트랜잭션) , 공개키, 서명, 을 보냄
    
//                 [받는 사람]
//                     1.'U1 * G + U2 + 공개키' 이 공식으로 값을 구해서 -> 서명 r 과 비교(⭐⭐검증) 한다. 
//             */



//     describe( "지갑 만들기" , () => {
//         let privKey : string;
//         let pubKey : string;
//         let signature : elliptic.ec.Signature;
//             // BN : BIG NUMBER 라는 뜻


//         it("개인키 생성" , () => {
//             // 2진수의 랜덤값으로 개인키 생성 | 16진수로 나타냄 | 
//             privKey = randomBytes(32).toString("hex")
//             console.log("개인키 : " + privKey)
//             console.log("개인키 길이: " + privKey.length)   // 개인키의 길이는 64 자리의 문자열
//         })
//             // [해석]
//                 // privateKey = G(기준점) * privateKey 이기 때문에 -> privateKey 만들고 -> 그걸로 공개키를 만든다. 
            
        
//         it("공개키 생성" , () => {
//             // 공개키 생성 | 타원 곡선 사용할 수 있는 라이브러리 가져와서 사용 | keyPair 안에 '공개키' + '개인키' 모두 포함
//             const keyPair = ec.keyFromPrivate(privKey);
            
//             // hex 로 변환 | 개인키로 공개키를 생성!
//             pubKey = keyPair.getPublic().encode("hex" , false)
//                 // [해석] 'puclicKey = G(기준점) x privateKey' 이 공식에 근거해서, 공개키 생성
//                 // false : 문자열 압축 여부| 중요하지 않음|무조건 false
        
//             console.log("공개키 : " , pubKey)
//             console.log("공개키 길이 : " , pubKey.length)   // 공개키는 130 자의 문자열 | 개인키는 64자리 
//         })


//         it("서명 만들기" , () => {
//             // 타원 곡선 사용할 수 있는 라이브러리 가져와서 사용
//             const keyPair = ec.keyFromPrivate(privKey);
//                 // 개인키를 기반으로 'key pair' 를 생성
//                 // 이 안에 개인키 + 공개키 가 모두 포함 

//             // 트랜잭션이 없기 때문에, 임시의 문자열을 암호화해서 사용할 것 임
//             const hash = SHA256("임시로 넣는 transaction data").toString();     // 임시 트랜잭션 내용

//             // sign 서명 생성 | 개인키를 가지고 서명을 만듦
//             signature = keyPair.sign(hash , "hex")

//             // 서명 구성요소 확인
//             console.log("서명 : " , signature)

//                 /*  r 서명, s 서명 | 전자서명을 만들었음. 
//                     BN : Big number (굉장히 큰! number type)
//                     'negative : 0' 양수! 라는 의미 
//                     words : r 서명, s 서명의 값을, 32비트, 정수 배열, 로 표시한 값
//                     length : 배열의 길이를 보여준다. 
//                     red : 중복에 대한 내용 | 안 중요. | 

//                     서명 :  Signature {
//                         r: BN {
//                             negative: 0,
//                             words: [
//                             39679251, 11071254,
//                             5863785, 58907792,
//                             7216647, 23847830,
//                             38075903, 32365258,
//                             22783130,   859670
//                             ],
//                             length: 10,
//                             red: null
//                         },
//                         s: BN {
//                             negative: 0,
//                             words: [
//                             44963674, 22520246, 8423735, 40105446,
//                             40157147, 40843660, 3782732,  4666848,
//                             4469064,  2130224,       0,        0,
//                                     0,        0,       0,        0,
//                                     0,        0,       0,        0,
//                                     0,        0,       0,        0,
//                                     0,        0,       0,        0,
//                                     0,        0
//                             ],
//                             length: 10,
//                             red: null
//                         },
//                         recoveryParam: 1
//                         }
//                 */
//         })
//             /* '서명' 만들어지는 과정 (https://bit.ly/3t0IyCR 해시넷 참고) 
//                 1. 개인키가 준비되어 있음 
//                 2. '기준값 G 중 랜덤하게 고른 값' 과 G(기준값) 을 곱해서 -> 서명 r 을 얻음 
//                 3.  k = 서명 r을 구할 때 고른 랜덤한 수 
//                     z = 트랜잭션 정보를 직렬 정렬한 값
//                     r = 위에서 구한 서명 r값
//                     private key = 개인키 값 들을 
//                     'k^-1(z+r*private key) mod n' 공식에 넣어서 -> 서명 s 를 얻는다.
//                 4. 서명 r 과 서명 s 가 하나의 서명이 된다. 
                
//                 5. 현재 이 과정이, sign 메소드 안에 녹아 있다. 
//             */


//         it("서명 검증하기" , ( ) => {
            
//             // 검증할 때 받는 것 1) message 2) 공개키 3) 서명 결과

//             // 위에서 만든 트랜잭션 그대로! 
//             const hash = SHA256("임시로 넣는 transaction data").toString();

//             // 서명결과, 공개키 해시화된 message 를 넣어서 -> 서명 검증
//             const verify = ec.verify(hash, signature , ec.keyFromPublic(pubKey , "hex"))
//                 // 이게 이 사람이 이걸 갖고 한게 맞나 

//             console.log("검증됨?" , verify)
            
//         })
//             /* 서명이 검증되는 과정 
//                 검증자가 갖고 있는 건, 1) message 2) 공개키 3) 서명 결과 임. 
//                 'U1 * G + U2 * public key' 이 공식을 활용해서, 
//                 '서명 r 값' 과 동일한 값이 나오면 -> 검증된 거라고 가정. 
//             */


//         // 지갑 주소 생성 
//         it( "지갑 주소" , () => {
//             /* - 계정(계좌) 만드는 방법
//                 - 공개키의 값에서, 26개의 문자열을, 앞에서 잘라서, 40자리 만큼을 남겨서, 주소로 사용

//                 - 주소 만드는 법
//                     - 불필요한 부분 제거하고, 주소 앞에 0x 를 붙인다. 그 이유는 '가독성' 을 위해
//                     - 16진수의 지갑 주소다! 라는 의미
//             */
        
//             // 주소 만들기
//             const address = pubKey.slice(26).toString();
//             console.log("주소 : " , `0x${address}` );
//         } )
//     } )
//         /* [지갑이 만들어지는 과정]
//             - '2진수 랜덤값' 으로 '개인키' 생성
//             - '개인키' 에 의해 '공개키' 가 생성. 

//             - '개인키' 와 '일정 공식' 으로 '서명' 생성
//             - '공개키' 로 '서명결과' 를 검증 

//             - '공개키' 에서 '26번째 인덱스' 부터의 값이 '지갑 주소'가 됨. 
//         */


// /* 👇👇👇👇👇 우선 돌려보기 | 로직 100% 이해는 안 돼 | 

//   // 동일한 내용을 "transaction data"이 값으로 해시값을 만들어서 검증에 사용한것이기 때문에
//   // 검증에 성공한것 true반환

//   // 설치 명령어
//   // -------------------------------------------------------
//   // npm install elliptic
//   // npm i --save-dev @types/elliptic
//   // -------------------------------------------------------

//   // 블록체인 지갑의 서버
//   // 지갑 프로그램(클라이언트) -> 지갑 서버(서버)(공개키와 서명) ->
//   // 블록체인 http server -> 블록체인 P2P 네트워크

//   // 지갑 서버 만들기

// */




// import Transaction from "@core/transaction/transaction";

// describe("Transaction", ()=>{
//   let transaction : Transaction;
//     /*  Transaction 인스턴스 = {
//             // 멤버 변수는 현재 private 처리 되어 있어서 -> 인스턴스화 할 때, 안 보임
//             // 이러한 멤버 함수들이 담김 👇👇
//             getPool, 
//             create, createInput, createOutPut, creaetCoinbase, createRow, createTxIn, createTxOut, sync,
//             serializeTxOut, serializeTxIn, serializeTx, serializeRow, }*/



//   // 테스트 케이스 실행 전에 실행되는 코드
//   beforeEach(()=>{
//     transaction = new Transaction();
//   })

//   describe("createTxOut", ()=>{
//     const account = "0".repeat(40);
//     it("txOut 생성", () => {
//       // 임시 보내는 값
//       const amount = 40;

//       // 트랜잭션 객체를 사용
//       // txOut객체 하나 생성
//       const txout = transaction.createTxOut(account, amount);

//       console.log(txout);
//       expect(txout.account).toBe(account);
//       expect(txout.amount).toBe(amount);
//     })
//   })
// })


