// 🔷 웹 소켓 

    // 웹 소켓 사용 이유 
        // 양방향 통신을 위해

        // 이전 : 단방향으로 요청, 응답을 받는 구조 
        // now : 서버에서, data 를 push 하는 경우 | 클라이언트가 아니라, 서버에서 넣는 

    // 웹 소켓 장점 
        // 헤더의 값이 같이 넘어가는데, 
        // 한번 연결할 때 헤더값을 전송하기 때문에, 
        // 많은 데이터가 전송되지 않는다. 
        // 즉, 한번 연결할 때, 헤더값 전송하고, 그 이후에는 하지 않음 ⭐⭐⭐ 

        // so, '실시간' 채팅을 구현하거나, 실시간으로 해야하는 작업이 있을 경우 사용 
            // ex) 가상화폐 거래소 경우, 데이터 전송이 자주 일어남 -> 웹 소켓을 사용해서 구현하는게 좋음. 
            // 데이터 전송이 자주일어 날 때, 오버헤드가 일어나지 않을 수 있어 
            // 업비트 api 사용할 때도, 소켓 쓰니까 해결됐음. 

        // 결론 
            // 효율적인 데이터 통신 가능 

    // 실익
        // 페이지에서 댓글을 달았다고 가정했을 때, 페이지를 '새로고침해야, 글이 다시 보이는 현상' ⭐⭐⭐⭐⭐ 
        // 이 현상을 웹소켓을 사용하면, 실시간으로 글이 보이게 처리할 수 있다. 
        // 클라도 서버에 data push 할 수 있고, 서버도 클라한테 data 뭔가를 할 수 있고 


// 사용 라이브러리 
    // express ejs socket.io

const express = require("express");
const path = require("path");

const socketIo = require("socket.io");

const app = express();




// view 엔진 
    // 경로
    app.set("views" , path.join(__dirname , "page"));

    // ejs 
    app.set("view engine" , "ejs");



// 미들웨어 

    // 라우팅
        app.get('/' , (req, res) => {
            res.render("main")
        })

// 서버대기
    const server = app.listen(8010, () => {
        console.log("8010 에서 서버 열림🎏")
    })

// 🔷 유저가 접속하고, 또 다른 유저 한명 더 접속하고, -> 유저끼리 '실시간 채팅' 보낼 수 있게 

    // 대기 시킨 서버를 매개변수로 받아야 함.  
    const io = socketIo(server);
        // [해석]
            // socket.io 를 받고 > app 으로 대기중인 server를 매개변수로 넣으면 > io 변수에 '소켓 서버 인스턴스' 가 들어간다. 
            // 즉, ⭐'웹소켓 서버'⭐ 가 된다는 것, 이 핵심. 
        // [해석]
            // 소켓이 연결됨. 그러면, io 안에는 socket 키 값이 있어. 소켓이 이제 이벤트를 준다. 
            // 즉, '웹소켓 서버' 가 만들어지면, 각 서버에는 ⭐고유한 id⭐가 부여된다.


    let userId = [];




    // 소켓들에게 '이벤트' 등록
        io.sockets.on("connection" , (socket) => {
            // [해석]
                // io.sockets | 서버(io) 에 연결된 '모든 소켓' 을 관리할 수 있음. 
                // on | 클라이언트에서 어떤 이벤트를 보내는지 듣고 있을거야 
                // "connection" | 클라이언트 소켓에서 연결 완료 이벤트가 발생하면, '이것 이것을 하겠다.' 가 된다. 
                // (socket) | 서버에게 이벤트를 보낸 'socket 객체' 를 의미함 
                        // | 이 'socket 객체' 를 통해 1) data 를 받을 수도 있고 2) 해당 socket 에게 data 를 줄 수도 있다.
                        // | 살짝, req, res 의 느낌❓❓❓ 

            // [수업 필기]
                // connection 이벤트 > 뭘 실행시킬지 
                // connection : 접속시 실행되는 이벤트 
                // 현재 접속한 클라이언트의 socket 이 매개변수로 들어온다. 
                // 유저 한명이 접속 했다는 얘기
                console.log("유저 접속")

            // 접속한 유저가 누구인지, 구별하기 위한 id
                console.log(socket.id)
                    // 연결하면, 스크립트가 생김 > 이걸로 뭔가 연결해줘야 함 > main.ejs 에서 script 에 이렇게     <script src="/socket.io/socket.io.js"></script>
                    // http://localhost:8010/socket.io/socket.io.js 이렇게 주소창에 치면 뭔가 연결이 된 것 임

            // 배열에 담아 놓은. 유저 아이디
                userId.push(socket.id)

                console.log(userId)     // 접속했을 때 유저 id

            // 클라이언트 측에서 이벤트가 푸쉬되면, 실행시킬 이벤트 
                socket.on("hi" , (data) => {
                    // 자기 자신에게 이벤트 푸쉬
                        console.log(data , "이벤트를 클라이언트에서 보냄") // 데이터가 찍힘
                    // 모든 대상에게 이벤트 푸쉬 
                        // io.sockets.emit("hi" , "모두에게")       // 모든 대상에게 

                    // 자기 제외 모든 대상에게 이벤트 푸쉬 : 방송 같은
                        // 모든 대상에게, 방송 같은 개념으로 푸쉬
                        // 자기 제외, 이벤트 푸쉬
                        // socket.broadcast.emit("hi" , data.msg); 

                    // 비밀 대화 
                        // 방 개념, 채팅방을 파서
                        
                        
                    // 대상에게 보낼 예정 
                        // 보낼 대상을 to 뒤에 적는다. 
                        // 이벤트를 푸쉬할 유저의 아이디를 to 메서드의 매개변수로 전달 
                    io.sockets.to(data.id).emit("hi" , data.msg);
                })

                    // 유저가 페이지를 나갔을 때 실행되는 이벤트 등록 
                        socket.on("disconnect" , () => {
                            // 유저가 접속 해제 했을 때, 실행되는 이벤트 
                                console.log("유저 나감")

                                userId = userId.filter((value) => value != socket.id);

                                console.log(userId)     // 접속 해제 했을때 유저 id
                        })
                            // disconnect | 유저가 나가면 그 다음 매개변수가 실행 
                            // 
                            
                            // hi 를 푸쉬하면, 데이터를 받는다. 
                            
                })     
                        
    // [alert 창이 뜨는 과정 해석⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ ] 
        // 프론트에서 버튼을 눌러서 hi 이벤트를 푸쉬 
        // 서버 측에서 hi 이벤트를 찾는다. 
        // 등록되어 있으면 실행 시킴. 
        // io.socekts.to(data.id).emit("hi", data.msg); 해당 socket 에 hi 이벤트를 서버 측에서, push 
        // 해당 이벤트를 push 받은 클라이언트 측에서, 이벤트를 실행,  
    


