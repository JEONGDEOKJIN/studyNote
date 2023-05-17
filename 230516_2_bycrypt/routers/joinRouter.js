
const router = require("express").Router();
    // 라우터 가져온다 ❓❓❓❓❓❓❓❓❓❓❓❓❓ 


const { Signup } = require("../controllers/usersController")

router.get('/' , (req, res) => {
    res.render('join')
})

router.post('/' , Signup)
    // Signup | 이걸 안 쓰면, 익명함수를 쓰게 되는데, 익명함수 한 쓰고, 이걸 쓰게 됨. 
            // | 이것만 써도, 그 안에, req, res 가 있기 때문에 


module.exports = router;