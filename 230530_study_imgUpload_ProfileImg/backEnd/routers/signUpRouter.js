
// 모듈 설치, 미들웨어
    const routers = require("express").Router();

    // const { isLogin } = require("../mid/isLogin")
    // isLogin 연결 ✅✅✅✅✅✅✅ 


    const { Upload } = require("../mid/imgUpload")

    // signUpController.js 연결 ✅✅✅✅✅✅✅✅ 


// controller 없이 바로 여기에 회원가입 진행
    routers.post("/" , Upload.single("upload"),  (req, res) => {
        
        console.log("req 🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶")
        console.log(req)
        
        const {user_id , user_pw} = req.body;
        console.log("body 🎢🎢🎢🎢🎢🎢🎢🎢🎢🎢🎢")
        // console.log(body)

        console.log(user_id)
        console.log(user_pw)

    })



// exports
    module.exports = routers;