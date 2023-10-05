import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";

import abi from "./abi/Counter.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [count, setCount] = useState("1");

  // 컨트랙트 조회한걸, 상태변수로 담아둔다.
  const [countContract, setCountContract] = useState(null);

  useEffect(() => {
    try {
      if (web3 !== null) {
        if (countContract === null) {
          const Counter = new web3.eth.Contract(
            abi,
            "0xd1ba1BF8C9FA84A14756bdF69f702E3002841119",
            { data: "", from: "" }
          );
          /* web3.eth.Contract() 기능
              컨트랙트 조회, 메서드 -> 조회 할 수 있는 메서드 생성 
              네트워크에 배포되어 있는 컨트랙트를 조회하고, 인스턴스로 생성해둔다.
              메소드를 통해서 네트워크에 상호작용 할 수 있다. 
              abi 같은거 하는거가 생략됨 ⭐⭐⭐ 
  
              web3.eth.Contract() 의 인자값 
                - abi : 통째로 들어감 | 모든 걸 다 갖고 있음
                - ca : 주소 
                - option :  from : "" -> default 를 넣어둘 수 있어! | 옵션들을 추가할 수 있음!
                        : {data : ""} 이렇게 디폴트를 넣어줘야 안 터짐 ✅✅
            
                */

          // 이후에, 디폴트 옵션을 추가하고 싶으면, 객체의 키값에 직접 추가 해도 된다.
          Counter.options.from = "0x00";
          console.log(Counter);
          setCountContract(Counter);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [web3]);

  const getValue = async () => {
    if (countContract === null) return;
    console.log(countContract);
    // ⭐⭐⭐⭐⭐ 이제 countContract 안에 있는 걸 가져와서 쓴다 ⭐⭐⭐
    // 이전에는 abi 안에 있는 getValue 를 가져왔는데, 이게 필요 없음.
    // 이걸 통째로 가지고 인스턴스를 만들어놨기 때문에, 이제 그걸 사용하면 됨.
    // 왜 이렇게 쉬워진거지❓❓❓❓❓❓ 인스턴스 효과 인가❓❓❓❓❓❓ ⭐⭐⭐⭐⭐⭐⭐
    const result = web3.utils
      .toBigInt(await countContract.methods.getValue().call())
      .toString(10);

    setCount(result);
  };

  // ⭐⭐⭐⭐⭐⭐⭐⭐ 다 녹아들어가 있음 ⭐⭐⭐⭐⭐⭐⭐ 
  const increment = async () => {
    await countContract.methods.increment().send({

      // 가스비 지불할 곳 
      from : user.account, 
        // 디폴트가 없을 때, 이게 들어간다. 
        
      // 컨트랙트 안에서, 내용을 조회할 수 있기 때문에, 우선 넣어주기
        data : countContract.methods.increment().encodeABI(), 
        // 디폴트가 없을 때, 이게 들어간다. 
    })

    getValue()
  }
  
  const decrement = async () => {
    await countContract.methods.decrement().send({

      // 가스비 지불할 곳 
      from : user.account, 
        // 디폴트가 없을 때, 이게 들어간다. 
        
      // 컨트랙트 안에서, 내용을 조회할 수 있기 때문에, 우선 넣어주기
        data : countContract.methods.decrement().encodeABI(), 
        // 디폴트가 없을 때, 이게 들어간다. 
    })

    getValue()
  }


  useEffect(() => {
    if (countContract !== null) getValue();
  }, [countContract]);

  if (user.account === null) return "연결된 지갑 주소가 없음!";
  return (
    <>
      <div> {user.account} </div>
      <div> 카운터 : {count} </div>
      <button onClick={increment} > 증가 </button>
      <button onClick={decrement} > 감소 </button>
    </>
  );
};

export default App;
