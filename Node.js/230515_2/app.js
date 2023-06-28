
// 프로젝트 셋팅 
    // 1. package.json 
    // 2. 서버 객체 , 인스턴스 만들기 
    // 3. 서버 대기 상태 
    // 4. body 객체 사용 
    // 5. 세션 사용 
        // save 옵션은 다 false | 초기화 옵션 false
        // 지금 이걸 설치 못 하겠어 😥😥😥 
    // 6. dotenv 
    // 7. mysql2 사용 
        // 모듈 설치 해야 하나❓❓❓ 
    // 8. view 엔진 경로 사용. view 엔진은 ejs 
    // 9. jwt 토큰 사용 


// 🔷 사용할 모듈 
    // express dotenv ejs jasonwebtoken express-session mysql2



// 🔷 전역변수 

    const express = require("express");
    const session = require("express-session");

    const path = require("path");

    const dot = require("dotenv").config();
        // node_modules 경로에서, 형제 레벨로, .env 파일이 있어야 함 

    const jwt = require("jsonwebtoken");


    const app = express();

    const joinRouter = require("./routers/joinRouter")
    const loginRouter = require("./routers/loginRouter")


    app.set("views" , path.join(__dirname, "page"));
    app.set("view engine" , "ejs");
    

    app.use(express.urlencoded({extended : false}))

    app.use(session({
        // session 발급에 사용할 secret key 노출 안 되게, env 로 만들자  😥😥😥😥😥😥😥 
        secret : process.env.SESSION_KEY, 
        // 세션 저장하고 불러올 때, 세션을 다시 저장할지 여부 ❓❓❓❓❓❓ 
        resave : false, 
            // ❓❓❓❓❓  왜 물결? 
        // 세션에 저장할 때, 초기화 여부 ❓❓❓❓❓❓❓❓ 
        saveUninitialized : false
    }))


    app.use ('/join' , joinRouter);
    // join router 을 미들웨어로 추가❓❓❓❓❓❓❓❓❓❓ 
    // 그래서 join url 을 넣어야 실행될 수 있어. ❓❓❓❓❓❓❓❓❓❓ 

    app.use ('/login' , loginRouter);


    app.listen(8010, () => {
        console.log("8010 에서 듣고 있어🙆‍♂️")
    })