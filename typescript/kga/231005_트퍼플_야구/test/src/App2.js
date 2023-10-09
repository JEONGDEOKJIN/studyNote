import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Baseball.json";

const App = () => {
  const { user, web3 } = useWeb3();

  const [ticket, setTicket] = useState("0");

  const [baseballContract, setBaseballContract] = useState(null);

  // 우리가 입력해서매개변수로 요청할 값 | 우리가 정한 정답
  const [value, setValue] = useState("");

  // 게임을 한 사람들이, 얼마나 이더를 쌓아놨는지
  // 정답을 맞추면, 다 그사람 것
  const [reward, setReward] = useState("0");

  // 게임의 진행도 | 게임을 몇 판 이나, 진행했는지
  const [progress, setProgress] = useState("0");

  // 어드민 전용 | 난수값. | 컨트랙트 배포자만 알 수 있음 | 어드민만 실행할 수 있음.
  const [random, setRandom] = useState("000");

  // 게임 끝났는지 여부를 표시하기 위한 것 | 솔리디티의 msg 아님 |
  const [message, setMessage] = useState("");


  const [baseballContract, setBaseballContract] = useState(null);


  useEffect(() => {

    console.log("web3 @ app2" , web3)
    console.log("user @ app2" , user)


    if (web3 !== null) {
      if (baseballContract === null) {
        const Baseball = new web3.eth.Contract(
          abi,
          "0xDE634082941D0EF00C5EF80F13e99D6434e3e32b",
          { data: ""}
        );

        setBaseballContract(Baseball);
      }
    }
  }, [web3]);

  const getTicket = async () => {
    if (baseballContract === null) return;

    const result = web3.utils.toBigInt(
      (await baseballContract.methods.getTicketPrice().call()).toString(10)
    );

    setTicket(await web3.utils.fromWei(result, "ether"));
  };

  const getReward = async () => {
    if (baseballContract === null) return;

    const result = web3.utils.toBigInt(
      await baseballContract.methods.getReward().call().toString(10)
    );
    setReward(await web3.utils.fromWei(result, "ether"));
  };

  const getPlaying = async () => {
    const playing = web3.utils.toBigInt(
      await baseballContract.methods.getPlaying().call().toString(10)
    );

    setMessage(playing);
    // playing 에는 0(게임 진행) 또는 1(게임 끝) 이 올 것
  };

  const getProgress = async () => {
    const progress = web3.utils.toBigInt(
      await baseballContract.methods.getProgress().call().toString(10)
    );
    setProgress(progress);
  };

  const getRandom = async () => {
    const random = web3.utils.toBigInt(
      await baseballContract.methods.getRandom().call().toString(10)
    );
    setRandom(random);
  };

  const gameStart = async () => {
    if (value.length < 3) {
      alert("숫자 3자리 입력해라");
      return;
    }

    await baseballContract.methods.gameStart(Number(value)).send({
      from: user.account,

      // 이더리움을 보낼 때, from 에 지갑의 주소, 보낼 양을 Wei 에 담아서 보냄
      value: web3.utils.toWei("5", "ether"), // 5 이더를 웨이 단위로 변경
    });

    render();
  };

  const render = () => {
    getTicket();
    getReward();
    getPlaying();
    getProgress();
  };

  useEffect(() => {
    if (baseballContract !== null) {
      getTicket();
    }
  }, [baseballContract]);

  if (user.account === null) return "지갑 연결 하세요";
  return (
    <>
      <div> account : {user.account} </div>
      <div> 티켓 가격 : {ticket} </div>
      <div> 현재 게임 진행도 : {progress} </div>
      <div> 총 상금 : {reward} </div>
      <div> 진행중? : {message == 0 ? "게임중" : "게임종료"} </div>

      <input
        onChange={(e) => {
          setValue(e.target.vale);
        }}
      />

      <div> 정답 : {random} </div>

      <button onClick={gameStart}> 게임시작 </button>
      <button onClick={getRandom}> 어드민 </button>
    </>
  );
};

export default App;
