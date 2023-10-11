import { useEffect, useState } from "react";
import Web3 from "web3";
const useWeb3 = () => {
const [user, setUser] = useState({
    account: "",
    balance: "",
});
const [web3, setWeb3] = useState(null);

useEffect(() => {
    if (window.ethereum) {
    //login logic
    window.ethereum
        .request({
        method: "eth_requestAccounts",
        })
        .then(async ([data]) => {
        const web3Provider = new Web3(window.ethereum);
        setUser({
            ...user,
            account: data,
            balance: web3Provider.utils.toWei(
            await web3Provider.eth.getBalance(data),
            "ether"
            ),
        });
        setWeb3(web3Provider);
        })
        .catch(console.log);
    } else {
    alert("Metamask 확장프로그램을 설치해주세요.");
    }
}, []);

return {
    user,
    web3,
};
};

export default useWeb3;
