
import {useState, useEffect} from "react";

import Web3 from "web3"; 
// npm i web3 



// custom hook 작성시, custom hook 앞에는 user 를 붙여야 함 
const useWeb3 = () => {

    // 지금 접속된 지갑 정보랑, web3 연결된 거! 를 갖고 있을 거야 
    // 현재 접속한 메타마스크 지갑 정보를 담을 변수
    const [user , setUser] = useState({
        account :"",
        balance : "",
    });
        // 유저가 접속이 되면! 여기에 저장 

    // 네트워크와 연결한 WEB3 인스턴스를 담을 변수 
    const [web3 , setWeb3] = useState(null)

    useEffect( () => {
        // 메타 마스크가 설치되어 있는지 확인! 
        // ethereum 객체가 있는지 확인 
        // window.ethereum : 네트워크 정보, 지갑 정보들 다 들어가 있음. 
        if(window.ethereum){

            // 로그인 
            window.ethereum.request({
                method : "eth_requestAccounts" , 

                // 요청하고 응답 받으면, 반환받은 배열의 값의 첫 번째 값이 필요 ⭐⭐⭐ 
                // 배열 구조 분해 할당 : data
            }).then( async ([data]) => {
                // web3 인스턴스 생성 
                    // web3 로 응답 받고, 할 수 있는 객체를 만든 것 임 
                const web3Provider = new Web3(window.ethereum)

                setWeb3(web3Provider);
                setUser({
                    account : data, 
                    // ether 단위로 변경하는데 
                        // web3Provider 로 요청을 보내고 
                        // 매개변수로 await web3Provider.eth.getBalance(data) : 현재 지갑의 잔액을 조회해서 

                        // 조회한 단위는 wei 단위 
                        // ether 단위로 변경을 하자! 
                    balance : web3Provider.utils.towWei(await web3Provider.eth.getBalance(data), "ether" )       // 계정 정보
                    // 결국, 해당 주소에 있는 wei 단위를 이더로 변경
                });
            } )
            // then, 에서 요청 처리된 걸 매개변수로 받는다 
            // 받은 배열에서 구조분해 할당 = 받은 배열에서, 첫 번째 값 ⭐⭐ 

        } else {
            alert("메타 마스크 설치하셈");
        }
    } , [])
        // window.ethereum : 이건, 메타마스크 설치하면, 들어온다 ⭐⭐⭐ 

    return {
        user, 
        web3
    }
        // 여기에 return 이 있는 이유는 custom hook 에서는 반환값이 있다 ⭐⭐⭐⭐⭐⭐⭐⭐ 

}


export default useWeb3;