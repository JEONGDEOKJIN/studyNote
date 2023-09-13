

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


// 현재 전체 chain 반환을 요청
    app.get("/chains" , (req : Request , res : Response) => {
        res.json(ws.get())
    })
        /* [해석] ws 는 P2P 클래스의 인스턴스 
            P2P 클래스는 Chain 클래스를 상속받음. 
            Chain 클래스의 get 메소드는 this.chain 을 return 함 
            따라서, ws 객체 안에는 현재 chain 정보를 가져올 수 있는 get 메소드가 있음.
            따라서, 해당 결과물을 반환함. 
        */


app.post("/block/mine" , (req : Request, res : Response) => {
    // 블록에는 BODY 의 내용을 쓰게 됨 
        // 블록에 기록할 내용을 받고, data 의 배열은 '배열' 
        // 블록에 기록된건 문자열 배열

    // req.body 에서 구조분해할당으로 data 속성 뽑아오기 
    const {data} : {data : Array<string>} = req.body;
        /* [해석]
            1) req.body 에서 data 속성을 가져와서 객체 구조 분해 할당을 함 
            2) 해당 값에 Array<string> 타입 지정을 함
        */

    // 받아온 data 로 새로운 block 만들기
    const newBlock : Block | null = Block.generateBlock(ws.latestBlock() , [...data],ws.getAdjustmentBlock())
        // null 이면 에러
        // 블록을 만들면 정상 가져옴 

    if(newBlock === null) res.send("error")

    ws.addToChain(newBlock)     // newBlock을 chain 에 추가

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

        // 해당 주소에 '연결'
        ws.addToPeer(`ws://${v4}:7545`)
            // ws : websocket 프로토콜로 통신할거야 
            // 주소(address) : v4 
            // 포트번호(port) : 7545  
                // 추후에 Ganache(가나싱) 사용하기 위해서, 포트 번호를 7545 로 함. 
                // Ganache 란? : 이더리움 메인넷, 테스트넷, 사용하지 않고도, 스마트 컨트랙트 개발이 가능한 '개인(로컬) 블록체인 환경'
            
            // 그런데, 이걸, peer 라는 변수에 담네? 
                // 그러면, peer 가 의미하는 건, 이러한 url 과 이러한 port 로, peer 로써 들어가겠다. 

        res.end()
    }

    )

// 현재 socket 에 참여중인 사람들
    app.get('/peer' , (req : Request , res : Response) => {
        const sockets = ws.getSockets();
            // [해석] '웹소켓 서버' 에 연결된 '소켓들' 의 '목록' 가져오기 

            console.log("웹소켓 연결" , sockets)    
                // 웹소켓 연결 [ '::ffff:192.168.0.92 : 53360', '192.168.0.92 : 7545' ]
                // 여기에 나오는 데이터는 socket._socket.remoteAddress와 socket._socket.remotePort 정보를 문자열 형태로 저장한게, sockets 로 나옴
                // remoteAddress와 remotePort 가 담기는 곳 = @p2p.ts 65line 
                // 아마도, socket.send 할 때, 보내지는게 아닐까, 추정.

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
