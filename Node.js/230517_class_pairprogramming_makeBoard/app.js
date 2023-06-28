
// 필요 모듈 
    // mysql2 express ejs 

// 🔷 전역 변수 
    const express = require("express");
    const path = require("path");

    // boardRouter 안에 router 이게 들어가 있음. 
    // router 이게 실행되면 > router 가 선언된 경로를 기억하고 > ./routers/board 경로로 가게 된다. 

    const boardRouter = require("./routers/board")



    const app = express();


    app.set("views" , path.join(__dirname, "page"))
    app.set("view engine" , "ejs")

    app.use(express.urlencoded({extended : false}))


    app.use("/board", boardRouter)
        // app.use("/create" , boardRouter)
        // console.log(boardRouter)
        // console.log(boardRouter.stack[0].route)
        // console.log(boardRouter.stack[0].route.stack[0].handle.toString())



    app.listen(8020, () => {
        console.log("8020 에서 듣고 있음~")
    })

