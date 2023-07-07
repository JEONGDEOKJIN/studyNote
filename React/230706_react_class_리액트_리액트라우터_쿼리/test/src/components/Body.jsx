import React from 'react'

import { Link , useNavigate } from 'react-router-dom'
    // Link 는 리액트에서 A 태그 같은 기능
    // ⭐⭐ 페이지가 새로고침되지 않고, URL 만 변경된다. ⭐⭐
    // 자바스크립트에서도 가능하긴 함. 

// react - hook 함수 useNavigate 페이지 전환을 위해 사용  
const Body = ( {path, name, login , item} ) => {
    
    const nav = useNavigate();

    return (

    <div className='body' >
        
        <Link to={path} > {name} 페이지 이동  </Link>
        <button onClick={ () => {
            nav(path)
        } } >  {name} 페이지 이동  </button>

        {/* 조건부 렌더링 ⭐⭐ */}
        {item && item.id ? <div> {item.id}  </div> : null }
        {item && item.num ? <div> {item.num}번 </div> : null }
        {item && item.name ? <div> 이름 : {item.name}  </div> : null }

        {login ? <div> 로그인 됨 </div> : <div> 로그인 안 됨 </div> }

    </div>
    )
}

export default Body