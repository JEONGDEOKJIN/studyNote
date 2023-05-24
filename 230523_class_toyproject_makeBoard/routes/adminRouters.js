
// 모듈 및 전역 변수 가져오기
    const router = require("express").Router();

    const { adminMain , adminUserApprove} = require("../controllers/adminController")



// 관리자 메인 화면 보여주기
    router.get('/' , adminMain);

// 승인합니다. 버튼 누르면 > 등급올려서, 로그인 될 수 있게 하기
    router.post('/approve' , adminUserApprove)


// exports 
module.exports = router;