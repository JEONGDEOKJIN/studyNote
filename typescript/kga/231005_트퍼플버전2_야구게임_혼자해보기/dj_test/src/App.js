import { useEffect , useState } from "react"
import useWeb3 from "./hooks/web3.hook"

// ⭐ 컴파일 되어 build 폴더에서 src 로 뽑아온 abi 를, 리액트에서 컨트롤 할 수 있게 가져온다.  
import abi from './abi/Baseball.json'
  // [포인트] ⭐ 트러플 1과 비교했을 때, 트러플 2 에서는 abi 의 활용이 좀 더 간결하다 ⭐⭐⭐


const App = () => {

  // web3 커스텀 훅 실행 -> 1) 유저 정보(account 및 balance) 2) web3 라이브러리 가져옴
  const {user , web3} = useWeb3()

  // 티켓 가격
  const [ticket , setTicket] = useState("0")



}