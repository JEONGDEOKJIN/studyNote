/* [실행]
  - 실행 npm start 로 하기 
  - 터미널에서 ganache-cli 를 열어놓기 
  - 브라우저에서, 메타마스크, 실행해놓기  

  - 돈이 부족해서 계정 다시 만들어야 할 때
    - privateKeys 로 계정 만들기 
    - 계정을 변경했으면, 리액트 및 ganache-cli 재부팅해서 확인 
    - 위에 상단에 '연결' 을 눌러줘야 해당 계정으로 변경이 됨! 

    - ganache 는 켜져 있어야 하고, ganache 는 다시 켜면 매번 바뀌니까, 테스트할 때, 어제 지갑이랑 오늘 지갑이랑, 다르니까, 계속 업데이트 해줘야 함 

*/


import "./App.css";
import { useEffect, useState } from "react";

import Web3 from "web3"; // 현재 폴더에서, npm i web3 설치

function App() {
  // web3 라이브러리를 상태로 관리
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null); // 계정 주소 | 가스비 지불할 계정
  const [receiveAccount , setReceiveAccount] = useState("0x4148D6cE5e7B7A901Ff7fe7b3c90d97bFa97A15e")   // 송금시 받는 주소 
  const [balance, setBalance] = useState(); // 계정 잔액
  const [gasUpperLimit, setGasUpperLimit] = useState("300000"); // 사용할 gas 상한선
  const [moneyToSend , setMoneyToSend] = useState()   // 송금할 금액


  // ⭐⭐ solidity 로 작성하고 -> 컴파일 해서 -> bin 을 여기에 붙여넣기
  const [contractValue, setContractValue] = useState(
    "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b5780635524107714610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212208bcce4094cad3bd65edc66b0270a49b14576a3fb2504798a5bd4d6cc4d99681664736f6c634300080d0033"
  ); // 컨트랙트에 넣은 data

  // 스마트 컨트랙트 배포되면 -> CA 바로 가져오기
  const [contractAddress, setContractAddress] = useState()

  const [abi, setAbi] = useState([
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [],
      name: "getValue",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "setValue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]);

  const [storageValue, setStorageValue] = useState();

  useEffect(() => {
    (async () => {
      // '⭐이더리움 계정 주소' 가져오기 | '⭐지갑 주소 아님'
      const [data] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      /* [이 과정 이해하기] 대체, 왜, 이렇게 하면, 지갑 주소 라는게, 뽑혀 나오는거지 ?
            1. 메타마스크에 가입한다. 그러면, 자동으로 '주소가 생성' 된다. 
              1.1 비밀키 생성 : 랜덤으로 privateKey(개인키) 가 생성된다. 
              1.2 공개키 생성 : 해당 프라이빗 키를 사용해서, publicKey(공개키) 가 뽑힘
              1.3 주소 생성 : publicKey(공개키) 중 일부를 추출해서, 'Ethereum 주소' 로 생성
            
            2. await window.ethereum.request({ method : "eth_requestAccounts" }) 이해하기 
              - window.ethereum : 메타마스크 등의 '이더리움 호환, 웹 3.0 지갑' 을 설치하면, 해당 정보가 window.ethereum 객체로 들어간다.
              - request({method : "eth_requestAccounts" }) : 현재 활성화 되어 있는 '⭐이더리움 계정 주소⭐' 를 달라고 요청

            3. '이더리움 계정 주소' 와 '지갑 주소' 의 차이 이해하기 
              - 여기에서 말하는 '이더리움 계정 주소' 는 '비밀키 > 공개키 > 주소' 로 생성된 것. 
              - 메타마스크는 이렇게 생긴 '주소' 및 '개인키' 를 안전하게 관리함. 
              - 메타마스크 지갑 1개 안에는 '다양한, 하위, 이더리움 계정' 이 있을 수 있음. 
                - 이것들 중, 미리, 메타마스크에서 선택해 놓으면 -> 해당 '이더리움 계정' 을 받게 됨. 
      */

      console.log("메타마스크 내 이더리움 계정 중 현재 로그인된 계정 주소", data);
      /* [이 과정 이해하기]
          - 만약, '지갑 내 다른 이더리움 계정' 으로 연결하고 싶으면, 
            1) 메타 마스크 클릭 2) 상단에 있는 계정 선택에서, 다른 계정 선택하고 들어가면 됨. 
          - 만약, '지갑 내 다른 이더리움을 생성 계정' 하고 싶으면, 
            1) ganache-cli 하고 2) privateKey 가 나오게 되는데 이걸 3) 메타마스크 중 계정 선택 항목에서 '계정 가져오기' 누르면 됨.
        */

      // web3 라이브러리 이용해서 이더리움 네트워크와 연결 ⭐
      setWeb3(new Web3(window.ethereum));
      /* [이 연결 이해해보기]
          'index.html' 에서는 const web3 = new Web3("http://127.0.0.1:8545") 이렇게 연결 
          그 결과, '로컬에서 실행되는 ganache' 가 'web3' 를 통해 '이더리움 네트워크' 와 연결

          지금, 리액트 버전에서는, window.ethereum 안에는 이더리움과 호환되는, 웹3 지갑들이 있음. (이 객체의 내부 정보를 사용해서, 이더리움 네트워크와 연결)
          그 결과, 'web3(setWeb3 의 결과물인)' 는 'window.ethereum 안에 있는 메타마스크의 인터페이스'를 통해 web3 라이브러리를 거치게 되고 -> 그 결과, '이더리움 네트워크' 와 연결
        */

      setAccount(data); // 현재 연결된 계정 주소를 account 에 저장
    })();
  }, []);

  // 현재 계정 잔액 가져오기
  const balanceBtn = async () => {
    const balanceWei = await web3.eth.getBalance(account);
    console.log("현재 계좌 잔액, wei 단위", balanceWei);

    const balance = await web3.utils.fromWei(balanceWei, "ether");
    console.log("현재 잔액 , ether 단위", balance);

    setBalance(balance);
  };
  /* [여기에 abi 가 없네? abi 는 어떻게 된 거지?] 
        - 질문들 
          1. 현재 App.js 코드는 -> metamask 에 의해, 자동으로 solidity 로 변환되는 거야? 
            > 아니. 현재 App.js 에 적은 React 코드는, 'solidity 로 변환' 되지 않고!, 
            > 메타마스크가 갖고 있는 '⭐⭐⭐3.0 지갑의 API(window.ethereum)' 를 사용해서, ethereum 과 통신함! ⭐⭐⭐
            > 결국, 이더리움 네트워크와 통신하는데, 지금은, 'window.ethereum' 안에 있는 '지갑의 API' 를 사용함! 
          2. 그리고, 잔액 조회를 할 때, abi 를 가져와서 직접 이더리움을 컨트롤 했는데, 지금은?  
            > 지금은 'window.ethereum' 안에 있는 '지갑의 API' 를 이용해서, 잔액을 조회하는 것 임⭐⭐⭐
    */

  // 스마트 컨트랙트 배포 (트랜잭션 생성)
  const sendTransaction = () => {
    // 배포할 계정 | 가스비 낼 계정
    console.log("현재 가스비 낼 계정 = 트랜잭션 배포할 계정 : ", account);

    // 사용할 가스 상한선
    console.log("사용할 gas 상한선", gasUpperLimit);

    // 컨트랙트로 배포할 data | ⭐⭐ solidity 로 작성하고 -> 컴파일 해서 -> bin 을 여기에 붙여넣기
    console.log("배포할 data", contractValue);

    web3.eth
      .sendTransaction({
        from: account, // 컨트랙트 배포자 계정 | 컨트랙트 배포할 때 수수료지불할 계정
        gas: 300000, // 가스 상한선
        data: contractValue, // 컨트랙트 내용이 컴파일 되고 -> 바이트 코드로 들어감
      })
      .then(receipt => {
        console.log("스마트 컨트랙트 영수증" , receipt)
        setContractAddress(receipt.contractAddress)
        console.log("CA 설정 완료" , contractAddress)
      });
  };

  // const fixSendMoney = (money) => {
  //   setMoneyToSend(Number(money)) 
  //   // if(Number(money) <= balance){   // 현재 잔액보다 적은지 확인
  //   //   setMoneyToSend(Number(money))     // 적으면 보낼 돈으로 확정
  //   // } else {
  //   //   alert("잔액 부족. 그만 보내")
  //   // }
  // }
  

  // 송금하기 
  const sendWei = async () => {

    try {
      console.log("송금할 금액 , ether" , moneyToSend)

      // 이더를 wei 로 변환
      const weiToSend = Number(web3.utils.toWei(moneyToSend.toString() , 'ether'))
      console.log("송금할 금액 , wei" , weiToSend)
  
      const receipt = await web3.eth.sendTransaction({
        from : account,   // 돈을 낼 계정 | 가스비 지불할 계정
        to : receiveAccount,    // 송금시 돈 받을 계정 
        gas : 300000,     // 가스 상한선 | 해당 연산에 사용할 최대 가스 
        value : weiToSend    // 송금할 금액 | 😥😥 이걸 어케 가져오지
      })
      console.log("트랜잭션 영수증" , receipt)
      
    } catch (error) {
      console.log(error)
    }

  }




  // 상태 변수 에 값이 얼만큼 있는지 확인해보기
  const getValue = async () => {
    // 1. solidity 파일에 적은 getValue 함수를 hash 화 시키기
    const getValueFuntionHash = web3.eth.abi.encodeFunctionCall(abi[1], []);
    console.log("abi[1] 인 getValue 함수를 hash 화 시키기 : " , getValueFuntionHash);

    // 2. hash 화 된 getValue 함수를 web3 라이브러리를 통해 EVM 으로 넘겨서 '상태변수인 value' 값 가져오기
    const getValueData = await web3.eth.call({
      to: contractAddress,    // 스마트 컨트랙트 배포되면, receipt 를 통해, 바로 CA 가져오기
      data: getValueFuntionHash,
    });

    console.log("상태변수인 value 값 가져오기 : ", getValueData);

    // 3. 받아온 16진수 상태변수를 10진수로
      // 3.1 web3.utils.toBN 사용
      // const getValueDataResult = await web3.utils.toBN(getValueData).toString(10)
      // | 원래 코드는 이건데 아래껄로 바꿔도 되겠지❓❓

      // 3.2 js 에서 변환
      const tempGetValueDataResult = parseInt(getValueData, 16).toString(10);
      console.log("10진수로 변화한 상태변수", tempGetValueDataResult);

      const getValueDataResult = isNaN(Number(tempGetValueDataResult))
        ? parseInt(0)
        : tempGetValueDataResult;
      console.log("10진수로 변화한 상태변수", getValueDataResult);

    // 4. 렌더링 위해 setStorageValue 에 넣어주기
    setStorageValue(getValueDataResult);
    return Number(getValueDataResult);    // setValue 에서 바로 사용하기 위해 숫자화 시켜줌
  };


  // setValue 로, 이더리움 네트워크에 저장되어 있는 상태 변수 변경
  const setValue = async ( setNumber ) => {
    
    // 1) 현재 상태변수(이더리움 storage) 에 있는 값 가져오기
    const _getValue = await getValue();
    
    console.log("setValue 에서 getValue값", typeof(_getValue));

    // 2) solidity 파일에 적은 setValue 함수를 hash 화 시키기
    const setValueFuncHash = await web3.eth.abi.encodeFunctionCall(abi[2], [Number(_getValue+setNumber),]);

    // 3) 컨트랙트 배포자(수수료 지불할 계정) 있는지 확인
    if (!account) return alert("가스비 낼, 컨트랙트 배포자 필요함!");

    // 4) 트랜잭션 | storage 데이터를 어떻게 변경할지
    const tx = {
      from: account, // 트랜잭션 발생 시키는 계정
      to: contractAddress, // 누가 받았나 CA 계정 주소 | 스마트 컨트랙트 배포되면, receipt 를 통해, 바로 CA 가져오기 
      data: setValueFuncHash, // solidity 파일에 적은 hash 화된 파일. setValue 함수,
      gas: 500000, // 1) 정확히 얼마의 gas 가 쓰일지는 모름 2) 사용할 gas의 upperLimit
      gasPrice: 100000000, // gas 당 얼마의 price 를 지불할 건지 | 너무 낮으면,
    };

    // 5) web3 라이브러리를 통해, sendTransaction 메소드 실행 시키기
    const data = await web3.eth.sendTransaction(tx);
    console.log(
      " setValue 함수를 abi 로 컨트롤 해서, storage 데이터를 변경시킨 트랜잭션 결과 ",
      data
    );
  };


  return (
    <div className="App">

      {/* 잔액조회 */}
      <button onClick={balanceBtn}> 현재 계좌 {account} : 잔액조회 🚀 </button>
      <p> 잔액 : {balance} ETH </p> <br/>

      {/* 스마트 컨트랙트에 들어갈 내용 */}
      <p>
        스마트 컨트랙트에 들어갈 내용 : Counter_React 에서 solc 로 컴파일해서
        bin 파일로 가져온걸, contractValue 의 useState 초기값으로 넣음{" "}
      </p>

      {/* 컨트랙트 배포 */}
      <button onClick={sendTransaction}>컨트랙트 배포</button> <br/><br/>

      {/* 현재 상태변수에 있는 값 가져오기 */}
      <button onClick={getValue}> 현재 상태변수에 있는 값 확인 버튼 </button>
      <span> 현재 상태변수(이더리움 storage) 에 있는 값 : {storageValue} </span> <br/><br/>

      {/* 상태변수 값 증감 */}
      <button onClick={() => setValue(1)}> storage 에 있는 값 1 증가 시키기 </button>
      <button onClick={() => setValue(-1)} > storage 에 있는 값 1감소 시키기 </button> <br/> 

      {/* 송금 */}
      <label> 송금 금액 입력  </label>
      <input onChange={ e => { setMoneyToSend(Number(e.target.value)) }} /> 
      <button onClick={sendWei} > 송금하기 </button>

    </div>
  );
}

export default App;
