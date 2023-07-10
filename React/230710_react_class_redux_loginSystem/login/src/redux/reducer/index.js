
// 초기값 설정
let init = {
    count : 0, 
    isLogin : false, 
    userState : {
        userName : "",
        userAge : 1,
    }
}

// reducer 함수 
    function reducer ( state = init , action ) {

        // 'action' 을 보면 '어떤 주문이 들어왔는지 확인' 할 수 있음. 
        
        // '조건문' 을 통해, '주문 일치 하는 레시피' 를 찾기 
            switch (action.type) {
                    // [✅주의점] 
                        // action.type 에서 type 은 주문할 때 적은 key 값임  
                case "김치 볶음밥":
                    // [✅주의점]
                        // 띄어쓰기도 정확히 맞아야 함. ex) 주문서에 "김치볶음밥" 이라 적고 "레시피에 김치 볶음밥" 으로 하면 오류남
                    
                    return {...state , count : state.count + 1}
                        // [해석]
                            // 1) return 은 무조건 꼭! 있어야 한다. 그래야 store 에 업데이트 할 수 있음. 
                            // 2) return 을 하면 -> store 로 들어가고 -> '값을 최신으로 UPDATE' 한다. 
                        // [객체 스프레드 문법 해석]
                            // 1) ...state 로 a) 값은 같지만 b) 주소가 다른 '사본' 을 만든다. 
                            // 2) 새로운 객체의 key 값에, state.count+1 을 UPDATE 한다. 

                case "LOGIN" :
                    return { ...state , isLogin : action.payload }
                        // [✅ 주의점]
                            // '상태(state)' 를 의미하는 경우, '대문자' 로 작성한다. 
                        // [📛궁금한 점]
                            // payload 가 key 라는 건 알겠음. 
                            // 다만, 통상적으로 어떤 값을 넣지? 

                case "LOGOUT" :
                    return {...state , isLogin : action.payload}
                
                default:
                    return {...state};
            }
    }

    export default reducer;