const { Model, DataTypes } = require("sequelize");
    // npm i sequelize
    // DataTypes : 필드의 데이터 유형 설정 

class User extends Model {

    static init (sequelize) {
        return super.init(
            {
                // 유저 아이디 
                user_id : {
                    type : DataTypes.STRING, 
                    allowNull : false,
                }, 

                // 유저 패스워드 ?
                // 그러면, 유저 패스워드가 필요한가? 

            
            } , {
                sequelize,      // 현재 데이터베이스의 sequelize 를 받음 
                underscored : false,        // 모델 필드에 snake_case 적용할지 여부
                timestamps : true,      // createdAt, updatedAt 필드를 추가할지 여부
                modelName : "Users",        // sequelize 내부에서 
                tableName : "users",        // DB 에서 사용할 테이블 이름
                charset : "utf8",       // 인코딩 관련 
                collate : "utf8_general_ci"         // 인코딩 관련 
            }
        )
    }

    // static associate(db) {
    //     db.User.hasMany(db.Real_estate, { foreignKey : "seller", sourceKey : "id"});
    // }

}

module.exports = User;