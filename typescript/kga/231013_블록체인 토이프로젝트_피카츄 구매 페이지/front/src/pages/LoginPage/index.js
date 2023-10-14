
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginBtnHandle = () => {
        console.log("메타마스크 로그인 버튼 클릭")
        
        // 메타마스크 로그인 -> 이 부분을 true 로 변경해주면 됨
        setIsLoggedIn(true)

    }

    useEffect( ( ) => {
        if(isLoggedIn ) {
            navigate('/itemListPage')
        } else {
            alert("메타마스크로 로그인 먼저 하세요")
            navigate('/login')
        }
    } , [isLoggedIn])
    

    return (
        <>
            <div>
                <button onClick={loginBtnHandle} > 메타마스크로 로그인 </button>
            </div>
        
        </>
    )


}



export default LoginPage