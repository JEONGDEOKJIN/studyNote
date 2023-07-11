// api 가져와서, 스토어의 상태값을 바꿀 때, 비동기 처리 하기 위해서, 미들웨어를 추가 해야 한다. 
    // dispatch 를 지연시키는 느낌 ⭐⭐⭐ 


// 🔹 SCSS
    // 스타일드 컴포넌트를 사용할 것 
        // 장점 
            // 클래스 명이 겹치지 않는다. 
            // 스타일에 관련되어서, props 로 값을 전달해서, 스타일 값을 적용할 수 있다.

        // 특징 
            // SCSS 를 다뤄봤으면, 친숙할 것 
            // 동적으로 할 수 있어 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    // SCSS 설치 
        // npm i styled-components 
        // src > components 폴더 > layout 폴더 > loginBox 폴더



// 🔹 리덕스 설치 
    // npm i redux 
    // npm i react-redux

    // 저장소(STORE) 구성 
        // '주입' 시켜줄것 임 
            // @index.js import { Provider } from 'react-redux'; 

    // 어떤 메뉴들이 있는지 전달 -> reducer 만들기
        // 리듀서에도 기능이 다양할 수 있음 
        // so, reducer 안에서도 다양한 파일을 만듦 ⭐⭐⭐ 
        // ex) login 리듀서 함수, weather 리듀서 함수 만듦


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

    // thunk 설치 
        // npm i redux-thunk
        // store.js 에서 미들웨어 추가
            // import { createStore , applyMiddleware } from 'redux'
            // import thunk from 'redux-thunk'
            // export const store = createStore(reducer , applyMiddleware(thunk));

    // actions createor 함수 만들고 > 이 함수가 끝나면 dispatch 가 실행되게 하기 
        // middleware > index..js 에 함수 


// 🔹 빌드 해주는 명령어 
    // npm start 는 개발할 때 사용하는 개발환경임 
    // npm run build 하면 -> 빌드 파일이 뽑힘 
    // 이렇게 하면 빌드된 파일을 배포하는 것 임. 
    // build 폴더가 생기고 -> 우리가 작업한게 들어감
        // pc 의 root 경로로 들어가기 때문에 상관없음. 