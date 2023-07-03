// ES6 문법으로 작성

    // express 서버 여는 거 
    import express from "express";

    const app = express();

    app.listen(3000, () => {
        console.log("server on~")
    })
    
    // es5 로 변환함으로써, common.js 환경에 맞게 최적화

