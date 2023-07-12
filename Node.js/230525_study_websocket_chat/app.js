

// npm package.json 


// 설치 모듈 
    // express ejs socket.io 


// 🔷 전역변수 및 모듈 임포트
const express = require("express");


const path = require("path");       // express 에 있는 내장 모듈

const socketIo = require("socket.io");


const app = express();


// view 엔진 설정 (경로, ejs)
    // 경로 
        app.set("views" , path.join(__dirname , "page"));
    // 엔진을 ejs 로 설정 
        app.set("view engine" , "ejs");



// 서버 대기 상태 
    const server = app.listen(8009, () => {
        console.log("8009 에서 듣고 있어 🔮🔮🔮")
    })


// 라우팅
    app.get('/' , (req, res) => {
        res.render("main")
    })


// 웹소켓 서버
    const io = socketIo(server);

// 유저 저장하는 배열 
    let userId = [];        // 모든 유저
    let dogRoomUserId = []      // 강아지방 유저
    let catRoomUserId = []      // 고양이방 유저

    io.sockets.on("connection" , (socket) => {

        // 1) 연결된건지 테스트
        console.log("혹시, 들어온건가, 유저 접속");

        // 2) 들어온 유저를 배열에 담기 
        userId.push(socket.id)
        console.log(userId)     // 현재 접속중인 유저 확인
        

        // 3) 'hi 이벤트' 연결되는지 확인 (테스트용)
            // socket.on("hi" , (data) => {
                
            //     console.log("1단계 클라에서 서버로 잘 보냈나" , data)

            //     // socket.broadcast.emit("hi" , data.msg)
            //     io.sockets.to(data.id).emit("hi" , data.msg)
            // });
                // 😥 여기서 막힘 📛📛📛
                // 뭘 받지 ❓❓❓❓❓
                    // 1) 클라이언트에서 보낸걸 그대로 쓰나?  
                    // 2) 자기 나름의 매개변수를 쓰나?  
                    // 알게 된 것 
                        // a) hi 이벤트가 발생하면, 특정한 익명함수가 실행된다. 이 익명함수에서 뭔가 일처리를 한다. 
                        // b) 익명함수에 전달되는 data 는, hi 이벤트를 타고 들어오는 것임. 이 data 객체에 클라이언트에서 보낸 data 가 들어있음. 
                        // c) 그래서, data.id 를 하면, 보낸 소켓 id 에 접근되고, data.msg 라고 key 값을 적으면, value 가 나옴 

                // 받고 나서, '어떤 socket에 어떻게 보낼지 emit 처리' 어떻게 하지? 
                    // io.sockets.to(data.id).emit("hi" , data.msg) 이렇게 하면 됨. 
    
        // 🔷 '고양이 방에 들어가면, 고양이 방에 들어왔다고 표시하기' 
            // 4) 클라에게 받은 'room name data' 처리 | 방 입장 시키기
                socket.on("joinRoom" , (room, name) => {
                    // a) 방에 입장 시키기 ⭐⭐⭐⭐⭐ (아, 별도의 메소드가 있구나)
                        // console.log(room)   
                            // '고양이 방' 으로 나오나? ✅✅
                        socket.join(room)
                            // [해석]
                                // socket | 현재, 서버에게, 연락을 때리고 있는 소켓 객체 
                                // join | 서버 입장에서, 이제, 이 socket 을, 해당 방에 '가입' 시키겠다. 
                                // room | 
                                    // 가입 시키고자 하는 방 이름은 room 변수에 있는 '고양이 방' 
                                    // 이때, 가입 시키고자 하는 방 이름은 ⭐⭐'문자열'⭐⭐ 이기만 하면 되고, 
                                    // 꼭, select 변수에서, select.options 이렇게 타고 들어가지 않아도 됨. 
                            // [질문] 
                                // '어딘가로 입장시키겠다.' 라는 기준이 생각보다 넓은데? 왜냐면, socket.id 를 입력해야 렌더링이 됐었던 경우가 있었잖아 ⭐⭐⭐⭐ 
                                // '입장시키는 대상' 에 어떤 한계가 있어야 할거 같은데? 
                                // [알게된 점]
                                    // '입장 시키는 대상' 은 '문자열' 이기만 하면 된다. ⭐⭐⭐⭐⭐ 
                    
                    // b) '현재, 해당 방에 있는 클라이언트' 에게 이벤트 푸쉬
                        io.to(room).emit("joinRoom" , room, name)
                        // [질문] 
                            // 특정 server 에게 전달하려 할 때, to(server.id) 로 적었던 것 같은데??
                            // [알게된 점]
                                // '개별 소켓' 에게 보내려면, to 다음, socket id 기재하면 되고, 
                                // ⭐'해당 room 에 입장한 모든 소켓'⭐ 에게 보내려면, to 다음, 방 이름, 을 기재하면 > 알아서, 방이름을 갖는 모든 socket 에게 간다. 
                                // 중요한 건, ⭐'결국, socket 에게 보낸다.'⭐ 라는 것.
                        // [질문]
                            // 방에 입장 시킬 때는, socket 으로 시작했고, room 방에 있는 클라이언트에게 보낼 때는, io 로 시작함. 둘의 차이는? 
                            // [알게 된 점]
                                // io 는 app.js 에서 const io = socketIo(server); 이 구문에 의해 생김 
                                    // 이로 인해 '웹소켓 서버' 가 생김.
                                    // 즉, 기존 서버에 소켓 기능이 추가되고, 그게 io 변수에 들어가게 됨. 
                                    // 따라서, ⭐⭐ io 는 '서버' 인데, '웹소켓 기능이 추가된 서버' ⭐⭐ 라고 볼 수 있음. 
                                // socket 은 main.ejs 에서 'const socket = io.connect();' 에 의해 만들어짐 
                                    // io 는 ejs 에서 스크립트를 써서 사용할 수 있게 되었음 
                                    // connect 는 서버인 io 와 연결하게 됨. 
                                    // 이때, ⭐⭐ socket 은 하나의 객체 이고, 그에 따라 상속받은 메소드들이 있고, 각 객체 마다 고유한 id 가 생성됨 ⭐⭐

                    // c) 해당 방에 입장안 name 을 방에 담기 
                        // 이게 꼭 필요? 
                        
                    
                    // if (room == '고양이방') {
                    //     catRoomUserId.push(name)
                    // } 
                    
                    // if (room = '강아지방') {
                    //     dogRoomUserId.push(name)
                    // }

                })

            // 5) 방 나가게 하기 
                socket.on("leaveRoom" , (room , name) => {

                    // a) 나가면, 나간 방에서 제외 
                        socket.leave(room);

                    // a-1) 나가면, 해당 name 이 들어가 있는 room 에서 없애기 


                    // b) 어느방에, 누가, 나갔는지, 해당 방에 있는 유저들에게 푸쉬 
                        io.to(room).emit("leaveRoom", room, name)
                })


            // 6) 유저가 나간 경우 
                socket.on("disconnect" , () => {
                    console.log("유저 나감");

                // '나간 유저를 제외'한 유저 배열을 userId 에 넣기 
                    userId = userId.filter( (value) => value != socket.id );
                    // [해석]
                        // 1) userId 에서 하나씩 빼서 value 에 담는다. 
                        // 2) userId 랑 disconnect 된 socket의 id 랑 비교한다. 
                        // 3) 다르다면 == 나간 user 가 아니므로 -> userId 배열에 넣는다. 
                    // filter 메소드 참고 : https://ko.javascript.info/array-methods

                // 현재 접속중이 유저 아이디 
                    console.log(userId);
                    
                })
                // [질문]
                    // 그러면, 클라이언트에서, 나갔다는 신호를 받아야 하는 거 아닌가? 
                    // 방에서 그냥 나가면, 자동적으로, disconnect 이벤트가 발생하는 건가?
                    // [알게 된 것]
                        // disconnect 이벤트가 발생하는 경우 
                            // 1) 클라이언트가 브라우저를 종료, 페이지 이동, 네트워크 연결 끊길 경우 
                            // 2) 서버 측에서, socket disconnect() 메소드 호출, 강제로 끊는 경우 
                            // 따라서, 클라이언트에서, emit 하지 않아도, disconnect 이벤트가 발생할 수 있음. 

        // 🔷 채팅 기능 
            // 1. 클라에서 받은 데이터를 > '어떤 소켓에게 보낼지 결정' 하고 다시 리턴
                socket.on("chat" , (room, name, msg) => {
                    io.to(room).emit("chat", name, msg);
                })
                // [해석]   
                    // io 는 서버를 의미 
                    // io.to(room) | 전체 서버가 관리하는 소켓 중 room 방에 있는 소켓에게 보내겠다.

            // 2. [귓속말] 클라에게 받은 걸, 1) '어떤 소켓에게 보낼지 결정' 2) data 수정 해서 리턴 
                socket.on("chat2" , (id , name, msg) => {
                    // console.log("id, name, msg👉👉" , id, name, msg)
                    io.to(id).emit("chat" , name, "귓속말 : " + msg);
                })
                    // [해석]
                        // id | 여기서 id 는 귓속말 공란에서 기입 받는다. 그래서, 처음엔 msg2.value 이고, 이게 서버에서 넘어오면서 이름이 id 가 되었다. 
                        // chat | 기본 chat 이벤트를 부른 이유는, 그치, 하나의 렌더링을 만들어놓은거, 를 같이 사용하기 위해서?
    
        // 🔷 채팅방 옆에 현재 로그인한 사용자 보이게 하기 
            // 현재 접속한 '모든 유저' 확인 
                console.log(userId)
            // '고양이방' 에 접속한 유저 확인 
                console.log(catRoomUserId)
            // '강아지방' 에 접속한 유저 확인
                console.log(dogRoomUserId)



    })


