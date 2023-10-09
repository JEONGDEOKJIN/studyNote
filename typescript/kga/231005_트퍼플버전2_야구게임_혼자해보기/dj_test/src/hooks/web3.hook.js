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
        const fetchAccounts = async() => {

            console.log("window.ethereum" , window.ethereum)

            if(window.ethereum){
                try {
                    // 메타마스크 있으면 -> 메타마스크에 요청한다.
                    const [data] = await window.ethereum.request({
                        // 지갑 정보를 요청하는 메소드
                        method : "eth_requestAccounts", 
                        })

                    // web3 라이브러리 인스턴스 생성
                    let web3Provider = new Web3(window.ethereum)
                    console.log("web3Provider" , web3Provider)

                    let balance = web3Provider.utils.fromWei(await web3Provider.eth.getBalance(data) , "ether");


                    // 유저의 계정 및 잔액 설정 
                    setUser({
                        account : data, 
                        balance : balance
                    
                    })

                    // set 메소드에 넣기
                    setWeb3(web3Provider)
                    
                } catch (error) {
                    console.log(" useWeb3 에러 ",error)
                }
            } else {
                alert ("메타 마스크 설치 하셈")
            }
        }

        fetchAccounts();
    } , [])

    return {
        user, 
        web3
    }
}

export default useWeb3;
