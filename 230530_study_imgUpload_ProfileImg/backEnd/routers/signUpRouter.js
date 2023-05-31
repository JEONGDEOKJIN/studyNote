
// 모듈 설치, 미들웨어
    const routers = require("express").Router();

    // const { isLogin } = require("../mid/isLogin")
    // isLogin 연결 ✅✅✅✅✅✅✅ 

    const { signUp } = require("../controllers/signUpController")
    const { Upload } = require("../mid/imgUpload")

    // signUpController.js 연결 ✅✅✅✅✅✅✅✅ 


// // controller 없이 바로 여기에 회원가입 진행
//     routers.post("/" , Upload.single("upload"),  (req, res) => {
        
//         console.log("req 🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶")
//         console.log(req)
        
//         const {user_id , user_pw} = req.body;
//         console.log("body 🎢🎢🎢🎢🎢🎢🎢🎢🎢🎢🎢")
//         // console.log(body)

//         console.log(user_id)
//         console.log(user_pw)

//     })


    routers.post("/" , Upload.single("upload") , signUp)
    // 이렇게 가져오면 그러면, 미들웨어는 어떻게 되는거지? 
    // 미들웨어의 file 이랑 body 객체는 전달되나? 음 
    // 위에 테스트결과 body 객체에 있으니까, 괜찮을거 같은데



// exports
    module.exports = routers;