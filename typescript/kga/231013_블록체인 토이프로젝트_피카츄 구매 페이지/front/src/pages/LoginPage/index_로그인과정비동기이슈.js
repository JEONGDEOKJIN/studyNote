
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginBtnHandle = () => {
        console.log("메타마스크 로그인 버튼 클릭")

        setIsLoggedIn(true)

        if(isLoggedIn) {
            navigate('/itemListPage')
        } else {
            alert("메타마스크로 로그인 먼저 하세요")
            navigate('/login')
        }

    }
    

    return (
        <>

            <div>
                <button onClick={loginBtnHandle} > 메타마스크로 로그인 </button>
            </div>
        
        </>
    )


}



export default LoginPage