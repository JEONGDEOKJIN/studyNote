import React from 'react'

import { useDispatch } from 'react-redux'
    // 저장소는 리덕스에서 
    // 저장소를 편하게 쓸 때는 리액스 리덕스 라이브러리

// 전역 상태에 있는 값을 업데이트 해줄 것 임 
    // useDispatch 액션을 보낼 수 있게 
    // react hook 함수를 사용한다. 
const Count2 = () => {
    // use dispatch 
    const dispatch = useDispatch();

    // dispatch 함수를 사용해서, action 을 던질 수 있다. 
    // dispatch 함수를 사용할 때, 매개변수로 객체를 전달해주자. 
    // 객체의 규칙은, {type(동작에 대한 메뉴이름), payload(전달해야할 값이 있을 때, 돈을 주고)}
    // type : 동작 시킬 행동의 이름 
    // payload : 선택사항 | 필요하면 넘기고, 없으면 안 넘겨도 됨. | 상태를 변경할 때, 데이터 전달이 필요하면 사용! 

    
    const handlerAdd = () => {
        dispatch( {type : "LOGIN" , payload : true })
            // 상태에 대한 패턴을 다룰 때, 대문자를 쓴다. 
            // 이건 규칙 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
            // EX) 로그인 상태, 로그아웃 상태, 걷기 상태, 달리기 상태, 점프 상태, 달리기 상태 
            // RUN, IDLE, JUMP, 

    }

    const handlerRemove = () => {
        dispatch( {type : "LOGOUT" , payload : false} )


    }


    return (
        <div>
            <button onClick={handlerAdd} > 로그인 </button>
            <button onClick={handlerRemove} > 로그아웃 </button>            
        </div>
    )
}

export default Count2