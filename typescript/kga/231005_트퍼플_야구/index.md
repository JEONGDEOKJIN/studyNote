


# 컨트랙트 복습


```sh
npx create-react-app test

cd test

# npm i truffle web3 ganache-cli
npm i truffle 
npm i web3 
npm i ganache-cli


# npx truffle init 
    # 폴더 3개 생성 

# sol 파일 작성 

# truffle config 수정 
    - development 만 살리고 
    - compile 에서 solc 옵션 0.8.13 버전으로 수정 


# compile 
npx truffle compile 


```

- contract 폴더에 sol 파일에 컨트랙트 코드 작성하고 

- 컴파일 진행후 

- migrations 폴더에 
- 배포 내용 코드 파일 추가 
- 파일 명 = [번호]_[내용]_[파일명].js
- 1_deploy_Counter.js


- ⭐truffle config 파일 내용에 지정한 네트워크로 ⭐⭐⭐⭐⭐⭐ 배포 진행
```
npx truffle migrate

```


### CA 를 잊어버렸다면? ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
- truffle console 을 활성화 시키고 
```
# 트러플 콘솔 열기
npx truffle console

# 배포한 컨트랙트의 이름 적기 
Counter.address
    # '0xd1ba1BF8C9FA84A14756bdF69f702E3002841119' 이런 결과가 나옴 
    # 배포한 컨트랙트 Counter 마지막으로 배포한 CA 가 나온다.


```


---




# 계약을 작성. 숫자 야구 게임을 만들어보기 



Private Keys
==================
(0) 0xc7e25bfee9f31fb3768e2019d3501257a2179d190816bbdd2e448728f02cfe49
(1) 0x26f5890faa5b38497104b26f813964d01948825c62d0c124b6edd8943c09b12c
(2) 0xaa86adfccd57625e23675b0fc51f9ab47beb58cec1e7f89441d05f170179b91d
(3) 0xdbdae327196e2c68c31e969d7b824a9189d994548b47b12dc119446bd9cfc4af
(4) 0x6fa0f2ee0a9bfb4016196a51fa4d85e7cba8a2b2912c97afc3adf94298f3bf05
(5) 0x0b8ded0bf7829d33ea586c2e88d8a65c5b5143ce77bd5beacbb94beba08b01cf
(6) 0xeacfe0ccc0a19ecbb816f26ac9d12d02c9d96de07df678e759bbedc5cab1467d
(7) 0xef0928815f9f282519f81a897ba03a8d46fd5f63a7956020f04ff3bc61936e09
(8) 0x4fb0b33725e22c94d60c511c45e5cbfde5ca0e5e2182248ac4043c014e479eff
(9) 0xf02427e43cef8d00589f130127b7097739ae215dd06d8a6dd56557bbb4b42079




