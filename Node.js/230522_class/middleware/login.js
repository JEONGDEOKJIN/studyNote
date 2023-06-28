// 목표 : board.js 를 로그인 되어 있을 때 들어갈 수 있는 페이지로 만들것임 
// 로그인 유지가 되는지 확인하는 페이지



const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
    const { access_token } = req.session;

    // 액세스 토큰이 유효한지 확인 
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
        if (err) {
            res.send("로그인 다시 하세요")
        } else {
            // acc_decoded 키를 주차갷서 값을 전달 
            req.acc_decoded = acc_decoded;
            // 다음 미들웨어 실행 ❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 

            // 유저의 토큰이 유효한 동안, 로그인이 되어 있는 것 이고, 
            // 유저가 필요한 정보도 payload 값에 있기 때문에, 
            // 복호화 해서 사용 가능 하다 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

            // so, is login 미들웨어 붙이면 > 그 다음에 사용할 수 있을거야 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

            next(); 
                // 토큰이 정상적이면, 다음 미들웨어 실행 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
        }
    })
        // acc_decoded : 해석이 되면, 여기로 복호화가 됨 
}

