
// 🔷 시퀄라이즈 ORM(객체 관계 매핑)
    // 객체와 데이터 베이스를 ORM 라이브러리가 매핑을 시켜주어서 자바스크립트 구문으로 SQL을 제어할 수 있다.
    // 자바스크립트로만 sql작업을 할 수 있도록 도와주는 라이브러리.
    // js 구문으로만 sql 제어 가능 


// 프로젝트 시작 
    // package json

// 설치 모듈 
    // express ejs sequelize mysql2 dotenv


// 전역 변수 
    const express = require("express");
    const path = require("path");
    const dot = require("dotenv").config();

    const {sequelize , User, Post} = require('./models');
// const User = require("./models/users");
        // index.js 로 갈거고 > 그 중에서 sequelize 만 구조분해할당으로 꺼내서 가져옴 

    const app = express();



// view 엔진 경로 설정
    app.set("views" , path.join(__dirname , "page"));

// view 엔진 ejs 설정 
    app.set("view engine" , "ejs");

// body 객체 사용 
    app.use(express.urlencoded({extended : false}));



// 시퀄라이즈 구성 연결 매핑 
    // sync 함수 : 데이터 베이스를 동기화 시켜주는 메서드
    // focus true : 초기화 함 | focus false 면, 초기화 안 함. 
    sequelize.sync ( {focus : true} ).then( () => {

        // 완료가 되면, resolve 를 반환하면, 연결 성공
        console.log("연결 성공")

    } ).catch ( (err) => {
        // 연결 안 되면, 연결 실패 
        console.log(err)
    })


app.get('/' , (req, res) => {
    res.render("create")
})


// 들어온 값을 sql 로 넣기 ⭐⭐ 
app.post('/create', (req, res) => {
    const {name, age, msg} = req.body;

    console.log(name, age, msg)
    
    // ⭐⭐⭐ 시퀄라이저에서 만든 메소드를 사용한다. 
        // INSERT INTO 문을 실행시켜주는 메서드 
        // 매개변수로 컬럼의 내용을 객체로 만들어서 전달
        // 컬럼 : name, age, msg
    User.create( {
        // sql name 컬럼 : 값 
        name : name, 
        // sql age 컬럼 : 값 
        age : age,
        // sql msg 컬럼 : 값 
        msg : msg

    } );       // INSERT INTO 와 동일
            // 매개변수로, 컬럼의 내용
    res.send("값 추가 되었음!")
});


app.get('/main' , (req, res) => {
    // 유저 전체를 다 불러와서 보여줄거야 
    
    // findAll 메서드의 매개변수로 검색조건을 객체로 추가할 수 있음. 
        // ex) where 를 넣고, 추가할 수 있는데, 지금은 전체 조회

    // SELECT * FROM user 한거랑 같음
    User.findAll({})    // findAll({}) 여기에, 조건 없으니까 > 전체 조회 | 
    .then( (e) => {
        // e 가 뭐지❓❓❓❓❓❓❓❓❓❓❓❓ 
        // 성공시 main 페이지 보여주기
        res.render("main", {data : e});
            // 가져온 유저를 담고 있는 걸 보낸다. 
            // 그걸 키 값으로 보낸다 ❓❓❓❓❓ 
    } )
    .catch((e) => {
        // 실패시
        res.send("유저 조회 실패")
    })
})


app.post('/create_post' , (req, res) => {
    const {name, value} = req.body;
    console.log(name, value);
    
    // 어떤 유저를 찾을 건지, 조건 추가 
        // 한 개의 값을 조회하는 메서드 
    User.findOne( {
        // 검색 조건 추가 
        where : { name : name } // 이걸로 user 를 찾고
    } ).then( (e) => {
        // 추가 하는 값
        Post.create({
            msg : value, 
            user_id : e.id
        }) // 어떤 유저가 추가했는지 foreing key 까지 줌 
    } )
    res.send();
})


app.get('/view/:name' , (req,res) => {
    // 해당 유저를 조회하고 -> 그 유저가 갖고 있는 글을 볼 것 임 ⭐⭐⭐⭐⭐ 
    User.findOne( {
        where : { 
            // 해당 이름의 유저를 조회하면서, 
            name : req.params.name
        },
        // raw : true, : 이 속성을 주면, 관계형으로 불러온 값을 다 풀어서 볼 수 있음. 
        // raw : true, 
            
        // 해당 유저의 id 로 참조된 user_id 가 있는 post 테이블의 값을 같이 조회 한다.  
        include :  [ 
            // 조회할 모듈, post 모델
            {model : Post} 
        ]

    }).then ( (e) => {
        // console.log(e) // 성공하면, e 가 조회되게 
        console.log(e.dataValues) // 성공하면, e 가 조회되게 
        e.dataValues.Posts = e.dataValues.Posts.map( (i) => i.dataValues );

            // post 쪽으로 내보낸다. 
        const Posts = e.dataValues;
        console.log("🚀🚀🚀🚀🚀🚀")
        console.log(Posts)

        res.render("view" , {data : Posts});
        // res.send();
    } )
})




// 서버 대기 상태   
    app.listen(8030, () => {
        console.log("8030 에서 듣고 있어 🔮")
    })



