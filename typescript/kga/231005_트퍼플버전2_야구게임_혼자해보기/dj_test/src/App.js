import { useEffect , useState } from "react"
import useWeb3 from "./hooks/web3.hook"

// ⭐ 컴파일 되어 build 폴더에서 src 로 뽑아온 abi 를, 리액트에서 컨트롤 할 수 있게 가져온다.  
import abi from './abi/Baseball.json'
  // [포인트] ⭐ 트러플 1과 비교했을 때, 트러플 2 에서는 abi 의 활용이 좀 더 간결하다 ⭐⭐⭐


const App = () => {

  // web3 커스텀 훅 실행 -> 1) 유저 정보(account 및 balance) 2) web3 라이브러리 가져옴
  const {user , web3} = useWeb3();

  // 티켓 가격
  const [ticket , setTicket] = useState("0")

  // 우리가 정한 정답 | 우리가 입력해서 매개변수로 요청할 값 
  const [value , setValue] = useState("")

  // 게임을 한 사람들이 쌓아놓은 ether
  const [reward, setReward] = useState("0")
    // 정답을 맞추면, 그 사람 것. 

  // 게임을 몇 판이나 진행했는지 
  const [progress, setProgress] = useState("0")

  // 어드민 전용 | 난수값. | 컨트랙트 배포자만 알 수 있음 | 어드민만 실행할 수 있음.
  const [random, setRandom] = useState("000")

  // 게임 끝났는지 여부를 표시하기 위한 것 | 솔리디티의 msg 아님 |
  const [message, setMessage] = useState("");

  // 이더리움 네트워크에 배포된 Baseball.sol 을 가져와서 담기 ⭐⭐⭐⭐⭐
  const [baseballContract , setBaseballContract] = useState(null);
    // [해석] Ethereum 네트워크에 배포된 Baseball.sol 스마트 컨트랙트의 인터페이스를 저장하기 위한 변수


  useEffect( () => {
    
    console.log("web3.hook 에서, web3 라이브러리 로딩 여부 @App.js" , web3)
    console.log("web3.hook 에서, user 객체 로딩 여부 @App.js" , user)

    // baseballContract 가져오기 | 비어있을 때 만 | ✅ async - await 처리 해주기 
    if(web3 !== null) {
        if(baseballContract === null) {
          const Baseball = new web3.eth.Contract(
            abi, 
            "0x3698198714aDEF79fbaEf05D37b0eBb5E2D79219" ,  // ✅ CA 변경
            {data: "", from: ""} ,    // { data: "", from: "" } : 1) default 값을 넣을 수 있음 2)  {data : ""} 이렇게 디폴트를 넣어줘야 안 터짐
          );
            // [해석] 'baseball sol 파일 -> 이더리움 배포 -> abi 와 ca 주소를 넣고, 배포된 baseball 컨트랙트 가져오기 -> 그러면, 상태변수 값 조회 및 수정 가능'
          
          console.log("Baseball" , Baseball)
          
          // 받아온 baseball 컨트랙트를 상태변수에 넣기
          setBaseballContract(Baseball);
        }
    }
  } , [])

    // 컨트랙트에 있는 ticketPrice 값을 가져와서 👉 ticket 변수에 담기 | ⭐⭐⭐ 이제, 이런 패턴이 반복된다. ⭐⭐⭐ 
    const getTicket = async () => {
      // 컨트랙트 있는지 확인
      if(baseballContract === null) return;

      // 컨트랙트에서, 'sol 파일의 getTicketPrice' 의 값을 받아와서 -> 10진수, 문자열로 변환 | wei 단위
      const result = web3.utils.toBigInt( await baseballContract.methods.getTicketPrice().call() ).toString(10);
        /* baseballContract.methods.getTicketPrice().call() 👉 wei 값이 들어옴. 굉장히 큰 수 임. 👉 so, BigInt 라는, 마우 큰 데이터 타입이 필요
            toString(10) : BigInt 숫자형을, 문자열 10진수로 반환
        */
      
      // wei 단위에서, ether 로 변환 해서 👉 ticket 변수에 저장
      setTicket( await web3.utils.fromWei(result , "ether") )
    }

    // 컨트랙트에 있는 getReward 가져와서 👉 reward 에 담기 | 
    const getReward = async () => {
      // 컨트랙트 있는지 확인
      if(baseballContract === null) return;

      // baseballContract 에서, getReward 값 가져와서, 문자열 10진수로 변환 | wei 단위
      const result = web3.utils.toBigInt(await baseballContract.methods.getReward().call()).toString(10);
      
      // '이더' 단위로 변환 👉 reward 변수에 저장
      setReward( await web3.utils.fromWei(result , "ether") )
    }
    
    // 컨트랙트에 있는 getPlaying 가져와서 👉 message 에 담기 | 게임 끝났는지 여부 표시 | ✅ 변수 의미가 명확하지 않음
    const getPlaying = async () => {
      // 컨트랙트 있는지 확인
      if(baseballContract === null) return;

      // baseballContract 에서, getReward 값 가져와서, 문자열 10진수로 변환 | wei 단위
      const playing = web3.utils.toBigInt(await baseballContract.methods.getPlaying().call()).toString(10);
      
      // Message 변수에 저장
      setMessage(playing)
    }
    
    // 컨트랙트에 있는 getProgress 가져와서 👉 progress 에 담기 | '게임 몇 판 했냐' 를 의미  | 
    const getProgress = async () => {

      // 컨트랙트 있는지 확인
      if(baseballContract === null) return;

      // baseballContract 에서, getProgress 값 가져와서, 문자열 10진수로 변환 | wei 단위
      const progress = web3.utils.toBigInt(await baseballContract.methods.getProgress().call()).toString(10);
      
      // progress 변수에 저장
      setProgress(progress)
    }
    
    // 컨트랙트에 있는 getRandom 가져와서 👉 random 에 담기 | '정답이 될 랜덤값'을 의미  | ✅ 변수 의미가 명확하지 않음
    const getRandom = async () => {

      // 컨트랙트 있는지 확인
      if(baseballContract === null) return;

      // baseballContract 에서, getProgress 값 가져와서, 문자열 10진수로 변환 | wei 단위
      const _random = web3.utils.toBigInt(await baseballContract.methods.getRandom().call()).toString(10);
      console.log(" _random " , _random)
      // random 변수에 저장
      setRandom(_random)
    }

    // 
    const gameStart = async () => {

      // 게임 조건 맞는지 확인하기 : 3자리 이상 입력 여부
        if(value.length < 3){
          alert("숫자 3자리를 입력해라!");
          return;
        }
      

      console.log("baseballContract" , baseballContract , )
      
      if(baseballContract !== null) {
        // 사용자가 고른 숫자(value) 를 솔리디티에 넘기고, 트랜잭션 객체를 반환 받음 
        await baseballContract.methods.gameStart(Number(value)).send({
          from : user.account,
          value : web3.utils.toWei("5" , "ether")
        })
        /* [해석] 
          - 메서드 체이닝 문법이 사용됨
            - 메서드 체이닝의 경우, 객체 자신을 반환하고 -> 그 다음 메서드로 넘어가는 게 일반적임
          - gameStart 솔리디티 파일에는 returns 가 없음 -> 그러면, 뭐가 다음 메서드로 넘어가는거지? 
          - gameStart 자체는 아무것도 반환하지 않음. 다만, 'gameStart 이후 send 메서드' 를 사용하면, 반환되는 것은 '⭐⭐트랜잭션 객체⭐⭐ 또는 영수증' 임 
          - so, 'baseballContract.methods.gameStart(Number(value)).send()' 구문은 함수의 반환값을 기대하는 것이 아닌, ⭐트랜잭션 성공 여부⭐ 를 반환함 
        */
        
        render()

      }

    }

    // 화면을 그리는 렌더함수 모아주기  
    const render = () => {
      getTicket();
      getReward();
      getPlaying();
      getProgress();
    }


    // 렌더함수 그려주기
    useEffect( () => {
      if(baseballContract !== null) {
        render();
      }
    } ,[baseballContract])


    // 지갑 연결
    if(user.account === null) return "지갑 연결 하세요"

  return (
    <>
      <div> 유저의 계좌 account : {user? user.account : "User 정보 로딩중"} </div>
      <div> 티겟 가격 : {ticket && ticket} </div>
      <div> 현재 게임 진행도 : {progress && progress} </div>
      <div> 총 상금 : {reward && reward} </div>
      
      {/* playing 변수에 저장했는데, 의미가 조금 불명확 하다고 느껴짐*/}
      <div> 진행중? : {message == 0 ? "게임중" : "게임종료"} </div>   

      {/* 사용자가 입력한 값을 value 변수에 넣기 */}
      <input
        onChange={ (e) => {
          setValue(e.target.value)
        } }
      ></input>

      {/* 컴퓨터가 랜덤으로 뽑은 값 = 정답 */}
      <div> 정답 : {random} </div>

      <button onClick={gameStart} > 게임 시작 </button>
      <button onClick={getRandom} > 어드민 | 랜덤함수 구하기  </button>

    </>
  )

}




export default App;