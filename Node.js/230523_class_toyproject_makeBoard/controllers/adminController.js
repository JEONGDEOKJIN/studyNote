

// 전역 변수 및 모듈 
const { User } = require("../models")


// 관리자 페이지 들어오면, 사람들 게시글이 다 보이는 화면 보여주기
    exports.adminMain = async (req, res) => {
        // 1) 현재 가입된 모든 유저 가져오기
            const data = await User.findAll();
        
        // 2) result 에서 필요한 것 솎아내서 > 객체로 만들기
            // console.log( "result.dataValues.User👉👉" , result.dataValues )
            // 이게 필요한 줄 알았는데, 우선, ejs 로 보내보기
            // 여기에서 솎아내는게 아니라, 

        // 3) 기본 admin 화면 보여주기 | 여기에 data 넣을 거야 ✅✅✅ 
            res.render("admin", {data : data})
    }


// 승인버튼 누르면, > user_grade 가 1이 되어서 > 로그인 할 수 있게 하기
    exports.adminUserApprove = async (req, res) => {
        // 0) 해당 유저의 user_id 를 가져온다. 
            // console.log("어떻게 id 가져올 수 있지🥪🥪" , req)
            // console.log("acc_decoded 🚀🚀" , acc_decoded)
            // const {acc_decoded} = req;
            // const {id} = req.params.id;
            const {id} = req.params.id
            console.log("req.params.id👉👉👉" , req.params.id)
            

        // 1) 해당 유저의 grade 값을 1로 수정한다. 
            // 이 쿼리는 정상작동 🔵
            await User.update( {user_grade : 1}, {where : {id  : id}} )

        // 2) 그 다음엔? 
            // grade 가 1로 변경되었으니까, 그렇다고 보여져야 겠지. 

    }