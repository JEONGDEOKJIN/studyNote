

const { User } = require("../models")   
    // db 에 넣어놨던거, 구조분해할당으로 가져온다. 

const bcrypt = require("bcrypt");


exports.signUp = async (req, res) => {
    try {
        const { name, age, user_id, user_pw } = req.body;
        const user = await User.findOne( { where : {user_id} } )
            // 이게 되려면 ⭐⭐⭐⭐⭐⭐⭐⭐  
                // 1) 로그인 할 때, signup form 태그에서 user_id 라는 name 이 있어야 하고 
                // 2) User 테이블의 열에도 user_id 라는의 feature 가 있어야 해

            // 중복 체크를 위해서 유저를 조회 한다. 
            // 그 id 가 있는지 찾는다. 

        if (user != null) {     // 값이 조회되었으면!!
            return res.send("중복된 아이디 입니다!")
        }

        // 조회된게 없으면, 회원가입 시킬 것 임. 
            // npm i bcrypt 설치 
            // 비밀번호 암호화를 위해 설치 함 
            // hashSync : 동기적으로 실행할수 있는 메소드
        const hash = bcrypt.hashSync(user_pw , 10)
                // 2의 10승으로 만든다. | 2의 10승 만큼 반복 
            // 아, 그, bycrypt 파트 잘 이해를 아직 못 했네 😥😥😥😥😥😥😥😥😥😥 
            
        // 유저 테이블에 회원 추가 
        User.create({
            name, 
            age, 
            user_id, 
            user_pw : hash, 
        });
        res.redirect('/login');

    } catch (error) {
        console.log(error);
            // 에러나면, 에러 객체 확인 ⭐⭐⭐⭐⭐⭐⭐⭐ 
    }
}