import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWeb3 from "../../hooks/web3.hook"

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user, web3 } = useWeb3();

    // 메타마스크로 로그인 확인 
    const getAccounts = async () => {
        try {
            const accounts = await window.ethereum.request({
                // 메타마스크 연결 계정 조회
                method : "eth_requestAccounts"
            })
    
            // 계정이 있으면 -> 로그인 true
            accounts.length  > 0  
            ? setIsLoggedIn(true)
            : alert("메타마스크로 로그인 하세요")
            
        } catch (error) {
            console.log(error)
        }
    }

    const loginBtnHandle = () => {
        console.log("메타마스크 로그인 버튼 클릭")
        
        getAccounts()
        // 메타마스크 로그인 -> 이 부분을 true 로 변경해주면 됨
        // setIsLoggedIn(true)
    }

    // // 메타마스크 미로그인 시, 자동으로 로그인 창 띄워주게 하고 싶어서 테스트 | 📛 현재 미작동
        // const switchNet = async () => {

        //     // 메타마스크에 해당 네트워크로 변경해달라고 요청 | ⭐ 성공적으로 변경하면 null 을 반환하게 됨 ⭐
        //     const net = await window.ethereum.request({ 
        //     jsonrpc : "2.0" , 
        //     method : "wallet_switchEthereumChain",    // wallet_switchEthereumChain : 'params 에 넣은 네트워크로, 변경을 요청' 하게 하는 메소드
        //     params : [{chainId : "0x539"}]    // 0x539 == 1337 == ganache 실행할 때, 해당 체인ID 로 기재했음 -> 따라서, 가나쉬로 바꿔 달라는 말 
        //     })
        //     // wallet_switchEthereumChain : 체인 아이디가 맞는지 확인 | 매개변수로 전달한 체인 id 가 맞는지 확인 ⭐⭐⭐ 
        //     // ⭐⭐ 체인 아이디 = 네트워크 식별자 임. ⭐⭐ | 가나쉬에 체인 아이디를 던지면 -> 오캐이고, 안 되면, 접속할 수 있게
    
        //     // net 값이, 정상적으로 없으면(null 이면), 해당 네트워크에, 있다는 뜻! 
        //     // setNetwork(net || true);    
        //     /* [관련 문법] 논리 OR 연산자
        //         const result1 = true || false;   // result1은 true
        //         const result2 = false || true;   // result2도 true
        //         const result3 = null || "Hello"; // result3은 "Hello"
        //         const result4 = "" || 0;         // result4는 0     */
        //     // [의미] net 값이 있으면 그 값을 사용하고, 없으면 true를 사용하라
        //     // [해석] 한번 네트워크 검사하기 위한 것 ✅✅    
        // };

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