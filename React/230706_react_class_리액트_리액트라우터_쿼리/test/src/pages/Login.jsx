import React from 'react'
import { Body , Header } from '../components'

const Login = ( {login, setLogin} ) => {
  return (
    <div>

        <Header name={"로그인페이지"}  > </Header>
        {/* 자바스크립트가 코드를 읽는 과정에서, 함수에 괄호가 있으면, 실행식, 이라고 받아들임. 
            중괄호 = jsx 에서 js 쓰겠다는 말
            setLogin(true) 이건, 함수를 실행시키라는 의미 
            즉, 괄호 를 쓰면, 함수 실행식 이기 때문에, 함수를 실행시킴. 
            so, setLogin(true) 이렇게 하면 onClick 안 해도 실행됨

            () => {setLogin(true) } 이렇게 익명함수로 전달 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

            그러면, 매개변수를 사용해야할 경우에는? 
                함수도 값 이라고 했는데, 
                ✅익명함수✅ 를 만들어서, 그 값을 전달하면 된다. 

        */}
        <button onClick={ () => {setLogin(!login) } } >로그인 or 로그아웃 </button>

        <Body path={'/'}  name={'메인'}  login={login} > </Body>

    </div>
    

  )
}

export default Login