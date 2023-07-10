// 저장소 만들기 
    // 저장소 관련된건, 리덕스 라이브러리고 만든다. 
    // 이 저장소를 관리하는 건, 리액트 리덕스 라이브러리에서! 

import { createStore } from "redux";
    // 밑줄 표시는 자연스러움 

// 메뉴판 가져오자 (요리된거 가져오자)
import reducer from './reducer'   //index 니까 폴더까지만 서도 됨

import { composeWithDevTools } from "redux-devtools-extension"


// 저장소 만들기
    // createStore 메서드의 반환값으로 저장소를 만듦
let store = createStore(reducer , composeWithDevTools());
    // 음식점 만들고, 메뉴판 전달!!!!! 
    // 그러면, 김볶, 계란 볶음밥 메뉴판 있음!! 

    // composeWithDevTools;
        // /스토어의 전역 상태가 변화하는 걸 보여줄 수 있는 툴 

    // 이 store 의 의미 
        // 이 store 는 백반집임 
        // 이 store 에 있는 메뉴들을 만드는게 리듀서 

export default store;