
/* test 파일 돌려보려면 

    [✅ 보완할 것]
        - jest 설치 및 환경 설정 과정 필기 
        - 지금 처럼, 다 됐다고 가정하고

    1. 'kga/studynote/typescript/kga/230912_class/06_transaction_TDD'에서, npm run test 했음 
        - transaction.ts 파일이 있는 곳 까지 cd 로 내려가서, 실행시키지 않았음. 
        - 아무래도, .test 끝나는 파일을 jest로 실행할 수 있게 해서 그런 것 같음. 
        - 이런 부분을, 이제, docs 에 정리해서, 다음에 테스트 할 때, 편하게 할 수 있어야 함. ⭐⭐

    2. 현재, transaction.test.ts 만 변경하고 싶어서, package.json 을     
        "test": "jest transaction.test.ts" 이렇게 변경

    */



/* 검증 목표 : DJ 가 A 에게 100 코인 송금의 흐름을 검증하고 싶음 

    검증 순서 
        1) DJ, A 각각의 지갑을 만들어 두기 
            - UTXO 도 있어야? 

        2) 트랜잭션을 발생 시키기 
*/


/* 교수님이 주신 테스트 흐름 (230919_이더리움 파일에서 가져옴)
    # 테스트 코드 작성
        1. 지갑을 생성
        
        2. 지갑주소로 블록을 생성(마이닝)   
            | 😥 이 단계를 생각 못 했어 
            | 이 흐름을 잘 이해 해야 해 ⭐⭐⭐⭐⭐⭐⭐⭐ 여기서 부터 부족해 ⭐⭐⭐⭐⭐⭐⭐ 

        3. 블록의 채굴보상을 이 지갑이 받고(코인베이스 트랜잭션을 블록 추가)

        4. UTXO 채굴자 지갑의 계정과 블록 채굴 보상

        5. 새로운 지갑을 하나더 만들어서

        6. 채굴보상을 받은 지갑에서 새로운 지갑으로 돈을 송금 트랜잭션을 발생

        7. 서명이 유효한지 검증을 거치고 트랜잭션 풀에 담아놓고 발생한 트랜잭션

        8. 새로운 지갑이 블록 마이닝해서(코인베이스 트랜잭션을 추가)(트랜잭션 풀에있는 트랜잭션을 처리)

        9. UTXO에 처음만든 지갑이 전송한 잔액이 새로운 지갑에 잔액으로 미사용 객체가 추가될수 있게.
*/


import { randomBytes } from "crypto";   // 개인키 생성 위해 필요한 랜덤값 생성 메소드
import elliptic from "elliptic"         // '타원 곡선 알고리즘' 사용할 수 있게, 라이브러리에서 가져오기  
import { SHA256 } from "crypto-js";     // 해시화 해주는 SHA256
import Transaction from "@core/transaction/transaction";    // 트랜잭션 가져오기

import Unspent from "@core/transaction/unspent";
import { TxOut } from "@core/transaction/transaction.interface";

const ec = new elliptic.ec('secp256k1')     // 'secp256k1' 별명을 가지 타원 곡선 인스턴스 생성


describe( "지갑 만들고 👉 블록생성 👉 " , () => {
    let privKey : string;
    let pubKey : string;
    let dj_address : string;
    let signature : elliptic.ec.Signature;
    let txout : TxOut;

    let transaction : Transaction;
        /*  Transaction 인스턴스 = {
            // 멤버 변수는 현재 private 처리 되어 있어서 -> 인스턴스화 할 때, 안 보임
            // 이러한 멤버 함수들이 담김 👇👇
            getPool, 
            create, createInput, createOutPut, creaetCoinbase, createRow, createTxIn, createTxOut, sync,
            serializeTxOut, serializeTxIn, serializeTx, serializeRow, }*/
    
    let unspent : Unspent;


    // 테스트 케이스 실행 전에 실행되는 코드 
    beforeEach( () => {
        transaction = new Transaction()     // transaction 인스턴스 생성. transaction 관련 메소드를 가지게 됨. 
        unspent = new Unspent();
    })


    it( "개인키 생성" , () => {
        privKey = randomBytes(32).toString("hex")   // '32바이트 랜덤값' 을 '16진수(hex) 문자열로 변경'   
        console.log("개인키 길이가 64인 문자열" , privKey.length , privKey)
    } )

    it( "공개키 생성" , () => {
        // 개인키로 keyPair 생성 | keyPair(쌍으로 있는 key) 안에 '공개키' + '개인키' 모두 포함
        const keyPair = ec.keyFromPrivate(privKey)      
            // privateKey = G(기준점) * privateKey 이기 때문에 -> privKey 를 넣어서 공개키를 만든다
            // ec : 타원 곡선 인스턴스에서 뽑아서 사용

        // keyPair(쌍으로 있는 key) 안에서 공개키 추출 -> 16진수화 
        pubKey = keyPair.getPublic().encode("hex" , true)
            // [해석] false : 파라미터 압축 여부. 압축하지 않는 형식으로 공개키를 인코딩 한다. 
            // true : 그러면, 지갑 주소 길이가 40 으로 줄어든다. 
        
        console.log("공개키 길이 40자? 130자?" , pubKey.length)
        } )

    it( "지갑(주소) 생성" , () => {
        dj_address = pubKey.slice(26).toString();    // 공개키에서 앞에서 부터 26 자리까지 지우고, 27번째 부터 40까지의 데이터로 주소 만듦.
        console.log("지갑 주소🔵" , `0x${dj_address}`)
        console.log("지갑 주소길이" , `${dj_address.length}`)  // encode 할 때, compact 를 true 로 해야 지갑 주소 길이가 40이 됨. 
    })
    
    
    // ❓❓ 최초 블록을 만들어야 하나? 아니면, 그 다음 블록 추가를 해야 하나? ㅠㅠㅠㅠㅠㅠㅠㅠㅠ
    describe ( "지갑 주소에 마이닝을 해서 블록 생성" , () => {

        /* 이걸 해야 하나 ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓
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


        */

    
    })

})








// ----------------------- 👇👇👇 여기는 version 1 --------------------------





// it( "dj 계정에 대해 txOut 생성" , () => {
//     const dj_amount = 77700;
//     txout = transaction.createTxOut(dj_address , dj_amount)

//     console.log("dj 의 txout" , txout);
    
//     expect(txout.account).toBe(dj_address);
//     expect(txout.amount).toBe(dj_amount);

    
// })

// it( "dj 계정에 대한 txOut 을 UTXO 에 등록" , () => {

//     // '이전 트랜잭션' 에 대한 해시값 | dj 가 갖고 있는 돈이 어떤 트랜잭션으로 들어왔냐, 라는 것 
//         const hash = ""     
//             // hash 는 txOutId 의 값 (unspent.create에 따라서 추측)
//             // [현재, 막힘😥] 그럼, txOutId 값이 어디에서, 어떻게 나오지❓❓ 

//         /* UnspentTxOut 클래스의 멤버 변수가 txOutId 임. 
//             export class UnspentTxOut {
//                 txOutId : string;   // 해시값이고, 해당 utxo 가 포함된 트랜잭션 해시값
//                 txOutIndex : number;    // 해당 UTXO 가 포함된 트랜잭션의 출력 인덱스
                
//                 account : string;       // UTXO 소유 계정
//                 amount : number;        // 잔액
//             }   
//         */

//         const txOutIndex = 0 
//             // unspent.create 가 고차함수로 구현되어 있어서, 이것들을 여기서 준비하게 됨. 

//     // txout 을 해시화 해서 -> unspent.create 에 넣어서 -> UTXO 에 등록
//         const createUTXO = unspent.create(hash)
//         createUTXO(txout , txOutIndex)

// })


// it( ("DJ 잔액 확인 | UTXO 선택❓") , () => {
//     let djUnSpentTxOuts = unspent.getUTXO(dj_address)
//     console.log("djUnSpentTxOuts" , djUnSpentTxOuts)
// })


// // describe( "creaetTxOut" , () => {
// //     // const account = address;

// //     it( "txOut 생성" , () => {
// //         // 보내는 값 
// //         const amount = 100;

// //         const txout = transaction.createTxOut(address, amount)

// //         console.log(txout)
// //         expect(txout.account).toBe(address)
// //         expect(txout.amount).toBe(amount)
// //     })


// // } )

