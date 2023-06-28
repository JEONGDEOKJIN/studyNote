// 

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 로그인 유지 시킬 거라서, 토큰 사용할 예정 
    // npm i jsonwebtoken


exports.Login = async( req, res ) => {
    try {
        const { user_id, user_pw } = req.body;
        
        console.log('user_id 🤟' , user_id)

        const user = await User.findOne({ where : { user_id }});
        console.log( 'user🤟' , user )
            // 유저가 있는지 확인!! 

        if(user == null) {
            return res.send("회원가입한 유저가 아님!");
        }

        // 회원가입한 유저면 > bcrypt 로 비번 유효한지 검증 
        const same = bcrypt.compareSync(user_pw, user.user_pw);
            // true, false 가 반환 될 것 임. 
        
        console.log('same🥙🥙' , same)

        if(same) {
            let token = jwt.sign({
                id : user.id, 
                name : user.name,
                age : user.age,

                    // 이렇게 해서 토큰을 만들고
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "5m" // 토큰 유지 시간 
            } );
            req.session.access_token = token;
                // 만들어진 토큰에, 지금 만든 토큰 넣기 ? ❓❓ 
            res.redirect("/board")

            console.log('token🔮🔮' , token)

        } else {
            // 
            res.send("비밀번호 틀림! 비번 확인하세요")
        }

    } catch (error) {
        console.log(error)
    }
}

