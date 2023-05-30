
const Sequelize = require("sequelize");

// .. 까지 하면, index 파일을 찾아서, index.js 파일 내보낸다.
    const config = require("../config");

const User = require("./users")
const Post = require("./posts")


    // 이때 순서를 잘 지켜야 함
    const sequelize = new Sequelize(
        config.dev.database, 
        config.dev.username,
        config.dev.password,
        config.dev
        )
        // 매개변수니까 순서 중요 ⭐⭐⭐
        // sequelize 를 만든 개발자들이 그렇게 순서를 부여했기
        
        // [순서가 중요한 이유]
            // 1) 이건 지금 class 정의된 걸, new 키워드를 써서, 객체를 생성 하고 있음. 
            // 2) 정의된 건 다음과 같음 
                // class se{
                //     constructor(a, b, c, d){
                //         this.database = a;
                //         this.username = b;
                //         this.password = c;
                //         this.dev = d;
                //     }
                // }

            // 3) constructor 함수를 실행하는게 new Sequelize 이고, 
                // 제대로 실행시키려면, 반드시, 분서를 맞춰야만 함 ⭐⭐⭐⭐⭐ 

const db = {};


db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 테이블 초기화
User.init(sequelize);
Post.init(sequelize);

// 연결
User.associate(db);
Post.associate(db);


module.exports = db;
