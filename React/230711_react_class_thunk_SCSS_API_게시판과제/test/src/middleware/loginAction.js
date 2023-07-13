



function login (id, pw) {
    return (dispatch) => {

        // 이 부분에 데이터베이스 요청 응답 과정이, 이곳에 들어가면 된다. 
            // async await 이렇게 
            // 이렇게 지연! 되었다 | 비동기 작업을 할 때!
            // 그 다음 dispatch 가 실행되게 된다. 

        console.log("여기는 동작하니")
        
        // 그 다음! 
        dispatch( {type : "LOGIN" , payload : { id, pw }} )

    }
    // dispatch 를 매개변수로 받고 -> 함수를 반환! 
}

function logout () {
    return (dispatch) => {
        dispatch( {type : "LOGOUT"} )
    }
}

// 새로운 방식으로 내보냄 
    /* login = {
        login : funtion, 
        logout : funtion, 
    }

    */

export const logins = {login , logout }
    // logins 객체 이름을 지정하고,
    // login, logout 키 값을 적는다.  

    // 받을 때, import {logins} from './
    // 이 객체에는 login, logout 이 들어있을 거야! 

