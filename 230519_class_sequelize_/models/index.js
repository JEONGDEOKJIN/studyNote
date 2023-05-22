

const Sequelize = require("sequelize");

const config = require("./config"); 

const User = require("./users");
const Post = require("./post");

// console.log(config)



// 시퀄라이즈 객체 생성
    // config 값으로 만들어줌. 
    const sequelize = new Sequelize (
        config.dev.database, 
        config.dev.user,        // ⭐⭐⭐ 여기를 수정 하니까 연결 됨 
        config.dev.password, 
        config.dev
    )


// 시퀄라이즈 내보낼 빈 객체
    const db = {}

    db.sequelize = sequelize;
        // 객체에 키 값을 추가 ⭐⭐ 

    db.User = User;
    db.Post = Post;

    // 테이블을 만들거나, 초기화 하는 부분
        User.init(sequelize);
        Post.init(sequelize);

        User.associate(db);
        Post.associate(db);

module.exports = db;

// const db = {
//     sequelize : sequelize,
//     User : User,
//     Post :Post
// };

// // const {User} = db;

// 워크벤치 ERD 확인 단축키 : 컨트롤 + R ⭐⭐⭐⭐⭐ 