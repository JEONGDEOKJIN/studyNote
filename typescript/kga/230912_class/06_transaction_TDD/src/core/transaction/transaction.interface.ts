

// 타입을 가져올 것 
    // 타원곡선에서 지정한 서명 타입 
    import { SignatureInput } from "elliptic"


// 트랜잭션 입력 구조 정의
    export class TxIn {
        txOutId ? : string  // 이전 트랜잭션의 ID(해시값), 이는 UTXO 를 지정하는데 사용
        txOutIndex : number     // 이전 트랜잭션의 출력 인덱스 , 이는 UTXO 를 지정하는데 사용
        
        signature? : SignatureInput     
            // 트랜잭션의 입력 서명
            // 이건, 지금 입력하는 정보에 대한 서명 인거지? ❓❓❓ 
    }

// 트랜잭션 출력 구조 정의 
    // 얼마를 받았는지에 대한 내용, 지갑 주소가 담김
    export class TxOut {
        account : string;   // 수신자 계정 공개키 or 주소

        amount : number;    // 전송된 금액
    }


/* 
    TxIn 에는 utxo 에 잔액을 가져오고 
    TxOut 는 보낸 수신자 중 총 금액을 출력

    트랜잭션 입력값 50 50 50 50 을 갖고 -> 200 account 라는 출력값 을 받음
    출력값은 utxo 라는 공간에 들어감 
    utxo 는 '미사용 객체' 가 들어감. 각자의 컴퓨터에 저장됨
    누가 자산을 갖고 있다는 건 utxo 에 가보면 알 게 됨
    이제, 트랜잭션 정보 구조 클래스 정의
*/

// 트랜잭션 정보 구조 정의
export class TransactionRow {
    txIns : TxIn[];     // 트랜잭션 입력 목록 (utxo 의 값을 참조)
    txOuts : TxOut[];   // 트랜잭션 출력 목록. 새로 생성되는 출력을 나타냄

    hash? : string;      // 트랜잭션의 식별자(해시값)

}

// UTXO 구조 정의 
export class UnspentTxOut {
    txOutId : string;   // 해시값이고, 해당 utxo 가 포함된 트랜잭션 해시값
    txOutIndex : number;    // 해당 UTXO 가 포함된 트랜잭션의 출력 인덱스
    
    account : string;       // UTXO 소유 계정
    amount : number;        // 잔액
}

// 트랜잭션 데이터 타입 정의
    // 전송시 문자열로! 
    export type TransactionData = string | TransactionData[];

    // 사용되지 않은 UTXO 를 POOL 에 담아놓고 출력
    export type UnspentTxOutPool = UnspentTxOut[];

    // 트랜잭션 pool 의 타입 정의 
        // 트랜잭션을 발생시키면, 바로 처리되는게 아니라, ⭐⭐⭐
        // 트랜잭션 pool 이라는 공간에, 처리되지 않은, 트랜잭션이 대기 상태로 쌓이고, 
        // ⭐⭐ 블록이 생성될 때, 트랜잭션 pool 에 있는 대기 상태의 트랜잭션들을 처리하고, 블록에 기록한다. 
    export type TransactionPool = TransactionRow[];
        // row 에 있는 건, 처리된게 아님 
        // 승인된거를 처리함. 처리되면 -> 그 다음에 기록이 된다. 

    