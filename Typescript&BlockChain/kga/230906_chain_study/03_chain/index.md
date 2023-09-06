

``` sh
# package.json 기본값들 추가되어서 설치
npm init -y 

# 개발자 버전으로 ts 설치 
npm i -D typescript
    # ts 는 js 로 컴파일 되어야 실행됨. 따라서, 컴파일 단계에서는 ts 가 필요 없기 때문

# 컴파일 없이, typescript 실행할 수 있게 해주는 라이브러리 
npm i -D ts-node

# merkle 라이브러리 js 와 ts 버전 설치
npm i -D @types/merkle merkle

# 암호화, 해시값 생성 관련 라이브러리
npm i -D @types/crypto-js crypto-js

# 우리가 정한 별칭을 경로로 반환해서, 실행시키기 위한 용도
npm i -D tsc-alias tsconfig-paths
    # 왜냐면 ts 는 그 자체로 별칭을 경로로 인식하지 못 함
```


``` sh
# tsconfig.json 
npx tsc --init


```