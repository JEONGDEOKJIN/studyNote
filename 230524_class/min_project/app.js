// 비행기 좌석 3개 만들기 
    // 관을 1관, 2관, 3관 나눠서
    // 1번 비행기, 2번 비행기, 3번 비행기 로 나눔 
    // 좌석을 예약할 수 있게

// npm 셋팅 

// 사용할 모듈 
    // socket.io express ejs 


// 🔷 전역변수 및 모듈 
    const express = require("express");
    const path = require("path")
    const socketIo = require("socket.io")

    const app = express();

    // 현재 선택된 자리들을 보여줄 배열
        // 현재 선택된 자리, 보여줄 시트
    let seats = [];
    let temp = [
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
    ];       
        // 1 == 예약할 수 있는 자리 
        // 0 == 그냥, 구조상 한칸 떨어짐, 

    let temp2 = [
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
    ];

    let temp3 = [
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
    ]

let seatsArr = [temp, temp2, temp3];


// 선택한 비행기의 인덱스
    let index = 0;



// 미들웨어 
    // view 경로 셋팅 
        app.set("views" , path.join(__dirname , "page"));
    // ejs 엔진 
        app.set("view engine" , "ejs");
    // body 객체 사용 
        app.use(express.urlencoded ({extended : false}));

    // 라우팅 
        app.get('/' , (req, res) => {
            res.render('main')
        })


// 요청했을 때의 seat 
    app.get('/seat/:id' , (req, res) => {
        index = req.params.id;
        seats = seatsArr[index];
        // 요청에 대한 응답으로 seatsArr 배열에서 id 로 전달한 인덱스로 호출한 배열을 응답해준다.  
        res.send(seats)
    })


// 서버대기
    const server = app.listen(8001, () => {
        console.log("8001 에서 듣고 있어🚀");
    })

// 소켓 객체 생성 
    const io = socketIo(server)


    io.sockets.on("connection" , (socket) => {
        socket.on("reserve" , (data) => {
            console.log("예약");


            let seatTemp = seatsArr[data.selectCount];

            seatTemp[data.y][data.x] =2 ;

            io.sockets.emit("reserve" , data);
            // 음... add event 같은거 못 쓴거 같은데 
            
        })
    })