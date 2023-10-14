const router = require("express").Router()

const { Login } = require("../controllers");

router.post("/" , Login);
    // ✅ 현재 프로젝트에서 post 요청을 해야하는 건지는 잘 모르겠음. 

module.exports = router;