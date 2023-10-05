# 솔리디티 

1. 절차적 프로그래밍 언어 
2. 컴파일 언어 
    - 컴파일 해서 사용

# SPDX License Identifier
    - 스마트 컨트랙트 보안성에도 관련 
    - 스마트 컨트랙트 신뢰성에 관련 
    - 저작권 문제를 방지하기 위해, 코드의 최상단에 주석으로 표시 

# Pragma
    - 컴파일러의 기능을 사용하기 위해 작성하는 구문 
    - 솔리디티 버전 작성 명시 

# Contract 
    - 객체지향 언어의 class 와 유사 
        - new 에서 동적할당 도 함! 

    - contract 의 내부에, 상태 변수를 보관
        - 그러면, CA 에 저장됨 ❓❓❓ 

    - 상태 변수를 갖고 있고, 상태 변수를 조회, 변경 하기 위한 함수도 포함하고 있음. 



# 솔리디티 코드를 작성할 때 

### import
    - 외부 파일의 코드를 가져올 수 있음 -> 모듈화 시킬 수 있음. 
    - export 할 필요는 없음. 
    - 선언한 contract 를 바로 사용 가능 

    ``` javascript 
    import '파일 경로';
    import {"Contract이름"} from "파일 경로"
    ```


# 상태 변수 
    - Contract 내부에 선언한 변수 
    - 상태변수는 Contract storage 에 저장
    
    - 이 storage 는 
        1) blockchain 에 기록되는 영구적인 값, 유지되는 공간. | CA 루트❓❓❓ 
        ex) 하드디스크에 계속 저장하는 것 
        ex) 이건, solidity 에서 함수 돌아가고 남은 값을 저장하고 있게 됨. 
    
    - Memory 공간 
        : 함수 같은 애들. 프로그램이 동작하는 동안에만 값을 기억 
        : 동작하고, 종료되면, 해제시키는 데이터 공간 
        : function 등 
        : js 파일 실행 시키면, 그 동안에만 프로그램을 동작시킴 -> 동작되고 나면 해제 됨. 
        : sol 파일 안에 function 같은 건 돌릴 때만 쓰고 저장하지 않음 


# 데이터 타입 
``` javascript
contract Counter {

    // 상태변수 선언
    bool _bool = true;
        // [타입] [변수명]
        // 기본이 true 
        // 참과 거짓 값을 저장하는 변수
        // typescript 처럼 변수를 지정해준다. 

    uint256 _uint;
        // unit : 부호가 없는 정수형 
        // - 가 안 붙는 정수 
        // 음수가 될 수 없음! 
        // 정수형 타입! 
        // unit 자료형 뒤에 숫자를 붙이면, 메모리 영역의 크기를 지정할 수 있음! 

    int256 _int;
        // 숫자 타입
        // 부호가 있는 정수형 : -가 붙을 수 있음 
        // 음수가 될 수 있음. 
        // 정수형 타입 int 는 int 자료형 뒤에 숫자를 붙이면 메모리 영역 크기 지정! 
            // 주소 값 들은, 메모리 영역 크기 때문에, 엥간하면 256 하면 됨. 
            // 다만, 계약할 때, 이 정도면 있겠다~ 싶을 때 좀 더 적은 숫자 적기도 

        // int 와 unit 데이터 범위를 지정할 수 있는 이유는 
            // - 작업을 할 때, 어떤 코드를 작성하느냐에 따라, 효율적으로 데이터 공간을 줄이기 위해서 
            // 지정된 공간만 사용 -> 연산 줄이고 -> 가스비 줄일 수 있음. ⭐⭐⭐ 
            // 8 ~ 256bit 까지 지원을 한다. 

        // 예시 
            // int8 === -128 ~ 127 자리 | ⭐⭐⭐ 이 자리수는 한번 찾아보면 좋을 것 ⭐⭐⭐ 
            // uint8 === 0 ~ 255 
            // enum 타입 : 개발자가 가독성 높이기 위해서 사용하는 자료형
                // 어떤 변수명 일 때, 1, 2 쓰고 하는 것들 
            // 상수를 사용하면서, 조건처리할 때, 가독성을 높이기 위해서 사용

        enum Status {
            Pending,    // 0
            Accepted,   // 1
            Rejected,   // 2
        }
            // ex) 0 일 때는 Pending , 1 일때는 Accepted 
            // 만약, Accepted 가 위로 올라가면 0 이 됨 


    // status 초기값은 0 
    Status public status;
        // status.Pending === 0
        // status.Accepted === 1
        // status.Rejected === 2

    
    // enum 의 상태를 조회 
        function get() public view returns(Status) {
            return status;
        }
        // 초기값은 0 이 나온다. 
        // 0 이면 pending 

        // enum의 상태를 변경
        function set(Status , _status) public {
            status = _status
        }
            // ex) 누군가 투표를 할 때, 완료되면 -> Accepted 상태로 관리 
            // 즉, 이렇게 '상태 관리' 를 0 , 1, 2 로 하는데, 가독성을 높이기 위해, 글자로 !!! ⭐⭐⭐ 
                // 상태에 주소를 주거나 

    // string 문자열 자료형 
        string Str = "hello sol~";
            // 지갑에서 , 다른 주소로 전송하고, 이더리움 전송 하고 받고 하게 됨 

    // address 주소형 
        // 지갑을 만들었을 때 봤던 주소 : 0x123213123132df
        // 주소의 크기는 20바이트 크기의 자료형 컨트랙트 주소를 저장할 때 사용하는 변수 
        address sender = 0x0000000000000000000000000000000000050000;    // 여기 뒤에는 40자리
            // 이녀석도 내부 인스턴스가 있어서, 내부 메서드들을 사용할 수 있음. 
                // ex) balance property 가 있어서, 주소의 이더 잔액을 확인할 수 있음. 
            // sender.balance 를 하면 : 해당 주소의 '이더 잔액' 을 조회할 수 있음. 
            // sender.transfer("보낼 금액") : 이 지갑에 얼마를 전송해~ 도 가능 
            // sender.send("보낼 금액")
                // 이렇게 address 자료형을 사용할 수 있어~ 

    // 메서드 transfer, send 메서드를 사용해서, 이더 전송 가능 
        // transfer : 이더리움을 보낼 때 실행됨 
            // ex) 메타마스크에서 balance 몇을 전달하느냐 

    // 배열의 타입 
        string[] strArr = ["1, "2", "3"];
            // 배열의 크기가 실행중에 변경 가능! 
            // 배열의 크기를 따로 지정 

    // 배열의 크기 지정 
        string[2] strArr2 = ["1" , "2"];
            // 2개 까지 가질 수 있고, 그 이상 넘어가면, 오류 
            // 배열의 크기는 '선언시' 지정이 된다. 

    // 구조체 struct
        struct Struct {
            string name;
            uint number;
        }
        // 이러한 구조를 정의 
        // 이 형태의 타입을 사용할 때, 동적할 당 해서 사용. 
    
    // 매핑 : key-value, 키와 값을 저장할 때 사용하는 데이터 타입 | ❓❓❓
        mapping (address => uint256) tokens;
        tokens {
            address : 10000
        }
        // address : 이건 key

        // 이 주소가 토근을 1만개 갖고 잇다. 
        // address 가 key , uint256 이 value 


        mapping(string => mapping(address => uint256)) token2;
        // string 이 key 
            // 그 안에 어떤 지갑이, 몇개를 갖고 있다, 를 작성하고 싶을 때 
        // mapping(address => uint256) 이 value 로 들어감 
            // address 가 key 가된다. 
            // uint256 이 value 가 된다. 
            tokens2 {
                string : {
                    address : 10000
                    address2 : 10000
                }
                string2 : {
                    address : 10000
                    address2 : 10000
                }
            }

    // 글로벌 변수 
        function a(address payable _to) public payable {
        // address payable : 이게 타입 , 선언식 
        // payable : 이게 있어야만 이더리움 보낼 수 있음. 
        // _to : 이게 매개변수 이름, 여기에 지갑의 주소를 받을 수 있음. 
        
        // payable : 이더리움을 보낼건지, 결제를 할 건지, 결제 처리를 한다는 처리문
            // 이게 붙어야, 이더리움을 전송할 수 있음 ⭐⭐ 
            // 이게 붙어야 이더리움을 보내고 받고! 그래야, 결제가 됨. 

        // '이더리움 블록체인 정보' 를 갖고 있는 글로벌 객체, 전역 변수, ex) 노드 js 때 처럼❓❓❓ 
            // block 안에 들어가 있음 
            block.coinbase;     // 누가 첫 번째 채굴했는지, 누가 보상 받을지
                // 현재 블록을 채굴한 account 가 뜬다. 
            
            block.difficulty;       // 현재 블록의 난이도
            block.gaslimit;     // 현재 블록이 사용 가능한 최대 gas 값
            block.number;       // 블록의 높이
            block.timestamp;        // 블록 생성 시간 

        // msg : 컨트랙트에서, message call 했을 때, 컨트랙트에 전달된 메시지 정보를 가지고 있는 객체  (알고 있기 ⭐⭐⭐) // counterContract 를 가지고 왔는데 
            msg.sender;         // 컨트랙트를 호출한 account 주소 가 나옴 
                // 누가 이 컨트랙트를 실행 시켰는지가 나옴 

            msg.value   // 메시지로 전달받은 이더리움의 단위가 wei 단위로 담겨 있음. 
                // 컨트랙트를 실행시킨 사람이 wei 로 얼마를 보냈느가! 를 알 수 있음. 

            msg.data;       // 컨트랙트 call 로 실행할 때, 보낸, 데이터의 내용 

            msg.sig;        // 전달받은 데이터의 첫 4바이트 == 어떤 메소드를 실행시켰는지 확인

            // address 
                // 이 address 안에는, balance 와 property 가 담겨 있음. 
                _to.balance;    // 계정의 잔고      
                    // 왜냐면, address 타입이니까. | 그리고 이미 

                uint amount = 10**18;
                _to.transfer(amount)        // 이더를 해당 주소에 보냄 
                _to.send(amount)        // 이더를 해당 주소에 보냄 
        }

        // 함수의 구조 
            function name(uint a) public view returns (uint) {

            }
            // name : 함수명 
            // (uint a) : uint 타입. a 매개변수 이름
            // public : 함수의 접근자 | 이 함수를 어디까지 접근할 수 있게 할지 | 
                // 접근자 
                    // 1. public : 외부 호출이 가능 ex) ca 에서 ca 에서 호출 가능 , eoa❓❓❓ 에서 호출 가능 | 외부 컨트랙트가 계정에서 호출 가능 
                    // 2. private : 현재 컨트랙트에서만! 호출 가능
                        // 현재 클래스에서만 쓸 수 있는 느낌❓❓❓ 
                        // private 이면, eoa 에서 호출 못 해 
                        // 원격 프로시저로 해서 부르지 못 함 ⭐⭐⭐ 
                    // 3. internal : 내부 함수는 컨트랙에서 접근을 할 수 있음 (외부에서 안 됨). / 다른 컨트랙트에서 상속 받아서는 호출이 가능하다.  
                    // 4. External : public 같은 타입. 차이가 거의 없음. 

            // view : 접근 지정자
                // 접근 지정자 : 접근 했을 때 뭔가를 해줄거냐 
                // 1. view 
                    // 상태 변수 선언 | 솔리디티 언어의 특징 ⭐⭐⭐ 
                    // 상태변수 읽기 전용. 변경은 불가능. 조회만 가능 (call 만 가능)

                // 2. pure
                    // 순수한 동작을 할 때 사용 
                    // 상태변수 읽기도 안 됨. 변경도 안 됨. 
                    // 말그대로, 순수하게, 전달받은 매개변수로만 함수의 동작을 하고 싶은 경우에! ⭐⭐ 

                // 3. payable 
                    // 결제를 처리할 수 있다는 선언
                    // 이더리움을 처리할 수 있다는 선언. 이더를 전송하는데 선언을 하지 않으면, 거부(reject) 된다.  


                // 조건문 작성
                    // require
                        // 주어진 조건을 검사해서, 만족이 되면 -> 구문 통과 
                        // 만족이 안 되면, reject 발생 -> 이전 상태로 되돌림 & 가스비를 반환됨 
                        // if 문 같이 조건 처리
                        require(조건문);
                        조건문이 잘 통과되면 동작해야할 구문


                // 컨트랙트 배포자가 문제가 있거나, 변경하거나 할 때 '계약을 파기' 하겠지? -> 계약을 파기 하고 싶을 때
                    address payable sender
                    // sender : 배포자의 주소를 받을 변수. 이더를 전송받을 수 있음 | payable 이 있기 때문에
                    // payable 을 쓰는 이유는, 이걸 파기할 때의 잔액은 배포자가 가져가야 

                    require(msg.sender == sender);       // 배포자 인지 확인. 배포자만 파기할 수 있게 
                    
                    // selfDestruct 함수
                    selfDestruct(sender);     // 계약을 파기하고, 이더리움을 보낼 주소!
                        // selfDestruct(지갑주소⭐⭐) : 현재 계약을 파기하고, 전달받은 매개변수 주소로, CA의 잔액을 전송! 
                        // selfDestruct(이더리움 CA 주소) : 계약을 파기하고, 전달된 CA 에 잔액을 전송할 수 있다. | ❓❓❓ 그러면 이게 위에꺼랑 동일한 말 인가? 
                    


            // returns (uint) : 반환값의 타입 
}

        // 위의 내용을 많이 써보고, 배포도 많이 해보고 해야 함 ⭐⭐⭐⭐⭐⭐ 


```




# Truffle 을 통해 배포 해보기 


- Truffle
    - 배포를 편하게 해주는 '프레임워크'(폴더 구성이 포함되어 있음.)
    - Dapps 개발을 쉽게 할 수 있도록, 도와주는, 프레임워크
    - 배포를 편하게 할 수 있음! 
    - 스마트 컨트랙트 컴파일, 배포 및 테스트 기능을 쉽게 할 수 있도록 도와준다. 
    
- 리액트 설치 
    - 트러플에 리액트가 필수는 아닌데, 리액트를 쓰기 위해서  
``` sh
npx create-react-app test

cd test

#트러플을 꼭 test 에 할 필요는 없으나, 교수님은 여기에! 
npm i truffle

# 트러플 사용하는 초기 단계 (프레임 워크니까, 처음 폴더 구조를 만들어줄 것)
npx truffle init
    # npx truffle init
        # 초기 셋팅을 도와준다. 3개의 폴더가 생김
        # 1) contracts : 솔리디티 코드를 작성한 sol 파일을 담을 폴더
            # 컴파일을 진행하면, 이 폴더에 있는 sol 파일을 읽어서, 컴파일을 진행한다. 
            # build 폴더가 생기고, 컴파일된 내용이, json 파일로 생성된다. 
        
        # 2) migrations : 컨트랙트 배포를 진행할 js 코드 작성 이더리움 네트워크에 배포하는 내용을 작성할 js 를 이 풀더에
            # 이 js 안에 있는 내용을 읽어서, 어떤 네트워크에 배포할지
            # 이 네트워크에 컴파일된 내용으로 배포 
        
        # test 파일은 테스트 할 수 있게 

```

- truffle-config.js 파일 수정
    - 배포할 때, 이렇게 연다
```json
module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none) | 가나쉬 
     network_id: "*",       // Any network (default: none)
    },

  },

  compilers: {
    solc: {
      version: "0.8.13",  // 솔리디티 버전
    }
  },
};
```



# 컴파일 
- 솔리디티 코드 작성 하자. contract 폴더에 sol 파일을 만들자. 

- 컴파일 명령어 
    - sol 파일을 읽고 -> 컴파일 해 -> 그러면 빌드 폴더 생김 

``` sh
npx truffle compile
```

- build 폴더가 생기고 -> 컴파일된 내용이, 생성된, json 파일에 작성되어 있다. 
    - build 파일 보면 ⭐⭐⭐
        -   "networks": {}, : 여기에 배포가 되면 CA 가 들어옴 
        - 여기에 이제 abi 가 들어옴 




# 배포 

- 어떤 네트워크에 배포? 
    - ganache 실행 

``` sh
# ganache 설치 
npm i ganache-cli

# ganache 실행
npx ganache-cli

```


### 파일 만들기 
- 배포 내용을 migrations 폴더 안에, 배포 코드 작성
- truffle 에서 파일명 규칙이 있음. 
    - 프레임워크가 정해진 거니까. 
    - 파일명 : [번호(순서)]_[내용]_[컨트랙트 이름].js 파일로 이름 작성
    - 1_deploy_Counter.js 이렇게 이름을 작성



### 1_deploy_Counter.js 에 코드 작성하기 
``` js

// artifacts : 컴파일한 내용에서 파일을 찾아서 불러온다.
const Counter = artifacts.require("Counter");
// 빌드된 파일 가져오기
    // 빌드된 파일 중 counter 가져온다.

module.exports = (deployer) => {
    
    // deployer 배포 내용이 포함된 객체를 전달받고, 
    // deployer 메서드가, 해당 컴파일된 내용을 네트워크에 배포 진행
    deployer.deploy(Counter)    
        // json 파일인 Counter 를 가져와서, => deploy 에 넣고, => 배포 진행

}
    // deployer : 배포하는 내용을 담은 객체 
```


### 배포 명령어 
``` sh 
npx truffle migrate
```
- ganache 네트워크에 배포 진행 

- 배포한 CA 확인 
```
0xcdC72499c8Fa90D1A54cB6b87C2E227949709490
```

- CA 로 요청을 보내서, call 이나, send 를 통해, 원격 프로시저 실행을 할 수 있음. 
    - ⭐⭐지금은 그걸 하지 않고, 트러플에서 콘솔로 확인할 수 있음. ⭐⭐ 
    - 트러플에서 할 수 있게 편하게 도와줌 
    - truffle 콘솔에서 확인해보고 싶은데 

``` sh
# 콘솔창에 코드를 바로 작성해서 call, send 를 보낼 수 있음.
npx truffle console
```

### 배포된 컨트랙트 접근 (이걸 콘솔창에 띄워놓은 트러플 콘솔에 넣는다 ⭐⭐⭐)
``` JS
// Counter 라는 컨트랙트가 배포된 것 에서, 마지막으로 배포된 컨트랙트를 접근 

// 접근하는 동안 비동기 처리 
Counter.deployed().then( (instance) => (counter = instance ) );
    // instance : 배포한 Counter 컨트랙트에 접근해서, instance 를 매개변수로, 받음 
    // 이걸 트러플 콘솔에 넣는다 ⭐⭐⭐⭐⭐ 

    // counter 변수를 선언하고, instance 를 담아준다.
    // counter = instance  : counter 변수에 , 배포된 컨트랙트의 instance 가 담긴다. 여기에는 call 과 send 가 메서드로 포함되어 있음. 
    // 그러면, instance 에서는 call, send 쓸 수 있음. 

counter.getValue()
    // call 요청을 보내자 
    /*
        BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
    */
    // BM : 매우 큰 숫자를 명시. 매우 큰 숫자를 다룰 때 사용된다. 
    // 특히, 블록체인 같은 분산 원장 기술에서 자주 사용! 

    // words: [ 0, <1 empty item> ] 
        // 아이템이 하나 있고, 값은 0 이다. 

counter.setValue(20)
    // send 요청을 보내자
    // SEND 에서 가스비 발생됨 ❓❓❓❓❓
        // 여기에 찍혀서 나오는 내용들 읽을 수 있으면 좋을거 같은데 
    // words: [ 20, <1 empty item> ] ⭐⭐ 이렇게 값이 바로 변경됨  

```


# 테스트 코드 작성 
``` sh 
# 테스트 코드 실행 
npx truffle test
    # test 폴더 안에 있는게 실행이 된다. 
    # cd 는 test 안에서 하면 된다.
```
    - 테스트 코드가 되면 -> 이제 돈을 날리지 않게 되니까, 테스트 코드에서 작성 


-배포한 ca 주소 
    0x68267d92391FAE10162fB6144BD1eF6D5A6857a6


# 리액트 custom hook
- 메타마스크 내용을 web3 라이브러리 활용해서, hook 으로 만들 것 임. 
- 요청 보낼 때, abi 내용을, abi 디렉토리에 담을 것 
