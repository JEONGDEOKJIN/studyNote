
import {SHA256} from 'crypto-js';
import merkle from 'merkle';

import BlockHeader from './blockHeader';
    /* [BlockHeader 클래스 거치면 나오는 것]  
        BlockHeader 의 인스턴스 = {
            version : "BlockHeader 의 getVersion 메소드 실행해서 나옴", 
            height : "이전 블록의 height + 1"   // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
            timestamp : "BlockHeader 의 getTimestamp 메소드 실행해서 나옴",
            previousHash : "이전블록의 hash"    // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
        }
    */

import { IBlock } from '@core/interface/block.interface';
    // "@core/*" : ["src/core/*"], 이거에 의해, 별칭으로 지정된 것 임. 
    // IBlock 은 블록의 객체 구조를 정의한 놈임 

import { Failable } from '@core/interface/failable.interface';

import CryptoModule from '@core/crypto/crypto.module';  // 해시값(16진수) 를 2진수로 변환 하는 기능


// block 의 형태를 클래스로 정의 
    export class Block extends BlockHeader implements IBlock {
        
        // 블록 Header 의 내용이 추가 됨. (extends BlockHeader 에 의해 , interface 는 iBlockHeader)
            // 결국, ⭐⭐⭐Block 클래스의 인스턴스가 생성될 때, BlockHeader 까지 함께 묻어서⭐⭐⭐ 나옴     
                /* BlockHeader 의 인스턴스 = {
                            version : "BlockHeader 의 getVersion 메소드 실행해서 나옴", 
                            height : "이전 블록의 height + 1"   // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
                            timestamp : "BlockHeader 의 getTimestamp 메소드 실행해서 나옴",
                            previousHash : "이전블록의 hash"    // ✅이전 블록은 BlockHeader 클래스를 호출할 때 매개변수로 들어옴
                    } 
                */
            // 그러면, Block 에서는, BlockHeader 로 상속받은 것 제외하고 나올 것! 
        
        // Block'Header' 이외에의 '본문' 구성 👇 | IBlock 인터페이스로 부터 나옴! 그래서 자동완성 됨| 
            hash: string;
            merkleRoot: string;
            nonce: number;
            difficulty: number;
            data: string[];

        // 생성자 함수 | Block 클래스가 호출되면 실행
            constructor(_previousBlock : Block , _data : string[] ){

                // '이전 block(_previousBlock)' 이 'extends 받은 BlockHeader의 생성자 함수' 에 전달
                super(_previousBlock)
                    /* [이 코드의 포인트] ⭐⭐⭐⭐⭐⭐ | 코드를 단순하면서, 깔끔하게 쓰는데 있어 중요한 코드라고 생각함 ⭐⭐⭐ 
                            '이전 블록데이터' 은 header 로 이동 -> '상속' 되어서 들어온다. 
                            하나의 Block 의 구성요소는 1) header 와 2) 본문으로 구성 
                            하나의 Block 을 하나의 클래스로 표현하지 않고, 
                                1) 중요한 본문은 그대로 두고 2) header(메타데이터) 는 상속받았다는 것
                        [이 포인트를 일반화 해보기] ⭐⭐⭐⭐⭐ 
                            이것을 일반화 하면, A 의 구성요소 B, C 가 있으면, 모두, 하나의 파일에서 작성하지 않음. 
                            하위 요소 중 중요한 요소를 앞으로 빼고, 나머지를 '상속' 받아서, 표현함. 
                            결국, 하나로 표현되는 건 동일함.  
                    */
            
                // Block 클래스 인스턴스의 머클루트
                this.merkleRoot = Block.getMerkleRoot(_data)
                   // [static사용시 실익] _data 가 한번 들어오면, ⭐'한방에!⭐ 머클루트까지 구해짐!
                    // 따로 Block.getMerkleRoot 별도로 해줄 필요 없음.  

                    
                // Block 클래스 인스턴스의 해시값
                    // Block 의 구성요소 = 1) 본문 2) header 
                    // 새로운 Block 으로 왔으니, 모든 구성 요소를 합해서, 다시 해시값을 구한다. 
                this.hash = Block.createBlockHash(this)
                    /* [궁금증] 이 this.hash 라는게 어떤 맥락에서 실행되는거야? ❓❓❓
                                즉, 어떤 객체? 새로운 data 가 준비되는 시점? 
                                1) Block 이라는 클래스가 호출되면 -> block 인스턴스가 만들어진다. 
                                2) 이 block 인스턴스는 a) header 정보 b) 이 block 이 만들어 질 때 들어온, 본문 정보를 담고 있다. 
                                3) 이제 이 정보를 합쳐서 '해시화' 를 한다. 
                                4) 그러면, 이 블록에서, 이 정보가, 이 타이밍에 들어왔다는 것을 '박제' 할 수 있다!
                                5) ⭐⭐⭐ 즉, '해시화' 되어야 -> '박제' 될 수 있고 -> '데이터 무결성' 이 생긴다. 
                                6) ⭐⭐⭐ '무엇' 이 해시화 되는가? a) header 정보(이전 hash 등) + b) 지금 들어온 data! 
                    */
            
                // 블록 채굴은 뒤에 추가 
                    this.nonce = 0;
                        /* [nonce 란?]  
                            - number used once : '특정 조건'을 만족하게 하는 '유일한 값' 임. 

                            - '처음부터, 0이 연속해서 5번 나오는 해시값' 을 만들어라, 와 같이 
                            '특정 문제'를 푸는데, ✅'몇 번' 걸렸나, 를 의미하는게 nonce.
                        */

                        /* [그러면, nonce 는 채굴을 다 하고, 추가되는 값 아닌가?]

                        */
            
                // 지금은 고정값. 블록 채굴 되고, 나중에 추가될 것! 
                this.difficulty = 3
                    /* [해석]
                        'difficulty = 3' = '해시값 맨 앞에서 부터, 0이, 3번 연속' 해서 나와야 한다는 의미 
                    */

            
                // 이번 블록에서 들어온 data 
                this.data = _data
            }

            // 블록 추가 함수 
            static generateBlock( _previousBlock : Block, _data : string[]) : Block {
                
                // (지금 만들고 있는) Block 클래스를 실행시켜서 -> 블록을 만든다. 
                const generateBlock = new Block(_previousBlock , _data)
                    /* generateBlock 구조 = Block 클래스의 인스턴스(Block 의 인스턴스) = {
                            // BlockHeader 를 상속받아서 생기는 부분    
                                version : 
                                height : 
                                timestamp : 
                                previousHash : 
                            // Block 본문
                                merkleRoot: string;
                                nonce: number;
                                difficulty: number;
                                data: string[];
                                hash : string;
                        }
                    */


                // 마이닝을 통해, 블록 생성 권한을 받은 블록을 만든다. 
                const newBlock = Block.findBlock(generateBlock);
                    // 이 코드의 기능을 모르겠어 😥😥

                return newBlock;
            }
                /* [generateBlock 의 output 은?]
                    1) 마이닝을 해서 -> 주어진 문제를 푼 block 의 header, body 가 담겨 있다. 
                    2) 특히, nonce 가 처음 블록과는 다르게, difficulty 에 맞게 업데이트 되었을 것 이다.
                */ 
                /* [generateBlock 과 findBlock 의 관계] ⭐⭐⭐⭐⭐
                    generateBlock 은 
                        1) Block 인스턴스를 만들고 
                        2) findBlock 에서 문제를 푼 block 에, nonce 값을 업데이트 해서
                        3) newBlock 으로 업데이트 한다.  
                */
        
            // 블록 추가 
            // 마이닝(채굴) | 블록을 채굴하는 동작
            static findBlock(generateBlock : Block){
                let hash : string;

                let nonce : number = 0;
                    // 처음에 nonce 를 0 으로 준다. 
                    // 마이닝은 난이도에 따라서, 답을 찾는데, 블록 채굴 할 때, 연산을 몇 번 했는지, 를 이곳에 담는다. 
                    
                while(true){
                    generateBlock.nonce = nonce;    
                        // 매개변수로 들어온 generateBlock 의 nonce 에 nonce 설정값 넣기 

                    // nonce 값 1 증가
                    nonce++;
                        // [해석] ⭐⭐⭐ 
                            // nonce 값 증가 -> block 의 본문 변경 -> hash 변경됨 ⭐⭐⭐
                            // 이것 때문에, 해당 난이도에 맞는 hash 값을 때 까지 반복하는게 의미가 있음. 

                    // block 인스턴스(header + 본문) 를 createBlockHash 에 넣고 해시화 시키기
                    hash = Block.createBlockHash(generateBlock)

                    // 나온 해시값에서 '첫 0이 연속되는 개수와 difficulty이 맞는지' 확인하기 
                        // 해시값(16진수) 이진수로 만들기
                        const binary : string = CryptoModule.hashToBinary(hash)
                        console.log("binary" , binary)

                        // '해시값의 처음 연속되는 0의 개수' 가 'difficulty' 와 일치하는지 체크 
                        const result : boolean = binary.startsWith("0".repeat(generateBlock.difficulty))
                        console.log("result" , result)
                            /* [불확실 했던 부분]
                                "현재 difficulty 값을 어떤 객체가 갖고 있는가!" 에서, constructor 함수에서 difficulty가 정의되었음. 
                            */

                    // 맞췄으면 -> 블록 채굴 권한을 얻음 -> 채굴된 블록을 반환! (조건에 충족해서 나온 값을 반환!)
                    if(result){
                        // 연산을 통해 완성된 hash 를 인스턴스에 넣음
                        generateBlock.hash = hash
                            /* 이전까지, generateBlock 의 hash 속성은 비어있었음. 
                                'generateBlock 의 hash 속성' 에 방금 계산한 hash 값을 넣었음. -> '완성된 블록' 이 된다. 

                                만약, result == false 라면, 해당 block에는 hash 값이 비어있다. 
                            */

                        // 완성된 블록을 내보내기 
                        return generateBlock
                            /* [해석] 
                                nonce값은 천차만별 이겠지만, 결국, return 되는게 있긴 할 것! ⭐⭐⭐  
                                예를 들어, 한방에 맞췄으면, nonce 는 0. 
                                11번째에 맞췄으면, nonce 는 10

                                그러면, 이 nonce 를 어디에 써? 

                                그러면, 이제, 'nonce 11 을 포함한 header + 본문' 블록이 있어~ 라고 ✅'네트워크에 전파' 한다. 
                            */
                    }
                    /* [궁금한 점]
                        - 맞추지 못 하면, 다음 블록이 계속 나타나나?
                            - 매개변수로 다른게 오는게 아니라, 해당 인스턴스의 nonce 값이 변화하면서 -> 다른 hash 값을 테스트 해보게 된다.
                            - input 이 조금만 바뀌어도, hash 값이 크게 변화하므로, 제시된 difficulty 를 맞출 때 까지, 시도할 수 있다.  

                        - 블록 채굴 권한을 얻는다는게, 구체적으로 뭐지? 
                            - 맞춘다면 -> '전파' 하게 된다. 
                            - 만약, 가장 빨리 맞췄다면 -> 그에 따라서 '보상' 을 받는다. 
                            
                        - 채굴된 블록을 반환한다고? (조건에 충족해서 나온 값을 반환 한다구?)
                            - 이 말은, difficulty 를 맞춘 hash 값을, generateBlock 의 해시에 넣는다는 걸로 이해함. 

                        - 보상이 어떻게 진행되는데? ⭐⭐⭐⭐⭐
                            - '마이닝' 했으면 -> '전파'(네트워크에 알린다.) 하고 -> 'longest 여부 확인' -> longest 면, 보상을 받음!, 더 짧으면 받지 못 함. 
                            - POW 방식
                            - 이 문제를 '마이닝' 이 아니라, '버전을 어디에 맞춰서 업데이트 할 것 인가.' 의 문제로 보기도 함. 
                            - 처음엔 cpu 을 사용했다가, 나중엔 계산이 뛰어난 gpu 를 사용
                    */                        
                }
            }

            // 블록의 해시를 구하는 함수 | 'header' 와 '새로운 data' 를 더해서 '현재 블록의 해시' 를 구하는 건가? 📛 
            static createBlockHash(_block : Block) : string {

                // 'Block 클래스을 호출해서 가져온 _block 인스턴스' 에서 모든 정보를 빼내기 
                const {
                        // BlockHeader 상속으로 가져오기
                        version, height, timestamp, previousHash , 
                        // Block 본문
                        merkleRoot , nonce , difficulty , data
                    } = _block

                // 모든 정보를, 다 합쳐서, SHA256 으로, 해시화 시키기
                const value : string = `${version} ${height} ${timestamp} ${previousHash} ${merkleRoot} ${nonce} ${difficulty} ${data} `
                
                return SHA256(value).toString();
            }
                /* ⭐⭐ _block 이 뭘 의미하는지를 아는게 너무 너무 중요함 ⭐⭐⭐ 
                    _block = this 로 넣어지게 될 것 임 = Block 클래스의 인스턴스 = 지금 만들고 있는 클래스인 Block 의 인스턴스 
                    = block 의 인스턴스 = {
                        // BlockHeader 를 상속받아서 생기는 부분    
                            version : 
                            height : 
                            timestamp : 
                            previousHash : 
                        // Block 본문
                            merkleRoot: string;
                            nonce: number;
                            difficulty: number;
                            data: string[];
                    }
                */

            // 머클루트 반환 함수
            // 해당 data 가 들어오면 -> 해당 data 의 최종 부모 노드의 해시값(머클루트)을 구함 
            static getMerkleRoot<T>(_data : T[]) : string {
                const merkleTree = merkle("sha256").sync(_data)
                return merkleTree.root()
            }
            /* [(_data : T[]) 해석]
                - _data 매개변수가 '배열' 이긴 함. 
                - 그런데, '배열 요소가 어떤게 들어갈지.' 는 아직 미정 
                - T 가 정해지면 '배열 요소도 확정' 됨. 
            */

            // 블록 유효성 검사
            static isValidNewBlock(_newBlock : Block , _previousBlock : Block) : Failable<Block , string> {

                // 블록 높이 검사 | '이전 블록의 높이 + 1 == 현재 블록 높이' 여부
                if(_previousBlock.height + 1 !== _newBlock.height)
                    return {isError : true , value : "이전 블록 vs 현재 블록 비교 -> 블록 높이 오류 "}
                    // [해석] if 문을 쓰고 {} 를 안 쓰면 -> 영향받는 scope 는 바로 아래 줄 까지만! 

                // 해시값 검사 | '이전 블록 객체의 해시 == 현재 블록 객체의 이전 해시값' 여부 
                if(_previousBlock.hash !== _newBlock.previousHash)
                    return {isError : true , value : "이전 블록 vs 현재 블록 비교 -> 현재 블록 객체의 이전 해시값 오류"}
                
                // 😥😥 잘 모르겠음. 
                if(Block.createBlockHash(_newBlock) !== _newBlock.hash)
                    return {isError : true , value : "다시 계산한 hash vs 이미 계산한 hash -> 해시값이 다른 오류!"} 
                    // [문법 해석] 
                        // 그냥, '객체' 를 return 하는 것 임. 즉, isError, value 를 '키'로 해서 return 한다.                
                    /* [코드 흐름 분석]
                        _newBlock 은 'Block 타입' 을 가짐. 
                        - class 를 타입으로 지정하면 -> 해당 클래스의 인스턴스가 들어온다는 말 
                        - Block 의 인스턴스 = {
                                // BlockHeader 를 상속받아서 생기는 부분    
                                    version : 
                                    height : 
                                    timestamp : 
                                    previousHash : 
                                // Block 본문
                                    merkleRoot: string;
                                    nonce: number;
                                    difficulty: number;
                                    data: string[];
                                    hash : string;
                            }
                        - Block.createBlockHash(_newBlock) 이건 _newBlock 전체를 해시화 시키겠다는 말. 오캐이. 
                        
                        - 그러면, '지금 맥락에서 계산한 hash 값' 이랑 vs '이미 계산해서 저장된 hash값' 이렇게 비교하겠 것임! 
                    */
                
                // 블록 유효성 검사를 통과함! 정상 블록이다! 
                return {isError : false , value : _newBlock}

                
            }

            /* [궁금한 점]
                1) 어디에서 검사? 
                    : jest 테스트 할 때, Block 클래스를 호출해서, isValidNewBlock 메소드를 호출한다. 
                2) 뭘 검사해? 
                    a) 높이를 1 높여야 하는데, 실제로 1만 잘 높였는지 
                    b) '이전 해시값' 이 제대로 '현재 해시값' 에 들어갔는지. 
                    c) 현재 해시값 계산이 제대로 된건지 다시 계산해본다. 
                3) 어떤 로직으로 검사해? 정말 검사가 되는게 맞아? 
                    : 이렇게 검사하면, 블록이, 애초에 원하는(✅계획한대로) 대로 ex) 높이는 딱 1만 증가, 이전 해시가 잘 도착, 잘 계산 됐는지. 
                    : 즉, ✅ 애초 계획대로 되었는지! 를 확인 = '검증' 
                                
                [알게된 것]
                1) 아, 여기에서, Failable 타입이 사용될 수 있구나!? 

            */


    }