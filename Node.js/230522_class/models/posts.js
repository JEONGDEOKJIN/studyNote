const Sequelize = require("sequelize");


class Post extends Sequelize.Model {

    static init(sequelize) {
        return super.init( {        // 부모의 기능을 쓰는 것 == 부모가 원하는 매개변수를 넣는 것
            // 컬럼 설정
                msg : {
                    type : Sequelize.STRING(20), 
                    allowNull : false, 

                }
        } , {
            // 테이블 설정
                sequelize, 
                timestamps : true, 
                modelName : "Post", 
                tableName : "posts",        // 이게 왜 복수? 어떻게 디버깅?  ❓❓❓❓❓❓❓❓❓❓❓❓❓ 
                paranoid : false,
                charset : "utf8", 
                collate : "utf8_general_ci"

        } ) 
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : "user_id" , targetKey : "id"});
    }

}


module.exports = Post;