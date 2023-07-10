import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

const Login = () => {

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch( {type : true} )
  }

  function isLogin() {
    // 로그인된 상태를 변경한다. 

  }

  return (
    <div>
        <p> 여기는 로그인 페이지  </p>
        <p> 로그인 완료 되어야 주문 페이지로 갑니다 </p>
        <Link to='/order'> 👉주문페이지로 갑시다 </Link>

        {/* 이 버튼을 클릭하면, 로그인된 상태, 가 되게 하기 */}
        <button onClick={handleLogin} > 로그인 vs 로그아웃 </button>

    </div>
  )
}

export default Login