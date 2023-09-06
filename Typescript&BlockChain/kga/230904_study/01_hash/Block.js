
// 최초의 제네세스 블록 만들기 
    // 블록의 생성 및 관리하기


// 모듈 임포트
    const merkle = require("merkle");
    const { SHA256 } = require("crypto-js");

    class Header {

        constructor( _height, _previousHash ){
            // 블록의 버전
            this.version = Header.getVersion();     // static 이므로, 모든 인스턴스가 공유함
            
            // 블록의 높이
            this.height = _height       // static 이 아니므로, 각 인스턴스 마다 고유한 값을 가짐

            // 블록의 생성시간
            this.timestamp = Header.getTimestamp();     // // static 이므로, 모든 인스턴스가 공유함

            // 블록의 (이전) 해시값
                // 최초 블록은 이전 블록이 없으니까, 0 으로 대체 
            this.previousHash = _previousHash || "0".repeat(64)     // static 이 아니므로, 각 인스턴스 마다 고유한 값을 가짐
        }
            /* [시사점]
                객체를 정의할 때, 특정 속성을 '공유' 할지, '개별적' 으로 가질지 구분이 필요  
            */

        getName(){   }

        static getVersion(){
            return "1.0.0"
        }
        
        static getTimestamp(){
            return new Date().getTime()
        }
    }
        /* static 사용 유무가 클래스 멤버 속성 및 멤버 함수의 접근 시기 및 개별값에 미치는 영향
            - static 을 사용하지 않으면 
                1) [접근 가능 시기] '특정 속성과 메소드' 에 '클래스의 constructor 가 호출되어서, 인스턴스가 생성될 때.' 사용 가능
                2) [효과] 모든 인스터스가 개별적인, 자신만의 name 값을 갖는다. 

            - static 을 사용하면 
                1) [접근 가능 시기] 클래스 안에서 바로 사용 가능 
                2) [효과] 모든 인스턴스는 '공통적인 name' 을 갖는다. (값은 클래스에 저장.)
                3) [효과] 동적할당(클래스로 객체를 생성) 했을 때, 인스턴스에 해당 메소드가 생성되지 않음
                4) [쓰임] '클래스이름.메소드이름or속성이름' 이렇게 접근이 가능!   
                    ex) Header.getVersion();


            - static 사용 이유(실익)
                1) 클래스 안에서 곧바로 사용 가능 
                2) 모든 인스턴스가 공유하는 '속성 및 메소드' 를 만들기 위해
        */

        /* 이 코드를 거치고 나면 나오게 될 인스턴스는? 
            Header의 인스턴스 = {
                version : "1.0.0", 
                height : _height, | ✅ 클래스를 호출하는 시점에 값이 들어오게 됨 
                timestamp : "실제만들어진시간"  | ❓ 이건 코드가 돌아간 시간, 인스턴스가 만들어진 시간 ❓
                previousHash : _previousHash | ✅ 클래스 호출 하는 시점에 값이 들어온다.
            }
        */


// 블록 class
    class Block {
        
        // 동적할당(클래스 생성자 함수 실행해서 인스턴스 만들기)시, 
        // 매개변수로 1) Header의 인스턴스 객체와 2) data ex) 뉴스 기사 를 받아서 생성
            constructor(_header , _data){

                // 앞서 선언된 Header 클래스를 '누적' 해서 가져오고 있음 
                    // 이때, 지난주 수업에서는 다른 방식을 사용했었음 📛📛📛 
                this.version = _header.version;
                this.height = _header.height;
                this.timestamp = _header.timestamp;
                this.previousHash = _header.previousHash

                // 동적할당을 통해 data 매개변수 받기 ex) 최초의 뉴스 기사 
                this.data = _data;

                // 검증하고 싶은 data 를 머클트리에 넣어서 -> 머클루트의 해시값
                this.merkleRoot = Block.getMerkleRoot(_data)

                // 블록의 해시 ⭐⭐⭐ 
                this.hash = Block.createBlockHash(_header , Block.getMerkleRoot(_data))
                    /* [해석]
                        'this.hash' 이라는 건 
                            1) header(버전, 높이, 생성시간, 이전 해시값)
                            2) 머클루트의 해시값 을 
                            3) 다시 해시함수에 넣은 해시값? 
                        
                        그리고, 이러한 this.hash == 블록?! 
                    */

                    /* [해석] 
                        모든 내용을 해시화 시킨게, 블록의 해시.
                        즉, 블록은 모든 내용이 해시화 된 것, 을 의미❓❓❓ 
                    */
            }

            // 검증하고 싶은 데이터가 들어오면 -> 머클 트리에 넣어서 -> 머클 루트(해시값)를 내뱉는 static 함수
            static getMerkleRoot(_data){
                const merkleTree = merkle("sha256").sync(_data)
                return merkleTree.root()
            }

            // header 와 해당 data 의 merkleRoot 로 해시값(블록) 만들기
            static createBlockHash(_header , _merkleRoot){

                // Header 클래스의 인스턴스 객체인 _header 에서 'value'들만 뽑아서, 배열로 만든다. 
                const values = Object.values(_header)

                // 배열을 문자열로 합친다. 구분점은 빈 문자열. + 현재 블록에서의 data 의 merkleRoot(해시값) 
                const data = values.join("") + _merkleRoot

                // 'header + 현재 data 의 merkleRoot 를 합친 해시값' 을 리턴 
                return SHA256(data).toString();
            }
    }

    /* [DJ해석 ver1] 그러면, '블록(block)' 이라는게 뭐지? '블록 체인'은 뭐지?

            [블록(block) 구성요소]
                - 블록은 '헤더(메타데이터)' 와 '머클루트(merkleRoot)' 로 구성되어 있음. 
                    - 헤더에는 1) 버전 2) 높이 3) 생성시간 4) 이전 해시값 들이 있음. 
                    - 머클루트(merkleRoot)는 '특정 data ex) 뉴스' 의 '최종 부모' 의 '해시값' 임.  

            [블록체인(blockChain) 은?]
                - 하나의 블록은 헤더에 이전 블록의 해시값을 갖고 있음. 
                - 해시함수의 특성상, input 에 조그마한 변동이 있으면, output 은 급격하게 차이남. 
                - 이렇게 블록끼리 연결되면서, '데이터이 무결성을 증명' 한다.❓❓❓❓❓❓

            [그러면, 블록 체인, 에서, 데이터 무결성이 증명되는 과정은❓]
                - 'Alice 가 Bob 에게 5 코인을 송금' 한다고 할 때, 
                    제대로된 거래(변조되지 않은, 거짓이 없는, 모두가 믿을 수 있는) 라고 하려면 
                    Alice 에게 진짜 5 코인이 있고, Bob 이 딱 5개의 코인만 받아야! 한다. 
                    이게 오캐이 된다면, 이 하나의 트랜잭션(Alice에게 돈이 있고, Bob 은 이전에 중복 수령이 없는 하위요소로 구성된) 은 믿을 수 있게 된다. 
                
                - 예전에는 이것이 제대로 되었다! 를 보증하기 위해서, '중앙 기관' 이 '데이터 베이스' 를 두고 관리했다. 

                - 그런데, 블록체인은, 각 노드(네트워크에 연결된 서버 혹은 컴퓨터) 각각이 '제대로 된 트랜잭션 인가.' 를 검사 
                    > 만약, 맞다면, 통과 시켜서, 다음 노트가 검증한다.

                - 지금 단계에서는 이렇게 추상적으로 밖에 이야기를 못 하겠다 😥😥
    */

// 첫 번째 블록 생성
    // 블록에 data 내용 담기
        const data = ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']

    // 블록 헤더 객체 생성
        const header = new Header(0)
            /* [해석] 첫 번째 객체 이므로, height 는 0 */

    // 'header 객체 + 해당 data의 머클루트'로 블록을 생성
        const block = new Block(header , data)
        console.log(block)


// 두 번째 블록 생성
    const header2 = new Header(1, block.hash);
        // 첫 번쨰 매개변수(height) : 몇 번째 블록인가 
        // 두 번째 매개변수(_previousHash) : 이전 블록의 해시 값

    const block2 = new Block(header2 , ["두번째 블록 🙆‍♂️🙆‍♂️🙆‍♂️"])
        // 첫 번째 매개변수(_header) : Header 클래스의 인스턴스 
        // 두 번째 매개변수(_header) : 이전 블록의 해시 값

    console.log(block2)
        // 이렇게 해서, 나온, block2 의 값이 '무엇을 검증' 한다고 볼 수 있는거지? 
        // 이러한 height 0 번째 일 때의, 메타데이터 환경에서, data 는 "뉴스 기사" 이고 
        // 이러한 height 1 번째 일 때의, 메타데이터 환경에서, data 는 "두번째 블록 🙆‍♂️🙆‍♂️🙆‍♂️" 이다. 
        // height 0 번째 일 때의 메타데이터가 조금이라도 변화하면, 혹은 data 가 변화하면 -> 해시값이 요동친다.
        // 즉, 'block 을 구성하는 요소(메타 데이터 + 머클루트의 data)' 가 조금이라도 변화하면 -> 해시값이 요동치고 -> 체인 끼리 연결되어 있으므로 -> 체인 끝 까지 간다.
            // 따라서, "height 0 번째인 특정 메타데이터 환경" 에서의 data 는 무조건 "뉴스 기사" 라는 걸 검증! 한다. 