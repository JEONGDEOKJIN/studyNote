import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate();
  
  const loginBtnHandle = () => {
    navigate('/login')
  }


  return (
    <div>
      <button onClick={loginBtnHandle} > 로그인 페이지 이동 </button>
    </div>
    )
}

export default MainPage