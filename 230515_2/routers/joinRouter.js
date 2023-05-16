const router = require("express").Router();
const {SignUp} = require("../controllers/usersController");


router.get('/' , (req, res) => {
    res.render("join");
});
    // 함수도 값임 
    // 이건, 직접 작성해서 넣은 것 
    // 익명함수


router.post('/' , SignUp);
    // 함수도 값임 
    // 선언한 걸, 넣는 것 임 
    // SignUp 함수 정의된 것이 들어온다. 
    // 여기서 Sign up 함수 정의된 부분 찾아가는거 ❓❓❓❓❓❓❓ 


module.exports = router;