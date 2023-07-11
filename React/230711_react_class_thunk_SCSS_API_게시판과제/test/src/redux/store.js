// 저장소 관련된건 리덕스 라이브러리 를 사용 
// 값을 접근하거나 할 때는 리액트 리덕스? 

import { createStore , applyMiddleware } from 'redux'
// 미들웨어 추가 
    // applymiddleware 함수로 미들웨어 추가 반환되는 객체 추가 

import thunk from 'redux-thunk'


import reducer from './reducer';

// 미들웨어로 thunk 추가하는 방법은 
    // applyMiddleWare 함수의 매개변수로, 사용할 미들웨어 전달 
export const store = createStore(reducer , applyMiddleware(thunk));
    // 오늘은 export default 말고 그냥 이렇게 내보내기 
    // import { store } from './redux/store' 가져올 때 이렇게 ⭐⭐⭐⭐⭐⭐⭐⭐ 



