
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


/* 이 흐름대로, ⭐unspent 같은 곳에서 메소드를 가져와서⭐, 만든다. 
    // 지갑을 새로 하나 만들고
        // 지갑의 주소를 가지고있고
        // 트랜잭션을 만들어서 블록에 추가하고 마이닝을 해서 블록의 채굴 권한을 얻고
        // 코인베이스 트랜잭션 내용의  출력의 내용을 UTXO 추가(블록보상)({지갑 주소 : 채굴 보상})

        // 지갑을 하나더 만들어서

        // 처음에 만든 지갑에서 트랜잭션을 발생시키고 -> 처음 만든 지갑에서 두번째로 만든 지갑에 코인 전송
        // 트랜잭션으로 작성 (첫번째 지갑이 보내는 사람 두번째 지갑이 받는사람 서명)
        // 트랜잭션 생성 (UTXO에서 첫번째 지갑의 잔액 조회)
        // 트랜잭션 풀에 내용이 추가
        // 두번째 지갑이 블록 마이닝을 하고 블록의 내용에는 코인베이스 트랜잭션과 첫번째 지갑이 두번째 지갑에 돈을 전송한 내용의 트랜잭션
        // 블록을 생성을 하고 풀에 있는 트랜잭션을 처리
        // 풀에서 해당 트랜잭션을 제거하고
        // 첫번째 지갑의 잔액을 사용했으니까 UTXO에서 객체를 제거
        // out에 있는 객체를 UTXO에 추가{첫번째 지갑: 남은 금액}{두번째 지갑 : 받은 금액
        */
    
    /*  👇 이렇게 가져와서 메소드 쓰면 됨. 
        // 테스트 케이스 실행 전에 실행되는 코드
        beforeEach(()=>{
        transaction = new Transaction();
        })

        describe("createTxOut", ()=>{
        const account = "0".repeat(40);
        it("txOut 생성", () => {
            // 임시 보내는 값
            const amount = 40;

            // 트랜잭션 객체를 사용
            // txOut객체 하나 생성
            const txout = transaction.createTxOut(account, amount);

            console.log(txout);
            expect(txout.account).toBe(account);
            expect(txout.amount).toBe(amount);
        })
        })
    })
    */
        
        




import { randomBytes, sign } from "crypto";   // 개인키 생성 위해 필요한 랜덤값 생성 메소드
import elliptic from "elliptic"         // '타원 곡선 알고리즘' 사용할 수 있게, 라이브러리에서 가져오기  
import { SHA256 } from "crypto-js";     // 해시화 해주는 SHA256
import Transaction from "@core/transaction/transaction";    // 트랜잭션 가져오기

import Unspent from "@core/transaction/unspent";
import { TxOut } from "@core/transaction/transaction.interface";
import Chain from "@core/chain/chain";
import { Block } from "@core/block/block";
import { GENESIS } from "@core/config";



const ec = new elliptic.ec('secp256k1')     // 'secp256k1' 별명을 가지 타원 곡선 인스턴스 생성





describe( "지갑 만들기" , () => {

    let privKey : string;
    let pubKey : string;
    let signature : elliptic.ec.Signature;

    it("개인키 생성" , () => {
        // 2진수의 랜덤값으로 개인키 생성 | 16진수로 나타냄 | 
        privKey = randomBytes(32).toString("hex")
        console.log("개인키" , privKey)
        console.log("개인키 길이" , privKey.length)
    })
    /* publicKey = G(기준점) * privateKey 이기 때문에 -> privateKey 만들고 -> 이걸로 공개키 만든다. 

    */

    it("공개키 생성" , () => {
        // 공개키 생성 | 타원 곡선 라이브러리 사용 | keyPair 안에 '공개키 + 개인키' 가 짝으로 있음 | 짝궁이 다르면, false 가 나오는 식
        const keyPair = ec.keyFromPrivate(privKey)

        // hex 로 변환 | 개인키로 공개키를 생성! | compact 매개변수 : false 면 130 글자,  true 면 66 |  
        pubKey = keyPair.getPublic().encode("hex" , true)

        console.log("공개키" , pubKey)
        console.log("공개키 길이" , pubKey.length)
    })

    it("서명 만들기" ,  () => {
        // 타원 곡선 라이브러리 가져와서, 개인키로, 공개키와 쌍인 keyPair 만듦 | 개인키, 공개키 모두 포함
        const keyPair = ec.keyFromPrivate(privKey)

        // 트랜잭션이 없기 때문에 임시의 문자열을 암호화 해서 사용 | 이걸 이렇게 data 로 적나❓❓❓  
        const hash = SHA256("DJ 가 MJ 에게 100 코인 줌").toString()

        // sign 서명 생성 | 개인키를 가지고 서명을 만듦 
        signature = keyPair.sign(hash , "hex")

        // 서명 구성 요소 확인 
        console.log("서명 : " , signature)
    })

    it("서명 검증하기" , ( ) => {
        // '검증할 때 받는 것 1) message 2) 공개키 3) 서명' 이게 맞나❓❓❓ 

        // '서명' 할 때 만든 트랜잭션 그대로 
        const hash = SHA256("DJ 가 MJ 에게 100 코인 줌").toString()

        // 서명 결과, 공개키, 해시화된 message 를 넣어서 -> 서명 검증 
        const verify = ec.verify(hash, signature, ec.keyFromPrivate(privKey , "hex"))
            /*  hash = 메시지 
                ec.keyFromPrivate(privKey , "hex") = 공개키
                signature = 서명
            */
        console.log("검증 여부 확인" , verify)
    })
        /* 서명 검증되는 과정 
            - 검증자가 갖고 있는 건 1) message 2) 공개키 3) 서명 결과 임. 
                'U1 * G + U2 * public key' 이 공식을 활용해서, 
                '서명 r 값' 과 동일한 값이 나오면 -> 검증된 거라고 가정.
        */

    it("지갑 주소" , () => {
            /* - 계정(계좌) 만드는 방법
                - 공개키의 값에서, 26개의 문자열을, 앞에서 잘라서, 40자리 만큼을 남겨서, 주소로 사용

                - 주소 만드는 법
                    - 불필요한 부분 제거하고, 주소 앞에 0x 를 붙인다. 그 이유는 '가독성' 을 위해
                    - 16진수의 지갑 주소다! 라는 의미
            */

            // 주소 만들기 
            const address = pubKey.slice(26).toString()
            console.log("지갑 주소 : " , `0x${address}`)
    })

} )


describe ( "block 검증" , () => {
    
    let newBlock : Block;
    let newBlock2 : Block;
    let newChain : Chain;
    let newChain2 : Chain;

    it("블록 추가" , () => {

        // 이 블록에 넣은 데이터를 만든다. 
        const data = ["블록 1"];

        // 새로운 블록을 생성
        newBlock = Block.generateBlock(GENESIS , data, GENESIS)
            // [해석] 이전 블록은 GENESIS 에서 가져온다. 
            // 'hash 값 맨 처음 부터 나오는 0 의 개수' 가 '블록 난이도' 에 맞을 때 까지 반복해서 돌린다. 그 결과 nonce 값이 나오고, 그러면 채굴 완료 
        console.log(newBlock)
    })

    it("블록 유효성 검증. 이 블록이 정상적인 블록인지를 검증" , () => {
        const isValidNewBlock = Block.isValidNewBlock(newBlock , GENESIS)

        // 'isValidNewBlock.isError == false' 인지 여부를 검증 
        expect(isValidNewBlock.isError).toBe(false);

    })

    it("블록 체인 추가" , () => {
        // Chain 인스턴스 생성 
        newChain = new Chain();

        // 위에서 만든 블록을, chain 에 추가 
        newChain.addToChain(newBlock)
        console.log( "newChain.get()" , newChain.get())     // 전체 체인(block들의 배열) 확인
        console.log("getBlockByHeight" , newChain.getBlockByHeight(1))   // block 들 중에서, 높이가 1 인 값, 을 가져오기
        /* [실행순서]
            1. getBlockByHeight 에 매개변수 1 이 들어감 
            2. getBlockByHeight 함수에서 this 가 확정되고 -> 매개변수가 확정된 상황에서 getBlock 이 호출 
            3. getBlock 에서 this 확정 -> chain 이 배열이라는 게 확정 -> find 메소드 를 만나서 배열을 하나씩 콜백함수로 던져서 '콜백함수' 를 실행
        */
    })

    it("네트워크 체인 비교(longest chain rule" , () => {
        newChain2 = new Chain();
        console.log("newChain2" , newChain2.get())  // 1개만 나옴 

        newChain2.replaceChain(newChain.get())  // 첫 번째 chain 이 더 길기 때문에, chain2 는 chain 것을 갈아 끼움 
        console.log("newChain2" , newChain2.get())      // 2개 나옴 
    })

}  )