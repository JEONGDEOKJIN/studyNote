

// npm 셋팅 

// 사용할 모듈 
    // express ejs socket.io 


// 전역변수 
    const express = require("express");
    const path = require("path");
    const socketIo = require("socket.io");

    const app = express();

// view 엔진 
    // 경로 
        app.set("views" , path.join(__dirname , "page"));
    // ejs 로 설정 
        app.set("view engine" , "ejs");


// 미들웨어 
    // 라우팅 
        app.use('/' , (req, res) => {
            res.render("main")
        } )




// 서버 대기 
    const server = app.listen(8005 , () => {
        console.log("8005, 에서 서버 열림👍")
    })

// '웹 소켓 서버' 만들기 
    const io = socketIo(server);


// '웹소켓 서버' 에 '이벤트 등록' 하기 
    io.sockets.on("connection" , (socket) => {
        // [해석]
            // io.sockets | 서버(io) 에 연결된 '모든 소켓' 을 관리할 수 있음. 
            // on | 클라이언트에서 어떤 이벤트를 보내는지 듣고 있을거야 
            // "connection" | 클라이언트 소켓에서 연결 완료 이벤트가 발생하면, '이것 이것을 하겠다.' 가 된다. 
            // (socket) | 서버에게 이벤트를 보낸 'socket 객체' 를 의미함 
                    // | 이 'socket 객체' 를 통해 1) data 를 받을 수도 있고 2) 해당 socket 에게 data 를 줄 수도 있다.
                    // | 살짝, req, res 의 느낌❓❓❓ 
        
        // 첫 접속 콘솔
            console.log("유저 첫 접속 🎏🎏")

        // 접속한 유저가 누구인지 보기 
            console.log('socket.id' , socket.id)
                // [궁금한 점]
                    // 이 순간, 나는 socket.id 를 심은적이 없다. 그런데, socket 에 id 가 자동으로 달린건? 
                    // 아, 이건 socket 을 생성하면 자체적으로 생기는 id 임 ⭐⭐⭐⭐⭐ 
                    // 그 socket 에게 달려있는 id 임. 
                    // 아마도, socket 객체가 생성되는 순간 이겠지? 
                    // 그건, 'const socket = io.connect();' 이 순간 임.  


        // hi 이벤트가 발생했을 경우 
            socket.on("hi" , (data) => {
                // 1) 클라에서 온 것 확인
                    console.log("✅ 클라에서 이렇게 왔어 : ", data);
                
                // 2) '해당 데이터를 나를 제외한 모든 사람' 에게 '이벤트 푸쉬' (보여주기) 
                    // socket.broadcast.emit("hi" , data);
                        // [해석]
                            // 지금 상황에서, socket 기능을 하게 하는 메소드는 모두 socket 이라는 데에서 나온다. 
                            // 왜냐면, socket 이 라이브러리를 통해, 많은 기능을 갖게 되었기 때문에. ex) sequelize 같은 느낌. 
                        // [해석]
                            // io.socket 이 아니라, socket 객체를 쓰는 이유 
                                // socket 객체는 '현재 연결된 클라이언트 소켓' 을 가리킴 
                                // '지금 연결된 나' 를 제외하고, 모든 사람에게 보내라고 말하고 싶어서, socket 객체를 맨 앞에 쓴 듯

                // 3) '해당 데이터를 내가 지정한 사람' 에게 '이벤트 푸쉬' 
                    io.sockets.to(data.id).emit("hi" , data);
                        // [해석]
                            // 수업 필기 에서는 io.socket 이라고 적었는데, 오타일 가능성이 있겠네 
                        // [해석]
                            // socket 객체만 쓴게 아니라, io.sockets 이라고 쓴 이유? 
                                // '모든 소켓 중 내가 특정한 것' 에만 보내 라고 말하고 싶어 했음 
                                // 그래서 모든 소켓을 의미하는 io.socket 을 객체로 씀 
                            
            })
    })