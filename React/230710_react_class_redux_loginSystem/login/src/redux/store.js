
// 상점 만들 수 있는 메소드 가져오기
    import { createStore } from "redux";
        // store 만드는 건, '리덕스 라이브러리' 에서 

// 요리사 불러오기 (reducer)
    import reducer from './reducer'
        // index.js 니까, 폴더까지만 써도 무방 

// redux 관련 변수들의 상태를 알 수 있는 redux-devtools 셋팅
    import { composeWithDevTools } from 'redux-devtools-extension'
    // 스토어의 '전역상태' 가 변화하는 걸 볼 수 있음. 

// 저장소 만들기 
    let store = createStore(reducer , composeWithDevTools())
        // [해석]
            // 이제, store 에 저장된 값은, 많은 부분에서 사용될 것 임. 
            // 이 전역 상태가 변화하는 것을 composeWithDevTools로 캐치할 수 있음. 

export default store;