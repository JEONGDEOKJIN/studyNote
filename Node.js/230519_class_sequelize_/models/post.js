
// POST 테이블 도 하나 더 만들기 

const Sequelize = require("sequelize");


    // Sequelize 안에 있는 Model 을 상속
class Post extends Sequelize.Model {
    static init (sequelize) {
        // init 첫 번째 매개변수 : 컬럼의 내용 
        // init 두 번째 매개변수 : 테이블의 내용
        return super.init( {
            msg : {
                type : Sequelize.STRING(100), 
                allowNull : false
                
            }
        } , {

            sequelize, 
            timestamps : true, 
            modelName : "Post", // ⭐⭐⭐⭐⭐       e.dataValues.Posts = e.dataValues.Posts.map( (i) => i.dataValues ); 여기에서 Posts 가 되는 이유 

            tableName : "posts", 
            charset : "utf8",       // 인코딩 꼭⭐⭐
            collate : "utf8_general_ci"     // 인코딩 꼭⭐⭐

        } );
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
            
        // belongsTo 메소드를 사용해서, user 테이블에 타겟id 를 foreign key 로 연결한다. 
            // 유저의 id 가 따라갈 키가 참조키는 user_id
            
        db.Post.belongsTo(db.User, { foreignKey : "user_id" , targetKey : "id"})
            // source key 로 아이디를 지정하고 
            // targekey 로 연결해서 따라갈 수 있게❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 

            // post 테이블이 어딘가에 속하고 싶어 - 어디? - User 테이블 
            // 어떻게 연결? 1) foreignKey 
            // https://shareg.pt/yutwHf9 이걸 보자 ⭐⭐⭐⭐⭐ 


    }
}


module.exports = Post;