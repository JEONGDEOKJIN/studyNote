import React from 'react'

import Login from './Login'

import {Link} from 'react-router-dom'

import { useSelector } from 'react-redux'

const Main = () => {

  let check = useSelector(state => state.isLogin)
  console.log("" , check)

  function loginHandle() {
    if (check == true) {
      <Link to='/order' /> 
    } else {
      <Link to='/login' />
    }
  }

  return (
    <>
      <div>
        여기는 Main 입니다. / 경로가 '/' 이기 때문에, app.js 도 같이 보일 겁니다. 
      </div>

      <h1>로그인 👇👇👇</h1>
      <p>로그인 하러 갑시다. 로그인 해야 '음식주문🥙' 하고 '마이페이지🎏' 갈 수 있습니다.</p>
      <Link to='/login' onClick={loginHandle} >   로그인 하러 갑시다👐  </Link>
      
    </>

  )
}

export default Main