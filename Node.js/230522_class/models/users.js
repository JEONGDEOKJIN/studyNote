
const Sequelize = require("sequelize");


class User extends Sequelize.Model{
    static init( sequelize ) {
        return super.init( {        // 부모의 기능을 가져와서 쓴다. 
            // 컬럼의 내용 
                name : {
                    type : Sequelize.STRING(20), 
                    allowNull : false, 
                }, 
                age : {
                    type : Sequelize.INTEGER, 
                    allowNull : false, 
                } , 
                user_id : {
                    type : Sequelize.STRING(20),
                }, 
                user_pw : {
                    type : Sequelize.STRING(64), 
                        // 암호화 해서 저장할 것 이기 때문에, 64 로 함
                }

        }, {
            // 테이블의 내용
                sequelize, // 매개변수로 전달 받은 것 ⭐⭐⭐ 
                timestamps : true,  // 생성시간, 업데이트 시간 자동으로 생성, 
                underscored : false,    // 카멜케이스 자동으로 변환 시킬지 유무
                modelName : "User",      // 모델 이름
                tableName : "users",        // 복수형 ⭐⭐⭐ 으로 테이블 이름 설정 
                paranoid : false,       // 삭제 시간 생성 유뮤 // true 면, 값은 데이터 베이스에 있고, 삭제한 시간만 있음. 
                charset : "utf8",       // 인코딩 방식 == 필수 설정해야 함. 
                collate : "utf8_general_ci"     // 인코딩 방식 == 필수 설정해야 함.

        } ) 
    }

    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : "user_id" , sourceKey : "id"});
            // 😥😥😥😥😥😥😥😥  좀 더 이해 필요 📛📛📛📛📛📛 
    }
}


module.exports = User





