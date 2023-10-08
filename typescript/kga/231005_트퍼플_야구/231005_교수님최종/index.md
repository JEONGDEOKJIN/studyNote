# 컨트랙트 복습

```sh
npx create-react-app test

cd test

npm i truffle
npm i web3
npm i ganache-cli

# npm i truffle web3 ganache-cli

# truffle init
```


- contracts 폴더에 sol파일에 컨트랙트 코드 작성하고

- 컴파일 진행후

- migrateions 폴더에
- 배포 내용 코드 파일 추가
- 파일명 = [번호]_[내용]_[파일명].js

- 1_deploy_Counter.js

- truffe config 파일 내용에 지정한 네트워크로 배포 진행

```sh
npx truffle migrate
```

- 0xD0C712e3BA9DF9084a2652ce2F59b8201db8bbd0

- CA를 잊어버렸다
- truffle console 활성화 시키고

```sh
npx truffle console
# 배포한 컨트랙트의 이름
# CA 조회

Counter.address
# 배포한 컨트랙트 Counter마지막으로 배포한 CA가 나온다.
```

# 계약을 작성

# 숫자야구 게임을 하나 만들어볼건데

(0) 0xa774b59936143826a945c2ec4991153249d93eb3cdd627f61e334da75d29a46e
(1) 0x9eac354939b1968df2813d61df40f9fbecbac0bfd3fb2f68a36613ecd870462d
(2) 0x32ca497a833ec6bf9ade09068be7e07d880de2003db4eb5d7311f40f53b11b71
(3) 0xb97e6416681668fd7dcdca5c21f823bd48df6b853c3296984c74e79e33145e31
(4) 0x7bf2a3d7c1f16567137f142ff49954615a87b4f39b194b3c0bb8f3df97ebf306
(5) 0x61149120e10d86a11d436bfad22232a3af74b2066447302dce5da7f394640a01
(6) 0x1076d9a5d43078fc666a4a172f3147e6e2092369b73737c33a2e05ab14d8d126
(7) 0x0afeffec99aa9f4996b30c0b265049833e73409644ecbaaafb21e33e1acb2e7a
(8) 0xd126a2ace385a8b6ed126758f3f98a048f464b2839799baec0413ab85cac0514
(9) 0x02720d9ea164fbc1f620ababcf054a7145136e9b6c702ef3648b5f60215e8c63



- 0x490d8bB30663595ED6e95165B1Bf7D0343a20C41


// 게임을 재시작하는 내용을 추가
// 어드민 부분 한번 수정