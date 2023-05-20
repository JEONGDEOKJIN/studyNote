

// 시퀄라이즈는 init 으로 테이블 까지 만들어준다. ⭐⭐⭐


// const { timeStamp } = require("console");
const Sequelize = require("sequelize");
// const { underscoredIf } = require("sequelize/types/utils");


// User 클래스에서, sequelize 에 있는 model 을 '상속' 시킨다. 
    // cntrl 클릭해서 들어가면, 뭐가 상속되는지가 나와. 볼 수 있어. 
class User extends Sequelize.Model {
    
    static init(aa) {

        // 부모에 선언되어 있는걸 내용을 바꿨음❓❓❓ 
        return super.init( {
            // name 컬럼 만들 것 
            name : {
                type : Sequelize.STRING(20),  // 모듈에 있는 sequelize 안에 있는 string | STRING 은 VARCHAR 임 | VARCHAR == STRING | 
                                            // https://sequelize.org/v5/manual/data-types.html 여기 들어가면, 자료형 맵핑된게 있음 ⭐⭐⭐⭐⭐⭐ 
                allowNull : false,   // null 이 어도 되는지, 안 되는지 여부 | null 허용 여부 
                unique : true,      // 고유키로 사용할 것 인지 | 중복되지 않는 값
                // primaryKey : true,  // 고유키로 설정할 것 인지 여부 | unique 줬으니까, 주석함. 
            },
            age : {
                // age 컬럼을 만들어 보겠음. 
                type : Sequelize.INTEGER,        // INT == INTEGER
                allowNull : false, 
            },
            // message 컬럼을 만들 것 (오타났네)
            msg : {
                type : Sequelize.TEXT
            },
        },{
            // 테이블 자체 설정 
                // 매개변수로 전달받은 _sequelize 먼저 작성 해주고 
                // 이건 sql 접속시 필요한 정보를 담고 있게 됨. Sequelize 생성자 함수에 의해 
                // sequelize : aa, ⭐⭐⭐⭐⭐ sequelize 로 하기 싫으면 이렇게 
                sequelize : aa, 

                // 테이블에 rol 추가 했을 때, 생성시간과 업데이트 시간을 표기 해준다. 
                    // created_at 과 updated_at 이라는 컬럼이 자동 추가 된다. 
                    // 우리가 row 추가 했을 때, 시간을 기록해주고, 수정했을 때도, 시간을 기록해준다. 
                timeStamps : true,

                // 표기법을 바꿔준다.
                    // 기본표기법이 '스네이크' 인데, -> '카멜' 로 변환 
                    // created_at => createdAt 
                underscored : false, 

                modelName : "USER",      // 모듈의 이름을 설정 | 노드 프로젝트에서 사용하게 됨. 
                tableName : "users",      // 워크벤치에서 확인하게 되는 이름 | 왠만하면, '복수형' 으로 설정 ⭐⭐ 
                paranoid : false,       // paranoid 를 true 로 설정하면, delete_at 이라는 컬럼도 생성이 된다. 
                                        // true 로 설정하면, 그러면, 삭제를 하면, 1) row 가 지워지지 않고, 내용이 남아있게 됨. 2) 삭제한 시간이 표시가 됨. 
                                        // 즉, 1) 값이 남아있는데, 2) 삭제 시간이 표기 된다. 

                charset : "utf8",       // 인코딩 방식. 꼭 작성해줘야 함. ⭐⭐ 
                collate : "utf8_general_ci",         // 인코딩 방식. 꼭 작성해줘야 함 ⭐⭐ 
        } );
            // 상속 받은 super 는 부모의 함수를 실행. init 함수를 실행시켜서 반환(return).
            // 상속받은 부모의 함수를 실행시키고 반환.
            
            // init 메서드 매개변수 
                // 1) 테이블에 대한 컬럼의 내용, | 컬럼에 대한 설정값 | ex) id INT AUTO_INCREMENT PRIMARY KEY 같은 것들 
                // 2) 옵션 | 테이블 자체 설정값
    }
        // 관계형 추가 ⭐⭐⭐⭐⭐⭐ 
        static associate(db) {

            // 1 : N  란? 
                // ex) 하나의 유저가, 여러개의 글을 만드는 경우. 그 글들을 관계 맺어서 가져온다. 
    
            // 1 : N 관계 
                // 시퀄라이즈에서 1 : N 관계를 hasMany 메소드로 정의한다. 
                // hasMany 메소드는 테이블의 관계를 정의 해준다.
                // sourceKey : user 테이블 안에, 어떤 키를, foreignKey 와 연결 해줄지, 
                // hasMany 메소드의 첫 번째 매개변수로 넘긴 테이블이 foreign Key 로 연결이 되고, foreign Key 의 이름은 user_id
                
                
            db.User.hasMany(db.Post, { foreignKey : "user_id" , sourceKey : "id"})
                // 따라갈 키 : sourceKey

                // id 는 
    
        }
}


module.exports = User;