

const router = require("express").Router();

const { boardCreate, boardView , allBoardView } = require("../controllers/boardControllers")
const { isLogin } = require("../middelware/loginMiddleware")

router.post('/create' , isLogin, boardCreate );

router.get('/view/:id' , isLogin, boardView );

router.get('/mainView' , isLogin, allBoardView)

module.exports = router