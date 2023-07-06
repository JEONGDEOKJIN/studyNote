
import { useEffect, useState } from 'react';
import './App.css';
import Block from './components/Block';
import { img01, img02, img03  } from './img';

// 가위바위보 
  // 플레이어 하나, 컴퓨터 하나
  // 둘 다 컴포넌트로 만들고 
  // 컴퓨터는 랜덤 가위 바위 보 중 하나를 낸다. 
  // 플레이어는 선택할 수 있게 

  // 결과 : 이렇게 써놓는게 좋아 ⭐⭐⭐⭐⭐⭐⭐⭐ 
  // 플레이어 VS 컴퓨터 
  // 가위 VS 가위 = 무승부 
  // 가위 VS 바위 = 플레이어 패 
  // 가위 VS 보 = 플레이어 승 
  // 바위 VS 바위 = 무승부 
  // 바위 VS 가위 = 승 
  // 바위 VS 보 = 패 
  // 보 VS 보 = 무승부 
  // 보 VS 가위 = 패 
  // 보 VS 바위 = 승 

function App() {

  // 컴퓨터와 유저가 사용할 가위, 바위, 보의 객체, 하나를 만들어주자 
  // 선택값을 담아놓을 객체

    // [예전] 이렇게 하나 하나 변수로⭐⭐⭐⭐⭐⭐ 
      // const scissors = "가위";
      // const rock = "바위"

    // [지금] 
      // 선택값을 다루고 있어 -> 그러면, 
      // select 객체 안에, 데이터가 다 들어있으면, 
      // select 동작을 하는 프로그램을 작성할 때, 
      // select 객체 안에 있는 값은 전부, select 동작을 하기 위해 만든 것 이라고 알 수 있음. 
      // 즉, ⭐⭐⭐변수를 대체⭐⭐⭐ 한다. 

    // select 객체가 하는 역할 
      // 컴퓨터, 유저가 가위, 바위, 보를 냈을 때, 필요한 데이터를 모아둘 객체
    const select = {
        scissors : { 
          name : "가위", 
          img : img01
        }, 
        rock : {
          name : "바위", 
          img : img02
        }, 
        paper : {
          name : "보", 
          img : img03
        }
    }

    // 유저가 선택한 값은 state 로 갖고 있을 것 
      // 선택한 값은 '주시' 하고 있자. 
      // 선택하면, 데이터가 바뀐 상태로, 다시 , 그려줘야 하기 때문에
      // '주시' 하게 하고 있으면 -> 변하게 된다. 
      
      // 유저의 선택, useState 
        const [userSelect , setUserSelect] = useState(null);
      
      // 컴퓨터의 선택, useState
        const [comSelect , setComSelect] = useState(null);

      // 승패 결과를 담을 useState
        const [result, setResult] = useState("");


    // 유저가 선택하면 실행되는 함수
      function userClick (_select) {
        // _select == "scissors" 이면 
        // select["scissors"] 이게 나오고 => 가위의 객체가 userSelect 객체에 담기게 된다. 

        // '선택한 객체' 를 '상태 변수' 에 담는다. 
        setUserSelect(select[_select]);

        // 플레이어 선택 이후에, 컴퓨터도 랜덤한 값을 갖고, 가위, 바위, 보를 선택 시킨다. 
        // 컴퓨터는 랜덤으로 선택을 시켜야 함. 
        let arr = Object.keys(select);    // 객체에서 키값들을 가져오는 구문 ⭐⭐⭐⭐⭐⭐⭐⭐ 
          // values 하면, 값들을 가져올 수 있음.
        console.log(arr)

        // 소수점 제외하고, 랜덤한 정수값 뽑기, 0~2
        let comRandom = Math.floor(Math.random() * 3);

        // 컴퓨터가 '랜덤한 인덱스를 선택' 하게 하기 
        setComSelect(select[arr[comRandom]])
          // 컴퓨터도, 유저와 동일하게 선택할 수 있게 셋팅됨

        let player = select[_select];
        let computer = select[arr[comRandom]]

        if (player.name == computer.name) {
          // 처음에 무승부를 먼저 거른다.
          setResult("무승부")
        } else if ( player.name === "가위" ) {
          let result = computer.name === "보" ? "이겼음" : "졌음"
          setResult(result)
        } else if (player.name == "바위") {
          let result = computer.name === "가위" ? "이겼음" : "졌음"
          setResult(result)
        } else if (player.name == "보") {
          let result = computer.name === "바위" ? "이겼음" : "졌음"
          setResult(result)
        }

      }

      useEffect( () => {
        console.log(userSelect)
      } , [userSelect] )


    return (

      <>
        <div className="App">        
            {/* 컴퓨터 */}
            <Block data = {comSelect} name={"컴퓨터"} result={result}  />

            {/* 플레이어 | 하나를 갖고 2개 쓴다 | 내용만 바꾼다 = 이때, props 쓴다 ⭐⭐⭐⭐⭐⭐ */}
            <Block data = {userSelect}  name={"유저"} result={result} />
        </div>

        <div>
          {/* 버튼이 들어올 예정 */}
          <button onClick={ () => {userClick("scissors")} } > 가위 </button>
          <button onClick={ () => {userClick("rock")} } >  바위 </button>
          <button onClick={ () => {userClick("paper")} } > 보 </button>
        </div>

      </>

    );
  }

export default App;
