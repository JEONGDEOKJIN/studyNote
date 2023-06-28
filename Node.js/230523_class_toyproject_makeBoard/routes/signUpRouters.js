

const { signUpMain , signUpCreate } = require("../controllers/signUpController")
    // ❓❓❓❓❓ 여기에서 왜 객체구조분해할당으로 가져와야만 하지❓❓❓❓❓ 
    // exports 자체의 특징? 


// 모듈 받아오기, 전역변수
    const router = require("express").Router();


// '/signUp' 처리 
    router.get('/' , signUpMain);

    router.post('/' , signUpCreate);



// router exports 
    module.exports = router;