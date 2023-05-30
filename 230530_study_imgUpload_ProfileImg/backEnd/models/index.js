

const Sequelize = require("sequelize");

const config = require("../config")

const User = require("./users")


// config 활용해서, sequelize 객체, 만들기 
    const sequelize = new Sequelize(
        config.dev.database, 
        config.dev.username, 
        config.dev.password, 
        config.dev
    )
    // Sequelize 생성자 함수에서 요구하는 대로 매개변수 순서를 넣어야 함 ⭐⭐⭐⭐⭐ 
    // sequelize 라이브러리를 만든 개발자들이, 그렇게 정의해두었기 때문. 


// config 랑 쿼리문 날릴 수 있는 class 랑, 하나의 객체에 모으기  
    const db = {}

    db.sequelize = sequelize;
    db.User = User;
    
// 테이블 초기화 ⭐⭐⭐⭐⭐
    User.init(sequelize);
        // init 메소드에, config 정보를 넣으면, 이게, 접속하고, 컬럼열, 테이블 옵션이 설정된 상태

// 다른 테이블과 연결 

// 내보내기 
    module.exports = db;