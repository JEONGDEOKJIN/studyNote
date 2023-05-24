

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
            console.log(socket.id)
                // [궁금한 점]
                    // 이 순간, 나는 socket.id 를 심은적이 없다. 그런데, socket 에 id 가 자동으로 달린건? 
                    // 아마도, socket 객체가 생성되는 순간 이겠지? 
                    // 그건, 'const socket = io.connect();' 이 순간 임.  

    })