import React from 'react'
import { Link , useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

const Login = () => {

  const dispatch = useDispatch();

  let nav = useNavigate()

  const handleLogin = () => {
    console.log("로그인 버튼 클릭됨🚀")
    dispatch( {type : "LOGIN" , payload : true} )
  }
  
  let handleOrder = () => {
      // 로그인이 안 되어 있는 상태면 -> 메인 페이지로 이동 시킨다. 
      console.log("count상태" , count)  // true false 찍힘 
      
      count === true ? nav('/order')  : nav('/login')
  }

  let count = useSelector(state => state.isLogin)
  console.log(  "현재 로그인 상태👉" , count)
  
  return (
    <div>
        <p> 여기는 로그인 페이지  </p>
        <p> 로그인 완료 되어야 주문 페이지로 갑니다 </p>
        <button  onClick={handleOrder} > 👉주문페이지로 갑시다 </button> 
        <br />
        <br />
        
        {/* 이 버튼을 클릭하면, 로그인된 상태, 가 되게 하기 */}
        <button onClick={handleLogin} > 로그인 하기 버튼  </button>
        <p> 로그인 상태 : {count} </p>
          {/* 여기 데이터가 왜 안 찍히지❓❓❓ */}

    </div>
  )
}

export default Login