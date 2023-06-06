// 🔷 이미지 업로드 
    // 서버측 컴퓨터에 폴더에 저장 이후, 이미지 파일을 
    // 이미지 저장을 할 때, 파일을 input 에 올려서, '서버측' 컴퓨터 폴더에 저장
    // 파일의 경로를 설정하고, 서버측에서, 이미지 파일을 가져와서, 보여준다. 



// 프로젝트 시작 | package.json 


// 설치할 모듈 : express path multer
    // multer : 모듈을 사용해서, 이미지 업로드 할 것. 파일이 저장될 경로나, 파일의 확장자, 이름등을 설정해서, 파일을 저장한다. 


// 🔷 전역변수, 모듈임포트 및 미들웨어 
    const express = require("express");
    const path = require("path")
    const app = express();

    const uploadRouter = require("./routers/upload")

    // cors 설정 
        // npm i cors
        const cors = require("cors");

        app.use(cors({
            // 허용할 도메인 
                // 슬래시 지워줘야 함 
            origin : "http://127.0.0.1:5500", 

            // 요청에서 쿠키를 포함시킬지 
            credentials : true, 
        }))

    // routers
    

    // 요청과 응답에서 json 형식의 데이터를 전달받았을 때, 
    // 요청과 응답에서 json 파싱을 해서, js 객체로 변환시켜주는 미들웨어
    // json 메서드로 json 파싱
    app.use(express.json())


    app.use(express.urlencoded({extended : false}));
    app.use("/upload" , uploadRouter)

    // ⭐⭐ css 에서 정적 파일 경로 추가했던 것 처럼, 경로 잡아준다. 
    // 폴더명 까지 ⭐⭐⭐⭐⭐⭐⭐
    app.use("/img" , express.static(path.join( __dirname, "uploads")))
    


// 서버 대기 상태 
    app.listen( 8002, () => {
        console.log("8002 에서 듣는중🙌🙌🙌")
    })
