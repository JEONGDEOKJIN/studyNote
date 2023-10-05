
import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook"

import abi from './abi/Counter.json'
import Web3 from "web3";

const App = () => {
  const {user, web3} = useWeb3();

  const [count , setCount] = useState(0);
    // 상태 변수를 여기에 담아둘 것 임 

  // CA 컨트랙트 주소에 상태변수를 조회하는 함수를 작성
  const getCount = () => {
    // web3 있는지 확인
    if(web3 === null) return 

    // find 배열을 순회하면서 값을 찾는데, 
    // 순회하는 객체 요소 data
    // 순회하는 객체 요소 name 키가 getvalue 인지 확인하고, 맞으면, return 

    const getValueData = abi.find( (data) => data.name === 'getValue' )
        // {
        //   "inputs": [],
        //   "name": "getValue",
        //   "outputs": [
        //     {
        //       "internalType": "uint256",
        //       "name": "",
        //       "type": "uint256"
        //     }
        //   ],
        //   "stateMutability": "view",
        //   "type": "function",
        //   "constant": true
        // }

    // 배열안에 1번, 2번, 잇는데, -> 배열을 순회하면서 값을 찾는다. 
    // 순위하는 요소는? 

      const data = web3.eth.abi.encodeFunctionCall(getValueData , [])
      // data 에 내용이 담겨 있음. 

      // 원격 프로시저 호출 
      web3.eth.call({
        to : "0x68267d92391FAE10162fB6144BD1eF6D5A6857a6",   // 아까 받은 ca, 
        data, 
      }).then( (data) => {  
        // BN 은 큰 자리수의 값을 다루기 때문에 
          // toString (10) ,  10진수를 16진수에서 
        const result = parseInt(data , 16);
        setCount(result);
      })
        // 0 이 반환이 되고
      }
      
      // 위에서 값 조회랑 동일
      // 값을 블록 체인 네트워크에 요청해서, 상태 변수를 변경하는 함수 
      const increment = async () => {
        const incrementData = abi.find( (data) => data.name === "increment"  );
        // input 은 매개변수 so, increment 는 비어있을거야 
        
        const data = web3.eth.abi.encodeFunctionCall(incrementData , [])
        
        // 접속한 지갑의 주소 
        // useWeb3 hook 에서 지갑의 정도블 받아왔음
        const from = user.account;
        
        await web3.eth.sendTransaction({
          // 트랜잭션의 내용 
        from : from,
        to : "0x68267d92391FAE10162fB6144BD1eF6D5A6857a6", 
        data, 
      })
      console.log(data);
      getCount();
    } 
    
    
    // 값을 감소 시키는 함수 
    const decrement = async () => {
      const decrementData = abi.find( (data) => data.name === "decrement" );
      const data = web3.eth.abi.encodeFunctionCall(decrementData, []) // 인코딩 된 이 값
      
      const from = user.account;
      
        const _data = await web3.eth.sendTransaction({
          from : from, 
          to : "0x68267d92391FAE10162fB6144BD1eF6D5A6857a6", 
          data , 
        })
        
        console.log(_data)
        getCount();   // 변경 다 하고 조회
        
      }
      
      
      useEffect( () => {
        // 최초의 값 조회
        if(web3 !== null) getCount();
      } ,[web3]);
      // web3 가 변경되면 들어오고, 그 다음에 또 들어오고 
      
      if(user.account === "") return "지갑 로그인 하셈";
      
      return(
        <>
        <div>
          <h2> 카운트 : {count}  </h2>
          <button onClick={increment}> 증가 </button>
          <button onClick={decrement}> 감소 </button>

        </div> 
      </>

)

}

export default App;