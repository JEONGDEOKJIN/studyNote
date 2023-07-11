
let init = {
    id : "", 
    pw : "",
    isLogin : false,
}


function reducer( state = init , action ) {
    // 리듀서 함수는 '무조건 반환' 값이 있어야 함. 
    // 이 반환값을 갖고 -> store 의 값을 '최신화' 시킬 것 이기 때문에
    // 값만 변경되면, 모른다. 바보임. 
    // 주소값을 확인한다. -> ⭐ 주소가 변화하면, 업데이트를 시켜줌 ⭐
    // so, 새로운 주소를 만들어서, 반환, 해줘야 함. 
    
    const {type, payload} = action
        // 그냥 action 객체의 키 값을 type, payload 로 함 | 그냥, 관습적임 
        // payload = { id : "" , pw : ""  isLogin : false }
            // 👉 payload = { id : payload.id , pw : payload.pw, isLogin : true}    // 이렇게 값이 교체된다.

    switch (type) {
        case "LOGIN":
            return {...state , id : payload.id , pw : payload.pw , isLogin : true};
                // "LOGIN" 표시된거니까, 그냥 true 로 줘도 된다. 
        
        case "LOGOUT":
                // '상수, 상태값' 을 표현할 때 = 대문자! 로 사용 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
            return{...state , id : "" , pw : "" , isLogin : false }
        
        default:
            return state;
                // 해당값이 없어도, 이렇게 적어도 된다. 
    }

}


export default reducer