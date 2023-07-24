import './App.css';

import {produce} from "immer"
import {add, remove , add2 , remove2 , temp} from "./features/countSlice"
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  // const num = useSelector(state =>  {console.log(state)})
    // state 를 실행하는 그냥 익명함수 임. 
  
  const num = useSelector(state => state.count.num)
  const num2 = useSelector(state => state.count2.num)

  const value = useSelector(state => state.count2.value);

  // const state = {
  //   value : 0, 
  // }


// [immer 사용 이유] 값이 변해도, 바뀐 것을 감지 못 하기 때문에, 
  // '불변성을 지킨다.' 라는 내용이 
  // 기본값을 직접 수정하지 않고, 새로운 값을 만들어내서 수정하는 것. 
  // 리덕스를 사용할 때도, 새로운 값을 만들어서 내보냈었지. 
  // 예전에는 리덕스 actions 를 썼는데, 지금은 이제 이게 내장된 redux toolkit 을 사용할 것 임 
  // redux 내용은 잊어버리지 말고, reduxt toolkit 라이브러리 사용하기⭐⭐⭐⭐⭐ 

    // const nextState = produce(state , dra => {
    //   console.log(dra);
    //     // state 객체를 새로 만들어서, 가져왔음. 
    //     dra.value += 1;
    //     // dra.arr.push("a");  
          // 포인트 
            // 1. 여기에서 이런거 다 작성해서 넘길 수 있음. 
            // 2. 불변성을 지키면서 = 안 변하면서 => 값만 복사하고, 이렇게 push, filter 를 사용할 수 있음. 

    // })

    // console.log("state" , state);
    // console.log(" nextState" , nextState);


    // 기존 객체를 유지하고, 새로운 값을 생성해서, 반환해줌.
      // 예전에 하던 방식
        // {...state, value : state.value + 1}
        // 이것도, 새로운거 복사해서 넣고

        // 이것 처럼 작동하는게 immer 
          // 좀 더 '깔끔하게 사용' 할 수 있다는 장점!


    return (
      <div className='App'>
        <div>
          숫자 : {num}
          <button onClick={() => dispatch(add()) } > 더하기 </button>
          <button onClick={() => dispatch(remove()) } > 빼기 </button>
        </div>

        <div>
          로딩 완료 여부 : {value} <br/>
          숫자 2 : {num2}

          <button onClick={() => dispatch(temp("seoul"))} > 날씨 정보 가져오기 </button>
          <button onClick={() => dispatch(add2())} > 더하기  </button>
          <button onClick={() => dispatch(remove2())} > 빼기 </button>
            {/* features 에 이제, 기능들 모아놓는다. 
                features 도 이제 추가적으로 쪼갤 수 있음.       
                
                이렇게 하면, 
                immer 가 있어서, 불변성도 지켜지고 
                {...state : id , ... } 이제 이런게 필요가 없다는 말! ⭐⭐⭐ 
            */}

            {/* 
              thunk 를 사용하면, 좀 더 다르게 될 수 있음! 

            */}

        </div>

      </div>


    )


}

export default App;
