import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook"; // 가져와야 함 📛📛📛📛📛📛📛📛📛📛
import abi from "./abi/Pokenmon.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);
  const [token, setToken] = useState("0");

  // 화면에 뿌려줄 배열
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (web3 != null) {
      if (contract) return;
      const pokenmon = new web3.eth.Contract(
        abi,
        "0x84c7a7807F1E67F75B041f165E01D389b0C86222", // ✅ CA
        { data: "" }
      );

      setContract(pokenmon);
    }
  }, [web3]);

  // 해당 지갑의 포켓몬 조회
  const getPokenmon = async (account) => {
    if (contract == null) return;

    // 지갑에 있는 포켓몬 가져오기
    const result = contract.methods.getPokenmon().call({
      from: account, // 이 사람이 실행한 | 다른 사람것도 뿌려주고 싶으면 account? ❓❓❓❓❓
    });
    // 누가 실행 시키는지 알아야

    console.log(" getPokenmon ", result);

    return result;
  };

  // 지갑에 있는 토큰량 조회
  const getToken = async (account) => {
    if (!contract) return;

    let result = web3.utils
      .toBigInt(await contract.methods.balanceOf(account).call())
      .toString(10);
    
    result = await web3.utils.fromWei(result, "ether");
    
      return result;
  };

  // 포켓몬 구입
  const buyPokenmon = async () => {
    // if(contract == null) return;

    try {
      console.log("🙆‍♂️🙆‍♂️🙆‍♂️ 1")
      let buyResult = await contract.methods.buyPokenmon().send({
        from : user.account,    // 그냥 account 랑 비교 
      })
      console.log("🌴🌴🌴 2")
      console.log("buyResult", buyResult);
      return buyResult

    } catch (error) {
      console.log(error)
    }
    

  };

  // 메타 마스크 계정들 조회 | account 조회 하는 함수
  const getAccounts = async () => {
    // 포켓몬 빵 산 사람들만 가져와서 뿌림
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts", // 메타마스크에 연결된 계정 조회
    });

    // 원하는 객체 모양으로 만들 것 임 | 📛📛📛📛📛📛📛📛 | 여러가지 요청을 보내니까, 모든 요청을 기다릴 것 임 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    const _accounts = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);

        // 추가로, 포켓몬들! 도! 어떤 포켓몬을 가지고 있는지, 추가할 부분!
        const pokenmon = await getPokenmon(account); // 없으면 안 뜰거야

        return { account, token, pokenmon }; // 반환되는 객체에는 1) 주소 2) 그 주소의 토큰 3) 그 주소의 포켓몬 들이 뜸
      })
    );

    setAccounts(_accounts);
  };

  useEffect(() => {
    if (!contract) return;
    getAccounts();
  }, [contract]);

  if (user.account === null) return "지갑 연결 하세요";

  return (
    <>
      <div>
        <button onClick={buyPokenmon}> 포켓몬 랜덤 뽑기 </button>
      </div>

      <div>
        토큰 보유량 : {token}
        {/* key = {index} ❓❓❓❓❓ */}
        {accounts.map((item, index) => (
          <div key={index}>
            계정 {item.account} : 토큰 값 : {item.token}
            <div style={{ display: "flex" }}>
              포켓몬들 <br />
              {item.pokenmon.map((item, index) => (
                <div key={index}>
                  {item.name} : <img width={"100px"} src={item.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
