

import {TransactionData , TransactionRow, TxIn , TxOut , UnspentTxOut, UnspentTxOutPool} from "./transaction.interface"


// UTXO
    // 각 노드의 UTXO 데이터 베이스 
    // 각 주소별로 가지고 있는 잔액 금액이 표시된다. 
    // 금액을 가지고 있는 객체의 내용이 포함 되어 있다. 
    // 장부에 포함되어 있음. UTXO 
        // 누가 누구에게 보낸 기록들을 전부 확인할 수 있음. 

// A 가 B 에게 1비트를 보내면, 트랜잭션을 발생시키고, 
    // txIn 이전 트랜잭션에서, 남은 미사용 객체 UTXO 를 참조해서(A 가 얼마 갖고 있는지 잔액 확인), 
    // txOut 결과물의 UTXO 객체를 만들어놓고,
    
    // 보내는 금액보다 많이 갖고 있으면, 트랜잭션을 승인

    // UTXO 에 결과로 생성된 잔액과 주소를 포함한 객체를 추가 


export class Unspent {
    // UTXO 객체 목록
    // 누가 얼마를 갖고 있는지에 대한 내용이 배열로 담겨 있다. 
        // 미사용 객체들이 여기에 담겨 있을 것 임. 
    private readonly unspentTxOuts : UnspentTxOutPool = [];

    constructor(){}

    // get UTXO 의 내용을 반환하는 함수 
    getUnspentTxPool(){
        return this.unspentTxOuts;
    }

    // 미사용 객체를 TxIn 에서 참조할 때, 객체를 조회하는데, 
    // 사용하고 나면, 객체 값을 수정하는게 아니라, 
    // 한번도 사용하지 않은 객체들이 UTXO 에 담겨 있고, 
    // 사용을 하면, 제거 
    delete(txin : TxIn) {
        const {txOutId , txOutIndex} = txin;
        const index = this.unspentTxOuts.findIndex((unspentTxOut : UnspentTxOut) => {
            return (
                // UTXO 가 포함된 트랜잭션 아이디와 인덱스가 같은지 비교
                unspentTxOut.txOutId === txOutId && unspentTxOut.txOutIndex === txOutIndex
            )
        })
            // 미사용 객체 검증

        // unspentTxOuts 에서 찾은 값을 제거 (사용한 객체 제거 )
        if(index !== -1) this.unspentTxOuts.splice(index , 1)
    }

    /// 새로운 객체가 생성되면 
        // txout 정보를 가지고, UTXO 에 생성 목록 추가 
        create(hash : string) {
            return (txout : TxOut , txOutIndex : number) => {
                const {amount,  account} = txout
                this.unspentTxOuts.push({
                    txOutId : hash,     // 트랜잭션의 해시값
                    txOutIndex,         // 트랜잭션의 인덱스
                    account,    // 누가 갖고 있는지 
                    amount,     // 잔액을
                })
            }
        }

    // 트랜잭션 업데이트 UTXO 의 내용을 업데이하는 메서드
        update(transaction : TransactionRow){
            // 현재 처리되는 트랜잭션들 다 받고 
                // Ins, Outs 로 다 받는다. 
                // 처리되는 트랜잭션의 내용
                // txIns 입력값 | 누가 누구에게 송금하는지 내용 잔액 확인
                // tsOuts 누가 받았는지 account, amount, 잔액, 주소 
                // hash 는 트랜잭션 식별값, 고유값
            const { txIns , txOuts , hash} = transaction;
        
            if (!hash) throw new Error("hash 가 정상적이지 않다.")

            // 트랜잭션 출력값을 UTXO 에 추가 
            // 목록에 추가 | 미사용 객체
            txOuts.forEach( this.create(hash) )
                // hash 안으로 들어간다. 

            // 사용한 객체 제거 
                // UTXO 목록에서, 사용한 객체는 제거 
            txIns.forEach(this.delete.bind(this))
                // bind(this) : 현재 작성된 위치의 객체를 참조 
                // 클래스 쪽 에서 함 

        }

        // 특정 계정 (account) 의 객체를 UTXO 에서 목록을 조회
        getUTXO(account : String) : UnspentTxOut[] {
            // 특정 계정의 잔액의 정보를 가지고 있는 객체를 모두 조회 하는 함수
            const myUnspentTxOuts = this.unspentTxOuts.filter((utxo) => 
                // utxo 안에 있는 요소들을 순회하면서
                // account 가 찾는 account 매개변수 값이랑 같으면
                utxo.account === account
            )
            return myUnspentTxOuts;
        }

        // 특정 계정의 잔액 금액 총합을 조회하는 메서드
            // A 라는 사람의 총합
        getAmount(myUnspentTxOuts : UnspentTxOut[]) {

            return myUnspentTxOuts.reduce( (acc , utxo) => acc + utxo.amount, 0 )
                // reduce 의 첫 번째 매개변수 = 콜백함수
                // reduce 콜백의 첫 번째 매개변수 : 누적값
                // reduce 콜백의 두 번째 매개변수 : 순회하는 요소
                // 두 번째 매개변수 : reduce 가 시작될 때의 초기값은 0 
                // 배열안에 있는 값을 쭉 더해서 내보낸다.
        }

        // 주어진 계정의 잔고가, 보내는 금액보다 큰지 검증
        isAmount(account : string , sendAmount : number){
            // 내 주소와 잔액 정보가 있는 사용하지 않은 객체 조회(배열)
            const myUnspentTxOuts = this.getUTXO(account);  // 얼마있는지 본인의 것 가져오기

            // totalAmount 총 잔액
            const totalAmount = this.getAmount(myUnspentTxOuts)     // 내가 가진 객체를 쭉 뽑고, 합을 구함
        
            // 계정 총 잔고가 보내는 금액보다 크면, true
            // 아니면, false 로 못 보냄 
            if(totalAmount > sendAmount) return true;
            return false;
        
        }

}

export default Unspent;