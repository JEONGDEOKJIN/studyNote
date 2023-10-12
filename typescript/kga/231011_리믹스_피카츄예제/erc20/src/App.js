import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook"; // 가져와야 함 📛📛📛📛📛📛📛📛📛📛
import abi from "./abi/Pokenmon.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);
  const [token, setToken] = useState("0");
  const [pokenmonUsers, setPokenmonUsers] = useState([]);

  // 화면에 뿌려줄 배열
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (web3 != null) {
      if (contract) return;
      const pokenmon = new web3.eth.Contract(
        abi,
        "0x61137e432b92ad18bb61407e25C0DbD09D004b16", // ✅ CA
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

    // console.log(" getPokenmon ", result);

    return result;
  };

  // 지갑에 있는 토큰량 조회
  const getToken = async (account) => {
    if (!contract) return;

    let result = web3.utils
      .toBigInt(await contract.methods.balanceOf(account).call()) // 이건 토큰 가져오는 거 wei 단위로 넘어
      .toString(10);

    result = await web3.utils.fromWei(result, "ether");

    return result;
  };

  // 포켓몬 구입
  const buyPokenmon = async () => {
    // if(contract == null) return;

    try {
      let buyResult = await contract.methods.buyPokenmon().send({
        from: user.account,
        // ✅ 'account'를 onclick 에서 buyPokenmon(account)넣으려 했는데, 안 됨.
        // 이 방법을 쓰려면, return 에서 account 를 어떻게든, 넣었어야 함. 이 방법은 나중에 좀 더 생각
      });
      console.log("buyResult", buyResult);

      getAccounts(); // ⭐⭐⭐ 바로 업데이트 될 수 있으려면, 여기를 잡아야 해

      return buyResult;
    } catch (error) {
      console.log(error);
    }
  };

  // // 이더로 포켓몬 구입
  // const buyEth = async ()=>{
  //   const amount = web3.utils.getBalance()

  //   await contract.methods.buyEth(amount)
  // }

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

    console.log(" _accounts ", _accounts);
    setAccounts(_accounts);

    transferPokemon(_accounts);
  };

  // 현재 포켓몬 산 유저들 가져오기
  const getPokenmonUsers = async () => {
    // 포켓몬 구매한 모든 유저들 가져오기
    const result = await contract.methods.getPokenmonUsers().call();

    setPokenmonUsers(result);
    // console.log("getPokenmonUsers" , result)

    return result;
  };

  // 계정 넣으면, 그림 그리기
  const getPokenmonImg = async (userAccount) => {
    {
      accounts.map((item) =>
        item.account == userAccount ? (
          <img width={"100px"} src={item.pokenmon[0].url} />
        ) : (
          console.log("그림 없음")
        )
      );
    }
  };

  const transferPokemon = async (accounts, fromAccount, toAccount) => {
    // 0. 어떤 포켓몬인데?


    // accounts[1] 의 첫 번째 포켓몬(인덱스 1)를 제거하려면:
    console.log(accounts[1])
    const deletedPokenmon = accounts[1].pokenmon.filter((_, index) => index !== 0);
    const pokenmonToUpdate = accounts[1].pokenmon.filter((_, index) => index === 0);


      accounts[1] = {
        ...accounts[1],
        pokenmon: deletedPokenmon
      };

      console.log(accounts[1])
      console.log("pokenmonToUpdate" , pokenmonToUpdate)


    // 2. 받은 계정으로, 해당 포켓몬 넣어주기



    
  };

  useEffect(() => {
    if (!contract) return;

    getAccounts();

    getPokenmonUsers(); // 포켓몬 유저 가져오기
    console.log("pokenmonUsers👏👏", pokenmonUsers);
  }, [contract]);

  if (user.account === null) return "지갑 연결 하세요";

  return (
    <>
      <div>
        <button onClick={buyPokenmon}> 포켓몬 랜덤 뽑기 </button>
      </div>

      <div>
        {" "}
        현재 로그인 계정 토큰 보유량 : {token}
        {accounts.map((item, index) => (
          <div key={index}>
            계정 {item.account} : PTK 토큰 값 : {item.token}
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

      <br />
      <br />

      {/* 포켓몬 구매한 유저들 */}
      <div>
        <h3> 포켓몬 구매 유저들 </h3>
        {pokenmonUsers.map((item, index) => (
          <div>
            {index + 1} 번째 유저: {item.account} <br />
            {/* 이 포켓몬 유저가 갖고 있는 사진까지 같이 보여주기 */}
          </div>
        ))}
      </div>

      {/* 포켓몬 전송해주기  */}
    </>
  );
};

export default App;
