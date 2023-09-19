import { Block } from "@core/block/block";

import Chain from "@core/chain/chain";

// 웹소켓 관련된 것 
import {WebSocket , WebSocketServer} from "ws"
    // npm i ws
    // npm i -D @types/ws
    // 연결에 대한 기초적인 것만 지원 
    // socket.io는 join, room 같은 것도 지원했으니, ws 는 기본 연결만 지원

// 웹소켓을 보내면 메시지를 받는데 이걸 정의 
    enum MesssageType{

        // 마지막 블록을 요청할 때
        lastestBlock = 0,   
            // string 문자로 해도 되는데, 오타가 발생할 수 있어서 number 로 오류가 최대한 없게

        // 전체 체인을 요청할 때
        allBlock = 1, 

        // 블록이 추가 되어서, 알려줄 때 
        addBlock = 2
    }


    // 값을 어떤 상태로 지정할 때 enum 을 사용
        // ex) run 상태, run 상태, work 상태, 작업하거나, 달리거나 하는 '상태' 를 '변수' 로 사용 
        // '변수' 로 알기 쉽게! 
        // '알기 쉽게' 쓰는 이유는 ? 
            // 만약, '숫자' 로 상태를 지정하면, -> 알아보기 힘듦 ex) switch 문에서 case 를 0 으로 한다면 어려움
            // 이렇게 eunm 처리해주면, ->  변수를 좀 더 보기 편함
            /*
                switch (key) {
                    case lastestBlock:
                        
                        break;
                
                    default:
                        break;
                }
            */


    interface IMessage {
        // 메시지의 타입
        type : MesssageType;

        // 메시지에 대한 값, 데이터 를 받는 payload 
        payload : any;  // 뭐든 받을 수 있음. 
            // 여기에 this.get() 으로 chain 이 들어가야 함 
    }


    class P2P extends Chain { 

        // Chain 을 상속받아서 -> Chain 에 있는 메서드를 사용 하려고
        private sockets : Array<any>
        // 배열인데, 어떤 요소가 들어있는 배열? 
            // 연결된 socket 들 확인

        constructor(){
            super() // Chain 부모의 생성자 함수를 실행 
            this.sockets = [];  // 이건, 웹소켓 서버에 연결된 소켓 리스트를 확인할 때, 해당 소켓들의 address 및 port 를 담게 됨. 
        }

        getSockets() : Array<WebSocket> {
            return this.sockets;
        }

        connectSocket(socket : any , type? : MesssageType) : void { 
            
            // 소켓을 연결하고, 연결 address, 연결 port 를 저장하기
                // console.log("socket._socket.remotePort🐣🐣" , socket._socket.remotePort )
                // console.log("socket._socket.remoteAddress🌴🌴" , socket._socket.remoteAddress )
                this.sockets.push(
                    `${socket._socket.remoteAddress} : ${socket._socket.remotePort}`
                    );
                    // 이렇게 sockets 로 들어가게 됨 👉 [ '192.168.0.6' :  '7545'] 

            // socket.send() 실행 해야만 -> message 이벤트가 발생   
                // 현재, 코드에서는, 'peer접속' 클릭 이후의 로직에서 socket.send() 이 없으므로 -> message 이벤트 발생 안 함 -> 🔵 수정완료
            socket.on("message" , (_data : string) => {

                // 받은 데이터를 문자열로 변환하고 -> 객체로 변환
                    // console.log("toString 했을 때" , _data.toString())
                    // console.log("JSON.parse까지 했을 때" , JSON.parse(_data.toString()))

                const data = JSON.parse(_data.toString())   
                
                    console.log("type : 1) all 전체를 가져오거나 2) add 하거나 3) latest 최근거 | 지금 Chain 클래스에서 만든 chain 값이 있음. 📌",data )
                    // 이 객체에는 '데이터의 타입 & payload' 을 실어서 보냄
                            // 데이터 타입에는 'lastest, add 위에서 지정한게 들어있음) 


                switch (data.type) {
                    case MesssageType.lastestBlock:
                        // 0 이 들어오면 여기 
                        const message : IMessage = {
                            // type 
                            type : MesssageType.lastestBlock, // 모든 블록 타입이 실행되는지 확인
                            payload : [this.latestBlock()]      // this 를 붙일 수 있는 이유는 Chain 을 상속 받았기 때문에.
                                // 그러면, 마지막 블록이 호출되면, 불려지게 된다. 
                                // 마지막 블록은 payload 에 담아서 ⭐⭐⭐ 
                        }
                        
                        // 완성한 객체를 문자열로 치환해서 보낸다. 
                        socket.send(JSON.stringify(message))
                            // 그러면, 연결된 소켓이 보여줄 것
                        
                        break;

                    case MesssageType.allBlock: // 전체 블록을 보여줌
                        // 1 이 들어오면 여기 
                        break;

                    case MesssageType.addBlock: // 블록을 추가 했을 때
                        // 2 이 들어오면 여기

                        // 검증 로직은 여기에 들어갈 것 
                            // longest 여부 로직을 여기에 추가 ✅✅✅✅✅✅

                        // 검증 로직은 여기에 | 교체하는 로직은 여기에 
                        const isValid = this.replaceChain(data.payload)
                        // 전달받은 체인으로 교체
                        // 체크가 되면, 반환값으로 나오게 될 것.
                        
                        if(isValid.isError) break;
                        // 문제 있으면 종료

                        const message2 : IMessage = {
                            type : MesssageType.addBlock, 
                            payload : data.payload
                        }

                        // 브로드캐스트 하기! | 소켓이 추가되었으니까 알려주기!
                        this.sockets.forEach( (item) => {
                            // 현재 접속한 유저에게 메시지 전송! 
                            item.send(JSON.stringify(message2))
                        } )
                        
                        break;
                
                    default:
                        break;
                }
            })

            // socket 의 send 메소드가 실행되면 -> message 이벤트가 실행된다. 
            // message 로 전달받은, payload 값 데이터 
            const messageDJ:IMessage={
                type : MesssageType.addBlock,
                payload : this.get()
            }
            
            socket.send(JSON.stringify(messageDJ))   
                // 블록보내기



        }
        // 매개변수 socket : 연결 시도한 사람의 SOCKET 을 받기 
        // TYPE : 처음에 있건, 없건, 상관없음.
    
        // 웹소켓 연결하면 -> 하나의 포트가 동적으로 생기고, 그 포트에서 소켓을 들고 있는데 
        // 어플리케이션 연결하면, 충돌방지하려고, '고유 포트 생성' 해줌. -> 따라서, '고유 포트' 가 들어있는 상태
            // 즉, socket 에는 고유 포트가 들어있는 상태. 충돌 방지를 위해, 애플리케이션 or 서비스 연결을 하면 동적으로 포트를 지정


        // 소켓 연결 시도 했을 때, 접속 했을 때의 함수 
            // void 반환값 없는 함수! 
        listen(port : number) : void {
            // 현재 로컬에서 서버 생성! 
            // 웹소켓 포트 오픈 대기 상태
            const server : WebSocketServer = new WebSocket.Server({port})   // 이 포트로 듣고 있게 

            server.on("connection" , (socket : WebSocket) => {
                // 소켓 연결 시도 하면 
                console.log("new socket connection") 

                // 현재 연결한 소켓을 배열에도 추가해주고, 메시지 이벤트도 등록! 
                this.connectSocket(socket)
            })

        }
        
        addToPeer(peer : string) : void {

            // 상대방이 내 ip 에 접속 했을 때, socket 을 생성하고, 연결한다. 
            const socket : WebSocket = new WebSocket(peer);
            // 매개변수로 들어온 peer 주소로, 연결을 시도한다.

            socket.on("open" , () => {
                // 정상 입장하면, 웹소켓 프로토콜에 의거해서, 웹소켓 관리 객체가, "open 이벤트"를 발생시켜 보내게 되어 있음.
                    // 그래서, 만약, "open 이벤트를 수신하게 되면~" 이라고 해석하면 됨

                // 연결이 성공하면, open 이벤트, 가 실행된다. 
                console.log("연결성공");

                // 연결 성공하면, 메시지로 addblock 타이틀도 준다.
                this.connectSocket(socket , MesssageType.addBlock); 
                    // enum 타입 설정으로 'MesssageType.addBlock' 은 2 를 의미. 블록을 추가했다는 신호를 보냄. 
                    // 궁금한 것
                        // 왜 '블록을 추가 했다.' 라는 메시지를 보내지❓❓❓ 
                        // 'peer 등록' 이라는 말은, socket 통신하는 사람들에 나를 등록한다는 것 임. 
                        // 거기에 이에 내가 방금 만든 block 을 추가해 보겠다는 의미? 이려나? 

            })
        }

    }

export default P2P;
    // IP 주소 연결해서, DATA 를 받을 것 임. 