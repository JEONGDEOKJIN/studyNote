// 여기서 날씨 api 작업 
    // 요청, 응답을 처리할 때, 라이브러리(axios) 를 사용 
    // axios 를 써서, 요청, 응답 처리를 처리할 것 임. 
    // npm i axios 

import axios from 'axios'

function getWeather (name) {
    return async (dispatch,getState) => {
        console.log(getState);
        // api 작업 | 데이터 요청 
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3e3d86fd5f31fa5abdc404ba6b7f0b19`)
        // ebac80908ace01c984f9989655759128
        
        // 요청에 대한 처리가 끝나면, 상태를 최신으로 업데이트 ⭐⭐⭐⭐⭐⭐ 
        dispatch ( {type : "GET_WEATHER" , payload : data} )
    }
}
    // function getTest(name) {
    //     return function(dispatch) => {
    //         console.log("HELLO")
    //     }
    // }

    // [문법 이해]
        // getWeather 는 함수를 반환함 (고차 함수)

    // [문법 이해]
        /* 이것과 동일함 👇👇
            function getWeather(name){
            return async function (dispatch) {
                // api 작업 데이터 요청
                const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ebac80908ace01c984f9989655759128`)
                // 요청의 처리가 끝나면
                dispatch({type : "GET_WEATHER" , payload: data})
            }}
            1) 이름은 없고 dispatch 를 매개변수로 받는 익명함수임 
        */ 
    





export const weather = { getWeather }
    // [객체 리터럴 문법] 
        // export const weather = {getWeather : getWeather} 이것과 동일

// [개념 ⭐] 
    // 1. 액션은 함수를 반환하는 함수 
        // 근데 비동기로 할거니까 asyncs 로 
    // 2. 추측 : 왜 함수를 반환하냐면, dispatch 로 action 을 전달해야 하니까?

