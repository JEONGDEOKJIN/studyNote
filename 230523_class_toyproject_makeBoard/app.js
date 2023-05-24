

// package.json 셋팅 
    // npm init -y

// 필요한 모듈 
    // express ejs sequelize dotenv mysql2 jsonwebtoken express-session


// 🔷 전역변수 
    const express = require("express");
    const session = require("express-session");
    const path = require("path");   // express 내장모듈

    const dot = require("dotenv").config();     // .env 파일에 적은 것을 사용할 수 있게 config 까지

    const signUpRouters = require("./routes/signUpRouters");
    const adminRouters = require("./routes/adminRouters");
    const loginRouters = require("./routes/loginRouters")

    const { sequelize } = require("./models");



    const app = express();


// view 엔진 
    // view 엔진이 참조하는 파일의 경로 설정 
        app.set("views" , path.join(__dirname , "page"));
    // view 엔진을 ejs 로 지정
        app.set("view engine" , "ejs");



// 세션 😥😥😥😥😥😥😥 
    app.use(session({
        secret : process.env.SESSION_KEY, // 세션키 넣을것.
        resave : false, // 다시 저장할지 여부
        saveUninitialized : false, // 초기화 할지 여부
    }))



// 데이터베이스 초기화 ❓❓❓❓❓❓ 
    sequelize.sync( {
        force : false
    } ).then((e) => {
        console.log("sequelize sync 사용 : 연결성공");
    }).catch((err) => {
        console.log(err)
    })




// 미들웨어 
    // body 객체 사용할 수 있게 하기 
        app.use(express.urlencoded ({extended : false}));


    // 라우팅 
        app.use('/signUp' , signUpRouters)
        app.use('/admin' , adminRouters)
        app.use('/login' , loginRouters)


// 서버 대기 상대 
    app.listen( 8070, () => {
        console.log("8070 에서 듣는중~! 🌻🌻🌻")
    } )