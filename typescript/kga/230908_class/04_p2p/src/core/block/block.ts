// 블록의 클래스를 만들 파일 
// 실제 블록 클래스 만들 파일 


import {SHA256} from 'crypto-js';
import merkle from 'merkle';
import BlockHeader from './blockHeader'
import { IBlock } from '@core/interface/block.interface';
    //       "@core/*" : ["src/core/*"], 이거에 의해, 별칭으로 지정된 것 임. 
    // IBlock 은 블록의 객체 구조를 정의한 놈임 

import { Failable } from '@core/interface/failable.interface';
import CryptoModule from '@core/crypto/crypto.module';

// 블록 생성 시간도 정해놓은 시간으로! 
const BLOCK_GENERATION_INTERVAL = 10 * 60;  // 하나 만들어지는데 10분 걸리니까, 이렇게!
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;  // 난이도 조절은 10개 이상 부터 할거야! 


// block의 형태를 클래스로 정의
export class Block extends BlockHeader implements IBlock {
    // 블록 Header 의 내용이 추가 됨 
    // 모양은 iBlockHeader 
    // 이제 블록 전체 내용을 여기에 작성 | IBlock 에서 받아온 걸 토대로 작성 

    hash: string; 
    merkleRoot: string;
    nonce: number;
    difficulty: number;
    data: string[];

    constructor(_previousBlock : Block , _data : string[] , _adjustmentBlock : Block){
        // 부모 클래스 생성자 호출 super
        super(_previousBlock);  // BlockHeader 여기 클래스에 전달해서 내용을 작성해줄 것 

        this.merkleRoot = Block.getMerkleRoot(_data)
            // 작성먼저 하고 -> 그 다음에 돌아오기

        // 블록 본인의 데이터를 해시화 한게 Block 의 해시값! 임. 
        this.hash = Block.createBlockHash(this);

        // 블록 채굴은 뒤에 추가
        // 지금은 0 으로 
        this.nonce = 0;

        //  지금은 고정값. 블록 채굴 되고, 나중에 추가될 것!
        // this.difficulty = 3 | 예전 코드 
        this.difficulty = Block.getDifficulty(this, _adjustmentBlock , _previousBlock)
            // 로직 : 블록 10개마다 조절하고 2) 예상시간의 2배보다 빠르거나, 느려야, 조절함

        this.data = _data;

    }

    // 블록 추가 함수 
    static generateBlock (_previousBlock : Block , _data : string[] , _adjustmentBlock : Block) : Block{
        const generateBlock = new Block(_previousBlock , _data , _adjustmentBlock);     // adjustmentBlock 은 난이도 조절 위한 용도
            /* generateBlock = {
                // blockHeader 에서 상속 받은 애들
                    version : string;
                    height: number;
                    timestamp: number;
                    previousHash:
                
                // Block 에서 추가된 애들
                merkleRoot : "머클루트에 대한 해시값"
                hash : ""   // 지금 이 data 에 대한 해시값이 나올 것 
                nonce : 0    // difficulty 문제를 맞출 때 가지 몇번 시도 했는가. 
                difficulty :    // 만약, difficulty 가 3이면, hash 값이, 처음부터 세번째 까지, 000 으로 시작해야 함 
                                // 1) 블록 10개마다 조절하고 2) 예상시간의 2배보다 빠르거나, 느려야, 조절함
                }
            */

        
        // 마이닝 통해, 블록의 생성 권한을 받은 블록을 만들고
        const newBlock = Block.findBlock(generateBlock);
            // 이 블록 안에 해시값을 계속 만들어 
            // 난이도에 충족하는 해시값을 계속 만들어 

        return newBlock;
            // 추가된 블록은 chain 클래스에 넣어줄 것
            // 지금은 Block 만! 지금은 Block 의 구조만! 

    }

    // 블록 추가 
    // 마이닝(채굴) 
        // 연산을 통해서, 난이도에 맞는(난이도의 값에 따른 정답), 블록의 값을 찾는다. | 그 값을 찾을 때 까지 계속 연산
        // findBlock = 동작의 이름은, '마이닝' | 블록을 채굴하는 동작 
        // POW = 작업 증명 = 블록의 난이도에 충족하는 값을 구하기 위해서, 연산 작업을 계속 진행 -> 조건에 충족하는 값을 구하면 
            // -> 보상으로 블록의 생성 권한을 얻는다. 
            // -> 컴퓨터의 cpu 자원을 사용함. 
            // 나중엔, gpu 연산이 뛰어나서, gpu 를 사용

            // 블록 생성하고 -> 네트워크에 '블록생성했어' 알려주고 -> 체인 길이 확인 -> longest 임 -> 그러면 보상 받음 ⭐⭐⭐ 
            // 블록 생성하고 -> 다른 사람이 좀 더 체인이 길었어 -> 그러면 보상을 받지 못 함. 
            // 왜 이래야 하지❓❓❓❓❓❓ 

        
        // 마이닝 | 블록을 채굴
        static findBlock(generateBlock : Block){
                /* generateBlock = {
                    // blockHeader 에서 상속 받은 애들
                        version : string;
                        height: number;
                        timestamp: number;
                        previousHash:
                    
                    // Block 에서 추가된 애들
                    merkleRoot : "머클루트에 대한 해시값"
                    hash : ""   // 지금 이 data 에 대한 해시값이 나올 것 
                    nonce : 0    // difficulty 문제를 맞출 때 가지 몇번 시도 했는가. 
                    difficulty :    // 만약, difficulty 가 3이면, hash 값이, 처음부터 세번째 까지, 000 으로 시작해야 함 
                                    // 1) 블록 10개마다 조절하고 2) 예상시간의 2배보다 빠르거나, 느려야, 조절함
                    }
                */
                
            let hash : string;
            
            // 처음에 nonce 를 0 으로 준다. 
            // 마이닝은 난이도에 따라서 답을 찾는데, -> 블록 채굴을 할 때, 연산을 몇 번 진행했는지! 를 이곳에 값을 담을 것 임.
            // nonce 변수는 블록을 채굴하는데 연산을 몇번진행 했는지 값을 여기에
            let nonce : number = 0;

            while(true){
                generateBlock.nonce = nonce;

                // nonce 이 값을 증가시켜서, hash 값을 계속 바꿔서, 진행
                    // nonce 값이 계속 증가 되다가 바뀐다? 
                    // nonce 가 올라가면 -> hash 값이 바뀐다? 
                nonce++;
                
                hash = Block.createBlockHash(generateBlock);
                    // 블록 해시 구하는 구문 추가 
                    // SHA 256 을 해시화 시킨 해시값

                // 16진수를 -> 2진수로 변환해서, 난이도에 맞는 값인지를 확인함
                    // 16진수를 2진수로 변환해서, 0의 개수가 난이도의 개수에 개수에 충족하는지 체크
                    // 문제를 맞추면, 블록 채굴의 권한 갖고 -> 블록을 생성할 수 있음. 

                // 충족되었는지 확인하려면, binary 2인값이 바뀌는 이유는, 
                const binary : string = CryptoModule.hashToBinary(hash);
                    // 이진수 값이 필요한데, 이걸 구하는 식
                    // 2진수로 바뀐 것 에서 0의 개수가 몇개 있는가! 를 체크 
            
                console.log("binary" , binary)

                // 연산의 값이, 난이도에, 충족했는지, 체크할 변수
                const result : boolean = binary.startsWith("0".repeat(generateBlock.difficulty))
                // const result : boolean = binary.startsWith("0".repeat(3))
                    // 문자열에서 앞의 부분을 체크하는데, 0 의 개수를 반복
                    // 체크할 때, 문자열의 난이도 만큼!!! 0의 개수가 있는지를 체크!!! 

                    // startWith : 문자열의 시작이, 매개변수로 전달된 문자열로 시작되는지 체크!
                    // ex) 만약, difficulty 값이 3 이라면, 
                    // ex) binary 안에 있는 값이 000 으로 시작하는지 여부 -> true, false 값이 나올 것 

                console.log("result" , result)
                
                // 퀴즈를 맞췄으면 -> 블록을 채굴할 수 있는 권한을 얻음 -> 채굴된 블록을 반환! (조건에 충족해서 나온 값을 반환!)
                if(result){
                    // 연산을 통해, 완성된 hash 값과, 
                    generateBlock.hash = hash;
                    // 완성된 블록을 내보내주자
                    return generateBlock;
                }
            }
        }

        // ✅✅✅ 추가할 블록을 찾으면, 네트워크에 브로드 캐스트 하고 
        // 다른 네트워크들은 내 체인과 블록을 받아요 
        // 그러면, 블록 검증을 하고, 체인 검증을 하는데, 
        // 다른 네트워크의 체인과 내 체인의 길이를 비교해서, '긴 체인' 이 정답
        
        // 만약, 다른 네트워크의 체인이 더 긴 경우에는, 내가 채굴이 늦은 것 
            // 그러면, 보상을 못 받음. 
        // 만약, 다른 네트워크 체인 보다 , 내 체인이 더 긴 경우, 내가 채굴을 더 빠르게 한 것 임. 
            // 그러면, 내가 보상을 받음.
        // 따라서, 채굴을 동시에 시작해서, 제일 빠르게 채굴한 사람만! 보상 받음 ⭐⭐⭐
            // 늦으면 보상 못 받음. ⭐⭐ 



        // 블록의 해시를 구하는 함수
        static createBlockHash(_block : Block) : string{
            // 블록의 모든 정보를 가지고 
            const {version , timestamp, height, merkleRoot, previousHash, difficulty , nonce} = _block;

            // 모든 정보를 가지고, SHA256 로 해시화 시킨것! 이게 000 이다. 
            const value : string = `${version} ${timestamp} ${height} ${merkleRoot} ${previousHash} ${difficulty}  ${nonce} `

            return SHA256(value).toString();
        }


        // 블록에 있는 데이터를 더하고 더하고 해서 -> 머클 루트
        // 머클 루트 반환 구하는 함수 
        static getMerkleRoot<T>(_data : T[]) : string {
            const merkleTree = merkle("sha256").sync(_data);
            return merkleTree.root();
        }

        // T[]
            // T 를 주면 -> 타입을 STRING 으로 줄 수 이음. 
            // 타입을 함수처럼 사용할 때 지정할 수 있음
            // 어떤 타입을 받는지 모르기 때문에 
            // any 랑 비슷❓❓❓❓❓❓ 


        // 블록이 유효한지, 정상적인 블록인지 검사
            // 새로운 블록이랑, 이전 블록이랑 가져온다. 
        static isValidNewBlock(_newBlock : Block , _previousBlock : Block) : Failable<Block, string>{
            
            // 블록의 유효성 검사를 하는데, 

            // 블록의 높이가 정상적인지 검사
                // 이전블록이 1 이면, 다음 블록은 2
            if(_previousBlock.height + 1 !== +_newBlock.height)
                return {isError : true, value : "이전 높이 오류"}

            // 이전 블록의 해시값이, 새로운 블록의 이전 해시값과 동일한지 확인 
            if(_previousBlock.hash !== _newBlock.previousHash)
                return {isError : true , value : "이번 블록 해시 오류"}

            // 채굴 할 때 사용한, 블록의 정보를 가지고, 다시 해시해서, 블록의 값이 변조되었는지, 정상적인 블록인지 확인
            if(Block.createBlockHash(_newBlock) !== _newBlock.hash)
                return {isError : true, value : "블록 해시 오류"}
                // 누가 블록 채굴했데! 라는 말을 들음 
                // so, 블록을 확인하고 -> 정상적인 블록이면 -> 블록을 추가. 이걸 검증함수에서 정의함
                
            
            // 블록이 유효성 검사를 통과했다! (정상적인 블록이다!)
            return {isError : false , value : _newBlock}
        }


        // 난이도를 구하는 함수 
        static getDifficulty(_newBlock : Block , _adjustmentBlock : Block , _previousBlock : Block) : number {
            // 10번째 클록을 하는 이유는? 
                // 1주일을 기다릴 수 없지만, 
                // 실제에서는 네트워크 에서는, 2016개 이전의 블록 생성 시간을 보고 -> 난이도를 조절 한다. 
                // 우리는 10개 이전
            
            if(_newBlock.height <= 0 ) throw new Error("높이가 0 이 들어왔어요! 최초 블록이라는 말. 채굴한게 최초 블록이면 안 되잖아!")
            if(_newBlock.height < 10) return 0  // 난이도를 0 으로 준다. 
            if(_newBlock.height < 12) return 1  // 난이도를 1 으로 준다.    // 상수값을 반환
                // 블록이 만들어지기 전 까지는, 이렇게 
                // 블록의 높이가 20 이하일 경우에는 체크 x 
                // 블록의 높이가 10의 배수가 아닐 경우에는, 이전 블록 난이도를 설정. 
                // 목표 시간은 1 블록당 10분 | 10개를 만드려면, 100분이 걸리게 하는게 목표
            
            // 나머지가 떨어지지 않으면 -> 이전 블록 난이도 유지
            if(_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return _previousBlock.difficulty;

            // 시간의 차이를 구하기 
            const timeToken : number = _newBlock.timestamp - _adjustmentBlock.timestamp // 10개 이전 블록의 시간을 빼준다. 
            const TimeExpected : number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL   // 10개 만들어지는 시간을 구함!  
                /*  BLOCK_GENERATION_INTERVAL : 10분 | DIFFICULTY_ADJUSTMENT_INTERVAL : 10개 의 간격을 둔다. -> so, 총 10개 만들어지는 시간
                */


            // 생성시간이 빨랐다
                // 총 걸린시간 < 목표시간 / 2 = 이전블록 난이도 1 증가
            if( timeToken < TimeExpected / 2 ) return _previousBlock.difficulty +1;
                // [궁그증] 여기에서 왜 2로 나눠주지❓❓
                    // 무조건, 예상 시간보다 빠르게 만들어졌다고 해서 -> 난이도를 높이지 않음. 
                    // 예상보다 2배 정도 빠르게 캤을 때 -> 비로소, 난이도를 높임. 

            // 생성시간이 더 걸렸다면 , 난이도 감소
                // 총걸린시간 > 목표시간 * 2 = 이전 블록 난이도 -1;
            if(timeToken > TimeExpected * 2) return _previousBlock.difficulty -1;
                return _previousBlock.difficulty    // 그게 아니면, 이전 블록 난이도, 유지
        
            
        }



}

