import React from 'react'

import { LoginBoxWrap  , LoginBoxInput } from './Login.styled'

const LoginBox = () => {
  return (
    <div>

        {/* width={"1000px"} props 값으로, width 는 키로 넘어가는데, 
          그러면, 동적 스타일 값을 주고 싶으면 어쩌지?   
        */}
        
        <LoginBoxWrap width={"500px"} >
          <p className='login-title' > 로그인 박스 </p>
          
        <LoginBoxInput> 버튼 </LoginBoxInput>

          </LoginBoxWrap>

    </div>
  )
}

export default LoginBox