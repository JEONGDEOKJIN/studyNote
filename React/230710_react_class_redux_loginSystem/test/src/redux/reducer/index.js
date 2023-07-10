

// 리듀서 함수 


// 메뉴판 


// 상태 관리할 때 초기상태가 필요함
// 카운트 값 하나를 초기로 설정! 
// 시작은 카운트! 로
    // 이걸 이제 ⭐ '전역 변수' ⭐ 로 관리할 것 
let init = {
    count : 0,
    isLogin : false, 
    userState : {
        userName : "",
        userAge : 1,
        // 이걸 전역 상태로 갖고 있다가 쭉 
    }
}


// 리듀서는 '함수' 임! so, 함수를 만들자 

    function reducer( state = init , action ) {
        // 음식이 뭔지 판단하는 조건문 

        switch (action.type) {
            case "김치 볶음밥": 
                // [해석]
                    // action 은, 주문을 할 때, action 에 담아서 보내게 됨. 
                    // action.type 은, action 객체에 담을 때 key 로 type 을 썼기 때문!
                
                    
                // +1 이라는 요리를 함 
                // 리듀서 함수의 반환값으로 저장소를 최신화 시켜준다. 
                // 저장소는 대기 하다가, 리듀서가 호출되면, 값을 반환 받아서, 최신화 한다. 
                console.log("여기오나?🚀🚀🚀")
                return {...state , count : state.count + 1};
                    // [해석]
                        // ...state 가 필요한 이유
                            // return {count : state.count + 1};
                                // 이렇게 하면 못 알아들음 
                                // 왜냐면, ⭐'값을 비교하는게 아니라, 주소'⭐를 비교하기 때문에, 값이 변해도 모름 
                                // 그래서, ...state 로 spread 해서 보내야 함. 

            case "계란 볶음밥":                
                return {...state , count : state.count + -1};

            case "LOGIN" : 
                return { ...state, isLogin : action.payload };
                    // 초기값을 앞에 붙여주고 
                    // islogin 추가하면, is login 에 덮어 씌워진다. 
                    // ...state : 초기 객체의 값을 복사함 
                    // 그 다음, isLogin : action.payload 가 들어감 
                    // isLogin : true 가 들어가게 됨 -> so, 최종적으로는 isLoign : true 가 되고, 나머지는 그대로 값이 나옴 

                    // 전역 상태를 개발하면서, 브라우저의 개발자 모드로, 전역 상태가 바귄다는 걸, 실시간으로 확인하고 싶음 ⭐⭐
                        //1) 터미널 설치 : npm install redux-devtools-extension
                        //2) 크롬 확장 프로그램 추가 :  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
                        //3) store 에 매개변수로 값 전달 let store = createStore(reducer , composeWithDevTools);

            case "LOGOUT" :
                return { ...state , isLogin : action.payload };



            
            default:
                return {...state};
                // 이 함수에는 무조건 반환값이 있어야 함 ⭐⭐⭐⭐⭐ 
                // 그래서 무조건 return!!! 
        }


    }
        // 초기값은 위에서 만든걸로 대체 
        // 매개변수는 action(주문!) 을 받을거야 
        // action==음식이름
        // 주문 받으면 -> 음식이 뭔지 판단한다. 


    export default reducer;