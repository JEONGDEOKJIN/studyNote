import { useState, useEffect } from "react";

import Web3 from "web3";
// npm i web3 | ⭐⭐⭐ 이렇게 깔끔하게 써놔도, 된다

// Web3 custom hook | ✅ custom hook 작성시 use 붙여야 함
const useWeb3 = () => {
  // 현재 접속한 메타 마스크 지갑 정보를 담을 변수
  const [user, setUser] = useState({
    account: "",
    balance: "",
  });
  // 지금 접속된 지갑 정보랑, web3 연결된 것! 을 갖고 있을 것 임. ❓❓❓
  // 유저가 접속하면 여기에 저장❓❓❓

  // 네트워크와 연결한 web3 인스턴스를 담을 변수
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // 메타마스크가 설치 되어 있는지 확인하기 | 'window.ethereum' 안에, 네트워크 정보, 지갑들이 들어가 있음 -> so, 메타마스크가 있다면, 빈 값이 아닐 것 -> so, window.ethereum 으로 판별 가능
    if (window.ethereum) {
      // 로그인
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        /* - window.ethereum.request 
                            : window.ethereum 객체 안에 있는, request 메소드를 쓰겠다는 말 
                            : 'Ethereum JSON-RPC 메서드' 이제 쓸게~ 라는 의미
                        - method : "eth_requestAccounts" 
                            : 구체적으로, eth_requestAccounts 이름의 메서드를 사용할게 라는 말
                            : '이더리움 네트워크' 안에서, '사용자가 승인'한, '지갑 주소들'이 나옴
                            : EX) 메타마스크에서 '승인' 을 눌러서, 디앱 또는 웹사이트에, 이더리움 지갑 주소 제공을, 허용한 지갑 주소들을 의미
                    */
        .then(async ([walletAddress]) => {
          /* async ([data]) 중 [data] 해석 
                        '받아온 배열' 중 '첫 번째 요소' 를 data 변수 에 할당
                        data 에는 '지갑 주소' 가 담겨져 있어야 함
                    */

        // web3 인스턴스 생성
            const web3Provider = new Web3(window.ethereum);
            /* [해석] 
                            web3 라이브러리를 통해, 이더리움 네트워크과 통신, 이더리움 네트워크 안에 있는 컨트랙트와 통신하고, 트랜잭션을 생성/전송 할 수 있음. 
                            web3 라이브러리를 연결하는 방법은 여러가지 임 (ganache 로 할 수도 있고, 브라우저 안에 있는 메타마스크로 할 수도 있고)
                            그러면, 지금은 'window.ethereum 안에 있는 메타마스크' 방식으로 web3 라이브러리를 연동 한다는 말 임. 
                            결국, '메타마스크로 연동시킨 web3 라이브러리' 를 통해 '이더리움 네트워크' 와 '통신' 하게 된다. ⭐⭐⭐ 
                        */

          // set 메소드에 넣어주기
            /* 이 순간, 'const web3Provider' 에 머무르지 않고, useState 로 관리하는 이유 
                    1) 컴포넌트 재실행에 따라서 -> 로컬 변수가 초기화 되어서 -> web3Provider 에 할당되는 값이 변경되는 것을 막기 위해
                    2) 추가적으로, 특정 변수의 정보가 변했을 때만, 재렌더링 되게 할 수 있음.
                    */
                  
                setUser({
                    // 지갑 주소가 담겨 있어야 함
                    account: walletAddress, // 지갑 주소는, 'privatekey -> 공개키 -> 20바이트' 의 순서로 만들어지는 것
                    balance: web3Provider.utils.toWei(
                      await web3Provider.eth.getBalance(walletAddress),
                      "ether"
                      ),
                      // [해석] web3 라이브러리를 다녀올 때, await 로 기다리게 해야 한다는 것 ⭐⭐⭐
                    });
                      
                      
                setWeb3(web3Provider);
                    });
                  } else {
      alert("메타 마스크! 설치! 하! 셈! 😸");
    }
  }, []);

  return {
    user,
    web3,
  };
};

export default useWeb3;
