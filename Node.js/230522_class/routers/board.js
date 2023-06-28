

const router = require("express").Router();

// 미들웨어 가져오기 
    const { isLogin } = require("../middleware/login")

    const { 
        boardMain , 
        boardView, 
        createBoard, 
        updateBoard, 
        boardDel } = require("../controller/boardController");

    // const { Model } = require("sequelize");



router.get('/' , isLogin, boardMain)
    // 로그인 유무를 확인하고 > 통과하면 > 그 다음 boarmain 실행 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐  
    // 로그인 안 되면 > "다시 로그인 하세요"


router.get('/view/:id' , isLogin, boardView);

router.post('/create_board' , isLogin , createBoard);   
    // liLogin 통화해서 createboRAD 가능 

router.post('/view_update/:id' , isLogin, updateBoard);

router.get('/del/:id', isLogin, boardDel);


module.exports = router;