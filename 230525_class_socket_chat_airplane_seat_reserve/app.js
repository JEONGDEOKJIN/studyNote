// 채팅방 만들기 
    // 방을 다로 나눠서, 유저간 귓속말 



// packjson

// 모듈 express socket.io ejs


// 🔷 전역 변수 및 모듈
    const express = require("express");
    const path = require("path");
    
    const app = express();
    const socketIo = require("socket.io")


// view 엔진
    // 경로
        app.set("views" , path.join(__dirname , "page"))
    // 엔진 설정
        app.set("view engine" , "ejs")



// 서버 대기 상태 
    const server = app.listen(8008, () => {
        console.log("8008 에서 듣고 있어🥙 ")
    })


app.get('/' , (req, res) => {
    res.render("main");
})

// ⭐⭐⭐⭐⭐⭐⭐⭐ 아, 이걸 저장을 못 했네?! 
    let userId = []

// socket 연결 
    const io = socketIo(server)


    io.on("connection" , (socket) => {
        // 유저가 접속하면 > connection 이벤트 발생 
        // socket 매개변수는, 접속한 유저를 의미

        console.log("유저 접속");

        // 유저 접속시 배열에 유저의 아이디를 추가
        userId.push(socket.id);

        // 현재 접속중인 유저 
        console.log(userId)


        // 유저가 방에 접속했을 때, 해당 방 사람만 보이게 
        socket.on("joinRoom" , (room, name) => {
            // room 이름, name 을 받을 것 임 
            // 방에 접속하면, join 메서드로 방에 입장시킨다. | 방의 개념 
                socket.join(room);
            
            // 현재 방에 있는 클라이언트에게 이벤트 푸쉬
                // '누가' '어느 방' 에 접속했는지 
            io.to(room).emit("joinRoom" , room, name)

        })

        // 나갔을 때
        socket.on("leaveRoom" , (room , name) => {
            // 유저가 방에서 나가면
            
            // 유저가 방에서 제외되게 해준다.
                socket.leave(room);

            // 어느 방에서, 누가 나갔는지, 해당 방에 있는 클라이언트 유저들에게 푸쉬 
                io.to(room).emit("leaveRoom" , room, name)

        })



        // connection 이벤트가 발생하는 중에 disconnect 가 발생하면~ 이라는 의미❓❓
        socket.on("disconnect" , () => {
            console.log("유저 나감");

            // 나간 유저를 빼고 > 배열에 다시 담아주기 | 나간 유저를 제외한 배열을 userId 에 넣기 
            userId = userId.filter((value) => value != socket.id);

            // 현재 접속중인 유저 id
            console.log(userId);

        })


        // 채팅을 만들거야 
            socket.on("chat" , (room, name, msg) => {
                io.to(room).emit("chat" , name, msg);
            })

        // 귓속말 만들기 
            socket.on("chat2" , (id, name, msg) => {
                io.to(id).emit("chat" , name, "귓속말 :" + msg);
            })

    })
