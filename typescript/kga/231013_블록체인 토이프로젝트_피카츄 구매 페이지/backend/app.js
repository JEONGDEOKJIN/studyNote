// [처음 셋팅] npm init -y
// 라이브러리 설치 : npm i express mysql2 sequelize

const express = require("express")  
    // npm i express

const itemRouter = require("./routers/itemRouter")

const app = express()

// 깊은 객체 사용 여부 | false 는 사용하지 않음 
app.use(express.urlencoded({extended : false}))     

// 라우팅 설정 위한 미들웨어
app.use("/item" , itemRouter);



const PORT = 7070;
app.listen( PORT , () => {
    console.log("서버 열림🙌🙌🙌")
} )

