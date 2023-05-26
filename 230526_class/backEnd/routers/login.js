

// 

const router = require("express").Router();

// const { is } = require("type-is");
const {Login ,viewUser} = require("../controllers/loginController")
const {isLogin} = require("../middelware/loginMiddleware")

router.post('/' , Login);


router.get('/view' , isLogin , viewUser)
    // 검증하고 > 해당 정보를 받아서 > 검증할 것 임. 


module.exports = router;