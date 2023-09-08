import { Block } from "@core/block/block";
import P2P from "./p2p";

import os from "os"

import cors from "cors"
    // npm i -D @types/cors cors


// express 서버 열기 
  // npm i express
  // $ npm i -D @types/express
    import express  , {Express , Request, Response} from "express"
    // Request, Response 이런 타입들 가져옴! 


const app : Express = express();
const ws : P2P = new P2P()

app.use(cors())     // origin 에러 뜨면 
app.use(express.json())
app.use(express.urlencoded({extended : false}))  
    // 깊은 객체 사용 안 함 | body 객체를 사용함
    // $ npm i -D @types/express

    // expres 타입 설치 


app.get("/chains" , (req : Request , res : Response) => {
    res.json(ws.get())

})
    // 전체 체인을 요청하는 경우


app.post("/block/mine" , (req : Request, res : Response) => {
    // 블록에는 BODY 의 내용을 쓰게 됨 
        // 블록에 기록할 내용을 받고, data 의 배열은 '배열' 
        // 블록에 기록된건 문자열 배열
    const {data} : {data : Array<string>} = req.body;

    const newBlock : Block | null = Block.generateBlock(ws.latestBlock() , [...data],ws.getAdjustmentBlock())
        // null 이면 에러
        // 블록을 만들면 정상 가져옴 

    if(newBlock === null) res.send("error")

    ws.addToChain(newBlock)
    res.json(newBlock)      // 추가되었어~ 라고 보여줌

})


// 원래는 post 로 작성했는데, get 으로 바꿀 것 (왜냐면, 오타 이슈 , 내 v4 확인도 귀찮)
    // 찾으려면, ipconfig 해서, ipv4 가져옴. 
    app.get("/peer/add" , (req : Request , res : Response) => {


        // IPv4 네트워크 주소를 찾아서 -> v4 변수에 할당
            const networkinterface = os.networkInterfaces();
                // os.networkInterfaces(); 의 결과 '네트워크 인터페이스 정보' 를 알 수 있음. 
                    // '네트워크 인터페이스' 는 1) MAC 주소, 2) IP 주소 같이, 네트워크 연결에 필요한 요소들이 들어가 있음.  
                    // array of network interfaces which again consists of the following attributes(https://www.geeksforgeeks.org/node-js-os-networkinterfaces-method)
            console.log("🚀🚀networkinterface" ,networkinterface)
                /* 
                    🚀🚀networkinterface {
                        "로컬 영역 연결* 10" : [{
                            address : ""
                            netmask : "" 등등
                        }, {
                            address : ""
                            netmask : ""등등
                        }], 
                        "WI-FI" : [{
                            adress : ""
                            netmask : "" 등등
                        }, {
                            adress : ""
                            netmask : "" 등등
                        }]
                    }
                */

            let v4 : string;

            for (const key in networkinterface) {
                    //[for in 문법] networkinterface 객체에서, key 하나를 가져오고 -> 순회 하고 -> 그 다음, 다음 key 로 순회한다. 
                    // key = "로컬 영역 연결* 10" , "WI-FI" 등등
                    
                const Array = networkinterface[key];
                    // Array = [ {address : "" netmask : "" 등등} , {address : "" netmask : "" 등등} ] 
                
                for (const value of Array){
                    // [for of 문법] '반복가능한 객체' 중, '하나의 요소' 를 가져와서, 뭔가를 하고 -> 그 다음 요소로 넘어감.
                    
                    if(!value.internal && value.family === 'IPv4')
                        // internal 
                            // 'internal 값이 false' = 외부 네트워크와 통신 가능
                            // 'internal 값이 true' = 외부 네트워크와 통신 불가 | 내부만 가능
                        // family : 네트워크 주소 타입
                    
                    v4 = value.address;     // IPv4 네트워크의 주소를 v4 에 할당
                }}

        ws.addToPeer(`ws://${v4}:7545`)
            // ws : websocket 프로토콜로 통신할거야 
            // 주소 : v4 
            // 포트번호 : 7545  
                // 추후에 Ganache(가나싱) 사용하기 위해서, 포트 번호를 7545 로 함. 
                // Ganache 란? : 이더리움 메인넷, 테스트넷, 사용하지 않고도, 스마트 컨트랙트 개발이 가능한 '개인(로컬) 블록체인 환경'

        res.end()
    }

    )


app.get('/peer' , (req : Request , res : Response) => {
    const sockets = ws.getSockets();
    res.json(sockets);
});


// express 대기 및 포트 열어주기 
app.listen(8080 , () => {
    console.log("server on~")
    ws.listen(7545);
})
  

// $ npx ts-node ./src/core/server/index.ts  이걸로 실행 
// http://localhost:8080/chains 이걸로 치면 -> GENESIS 가 뜸 
// http://localhost:8080/peer/add -> 연결 성공 
// http://localhost:8080/peer -> 소켓이 들어옴 
