

const Sequelize = require("sequelize");


class Post extends Sequelize.Model {

    static init(seq) {
        return super.init ( {
            // 컬럼내용
            msg : {
                type : Sequelize.STRING(20), 
                allowNull : false
            } 
        } , {
            // 옵션
            sequelize : seq, 
            timestamps : true,      // 추가 및 수정한 시간 자동 생성 
            underscored : false,        // 카멜케이스 자동 변환
            modelName : "Post",         // 노드프로젝트에서 사용할 이름 | 조회했을 때, 들어오는 이름 ❓❓❓ 
            tableName : "posts", 
            paranoid : false,       // 삭제 시간 표기 할지 여부 
            charset : "utf8",       // 인코딩 
            collate : "utf8_general_ci"         // 인코딩
        } )
    }

    // Post 테이블과 User 테이블과 연결
    static associate(db) {
        db.Post.belongsTo(db.User , {foreignKey : "user_id" , targetKey : "id"});
    }
        // [해석]
            // Post.belongsTo | post 테이블을 기준으로 이제, 연결 하겠다. 
            // db.User | Post 테이블과 연결할 테이블은 User 테이블이다. 
            // foreignKey | "user_id" | Post 테이블에서, 연결 후 만들 새로운 column은 user_id 다. 
            // targetKey | user_id 열에 User 테이블의 id 열에 있는 값과 같다고 보게 연결시킨다. 

    // 그러면, post 테이블을 만들어야 하는데, 그 설정은 어디서? 


}


module.exports = Post;

