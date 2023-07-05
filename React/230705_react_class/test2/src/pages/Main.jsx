import React from 'react'

import { Link } from 'react-router-dom'

const Main = () => {
    return (
    <div>
        메인페이지
        
        <Link to={"/shop"} > 상점으로이동 </Link>
        {/* 새로고침 안 되고 넘어감 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ */}

    </div>
    )
}

export default Main