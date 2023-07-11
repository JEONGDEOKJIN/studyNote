import './App.css';

import {useDispatch, useSelector} from 'react-redux'
import LoginBox from './components/layout/loginBox';
import { useEffect, useState } from 'react';

import { weather , logins  } from './middleware';


function App() {

  const dispatch = useDispatch()
  
  const [name , setName] = useState("")
  const [id , setId] = useState("");
  const [pw , setPw] = useState("");
  const isLogin  = useSelector(state => state.login.isLogin);
  const userName = useSelector(state => state.login.id)
    // combine 으로 묶일 때, 객체에 키값으로 된다. ⭐⭐⭐ 
    // 전역 상태에 접근할 때, 리듀서를 여러개 사용한 경우, 
    // 객체의 키 값을 해당하는 리듀서 키값을 사용해주자 login 
      // (reducer index.js 에서 정함)combine reducer 에서 이렇게 정해서 이렇게 쓴다 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

const weatherData = useSelector( state => state.weatherData );
  // 날씨 검색 버튼 누르면 





  const login = () => {
    dispatch(logins.login(id, pw))
  }
    // 액션즈 함수는 매개변수를 '함수' 로 전달한다 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
    // id, pw 
      // 매개변수 전달받고, 
      // 전달받은 동작을 하고, api 를 저기거 끝내고, dispatch 
      // dispatch 뒤로 미루기 위해서 
      // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 이 순간 잘 못 따라 갔음 


    const logout = () => {
      dispatch(logins.logout())
    }
      // 로그아웃 버튼을 눌렀을 때

      
    const getWeather = () => {
      dispatch(weather.getWeather(name))

      // 1. dispatch(weather.getWeather(name))에서 dispatch 메소드가 실행됨 

      // 2. dispatch 의 매개변수를 함수로 받으니까, thunk 가 dispatch 를 매개변수로 넣을 준비하고 있음. 
        // thunk 는 store 에서 import 되고 props 를 통해 app.js 에 영향을 미치고 있음.(혹은 thunk 에게 전달)
      
      // 3. 고차함수의 첫 번재 함수인 getWeather(name) 함수 실행 
        // -> name 변수는 state 에서 가져옴
        // -> 고차함수의 함수가 실행되고 나면, 아래와 같은 익명함수가 리턴됨 ✅
          // function async (dispatch) => {
          //   const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${seoul}&appid=3e3d86fd5f31fa5abdc404ba6b7f0b19`)
          //   dispatch ( {type : "GET_WEATHER" , payload : data} )
          // }

      // 4. 이제 고차함수의 두 번째 함수가 실행 
        // 이때 필요한 dispatch 는 thunk 가 꽂아줌
        // 이제서야 axios 보내짐 ✅ 
        // 그 다음 dispatch ( {type : "GET_WEATHER" , payload : data} ) 실행되고 reducer 에게 전달

      // 5. 그 다음. app.js 에 있는 dispatch 가 실행될지 말지 볼 텐데
        // 받은 매개변수가 함수냐, 객체냐에 따라서, 다른 기능을 한 것 임! ✅
        // 이건 thunk 로 전달하는 걸로 역할을 다 했으니 그대로 지나감❓

      // Cf. 결국, thunk 를 쓰는 이유는 
        // 1) '비동기' 작업을 하기 위해서 
        // 2) 즉, app.js 에서, 처리를 하면 할 수 있음. 
        // 3) 그런데, app.js 에서 하려면 
          // 로그인 await 쓰고 -> 기다리고 
          // 게시판 await 쓰고 -> 기다리고 
          // 그래서, 가져오는게 계속 끊기게 됨. 
        // 4) 그런데 이건 js 의 장점이 아님 
          // js 의 장점은 '이벤트 루프' 
          // 이거 시켜놓고, 저거 시켜놓고, 가져오게 하는 것. 이 포인트. 
          // 이걸 하기 위해서 middleware > loginAction, weatherAction 함수 만들어놓고 
          // 그걸 가능하게 하는 기술 중 하나가 thunk 임. 
        // [결론]
          // '비동기 처리' 를 위해서, thunk 를 사용


      /*
        dispatch(weather.getWeather(name))가 호출되면, 
          먼저 weather.getWeather(name)이 실행됩니다.
          getWeather(name) 함수는 비동기 함수를 반환합니다. 이 반환된 함수는 아직 실행되지 않았습니다.
          반환된 함수는 리덕스-thunk 미들웨어에 의해 호출되며, 이 때 dispatch와 getState 두 매개변수를 받게 됩니다.
          이제 반환된 함수가 실행되면서, 비동기 작업을 수행하고 그 결과를 바탕으로 새로운 액션을 디스패치합니다.
          새로 디스패치된 액션은 리듀서에 의해 처리되어 상태가 업데이트됩니다.
      */

    }


    useEffect( ( ) => {
      console.log(isLogin)
      console.log(userName)
    } , [isLogin , userName])

    useEffect( ( ) =>{
      console.log(weatherData)
    } , [weatherData])

  useEffect( () => {
    console.log(id);
    console.log(pw);
  } , [id, pw] )
    // 처음에 한번만 실행되게 됨 
    // 만약, 배열에 값이 들어가면 1) 최초에도 실행(mount) 2) update 실행도 됨! | 주시하게 됨 | 하나라도 바뀌면 실행

  return (
    <div className="App">
      {/* <LoginBox> 레츠고 </LoginBox> */}
    <label> 도시 이름 </label> <br/>
    <input onChange = { (e) => { 
          
            setName(e.target.value) 
      } } > 
    </input> <br/>

    <button onClick={getWeather} > 날씨 검색 </button>

    <div> 지금 여기는 { weatherData && weatherData.data?.name } 날씨는 :  { weatherData && weatherData.data?.weather[0]?.main } </div> <br/>
      {/* 조건부 렌더링 + 옵션 체이닝 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ */}

      {/* 로딩될 때, 지연될 때, 로딩창⭐⭐⭐⭐⭐⭐ */}


    <label> 아이디 </label>
    <input onChange={ (e) => { setId(e.target.value) } } >  </input>

    <label> 비밀번호 </label>
    <input onChange={ (e) => { setPw(e.target.value) } } >  </input>

    <button onClick={login} > 로그인 </button>

    <div> 로그인 됨? </div> {isLogin ? <> {userName} 유저가 로그인 했어  <button onClick={logout} > 로그아웃 </button> </>  : <> 로그인 안됨 </>  }

    </div>
  );
}

export default App;
