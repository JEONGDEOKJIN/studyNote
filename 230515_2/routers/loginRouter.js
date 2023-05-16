const router = require("express").Router();

const {Login , verifyLogin} = require("../controllers/usersController")


router.get("/" , (req, res) => {
    res.render("/login");
})


// post 요청했을 때, 는 여기로 오게 한다.
router.post('/' , Login)
    // 컨트롤러 쪽에서 가져온다. 


// 로그인 상태에서, 요청해야 하는 작업은 
router.get("/mypage" , verifyLogin, (req, res) => {
    // next 로 하면 여기로 넘어온다. 
    // 그러면, '검증' 이 되면 > next 실행 시켜서 > 다음 미들 웨어를 실행
    res.send("로그인 상태이고, 마이페이지 보여줄게 ")
})
    // 미들웨어 끝나고 넘어가려면, verifylogn 에서 매개변수로 next 함수 실행
    // 


module.exports = router;