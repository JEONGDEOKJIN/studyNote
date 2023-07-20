import React from 'react'

import {Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Order = () => {

  let nav = useNavigate()

  let handleOrder = () => {
    // 로그인이 안 되어 있는 상태면 -> 메인 페이지로 이동 시킨다. 
    console.log("count상태" , count)  // true false 찍힘 
    
    count === true ? nav('/mypage')  : nav('/order')
}

  let count = useSelector(state => state.isLogin)
  console.log(  "현재 로그인 상태👉" , count)


  return (
    <div>
      <p> 여기는 Order 입니다. </p>
      <p> 로그인 완료되어야, 마이페이지로 갈 수 있어요 </p>


      <button onClick={}>  🔮마이페이지 가긴 가야지  </button>

    </div>
  )
}

export default Order