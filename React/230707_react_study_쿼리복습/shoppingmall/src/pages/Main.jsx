import React from 'react'

import { Header , Body } from '../components'

const Main = ( { isLoginCompleted }) => {
  return (

    <div>
        <Header title = {"홈 입니다."}  />

      <div className='main_container'>

        {/* /shop */}
        <Body path={'/shop'}  pageName = {"Shop 페이지"} isLoginCompleted = { isLoginCompleted } />

        {/* 로그인 페이지 */}
        <Body path={'/login'} pageName = {"로그인 페이지"}  />

        {/* 마이페이지 */}
        <Body path={'/mypage'} pageName = {"마이 페이지"}  />

        {/* 디테일 */}
        <Body path={'/detail'} pageName = {"디테일 페이지"}  />
      </div>

    </div>

  )
}

export default Main