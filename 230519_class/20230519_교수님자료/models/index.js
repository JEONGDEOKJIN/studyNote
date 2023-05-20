const Sequelize = require("sequelize");
const config = require("./config");
const User = require("./users");
const Post = require('./post');

console.log(config)
// 시퀄라이즈 객체 생성
const _sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

// 내보내줄 빈 객체
const db = {};
db.sequelize = _sequelize;
    // db 안에 sequelize key 를 생성 
db.User = User;
db.Post = Post;

// 테이블을 초기화 하는 부분
User.init2(_sequelize);
Post.init(_sequelize);
User.associate(db);
Post.associate(db);

// 단축키
// 컨트롤 + R : workbench erd 확인
module.exports = db;