const router = require("express").Router();


const { signUp } = require("../controller/signUpController");       // 들어가서 잘 됐는지 확인 


router.get('/' , (req, res) => {
    res.render('signUp');
});


router.post('/' , signUp );


module.exports = router;