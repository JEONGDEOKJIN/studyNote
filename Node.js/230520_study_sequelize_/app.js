

// 🔷 필요한 모듈 
    // express ejs sequelize mysql2 dotenv


// 🔷 전역 변수 
    const express = require("express");
    const path = require("path");   // path 는 node.js 의 내장변수

    const app = express();


// 🔷 view 엔진 설정 
    // view 엔진 경로 설정 
        app.set("views" , path.join(__dirname , "page"));
            // __dirname(현재 app.js 경로) 와 page 폴더의 경로를 합쳐서, views 폴더를 대체 할거야 

    // view 엔진을 ejs 로 사용
        app.set("view engine" , "ejs");


// 🔷 미들웨어 사용 
    // body 객체 사용 | 깊은 객체 탐색은 false 
        app.use(express.urlencoded ({extended : false}));


// 🔷 서버 대기 상태
    app.listen(8060, () => {
        console.log("8060 에서 듣고 있어요😌")
    } )