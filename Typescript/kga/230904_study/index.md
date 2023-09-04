
# 01_hash
``` sh
# (@hash.js) 실행 순서 

    # package.json 필요한 모듈 설치
    npm init -y

    # JavaScript에서 암호화 기능을 제공하는 라이브러리 
    npm i crypto-js

    # hash 파일 실행
    node hash.js
```


```sh
# 머클 트리 (@merkle.js)
npm i merkle
```

--- 

# 02_block 

``` bash
[설치]
    # package.json 필요한 모듈 설치 
    npm init -y

    # 타입스크립트 개발자 모드로 설치 
    npm i -D typescript
        #D 를 함 
        #왜냐면, 'JS 로 컴파일' 해서 실행되고, 따로 '런타임' 이 없기 때문

    # typescript 를 직접실행할 수 있는 패키기
    npm i -D ts-node

    # js 와 ts 모두 merkle 사용할 수 있게 설치
    npm i -D @types/merkle merkle

    # js, ts 에서 암호화 기능 제공하는 crypto-js 라이브러리 사용
    npm i -D @types/crypto-js crypto-js
        #모두 타입이 설치 되어 있어야 하기 때문에

    # '별칭'을 '경로'로 변환해서 -> 실행시키기 위해 사용
    npm i -D tsc-alias tsconfig-paths
        # 노드 런타임을 실행하면서, ts-node 로 node 환경에서 실행할 때, 
```


``` sh
    # tsconfig 만들기
    npx tsc --init

```


- 테스트 코드 작성할 때
``` sh
npm i -D @types/jest jest
    # 타입 스크립트도 같이 작성하기 때문에, @types/jest 이것도 들어간다.  
```


## jest.config.ts
- jest 로 테스트 코드를 실행할 때, 옵션설정 파일
- 확장자, 테스트 환경 등등 지정
- jest 를 js, ts 등등 어디에서 만들 것 인가. 