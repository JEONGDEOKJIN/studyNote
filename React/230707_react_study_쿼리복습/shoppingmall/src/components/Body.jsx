
import React from 'react'

import {Link , useNavigate} from 'react-router-dom'

const Body = ({path , pageName , isLoginCompleted}) => {

    let nav = useNavigate();

    return (
    <div className='item_container' >   
    
        <Link to={path}> Link 태그 이용해서, {pageName} 페이지로 이동 </Link>
        
        <button onClick = { () => {
            nav(path)
        } } > useNavigate 이용해서, {pageName} 으로 이동 </button>


        <div> 로그인 완료 되었는지 표시 👉 <span> {isLoginCompleted} </span>  </div>


    </div>
    )
}

export default Body