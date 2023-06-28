const Sequelize = require("sequelize");


// user클래스에 시퀄리아즈 안의 Model클래스를 상속 시켜준다.
class User extends Sequelize.Model {
    static init2(sequelize){
        // super 상속받은 부모의 함수를 실행 init 실행시켜서 반환
        // init 메서드는 첫 번째 매개변수로 컬럼의 대한 설정 값이 들어가고
        // 두 번째 매개변수로 테이블의 자체 설정 값이 들어간다.
        return super.init({
            // 컬럼의 대한 설정
            // name 컬럼x
            // VARCHAR == STRING
            // alloweNull : null을 허용할지
            // unique : 고유키로 사용할 것인지 중복되지 않는 값.
            name : { 
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
                // primaryKey : true
                // primaryKey : 고유키로 설정할 것인지 유무
            },
            // INT == INTEGER
            age : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            // TEXT == TEXT
            msg : {
                type : Sequelize.TEXT
            }
        },{
            // 테이블의 자체 설정
            // 매개변수로 전달받은 _sequelize먼저 작성 해주고
            sequelize,
            // 테이블에 row 추가 했을때 생성시간과 업데이트 시간을 표기 해준다
            // created_at과 updatad_at 이라는 컬럼이 자동으로 추가된다.
            // 우리가 row추가했을때 시간을 기록해주고 수정했을때도 시간을 기록해준다.
            timestamps : true,
            // 표기법을 바꿔준다 기본적으로 스네이크 표기법으로 되어있는데 컬럼이
            // 카멜 표기법으로 바꿔준다. created_at => createdAt
            underscored : false, 
            modelName : "User", // 모듈의 이름을 설정 노드 프로젝트에서 사용
            tableName : "users", // 복수형으로 설정해주자 왠만하면 추가될 테이블의 이름
            paranoid : false, // paranoid true로 설정하면 deleted_at이라는 컬럼도 생성이 됩니다. 값이 남아있는데 삭제 시간이 표기 된다.
            charset : "utf8", // 인코딩 방식 꼭 작성해줘야함
            collate : "utf8_general_ci" // 인코딩 방식 꼭 작성해줘야함 
        });
    }
    static associate(db){
        // 1 : N : 예) 하나의 유저가 여러개의 글을 만드는 경우

        // 1 : N 관계
        // 시퀄라이즈에서 1 : N 관계를 hasMany 메서드로 정의 한다
        // hasMany 메서드는 테이블의 관계를 정의 해준다.
        // sourceKey : user테이블 안에 어떤 키를 foreignKey와 연결 해줄지.
        // hasMany 메서드의 첫번째 매개변수 넘긴 테이블이 foreignKey 연결이 되고 이름은 user_id다.
        db.User.hasMany(db.Post, { foreignKey : "user_id" , sourceKey : "id"});
    }
};

module.exports = User;