import { useEffect, useState } from "react";
import Web3 from "web3"
    // npm i web3 되어 있어야 함 

const useWeb3 = () => {

    // 유저 정보(계정 및 잔액) 상태관리
    const [user, setUser] = useState({
        account : "",
        balance : "",
    });

    // web3 라이브러리 상태관리
    const [web3, setWeb3] = useState(null);

    useEffect( () => {
        if(window.ethereum){
            // 메타마스크 있으면 -> 메타마스크에 요청한다.
            window.ethereum
                .request({
                // 지갑 정보를 요청하는 메소드
                method : "eth_requestAccounts"
                })
                .then( async ([walletAddress]) => {
                    // web3 라이브러리 인스턴스 생성
                    const web3Provider = new Web3(window.ethereum)
                    
                    // set 메소드에 넣기
                    setWeb3(web3Provider)
                    
                    // 유저의 계정 및 잔액 설정 
                    setUser({
                        account : walletAddress, 
                        balance : web3Provider.utils.toWei(await web3Provider.eth.getBalance(walletAddress) , "ether")
                    })
                } )
        } else {
            alert ("메타 마스크 설치 하셈")
        }
    } , [])

    return {
        user, 
        web3
    }
}

export default useWeb3;
