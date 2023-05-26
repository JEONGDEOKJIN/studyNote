// 토큰 만료 되는거 확인해서, 로그인 되는거 확인하기 

const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
    // 
    const {access_token} = req.session;
    console.log(access_token);
        // 이게 아예 안 받아질 것 ⭐⭐⭐⭐⭐⭐⭐ 
        // 지금은 axio 를 쓰고 잇어 
        // 

    jwt.verify(access_token , process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
        // 복호화가 되면 acc_decoded 에 성공적으로 들어온다. 

        if(err) {
            res.send("다시 로그인 해주세요")
        } else {
            req.acc_decoded = acc_decoded;
            
            // 다음 미들웨어로 실행
            next();
        }
    })
}