const { error } = require("console");
const {userList,  userSelect, userRefresh, userInsert, userDelete, userPwUpdate} = require("../models")
    // ❓❓❓❓❓❓❓ 폴더를 불러오는데, 파일 반환은 module.exports = { userList, userInsert, userSelect, userPwUpdate, userRefresh, userDelete };
    // 이거 가져올 때, cnrtl + space 


const jwt = require("jsonwebtoken");

exports.userList = async (req, ret) => {
    try {
        const data = await userList();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// 회원가입 
    exports.SignUp = async (req, res) => {
        const {user_id, user_pw} = req.body;
        try {
            await userInsert(user_id, user_pw);
            res.redirect('/login');
                // 회원가입하고, login 페이지로 redirect 시킴
        } catch (error) {
            console.log(error)
        }
    }


// 로그인 
exports.Login = async () => {
    const {user_id , user_pw} = req.body;

    try {
        const data = await userSelect(user_id);
        // 유저 조회가 되었으면, user_id 가 있을거야! 
        if(!data?.user_id) {
            // 아이디가 없는 경우
            return res.send ("아이디 없음")
        }

        // 통과 해서, 아이디가 있는 경우
        if(data.user_pw !== user_pw) {
            return res.send("비밀번호 틀림")
        }

        // 여기 까지 통과하면, 로그인 성공

        // 로그인 되면 > accessToken 발급
        const accessToken = jwt.sign({
            user_id : data.user_id, 
            mail : "user1@naver.com", 
            nick : "user1"
        }, process.env.ACCESS_TOKEN_KEY, {
            // OPTION 
            expiresIn : "5s", 
        });


        // 로그인 되면 > refresh token 발급 
        const refreshToken = jwt.sign({
            // payload 
            user_id : data.user_id
        }, process.env.REFRESH_TOKEN_KEY, {
            // option 
            expiresIn : "20s", 

        })

        await userRefresh(user_id, refreshToken);
        req.session.access_Token = accessToken;
        req.session.refresh_Token = refreshToken;
        res.send({access : accessToken, refresh : refreshToken});

    } catch (error) {
        console.log(error);
    }
}


// 여기에서, refresh 토큰도 만들고, 데이터베이스도 추가하고 


// 검증 기능을 이곳에 만든다. 
// 유저 토큰 검증 
exports.verifyLogin = async (req, res, next) => {
    // 다음 미들웨어로 넘어간다 
        // next(); 
        
    // 다음 미들웨어로 넘어가지 않는다. 
        // res.send("여기서 끝")

    // 세션 값을 가져오기 
    const { access_Token, refresh_Token } = req.session;
    jwt.verify(access_Token , process.env.ACCESS_TOKEN_KEY, (err, acc_decode) => {
        if (err) {
            // access token 이 썩었으면, refresh 토큰도 썩었는지 검사
            jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_KEY, async (err, ref_dedoced) => {
                if (err) {
                    console.log("refresh 토큰 만료")
                    res.send("다시 로그인 하세요")
                } else {
                    // 중복 로그인 방지
                    const data = await userSelect(ref_dedoced.user_id);
                        // 여기 awiat 쓰려면, 위에 aync ❓❓❓❓❓❓❓❓❓❓❓❓
                    if(data.refresh == refresh_Token) {
                        // 마지막으로 로그인 한 사람이 맞으니까, access token 재발급 
                        const accessToken = jwt.sign({
                            user_id : ref_dedoced.user_id, 

                        }, process.env.ACCESS_TOKEN_KEY, {
                            expiresIn : "5s"
                        })
                        req.session.access_Token = accessToken;
                        console.log("액세스 토큰 재발급")

                        next(); // 재발급 했으니까 다음것
                        
                    } else {
                        // 다르다는 것, 접속한게 아니라는 것 
                        res.send("중복 로그인 방지")
                    }

                }
            })
            
        } else {
            // access 토큰이 정상이면 
            console.log("로그인 정상 유지중")
            next(); // 다음 미들웨어 실행
            
        }
    })
}
    // next 함수를 실행시키면, 다음 미들웨어로 이동 
    // 즉, verifyLogin 에서 멈출거냐 > 더 나아가서 다음 매개변수까지 하게 할거냐 의 문제

    // [해석] 
        // 즉, refresh 토큰이 살아있으니까 > access token 이 다시 생기고 
        // 엣지로 브라우저 더 키고 > localhost:8010 복붙해서 로그인 > 그러면, 현재 로그인 된게 끊김 ⭐⭐⭐ 
        // 왜냐면, 현재 refresh 토큰이, 크롬, 에 있기 때문 ❓❓❓❓❓ ⭐⭐⭐⭐⭐ 