// 

const Sequelize = require("sequelize");
// const { sequelize } = require("");
// const { timeStamp } = require("console");
// const { charset } = require("mime-types");

class Users extends Sequelize.Model {
    static init(seq) {
        return super.init( {
            // 컬럼 내용 
                name : {
                    type : Sequelize.STRING(20), 
                    allowNull : false
                } , 
                age : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                }, 
                user_id : {
                    type : Sequelize.STRING(20),
                    allowNull : true,
                },
                user_pw : {
                    type : Sequelize.STRING(64),
                    allowNull : true
                }
        } , {
            sequelize : seq, 
            timestamps : true,  // 추가 수정 시간 자동 생성 
            underscored : false, // 카멜케이스 자동 변환
            modelName : "User",  // 노드 프로젝트에서 사용할 이름 | 조회 했을 때 들어오는 이름 
            tableName : "users",    // 데이터 베이스 테이블의 이름
            paranoid : false,       // 삭제 시간 표기 할지 여부 
            charset : "utf8",       // 인코딩 방식 
            collate : "utf8_general_ci"     // 인코딩 
        } )
    }

    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : "user_id" , sourceKey : "id"})
    }
    // [2차 해석] ⭐⭐⭐⭐⭐⭐⭐⭐
        // foreignKey | 마음대로 이름을 지어줘도 된다. 
            // 이게 Post 에서 오른쪽에 '열' 이 생기게 된다. 
            // 그러면, 이 숫자가 의미하는걸 뭐로 할거냐? 라고 했을 때, 그건 sourckey 인 id 가 된다. 
            // sourcekey 는 해당 테이블의 primary key 여야 한다. 
            // sequelize 에서 특별한 설정을 하지 않으면, primary key 는 id 가 되고 1씩 증가한다. 
                // 특정 열을 primarky 키로 설정하면 -> sourcekey 는 해당 열을 primarkey 로 해줘야 한다. 

    
    
    // [해석]
    // User.belongsTo | 연결작업에서 User 테이블 관련 작업 하겠다.  
    // db.Post | User 테이블과 Post 테이블 연결 작업을 하겠다.  
    // foreignKey | "user_id" | Post 테이블에서, 연결 후 만들 새로운 column은 user_id 다. 
    // sourceKey | foreignKey 에 제공하는 데이터는, User 테이블의 id 에서 가져간다. ⭐⭐⭐ 

}


module.exports = Users