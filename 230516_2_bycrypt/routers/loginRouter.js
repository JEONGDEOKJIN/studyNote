const router = require("express").Router();
    // 실행해서 넣어준다 


const { Login } = require("../controllers/usersController");

router.get('/' , (req, res) => {
    res.render("login")
})


router.post('/' , Login)



module.exports = router;