import { useEffect, useState } from "react";

import Web3 from "web3";
// react 폴더로 이동해서 > web3 설치 ✅✅✅✅✅
// npm i web3 

const useWeb3 = () => {
  const [user, setUser] = useState({
    account: "", // 지금 로그인 한 계정
    balance: "",
  });

  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(async ([data]) => {
          const web3Provider = new Web3(window.ethereum);

          setUser({
            account: data,
            balance : web3Provider.utils.toWei( await web3Provider.eth.getBalance(data) , "ether" )
          });

          setWeb3(web3Provider);

          // 오늘 할 것 
            // 웹 메타마스크 지갑 다 뜨게
            // 그 지갑에 있는 토큰량 보여줄거고
            // 컨트랙트를 배포한 네트워크가 맞는지, 아니면, 변경할 수 있게 함수 실행
            // 지갑을 바꾸면, 바꾼 지갑 내용으로 브라우저에 보일 수 있게
        });
    } else {
      alert("메타마스크 설치해주세요");
    }
  }, []);

  return {
    user, 
    web3, 
  }
};

export default useWeb3;


/* [과제] 
    1. 포켓몬 랜덤으로 뽑을 수 있는 함수 만들고 (버튼)
    2. 포켓몬 한번이라도, 뽑은 계정들만, 모아놓고, 어떤 포켓몬 가지고 있는지, 보여주기
    3. 포켓몬 소유권 넘길 수 있는 함수, 만들기
    CF. 그 이외는 자유 
        - 포켓몬 대전 
        - 보상 개념 줘도 되고 
*/