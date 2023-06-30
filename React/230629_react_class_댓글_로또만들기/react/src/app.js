// ES6 문법 으로 가져옴 


// export {LoginBtn} 으로 내보낸 방식
    // import {LoginBtn} from "./components/loginBtn"
    // 구조분해할당 처럼 내보내니까, 그 키 값을 맞춰야 
    

// 단일로 default 로 써서 내보낸 경우
    // 이름을 뭐라고 하건 상관없음
    // 가져온 걸 '변수명' 처럼 이름 적어줄 수 있음. 
    // 가져와서 Login 명으로 사용할 것 임
    import Login from "./components/loginBtn"


// 루트 요소, 가상 DOM 으로 생성
    // 루트 설정 
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    // root.render(<Login>  </Login>)       //이렇게 작성해도 되고
    root.render(<Login> </Login>  )        // 이렇게 작성해도 됨⭐⭐ 
    