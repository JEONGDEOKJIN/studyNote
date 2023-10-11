
# 포켓몬 뽑기 컨트랙트 

## 리액트 설치, 리믹스 배포, 가나쉬

```sh
# 리액트
npx create-react-app erc20

# 리믹스 배포 
    # 설치 
    npm install -g @remix-project/remixd
    # 연결
    remixd -s . --remix-ide https://remix.ethereum.org
    
        # remixd -s : 어떤 파일 보낼건지❓❓❓❓❓❓
        # https://remix.ethereum.org : 이건 웹페이지에서 가져오면 됨 


# 가나쉬 
    cd erc20    # 리액트 폴더 이동 
    npm i ganache   # 가나쉬 설치 | ganache-cli 로 하면 안 되네 
    npx ganache-cli --chain.chainId 1337 --chain.networkId 1337

    # privateKey 를 첫 번째 주소에서 가져오기 | 네트워크는 가나쉬 로 연결

    # 'compile 버전' 은 19로 

    # compile 버튼 클릭 

    # 배포 
        # METAMASK PROVIDER 설정
        # name = SoonTOKEN 
        # 단위 STK 
        # AMOUNT = 100000
        # DEployed contract 
            # 총 발행량 확인 
        # balanceOf 에 ca 복사해서 -> 갖고 있는건지 확인 
        # 메타마스크에서 SOON 토큰 확인 
        # 개인키로 2번째 계정으로 접속 -> 연결 -> 토큰 가져오고 (토큰이 0개) -> ETH 보내기 1번째 계정에게 -> 보내보기? | ❓❓❓❓❓❓❓❓

```

