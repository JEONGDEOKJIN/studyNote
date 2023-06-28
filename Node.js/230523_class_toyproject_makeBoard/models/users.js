

const Sequelize = require("sequelize");

class User extends Sequelize.Model {

    static init (sequelize) {
        return super.init ( {
            // column 설정 
                name : {
                    type : Sequelize.STRING(20),
                    allowNull : false,
                }, 
                age : {
                    type : Sequelize.INTEGER,
                },
                user_id : {
                    type : Sequelize.STRING(20),
                }, 
                user_pw : {
                    type : Sequelize.STRING(64),     // 암호화 해서 할 것 이기 때문에 좀 더 길게 했음. 
                }, 
                user_grade : {
                    type : Sequelize.INTEGER,       
                        // 0 등급 == 회원가입 전
                        // 1 등급 == 회원가입 직후, 게시글 2개 미만 
                        // 2 등급 == 게시글 2개 작성 이후 
                }

        } , {
            // 테이블 설정 해주기 
                sequelize,   // 매개변수로 전달받음 , ❓❓❓ 여기로, config 에서 연결한 것들이 들어오나❓❓❓ 
                timestamps : true,      // 생성시간, 업데이트 되는 시간
                underscored : false,
                modelName : "User",     // 모델 이름은 어디에 써먹는거지?❓❓❓❓❓❓❓ 
                tableName : "users",    // 복수형으로 table 이름 설정 ⭐⭐⭐ 
                paranoid : false,       // 삭제 시간 생성 유무, | true 면, 삭제 했을 때, 값은 데이터 베이스에 있고, 삭제한 시간만 남음 
                charset : "utf8",      // 인코딩 필수
                collate : "utf8_general_ci"     // 인코딩 필수
        } )
    }
    
    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : "user_id" , sourceKey : "id"})
            // 아직 이해 부족😥😥 
    }
}


module.exports = User