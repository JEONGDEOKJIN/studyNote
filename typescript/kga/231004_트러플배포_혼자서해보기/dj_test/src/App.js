import {useEffect , useState} from 'react';
import useWeb3 from './hooks/web3.hook';
import abi from "./abi/Counter.json"

const App = () => {

  const { user, web3 } = useWeb3();
  const [count , setCount] = useState(0);
  
  // 이더리움 내에 있는 상태변수 값을 가져오기 
    // 1) 상태변수를 조회하는 함수를 인코딩 2) CA 컨트랙트 주소에, 인코딩된 함수 내용을 넣고, 3) 이더리움 내에서 계산해서, 4) 값을 받아옴
  const getCount = () => {

    if(web3 === null) return;
    
    // customHook 잘 들어왔나 확인
    console.log("web3.utils" , web3.utils)  // // hook 에서 만든 값 들어왔나 확인
    console.log("user" , user)    // hook 에서 만든 값 들어왔나 확인

    // '컴파일 된 결과물인 abi' 에서 'getValue' 메소드 가져오기 
    const getValueData = abi.find( (data) => data?.name === "getValue" );
      // 순회하는 요소 객체 name 의 key 가 'getValue' 인지 확인하고 -> 맞으면, return 
        // 그러면, 아래의 내용이 들어감 👇👇 
              /* 
                getValueData = {
                  "inputs": [],
                  "name": "getValue",
                  "outputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
                }
              */
                
    // 쓰고 싶은 함수를 인코딩 하기
    const data = web3.eth.abi.encodeFunctionCall(getValueData, []);
      // web3.eth.abi.encodeFunctionCall : 메소드를 인코딩 해서, 이더리움 네트워크에 올린다. 
      // (getValueData, []) : 1) getValueData 이건, 이더리움 네트워크에 올릴 ABI 정보 2) [] 이건, 해당 함수에 필요한 매개변수인데, 이 함수는 매개변수가 필요 없음. 
  
    // 원격 프로시저 호출  😥😥😥 
    web3.eth.call({
      to : "0x3a1904a63b22D74BFaE32Bb982295Bff599BFEDa",  // ✅ npx truffle migrate 로 나오는 ca 값 입력
      data    // 쓰고 싶은 메소드 ✅ 여기로 getValue 함수가 들어감. 
    })  
    .then( (data) => {
      console.log(data)   // 16진수로 나오고 있음. 

      // 16진수 -> 10진수 로 변경
      const result = parseInt(data , 16);   
      console.log(result);

      // 카운트 등록
      setCount(Number(result));
    })
        /* 원격 프로시저를 호출한다는 게 무슨 의미지? | 😥😥😥😥😥😥 이 순간 이해가 100% 안 돼  
          이렇게 호출하면 -> 이더리움 네트워크에서, 이미 배포된 sol 파일 안에 있는 메소드에 접근해서, -> 해당 파일 안에 있는 메소드를 실행시키고 -> 결과값을 반환시킨다.
        */
  }

  // 상태변경 함수 : increment
  const increment = async() => {

    console.log("증가 찍힘")

    
    // 유저의 지갑 정보
    // const fromUserAccount = user.account;
    // console.log("user.account" , user.account)
    
    if(user && user.account){
      // abi 에서 name 이 increment 인 메소드를 가져와서 incrementData 에 담기
      const incrementData = abi.find( (data) => data.name === 'increment' );
  
      // abi 객체를, 이더리움 네트워크에 올릴 수 있게, 인코딩 해서 data 변수에 담기 
      const encodedData = web3.eth.abi.encodeFunctionCall(incrementData, []);

      const fromUserAccount = user.account;
      console.log("user.account" , user.account)
      console.log("user.account" , fromUserAccount)
      
      const _data = await web3.eth.sendTransaction({
        from : fromUserAccount, 
        to : "0x3a1904a63b22D74BFaE32Bb982295Bff599BFEDa",  // ✅ npx truffle migrate 로 나오는 ca 값 입력
        data : encodedData    
      })

      console.log(_data)
      getCount()
    }

      /* sendTransaction 이거랑 send 랑 다른 점이 뭐였지❓❓❓  */
      /* 뭘 변경해줘! 라는 말이 안 적혀 있는데, 어떻게 된거지❓❓❓ 
        👉 아, 이건, 이미 solidity 에 적혀 있어서, 이미 반영 되었을 것. 
      */
  }

  // 상태변경 함수 : decrement
  const decrement = async() => {

    console.log("감소 찍힘")
    
    if(user && user.account){
      // abi 에서 name 이 increment 인 메소드를 가져와서 incrementData 에 담기
      const decrementData = abi.find( (data) => data.name === 'decrement' );
  
      // abi 객체를, 이더리움 네트워크에 올릴 수 있게, 인코딩 해서 data 변수에 담기 
      const encodedData = web3.eth.abi.encodeFunctionCall(decrementData, []);

      const fromUserAccount = user.account;
      console.log("user.account" , user.account)
      console.log("user.account" , fromUserAccount)
      
      const _data = await web3.eth.sendTransaction({
        from : fromUserAccount, 
        to : "0x3a1904a63b22D74BFaE32Bb982295Bff599BFEDa",  // ✅ npx truffle migrate 로 나오는 ca 값 입력
        data : encodedData    
      })

      console.log(_data)
      getCount()
    }
  }

  useEffect( () => {
    // 최초값 조회
    if( web3 !== null ) getCount(); 
  } , [web3]);


  return (
    <>
      {/* 현재 메타마스크에 로그인한 유저의 지갑 주소 */}
      <p> 지갑 주소 : {user.account} </p>   

      <p> 카운트 : {count} </p>
      <button onClick={increment} > 증가 </button>
      <button onClick={decrement} > 감소 </button>
    </>
  )
}
export default App;