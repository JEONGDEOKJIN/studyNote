

const Sequelize = require("sequelize");



class User extends Sequelize.Model {

    // 컬럼 내용 및 테이블 옵션 설정
    static init(seq) {
        return super.init ( {
            // 컬럼 내용 
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : false,
            }, 
            user_pw : {
                type : Sequelize.STRING(64),
                allowNull : false, 
            }, 
            profile_img : {
                type : Sequelize.STRING(128), 
                    // 맞나❓❓❓❓❓❓❓❓❓❓❓❓❓ 
                allowNull : true
            }
        } , {
            // 관련 옵션 
            sequelize : seq, 
            timestamps : true,      // 추가 수정 시간  자동 생성 
            underscored : false,        // 카멜케이스 자동 변환 
            modelName : "User",         // 노드 프로젝트에서 사용할 이름 | 조회 했을 때 들어오는 이름 | ❓❓❓❓❓❓❓ 
                // [질문] : 음... 여기가 여전히 막히네 😥😥😥😥😥😥
                // 이게 어디에 쓰였더라 
            tableName : "users",        // 데이터 베이스 테이블의 이름
            paranoid : false,       // 삭제 시간 표기할지 여부, 삭제하고 데이터를 표기❓❓
            charset : "utf8",       // 인코딩 방식
            collate : "utf8_general_ci"     // 인코딩
        })
    }

    // 다른 테이블 연계하는 곳

}

// 내보내기
    module.exports = User;