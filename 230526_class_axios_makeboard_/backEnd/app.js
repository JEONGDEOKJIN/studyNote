
// 오늘 요약
    // '로그인 페이지' 만들것 임. 
    // 백, 프론트 나눠서 할 것 임. 
    // 프론트를 수정하면, 프론트에만 푸쉬
    // 백엔드를 수정하면, 백엔드에만 푸쉬

// 프로젝트 관리 
    // 백 쪽 깃헙 따로 파고, 프론트 깃헙 따로 파고 
    // 백엔드랑, 프론트랑 나눠서, 깃 레퍼지토리 파놓고, 푸쉬 


// package.json 
    // C:\Users\user11\Desktop\kga\studynote\230526_class>cd .\backEnd\ 커맨드 경로 이동 ⭐⭐⭐⭐⭐⭐⭐ 
    // packaegjson, pacakge-lock, app.js 모두 backEnd 폴더안으로 이동 ⭐⭐⭐⭐⭐⭐⭐  

// 설치 모듈 
    // express express-session cors sequelize mysql2 dotenv



// 🔷 전역변수 및 모듈 임포트
    const express = require("express");
    const cors = require("cors")
    const dot = require("dotenv").config();
    const session = require("express-session");
    const {sequelize} = require('./models')
    const loginRouter = require("./routers/login")
    const signUpRouter = require("./routers/signUp")
    const boardRouter = require("./routers/board")

    const app = express();

    app.use(session({ 
        secret : process.env.SESSION_KEY, 
        resave : false, 
        saveUninitialized : false, 
    }))


    sequelize.sync({force : false}).then(() => {
        console.log("연결 성공");
    }).catch((err) => {
        console.log(err);
    })
        // force : 초기화 시킬지 여부 , 데이터 베이스에 값이 있으면 지울지 여부 


// 미들웨어 
    // body 객체 
    app.use(express.urlencoded({extended : false}))



// 다른 도메인에서 악의적으로 접근할 수 없도록, 도메인 접근시 발생하는 보안 정책 
    // 이전에는 ejs 로 서버사이드로 했기 때문에 이런 문제가 없음 
    // 지금은 프론트에서 백으로 요청하면, 백에서 그려주는게 아니라, 그려주는 거야 > 그래서 보안 정책이 필요해 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
    // 다른 도메인과 통신을 안전하게 유지하기 위해서 ⭐⭐⭐⭐⭐⭐⭐⭐ 
    // cors 모듈을 가지고, 도메인을 허용해 주자. 
    // Access-control-Allow-origin 을 헤더에 포함해서,
        // > 접근을 허용하고, 응답하고, 브라우저에서 응답을 받은 뒤, 
        // > 헤더값을 확인해서, 접근을 허용 또는 차단! 한다. 
            // ex) 내가 접근이 되는구나, 안 되는 구나 
            // Access to XMLHttpRequest at 'http://127.0.0.1:8007/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
                // no 'Access-Control-Allow-Origin' header is presen
            // 이게 브라우저가 해준 응답
    app.use(cors({
        // 도메인 허용 옵션
        
        // 접근을 허용할 도메인 
            origin : "http://127.0.0.1:5500",
                // 현재 접속중인 브라우저에서 가져온다. 
                // 여러개의 도메인을 허용하고 싶으면, 배열의 형태로 넣어주면 된다 ⭐⭐⭐⭐⭐⭐ 
                // ex) origin = [http://127.0.0.1:5500, http://127.0.0.1:5500... ]
            // [해석] ⭐⭐html 라이브 서버를 키고⭐⭐ >  http://127.0.0.1:5500/frontEnd/main.html 이렇게 들어가면 > '응답함' 이렇게 뜸 

        // 클라이언트의 요청에 쿠키를 포함할지 여부 의 속성 
            credentials : true, 
                // true 여야, 쿠키 를 가져올 수 있어 ⭐⭐⭐⭐⭐⭐⭐ 

    }))

    //app.use(cors({origin : "http://127.0.0.1:5500"}))

// test 
    app.get("/" , (req, res) => {
        res.send("응답함")
    })


    app.use('/signUp' , signUpRouter)
    app.use('/login' , loginRouter)
    app.use('/board' , boardRouter)
        // [질문]
            // create.html 에서 action 은 'http://127.0.0.1:8007/create' 에서 일어남 
            // 그런데, 경로는 create 만 써줬네? 
            // http://127.0.0.1:8007 는 '서버? 도메인? 이라서 생략?' , '도메인은 / 이거 하나에 녹아있는건가?' 



// 서버 대기
    app.listen( 8007, () => {
        console.log("8007 에서 듣고 있어 🙌🙌🙌")
    } )
