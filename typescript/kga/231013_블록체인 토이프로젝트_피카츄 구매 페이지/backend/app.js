// [처음 셋팅] npm init -y

const express = require("express")  
    // npm i express

const app = express()

// 깊은 객체 사용 여부 | false 는 사용하지 않음 
app.use(express.urlencoded({extended : false}))     

const PORT = 7070;
app.listen( PORT , () => {
    console.log("서버 열림🙌🙌🙌")
} )

