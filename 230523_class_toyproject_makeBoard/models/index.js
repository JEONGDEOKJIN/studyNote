

// 전역변수
    const Sequelize = require("sequelize");

    const config = require("../config")
        // 여기에서, config > index.js 에서 설정한게 들어오는 이유는, 
        // db 에 sequelize 활용해서, sql 에 접속하기 위한 정보가 필요하기 때문에

    const User = require("./users");
    const Post = require("./posts");


// 매개변수로 들어갈 sequelize 객체 만들기
    // sequelize 생성자 함수와, config require 받아서, 각 테이블(User, Posts) 이 매개변수로 필요로 하는 sequelize 객체 만들기 
    const sequelize = new Sequelize( 
        config.dev.database, 
        config.dev.username, 
        config.dev.password, 
        config.dev
    )
    // [구문 해석] ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
        // 여기에서, init 의 매개변수로 들어가는, sequelize 는, 
            // 1) sequelize 모듈에서 비롯된 생성자 함수와 
            // 2) config 객체에서 read 한, sql 관련 계정 정보, 를 연결시킨 것 이라고 볼 수 있음. 

    // User.init, Post.init 에 전달할 매개변수를 '동적할당' 으로 만든다는게 무슨말이지?
        // 런타임에 매개변수로 들어오는 값이 변경될 수 있다? ❓❓❓❓❓ 


// db 에 넣어주기 
    const db = {};

    db.sequelize = sequelize;
    db.User = User;
    db.Post = Post;


// 각 table의 init 을 실행시켜서 초기화 하기 
    User.init(sequelize);
        // [해석]
            // 그러면, 이 순간 만들어지는 건가❓❓❓❓❓ 
            // 그렇다고, create 이 되는 건 아니지 않나❓❓❓ 
    Post.init(sequelize);


// 테이블간 연결 하기 
    User.associate(db)
    Post.associate(db)


// exports 시키기
    module.exports = db;

