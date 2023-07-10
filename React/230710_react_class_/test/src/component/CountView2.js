
import React from 'react'

import { useSelector } from 'react-redux'
    // 저장소 값 가져오거나, 업데이트 할 때는, 리액트 리덕스 라이브러리, 에서 제공
    // 전역 상태 값을 조회할 때 



const CountView2 = () => {

    // 부모의 props 값을 받지 않고 
    // 전역으로 관리되고 있는 상태의 값을, 컴포넌트가, 직접 접근해서, 가져온다.

        const count = useSelector(state => state.count)
            // 전역값을 사용할 때는, 그냥 이걸로 쓰면, 바로 값이 들어온다. 
            // 상태에서, count 를 반환! 
            // 그러면, count 가 변경되었을 때, 리렌더링 된다 ⭐⭐⭐⭐⭐⭐ 
            // count 값을 상태로 보고 있음. 
        
    // 저장소 값을 가져와보자
    // react hook 함수 

    return (
    <div>
        {count}       


    </div>
  )
}

export default CountView2