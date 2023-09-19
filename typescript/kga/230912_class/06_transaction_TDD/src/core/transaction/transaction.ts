

import {TransactionData , TransactionPool , TransactionRow , TxIn , TxOut , UnspentTxOut} from './transaction.interface'

// 서명관련된 게 포함되니까 들어가게 할 것 
    import { SignatureInput } from 'elliptic'
    import {SHA256} from 'crypto-js'


// 보내는 사람의 객체 타입 구조 정의
    class Sender {

        // 보낼 사람의 계정 주소
        account : string;

    }

// 영주증
    // 누가 누구에게 보냈는지에 대한 내용이 들어있는 객체
    class Receipt {
        // 보내는 사람의 정보
        sender : Sender;

        // 받는 사람의 계정
        received : string

        // 보낸 금액 
        amount : number

        // 서명 정보 | 보낸게 맞는지에 대한 정보가 맞는지 포함
        signature : SignatureInput
            // [해석] 서명은 어디에서 생성❓❓ 

    }


    class Transaction {
        
        // 블록 채굴을 하면, 블록 생성 권한을 얻고 -> 트랜잭션을 처리하는데 -> 
            // -> pending 된 트랜잭션들을 처리하게 되는데 
            // 첫 번째 트랜잭션으로 트랜잭션이 하나 추가되는데, 
            // 특수한 트랜잭션이 블록의 첫 번째로 추가 되는데, 
            // 채굴한 사람의 주소, 전달되는 금액 보상이 들어간다. 
            // 블록을 채굴한 보상을 받는다. 
            // 그 사람이 그 잔액을 받았다 보상을 받았다는 의미

            // 이 말은 
                // 1) 1등이 된 채굴자가, 트랜잭션을 처리할 때 
                // 2) '채굴한 사람의 주소 및 전달되는 금액 보상' 이 , 어디로 간다는 거야? ❓❓❓


        // 코인 베이스 트랜잭션 보상
        private readonly REWARD = 50;

        // 트랜잭션이 처리되지 않은 내용이 있는 공간
        private readonly transactionPool : TransactionPool = [];

        constructor() {}


        // 트랜잭션 목록을 확인, 조회, 하는 함수
        getPool() {
            return this.transactionPool;    // pending, 대기 상태 등을 확인
        }

        // 트랜잭션 추가
        create(receipt : Receipt , unspentTxOuts : UnspentTxOut[]){
            // 트랜잭션의 output 내용의 객체를 UTXO 에 추가
            // 서명을 확인하고, 
            if(!receipt.signature) throw new Error("서명이 정상적이지 않아");

            // 잔액 계산
            const [txIns , amount] = this.createInput(
                unspentTxOuts,
                receipt.amount, 
                receipt.signature, 
            )

            // 출력 트랜잭션 객체를 생성
                // 이게 UTXO 에 추가될 내용임 
            const txOuts = this.createOutPut(
                receipt.received, 
                receipt.amount, 
                receipt.sender.account, 
                amount
            );
                // 누구에게 갔는지에 대한 객체를 생성

            // 추가될 트랜잭션 객체 생성 
            const transaction : TransactionRow = {
                txIns,      // 누가 누구에게 전송한 금액의 내용이 포함. 잔액 확인.
                txOuts,     // 최종적으로 결과물, 누구의 주소에, 얼마가 포함되는지, 객체가 생성

            }
            // 트랜잭션 객체 만들고, 해시 만들고, 해시를 추가 

            // 트랜잭션 객체에 hash 값 추가 
            transaction.hash = this.serializeRow(transaction);
            
            // 바로 트랜잭션이 처리되는게 아니라, pool 에 담기고, 
                // 대기 상태로 있다가, 블록이 채굴되면, 검증하고, 승인 되면, 트랜잭션을 처리하고 
                // 하나의 블록에 여러개의 트랜잭션 내용을 기록한다. 
            this.transactionPool.push(transaction);

            return transaction;
        }


        // 잔액 계산 부분 
        createInput(myUnspentTxOuts : UnspentTxOut[] , 
            receiptAmount : number , 
            signature : SignatureInput) : 
            [TxIn[] , number]{
                // 0 보다 큰지 비교
                let targetAmount = 0

                const txins = myUnspentTxOuts.reduce(
                    (acc : TxIn[] , unspentTxOut : UnspentTxOut) => {
                        // 현재 순회하는 요소(본인의 미사용 객체(UTXO)) 의 내용에서, 잔액과 포함된 트랜잭션 hash 값 포함된 트랜잭션 index 를 구조분해 할당
                        const {amount , txOutId, txOutIndex} = unspentTxOut;

                        // 검증 | 혹시나 그럴일은 없지만, 혹시나 0 을 보내면
                        if(targetAmount >= receiptAmount) return acc;

                        // 미사용 객체 안에 있는 본인의 것을 넣는다.
                        targetAmount += amount
                        acc.push({txOutIndex , txOutId , signature})
                    }, [] as TxIn[] // TxIn[] 타입인지 type 추론이 안 됨 -> 그래서 알려줌 
                                                // TxIn[] 타입 일거야, 여긴 날 믿고 추론해
                )
                // 금액 확인한 txins 와 target의 총량을 보낸다.
                return [txins , targetAmount]
        }


        createOutPut(
            received : string, 
            amount : number,        // '받은 사람'이 '얼마를 받았는지'
            sender : string, 
            sendAmount : number     // '보낸 사람'의 '잔액'
        ){
            console.log(received , amount, sendAmount, sender)
            
            const txouts : TxOut[] = [];
            
            // 객체 생성
            // txout 받는 사람, 얼마를 받았는지 | 누가 얼마를 받았는지
            txouts.push({account : received , amount})
        
            // 잔액은 보낸 사람으로 다시 새로운 객체를 만들어서 목록에 추가
            if(sendAmount - amount > 0) {
                txouts.push({account : sender , amount : sendAmount - amount})
                // 보낸 금액에서 뺀 객체를 만든다.
            }

            // 잔액을 비교해서 검증
            const outAmount = txouts.reduce(
                (acc , txout : TxOut) => acc + txout.amount , 0
            )
                
            console.log(outAmount , sendAmount);

            // 전체 금액 검증
                // 내가 가지고 있는 금액에서, 보낸 값과, 내가 다시 남은 잔액이, 총 금액과 같은지 검증
            if(outAmount !== sendAmount) throw new Error("금액이 안 맞음! 오류!")
        
            return txouts;
        }


        serializeTxOut(txOut : TxOut) : string{
            // 출력 트랜잭션을 문자열로 반환
            const { account, amount } = txOut;
            const text = [account , amount].join("");
            return SHA256(text).toString()  // 해시를 문자열로 반환
        }

        serializeTxIn(txIn : TxIn) : string {
            // 입력 트랜잭션을 문자열로 반환
            const { txOutIndex } = txIn;
            const text = [txOutIndex].join("");
            return SHA256(text).toString();     // 문자열로 반환!
        }


        // 트랜잭션을 직렬화한 문자열로 반환    
            // 타입을 매개변수 처럼 사용함! 
        serializeTx<T>(data : T[], callback : (item : T) => string){
            // 특정 데이터를 배열로 문자열 반환
            // acc 는 초기값이 " " 빈 문자열. 
            // 배열 수 만큼 반복 시키면서, callback 함수 반환값 문자열을 계속 더해서 긴 문자열을 반환
            return data.reduce((acc : string, item : T ) => acc + callback(item), "" );
        }

        // 트랜잭션 row 를 전부, 직렬화 해서 반환할 함수
            // txIn, txOut, 전부를 뽑아서, 더 할것 임.
        serializeRow(row : TransactionRow){
            const {txIns , txOuts} = row;
            // 직렬화된 문자열로, 변환.
            const txOutsText = this.serializeTx<TxOut>(txOuts , (item) => 
                this.serializeTxOut(item)
            )


            const txInsText = this.serializeTx<TxIn>(txIns, (item) => 
                this.serializeTxIn(item)
            )

            // 직렬화된거 2개를합쳐서 리턴
            return SHA256(txOutsText + txInsText).toString();

        }

        // 블록을 채굴하면, 채굴자가 블록의 채굴보상을 받는데, 특수한 트랜잭션이 생성됨. 
            // 블록의 첫 번째로 기록이 되는데, 이게 코인베이스 트랜잭션 
            // 채굴자의 주소, 보상이 제공된다. 
            creaetCoinbase(account : string , latestBlockHeight : number){
                
                // 채굴자일 경우, 트랜잭션 해시가 없고, 서명도 없기 때문에
                const txin = this.createTxIn(latestBlockHeight + 1 );    // 다음 블록이 들어가니까, 다음 블록것도 추가 해줌 
                const txout = this.createTxOut(account , this.REWARD);

                // 채굴 했을 때, 그 사람의 트랜잭션에 1) 보상과 내용이 들어감
                return this.createRow([txin], [txout]);
            }

            createRow(txIns : TxIn[] , txouts : TxOut[]){
                // txIns, txOut
                // 문자열로 변환, 해시값으로 변환
                const transactionRow = new TransactionRow();
                transactionRow.txIns = txIns;
                transactionRow.txOuts = txouts;

                transactionRow.hash = this.serializeRow(transactionRow);
                return transactionRow;
            }

    
            createTxIn(txOutIndex : number, 
                txOutId? : string,
                signature? : SignatureInput
                ) : TxIn {
                    // 단순하게 입력 트랜잭션 생성
                    const txIn = new TxIn();
                    txIn.txOutIndex = txOutIndex;
                    txIn.txOutId = txOutId;  // 해시값
                    txIn.signature = signature;

                    return txIn     // 누구에게 보내준게 아니니까 txIn 을 만듦

                } 

            createTxOut (account : string , amount : number) : TxOut {
                // 받는 계정 주소랑 출력 트랜잭션 생성 
                if(account.length !== 40) throw new Error("정상적인 주소가 아니다.")
                const txout = new TxOut();
                txout.account = account;
                txout.amount = amount;
                return txout;
            }
                // txin, txout 만들고 -> 채구랗면 

            // 트랜잭션 pool 업데이트
            update(transaction : TransactionRow) {
                
                // 트랜잭션 처리되면 -> 해당 트랜잭션 지움
                const findCallback = (tx : TransactionRow) => transaction.hash == tx.hash;
                const index = this.transactionPool.findIndex(findCallback);
                
                if(index !== -1) this.transactionPool.splice(index , 1);
            }

        // 트랜잭션 목록을 업데이트
        sync( transactions : TransactionData ) {
            if(typeof transactions === 'string') return;

            transactions.forEach(this.update.bind(this));
                // 트랜잭션을 업데이트 하면서, 채우고, 비우고


        }
            
    }

    export default Transaction;

    /*
        코드 이해가 중요한게 아님
        코드 말고, '흐름' 이 중요한 것 임 ⭐⭐⭐
        검증 코드를 넣을 때, go 언어 넣어서, core 개발할 수 있음. 
        전체 내용 이해 파악이 더 중요 

    */