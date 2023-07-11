
// redux 라이브러리에서 제공되는 함수 
// 리듀서 함수를 합쳐주는 동작을 해준다. 

// combineReducers() 함수에 매개변수로 전달한다.

import { combineReducers } from "redux";

import login from "./login"
import weather from "./weather"

const rootReducer = combineReducers( {login , weather} )
    // 매개변수로 합칠 리듀서 함수들을 '객체' 로 전달 ⭐⭐⭐ 

export default rootReducer;