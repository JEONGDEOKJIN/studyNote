// 로그인 하고, 게시판에 글 작성, 수정, 삭제 

// 2시 협약 발표, 7기, 줌으로 
    
// 프로젝트 시작


// npm 설정 
    // npm init -y


// 사용할 모듈 
    // express express-session mysql2 ejs dotenv sequelize


// 🔷 전역 변수 
    const express = require("express");
    const path = require("path");
    const session = require("express-session");     // 세션 모듈 가져오기
    
    // 세션 키를 env 로 안전하게 보관하기 위해
    const dot = require("dotenv").config();

    const { sequelize } = require("./models/")     

    const SignUpRouters = require("./routers/signUp");
    const LoginRouters = require("./routers/login");
    const BoardRouters = require("./routers/board");


    const app = express();


// view 엔진 
    // 경로 설정 
        app.set("views" , path.join(__dirname, "page"));
    
    // ejs 로 설정 
        app.set("view engine" , "ejs");


// 미들웨어 //
    // body 객체 사용 | 깊은 객체 사용 하지 않음 
        app.use(express.urlencoded({extended : false}));


        app.use(session({
            secret : process.env.SESSION_KEY,     // 세션키를 넣을 것. 
            resave : false,     // 다시 저장할지 여부 
            saveUninitialized : false       // 초기화 할지 여부 
        }))



    // 이게 뭐였지❓❓❓❓❓❓❓❓ 
    sequelize.sync({
        force : false    
            // force : 초기화 여부를 결정 
            // true : 초기화 
    }).then((e) => {
        console.log("연결 성공")
    }).catch((err) => {
        console.log(err)
    })


        app.use("/signUp" , SignUpRouters);
        app.use("/login" , LoginRouters);
        app.use("/board" , BoardRouters)




// 서버 대기 상태 
    app.listen(8020, () => {
        console.log("8020 에서 듣는 중👲")
    });

