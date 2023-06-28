

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// page 에서, 로그인 시도하면 > 검증해서 > 맞으면 > 1) 토큰발급 2) 로그인 시키기
    exports.loginVerify = async (req, res) => {
        try {
            // 1) page 에서 form 태그에 담아 보낸 데이터 중, id, pw 솎아내기
                const {user_id, user_pw}= req.body
            
            // 2) id 검증 
                const user = await User.findOne({where : {user_id}})
                    // 아, 이거에 해당하는 모든 데이터를 가져와서, user에 담는거네? ❓❓❓ 
            
                if (user == null) {
                    return res.send("응? 회원가입이 안 된 건데?🙅‍♂️")
                }

            // 2.5) user_grade 검증 | 승인을 받고, 'user_grade == 1' 인지 검증
                if (user.user_grade == 0) {
                    return res.send("관리자 승인을 받아야해요!👐")
                }
            
            // 3) pw 검증 : 😥😥😥 음... 잘 모르겠네 📛📛📛 
                const same = bcrypt.compareSync(user_pw , user.user_pw);
    
            // 4) 맞으면, 토큰 발행 
                // 토큰을 발행하는 이유? : 결국, 보안, 을 위해? 
    
                if(same) {
                    let token = jwt.sign({
                        // header? payload? 😥😥 
                            id : user.id, 
                            name : user.name, 
                            age : user.age,
                    }, process.env.ACCESS_TOKEN_KEY, {
                        expiresIn : "10m"
                    });
                    req.session.access_token = token;

                    res.send("로그인완료 | board 를 보여줄거에요~👍👍")

                } else {
                    res.send("비밀번호가 오류났어요😥😥")
                }
        } catch (error) {
            console.log(error)
        }
    }

