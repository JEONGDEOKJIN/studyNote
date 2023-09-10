``` bash
[설치]

npm init -y

npm i -D typescript
    #D 를 함 
    #왜냐면, 'JS 로 컴파일' 해서 실행되고, 따로 '런타임' 이 없기 때문

npm i -D ts-node

npm i -D @types/merkle merkle

npm i -D @types/crypto-js crypto-js
    #모두 타입이 설치 되어 있어야 하기 때문에

npm i -D tsc-alias tsconfig-paths
    #노드 런타임을 실행하면서, ts-node 로 node 환경에서 실행할 때, 
    # 우리가 정한 별칭을 경로로 변환해서 -> 실행시키기 위해 사용
```


``` sh
npx tsc --init
    # tsconfig 만들기

```


### 테스트 코드 작성할 때
``` sh
npm i -D @types/jest jest
    # 타입 스크립트도 같이 작성하기 때문에, @types/jest 이것도 들어간다.  
```


#### jest.config.ts
- jest 로 테스트 코드를 실행할 때, 옵션설정 파일
- 확장자, 테스트 환경 등등 지정
- jest 를 js, ts 등등 어디에서 만들 것 인가. 

---


- p2p > server 에 있는 index.ts 파일 실행시키려면 
```
해당 경로에 까지 가거나 cd 에서 경로 설정을 해줘서 아래와 같이 실행. 
왜냐면 1) ts 파일 실행하기 위해서 ts-node 해야 하고 2) 
$ npx ts-node index.ts 
```