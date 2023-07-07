import React from 'react'
import { Body, Header } from '../components'

const Shop = ({login}) => {
  return (
    <div>
        <Header name = {"상세페이지"} >         </Header>

            <Body name={"메인"} path={"/"}  login={login} />
            <Body name={"상세"} path={"/detail"}  login={login} />

            <Body name={"1번 상품으로 이동"} path={"/detail/0/10/셔츠"} item={ {id : 1 , num : 10 , name : "셔츠"} } />
            <Body name={"2번 상품으로 이동"} path={"/detail/1/20/바지"} item={ {id : 2 , num : 20 , name : "바지"} }  />
            <Body name={"3번 상품으로 이동"} path={"/detail/2/30/모자"} item={ {id : 3 , num : 30 , namce : "모자"} }  />
            <Body name={"4번 상품으로 이동"} path={"/detail/3/40/장갑"} item={ {id : 4 , num : 40 , name : "장갑"} }  />

    </div>
  )
} 

export default Shop