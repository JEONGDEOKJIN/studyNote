
# thunk 기본 이해

- thunk 셋팅 방법 
``` css
// thunk 설치 
	// npm i redux-thunk
	// store.js 에서 미들웨어 추가
		// import { createStore , applyMiddleware } from 'redux'
		// import thunk from 'redux-thunk'
		// export const store = createStore(reducer , applyMiddleware(thunk));

// actions createor 함수 만들고 > 이 함수가 끝나면 dispatch 가 실행되게 하기 
	// middleware > index..js 에 함수 

```

- thunk 기능 및 필요성 
```
// 🔹 미들웨어를 추가 : redux-thunk ⭐⭐⭐ 
    // redux-thunk 를 많이 씀! 
    // 기능 
        // api 를 요청하고, 처리가 된 뒤에, 상태를 업데이트 하기 위해서
        // dispatch 를 '지연' 시킨다. 
        // 뭘로 지연시켜? 
        // actions 라는 함수를 만들것 임. 
        // actions 라는 함수로 dispatch 를 지연시킬 것 임 
            // 그래서 api 처리가 끝나면, dispatch 를 날릴 것 임. 

    // redux-thunk 미들웨어 추가하는 방법 

    // dispatch 함수를 실행할 때, 매개변수로 객체를 넘기느냐, 함수를 넘기느냐의 차이
        // 함수를 넘기면 -> actions 
        // 객체를 넘기면 -> 객체로 들어간다. 
        // 타입을 확인해서 넘겨준다. ⭐⭐⭐ 
```

- thunk 역할 이해
``` 
// 🔹 날씨 api 가져와서 사용 
    // https://openweathermap.org/current

    // https://api.openweathermap.org/data/2.5/weather?q=seoul&appid= 
    // 여기에 이제 api 키 발급 

    // 내 API 키 
        // 3e3d86fd5f31fa5abdc404ba6b7f0b19

    // thunk 의 역할은? 
        // Action Creators 라는 함수 를 만들어주는 것. 
        // Action Creators 함수는 '함수를 반환' 한다. 
        // thunk 는 1) dispatch 를 딜레이 시키는 역할 (api 를 받아와야 하니까)
```





- 이 부분 출처 : C:\Users\user11\Desktop\kga\studynote\React\230711_react_class_\test\src.app.js
![](https://i.imgur.com/bk83bKv.png)


- weatherAction.js 와 같이 action 함수를 굳이 만드는 이유는? (미들웨어를 만드는 이유는?)
```
reducer 에게 던지기 전에 

서버에게 원하는 걸 받아오는 시간이 필요하기 때문에. 
바로 던지면, 원하는걸 못 받고 바로 넘어가니까 


```


# 고차함수, dispatch 의 2가지 기능, thunk 를 쓰는 이유, 결국 이벤트 루프, 즉 비동기 처리


- 정리 ⭐⭐⭐⭐⭐⭐ 
``` css

    const getWeather = () => {
      dispatch(weather.getWeather(name))

      // 1. dispatch(weather.getWeather(name))에서 dispatch 메소드가 실행됨 

	// 2. dispatch 는 
		// 1) 객체를 매개변수로 받으면, reducer 에게 던지고 
		// 2) 함수를 받으면, thunk 에게 던지는 특성이 있음 (thunk 에게 던져서, 비동기 처리를 하고, 다시 dispatch(action) 으로 reducer 에게 전달하기 위함. 
		// CF. 이때, thunk 는 는 store 에서 import 되고 props 를 통해 app.js 에 영향을 미치고 있으므로, dispatch 의 매개변수가 무엇이 들어왔는지 캐치할 수 있음) 
		// 따라서, 지금은, 함수가 매개변수로 들어왔으므로, thunk 에게 던지고, thunk 는 getWeather의 익명함수가 필요로 하는 dispatch 를 인수로 꽂아넣음
      
	// 3. 그래서, 고차함수의 첫 번재 함수인 getWeather(name) 함수 실행됨. 
        // -> name 변수는 state 에서 가져옴
        // -> 고차함수의 함수가 실행되고 나면, 아래와 같은 익명함수가 리턴됨 | name 에 seoul 이 대입된 것 뿐 
          // function async (dispatch) => {
          //   const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${seoul}&appid=3e3d86fd5f31fa5abdc404ba6b7f0b19`)
          //   dispatch ( {type : "GET_WEATHER" , payload : data} )
          // }

      // 4. 이제 고차함수의 두 번째 함수가 실행 
        // 이때 필요한 dispatch 는 thunk 가 꽂아줌
        // 이제서야 axios 보내짐 ⭐⭐⭐⭐⭐
        // 그 다음 dispatch ( {type : "GET_WEATHER" , payload : data} ) 실행되고 reducer 에게 전달

      // 5. 그 다음. app.js 에 있는 dispatch 는 이미 thunk 에게 해당 매개변수를 던졌으므로 역할을 다 했음. 

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

```
