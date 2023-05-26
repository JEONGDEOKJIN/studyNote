

const router = require("express").Router();

const { boardCreate, boardView } = require("../controllers/boardControllers")
const { isLogin } = require("../middelware/loginMiddleware")

router.post('/create' , isLogin, boardCreate );

router.get('/view/:id' , isLogin, boardView );

module.exports = router