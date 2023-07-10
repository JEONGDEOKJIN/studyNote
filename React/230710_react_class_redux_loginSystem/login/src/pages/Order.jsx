import React from 'react'

import {Link} from 'react-router-dom'

const Order = () => {
  return (
    <div>
      <p> 여기는 Order 입니다. </p>
      <p> 로그인 완료되어야, 마이페이지로 갈 수 있어요 </p>
      <Link to='/mypage' >  🔮마이페이지 가긴 가야지  </Link>

    </div>
  )
}

export default Order