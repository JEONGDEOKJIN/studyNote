const router = require("express").Router();
const { Login, verifyLogin } = require("../controllers/usersController")

router.get("/",(req,res)=>{
    res.render("login");
})

router.post('/', Login);

// 로그인 상태에서 요청해야 하는 작업은
router.get("/mypage", verifyLogin, (req,res) =>{
    res.send("로그인 상태고 마이페이지 보여줄게");
})

module.exports = router;