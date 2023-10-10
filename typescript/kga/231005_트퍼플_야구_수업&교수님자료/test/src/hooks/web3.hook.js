import { useState, useEffect } from "react";


import Web3 from 'web3';
    // npm i web3 


const useWeb3 = () => {
    const [user, setUser ] = useState({
        // 최초에는 이 상태 변수에 담아놓을 것 임 
        account : "" , 
        balance : "" , 
    });

    const [web3 , setWeb3] = useState(null);

    
    useEffect( () => {        
        if(window.ethereum){
            // 메타 마스크가 설치 되어 있으면 -> 메타마스크에 요청 
            window.ethereum.request({
                // 지갑의 정보를 요청 하는 메서드
                method : "eth_requestAccounts", 
            })
            .then( async ([data] ) => {

                const web3Provider = new Web3(window.ethereum)
                console.log("web3Provider @ hooks" , web3Provider)
                
                setWeb3(web3Provider);

                setUser({
                    account : data,     // 구조 분해할당으로 가져온 것  
                    balance : web3Provider.utils.toWei( await web3Provider.eth.getBalance(data) , "ether" ),        // wei 단위로 변경
                });
                
            } )
            
        } else {
            alert("메타 마스크 설치! 하세요!")
        }

    } , [])

    // 이게 어떻게 return 이 되는거지?????????????
    return {
        user, 
        web3, 
    }

}


export default useWeb3;