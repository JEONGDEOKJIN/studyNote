

// 해야 하는 것 
    // sequelize 활용해서, Post class 를, 쿼리가 가능한 상태로 만들고, export

const Sequelize = require("sequelize")


class Post extends Sequelize.Model {

    static init (sequelize) {
        return super.init ( {
            // column 설정 
                msg : {
                    type : Sequelize.STRING(20),
                    allowNull : false,
            }
        } , {
            // table 자체 설정
                sequelize, 
                timestamps : true,
                modelName : "Post", 
                tableName : "posts",    // 이게 아마도, 테이블 이름 
                paranoid : false,       // true 면, 삭제 되어도 데이터가 남아있다❓❓❓❓❓ 
                charset : "utf8",       // 필수 ⭐⭐ 
                collate : "utf8_general_ci"     // 인코딩 : 필수 ⭐⭐ 
        } )
    }

    static associate (db) {
        db.Post.belongsTo(db.User, {foreignKey : "user_id" , targetKey : "id"})
    }
}

module.exports = Post