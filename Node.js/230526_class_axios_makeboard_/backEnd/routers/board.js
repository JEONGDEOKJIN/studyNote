

const router = require("express").Router();

const { boardCreate, boardView , allBoardView, myPage, myPageView, findUserID } = require("../controllers/boardControllers")
const { isLogin } = require("../middelware/loginMiddleware")

router.post('/create' , isLogin, boardCreate );

router.get('/view/:id' , isLogin, boardView );

router.get('/mainView' , isLogin, allBoardView)


// 단순히 경로 안내
// router.get('/mypage/:id' , isLogin , myPage );

// axios 요청에 따른 data 보내기
router.get('/mypage/view' , isLogin , myPageView );

module.exports = router

