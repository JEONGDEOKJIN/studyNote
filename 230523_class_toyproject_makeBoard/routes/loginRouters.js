
const router = require("express").Router();

const { loginVerify } = require("../controllers/loginController")


// '/' 경로로 들어오면, 로그인 페이지 보여주기
    router.get('/' , (req, res) => {
        res.render("login")
    })


// '/' 경로에서, post 요청 들어오면, 로그인 처리 controller 중 loginVerify로 보내기 
    router.post('/verify' , loginVerify )


module.exports = router;