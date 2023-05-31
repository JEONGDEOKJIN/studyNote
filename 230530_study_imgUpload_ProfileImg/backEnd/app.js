// 🔷 이미지 업로드 
    // 서버측 컴퓨터에 폴더에 저장 이후, 이미지 파일을 
    // 이미지 저장을 할 때, 파일을 input 에 올려서, '서버측' 컴퓨터 폴더에 저장
    // 파일의 경로를 설정하고, 서버측에서, 이미지 파일을 가져와서, 보여준다. 


// 기본 pack json 설정 

// 설치할 모듈 : express path multer cors
    // multer : 모듈을 사용해서, 이미지 업로드 할 것. 파일이 저장될 경로나, 파일의 확장자, 이름등을 설정해서, 파일을 저장한다. 


// 🔷 전역변수, 모듈 임포트, 미들웨어 

    const express = require("express")
    
    const path = require("path")


    const dot = require("dotenv").config();

    
    const app = express();

    // cors 설정 
        // npm i cors
    const cors = require("cors");
    const { sequelize } = require("./models");


    const uploadRouter = require("./routers/uploads")
    const signUpRouter = require("./routers/signUpRouter")

    
    
    app.use(cors({
        // 허용할 도메인 
            origin : "http://127.0.0.1:5500" , 
                // [주의]
                    // 슬래시! 없이 깔끔하게 써야 함. | 슬래시 지워줘야 함 
        // 요청에서 쿠키를 포함시킬지 여부 
            credentials : true
    }))
    

    // json 형식을 js 객체로 변환
        app.use(express.json())
            // [해석]
                // 요청과 응답에서, json 형식의 데이터를 전달 받았을 때, json 파싱을 해서, js 객체로 변환시켜주는 미들웨어 
                // 즉, json 형식이 input 되면 > js 객체로 output 내놓는 미들웨어

    // body 객체 사용할 수 있는 미들웨어 
        app.use(express.urlencoded ( {extended : false}));



// 🔷 '라우터 토스' 해주는 미들웨어

    // '사진 업로드' 관련 라우터 토스
        // upload 경로로 들어오는 것들
        app.use("/upload" , uploadRouter);

        // '정적 파일 경로' 잡아주기 ⭐⭐⭐⭐⭐ 
        app.use("/img" , express.static(path.join(__dirname , "uploads")))
            // [해석]
                // img 로 시작하는 경로가 있으면 > uploads 로 '변환?' , '이동?' ❓❓❓❓❓❓ 
                // index.html 에서 이미지 파일 경로를 <img src="http://localhost:8002/img/ad5191be-fea8-4398-b6a9-2d7e86c0e77c_1685421564518.jpg" alt=""> 이렇게 넣었음 
                // [궁금증] ❓❓❓❓❓❓❓ 
                    // 폴더에는 img 가 없는데, 어떻게 사진을 가져올 수 있어? 
                    // 굳이, 이런 '정적 파일 경로' 방식을 쓰는 이유는 뭐야?
                // [이건가?]
                    // '디렉토리에 있는 파일을 HTTP를 통해 제공' 하는거? 
                        // 즉, 'naver 에서 링크로 사진 접속하는 것' 을 가능하게 하는❓❓

    // '회원가입' 관련 라우터 토스
        // 처음 회원가입 페이지 들어왔을 때 
        app.use("/signUp" , signUpRouter);


// 🔷 sequelize 로 1) 테이블 없으면 만들고 2) 있으면 유지시키기 
    sequelize.sync ({ force : false}).then(() => {
        console.log("연결 성공");
    }).catch((err)=> {
        console.log(err)
    })
        // [해석] ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
            // synce 메소드 : 테이블이 없으면 그냥, 만드는 메소드 
            // 'force : false' 면, 기존에 테이블이 있으면 존중, 
            // 'force : true' 면, 기존에 테이블이 있으면 무시하고, 새롭게 그린다. 


// 🔷 서버 대기 
    app.listen( 8001 , () => {
        console.log("8001 에서 듣는중🎏🎏🎏")
    })