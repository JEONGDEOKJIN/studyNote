import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook"

import abi from "./abi/ERC20.json"


const App = () => {

  const {user, web3} = useWeb3();
  const [ERC20Contract , setERC20Contract] = useState(null);

  // 네트워크가 연결되어 있는지 체크하는 변수 
  const [network, setNetwork] = useState(null);

  // 여기에 계정들
  const [accounts, setAccounts] = useState([]);


  const [token, setToken] = useState("0")   // SOON 토큰
  const [tokenETH, setETHToken] = useState("0")   // 이더리움 토큰


  const [value , setValue] = useState("");
  const [value2, setValue2] = useState("");


  useEffect( () => {
    
    if(web3 !== null ) {
      if(ERC20Contract) return;   // 없을 때 만 넣자 ⭐⭐

      // 네트워크에서, 컨트랙트 조회해서, 인스턴스로 가져옴
      const ERC20 = new web3.eth.Contract(
        abi , 
        "0x0a9a738176E307d2493897398fCfE539cb9e1360" ,  // ✅ CA 주소
        {data : ""} 
        ); 
          // 리믹스에서 배포해서 가져오기 

      setERC20Contract(ERC20);
    }
  } , [web3])


  useEffect( () => {
    // 이벤트 등록 | 네트워크가 변경되면, 발생하는 이벤트 등록 | 이벤트가 변경되면 -> 메타마스크 가 호출 
    window.ethereum.on("chainChanged" , (chainId) => {
      console.log("네트워크가 변경 되었음!" , chainId)

      // 0x539 (가나쉬 네트워크 체인 id | 가나쉬에 접속할 때, npx ganache-cli --chain.chainId 1337 --chain.networkId 1337 | 여기에서 1337 == 0x539) 
      if(chainId == '0x539'){
        getAccounts()
      }

    })
      // 변경된 chainId 가 뭔지 , 발생하면 -> 매개변수에 해당 체인 id 가 들어감 
    
    // 지갑이 변경되면, 실행할, 이벤트 등록 
    window.ethereum.on("accountsChanged" , (account) => {
      console.log("지갑이 변경 되었어!"); // 지갑 변경하면, 호출됨. 
      getAccounts()
    });

    if(!ERC20Contract) return;
    // 컨트랙트 인스턴스가 있으면 실행시키지 말고, 네트워크가 정상적일 때, 실행시켜도, 되겠다.
      // 네트워크가 정상적이면 실행 시킬 것 
      getAccounts()
  } , [network])


  // 0x539 1337 우리가 지정한 가나쉬 chainId
  const switchNet = async () => {

    // 메타마스크에 해당 네트워크로 변경해달라고 요청 | ⭐ 성공적으로 변경하면 null 을 반환하게 됨 ⭐
    const net = await window.ethereum.request({ 
      jsonrpc : "2.0" , 
      method : "wallet_switchEthereumChain",    // wallet_switchEthereumChain : 'params 에 넣은 네트워크로, 변경을 요청' 하게 하는 메소드
      params : [{chainId : "0x539"}]    // 0x539 == 1337 == ganache 실행할 때, 해당 체인ID 로 기재했음 -> 따라서, 가나쉬로 바꿔 달라는 말 
    })
      // wallet_switchEthereumChain : 체인 아이디가 맞는지 확인 | 매개변수로 전달한 체인 id 가 맞는지 확인 ⭐⭐⭐ 
      // ⭐⭐ 체인 아이디 = 네트워크 식별자 임. ⭐⭐ | 가나쉬에 체인 아이디를 던지면 -> 오캐이고, 안 되면, 접속할 수 있게

    // net 값이, 정상적으로 없으면(null 이면), 해당 네트워크에, 있다는 뜻! 
    setNetwork(net || true);    
      /* [관련 문법] 논리 OR 연산자
        const result1 = true || false;   // result1은 true
        const result2 = false || true;   // result2도 true
        const result3 = null || "Hello"; // result3은 "Hello"
        const result4 = "" || 0;         // result4는 0     */
      // [의미] net 값이 있으면 그 값을 사용하고, 없으면 true를 사용하라
      // [해석] 한번 네트워크 검사하기 위한 것 ✅✅    
  };
  

  
  // 전달받은 매개변수(지갑 주소) 의 잔액을 보여주는 함수
  const getToken = async (account) => {
    console.log("ERC20Contract 이 없는지 여부" , ERC20Contract)

    if(ERC20Contract == null) return;

    let result = web3.utils.toBigInt(await ERC20Contract.methods.balanceOf(account).call()).toString(10);

    result = await web3.utils.fromWei(result, "ether");

    return result;

  }

  const getETHToken = async(account) => {
    // 이더리움 잔액 가져오기 (WEI 단위)
    const WeiETH = await web3.eth.getBalance(account)

    // 이더리움 잔액을 (WEI 단위를 ETHER 로 변경)
    const EtherETH = web3.utils.fromWei(WeiETH , 'ether')

    // 소수점 7째 짜리 까지 반환 하기 ⭐⭐
    const roundedETH = parseFloat(EtherETH).toFixed(7)
    return roundedETH
  }


  // 메타마스크의 모든 지갑을 보여줄 함수 
    // 지갑 조회하면서, 잔액 뽑아서 넣어주기 
  const getAccounts = async () => {

    // 이렇게 하면 '배열' 이 들어오게 됨 
    const accounts = await window.ethereum.request({method : "eth_requestAccounts"});

    // 배열을 돌릴 거임 
      // map 으로 돌릴 건데, map 에서 일어나는 promise 반환값을 다 처리하고 넘어가고 싶어 ⭐⭐⭐⭐⭐⭐ 
      // Promise.all : 이 말은, 요청이 다 끝날 때 까지 기다렸다가, 다 되어야 넘어가게 하기 ⭐⭐⭐⭐⭐ 

    const accountsCom = await Promise.all(
      accounts.map( async(account) => {
        // 순회하고 있는 계정에 있는 토큰 가져오기
        const token = await getToken(account)
        const ETHtoken = await getETHToken(account)
        return {account , token , ETHtoken}
      } )
    )

      console.log(" 메타 마스크에 있는 모든 계정들 " , accounts)
      console.log(" 메타 마스크에 있는 첫 번째 계정 " , accounts[0])
      console.log(" 첫 번째 계정이 갖고 있는 토큰양 확인 " , await getToken(accounts[0]))
      console.log(" 첫 번째 계정이 갖고 있는 이더리움 토큰양 확인 " , await getETHToken(accounts[0]))


      setToken(await getToken(accounts[0]) )
      setETHToken(await getETHToken(accounts[0]) )
      setAccounts(accountsCom)

    // accountsCom = [ { account : "0x12312312312" , token: 1000 } , { account : "0x12312312312" , token: 1000 } , { account : "0x12312312312" , token: 1000 } , { account : "0x12312312312" , token: 1000 } , { account : "0x12312312312" , token: 1000 } , { account : "0x12312312312" , token: 1000 }, { account : "0x12312312312" , token: 1000 } ] 
  }


  // 지갑에서 다른 지갑으로 토큰 전송할 함수
  const transfer = async () => {

    await ERC20Contract.methods.transfer(value.replaceAll(" " , "") , await web3.utils.toWei(value2, "ether")).send({
      from : user.account,
    })    //⭐⭐⭐ 만든걸 넣어준다. 
      // 예외 처리 : " " 이렇게 공백 있으면 -> "" 이걸로1

      getAccounts();    // 렌더링 해주기

  }

  if(user.account === null) return "지갑 연결 하셈";
  
  return <>

    {/* 네트워크가 가나쉬가 맞는지 확인  */}
    <button onClick={switchNet} > 토큰 컨트랙트 연결 </button> 
    <div> 지금 연결 지갑 주소 : {user.account} </div>
    <h2> SOON 토큰 보유량 : {token} | 이더리움 토큰 보유량 : {tokenETH}  </h2>

    {/* 현재 갖고 있는 모든 지갑들 */}
    {accounts.map((item, index) => (
    <div key={index}> 
      계정 : {item.account} | SOON 토큰량 : {item.token ? item.token : "0"} | 이더리움 토큰량 : {item.tokenETH ? item.tokenETH : "0" }
    </div> 
    ))}

      <div>
        <label> 누구한테 보낼거임? (지갑 주소) </label>
        <input onChange={(e) => {setValue(e.target.value)}} >  
        </input>

        <label> 보낼 토큰 갯수 </label>
        <input onChange={(e) => {setValue2(e.target.value)}} >  
        </input>
        <button onClick={transfer} > 보내기 </button>

      </div>



  </>

};

export default App;

  /*
  - 다 쓰고 가나쉬 열기 
    $ npx ganache-cli --chain.chainId 1337 --chain.networkId 1337

    - 리믹스 연결 요청 
  */


  /* [추가 과제] 
    - 계정들의 이더리움 잔액도 보여주는 함수를 만들어서 보여주자 
    - 가나쉬 네트워크에 배포한거, 세폴리아 테스트 네트워크에 배포하고,
      네트워크 아이디 부분, 세폴리아 네트워크에 연결할 수 있게 수정 (네트워크 해시값 확인 할 수 있죠?)
  */