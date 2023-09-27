import { useEffect, useState } from 'react';
import './App.css';

import Web3 from "web3" 

// npm start 로 실행 시키기 

function App() {

  // 브라우저에서 이더리움 블록체인 상호작용 
  // 브라우저에서 메타마스크 확장 프로그램을 통해, 네트워크에 상호작용 할 수 있다. 

  // 메타마스크는, 
    // 1) 외부 소유 계정 정보 (EOA) 2) 네트워크 정보( ganache 에 연결되어 있는 것) 도 갖고 있다. 

  // 트랜잭션을 발생시키면, '서명 정보' 가 필요한데, 개인키를 직접 전달하는게 아니고 
  // 개인키는 메타마스크 안에 안전하게 보관되어 있다. 
    // 키는 안전하게 우리가 보관하고 있음. 
    // 개인키 만들어서, 서명하고, 발생까지를 메타마스크가 해줌 ❓❓❓ 

  // 메타마스크를 통해 브라우저와 상호작용 을 
    // 원격 프로시저 호출을 통해, 컨트랙트 함수를 실행시킬 수 있고, 
    // 네트워크의 메서드도 사용해서, 계정 정보나 등등, 이미 작성되어 있는 로직을 사용할 수 있다. 

    // 데이터 베이스를 갖고, 로그인을 구현한다고 할 때, 
      // 아이디, 비밀번호 입력해서, 중앙화된 데이터 베이스에 값이 저장되고 있었음. 
      
      // 지갑을 사용해서 로그인 처리하면 프로세스 
        // 지갑 로그인으로 가져간다. (탈중앙화된 어플리케이션 로그인 처리 방식)
          // 사용자 계정이 필요없고, 계정 주소, 로 
          // 지갑에 대한 로그인은, 블록체인으로 관리. 
          // DB 에는 '누가' 그 지갑을 갖고 있는지 처리해주면 됨. 

    const [account , setAccount] = useState(null);

    const [web3 , setWeb3] = useState(null);    // web3 를 이렇게 갖고 있다구!?! 
    // web3 설치 
      // cd /test 폴더 이동 -> npm i web3 ⭐⭐⭐⭐⭐⭐ 

    const [balance , setBalance] = useState(0);

    useEffect( () => {
      ( async () => {
        // 배열의 구조 분해 할당
        
        // window 
        const [data] = await window.ethereum.request({
          method : "eth_requestAccounts"
        })
          // 이 안에 메타마스크 이미 들어가 있음. 
        console.log(data)
        // 0xd041ef02cc4fb3f3474a9efcb452e34f599da391
          // 메타마스크 켜놓고 이걸 확인할 수 있음 ⭐⭐
          // 현재 연결한 지갑의 주소 

          // 네트워크 web3 연결
          setWeb3(new Web3(window.ethereum))
            // web3 상호작용 할 수 있는 게 생김 
            // 이 순간 네트워크 연결하는 것 http://127.0.0.1:4577 이거랑 동일한 역할 ⭐⭐⭐⭐⭐

          setAccount(data);

      }) ()
    } , [])
    

    const balanceBtn = async() => {
      const balance = await web3.eth.getBalance(account)
      console.log(balance)
      
      const _balance = await web3.utils.fromWei(balance , "ether")
      console.log(_balance)

      setBalance(_balance)
    }


  return (
    <div className="App">
      {account || "로그인 하셈"} <br />
      
      {balance} ETH <br/>

      <button onClick={balanceBtn} > 잔액조회 </button>
    </div>
  );
}

// 카운트 앱 
  // 스마트 컨트랙트 배포 
  // 트랜잭션 EOA -> EOA 로 트랜잭션 발생시켜서, 잔액 송금해보는 버튼 
  // HTML 에 있는 개념 있는거 다 했으니까, 이걸로 하면 됨. 
  // COUNT 누르면, 증가, 감소 


export default App;
