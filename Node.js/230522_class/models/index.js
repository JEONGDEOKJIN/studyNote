const Sequelize = require("sequelize");

const config = require("../config");        // index 객체 받아오기 

const User = require("./users")
const Post = require("./posts")


const sequelize = new Sequelize( 
    config.dev.database,    // 생성자 함수로 만들면서 전달할 매개 변수 ⭐⭐⭐ 
                            // 동적 할당으로 만든다 ❓❓❓❓❓ 
    config.dev.username, 
    config.dev.password, 
    config.dev

)

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);

module.exports = db;