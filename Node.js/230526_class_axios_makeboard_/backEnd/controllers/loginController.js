const { User } = require("../models");

// 로그인 bcrypt, jsonwebtoken 설치 

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.Login = async (req, res) => {
    
    // findOne 못 찾으면 터지니까 try catch
    try {
        const {user_id, user_pw} = req.body;
        const user = await User.findOne({where : {user_id}});
        
        if(user == null) {
            return res.send("가입 안 한 아이디임");
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);

        const {name, age, id} = user;

        if(same) {
            let token = jwt.sign({
                // 페이로드 
                name,  
                age, 
                id

            }, 
            // key 가 들어감
            process.env.ACCESS_TOKEN_KEY , 
            // 옵션이 들어감
            {
                expiresIn : "20m"
            })
            req.session.access_token = token;

            // return res.send("로그인 완료")  // 이렇게 해도 되고 

            return res.redirect("http://127.0.0.1:5500/frontEnd/main.html")
                // redirect 를 보내면, 브라우저가 받음 
                // / 이걸 붙이면, 서버주소 부터 를 의미 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
                // 여기서 '/' 경로의 의미는 '백엔드의 도메인 경로 루트' 임 
                // 따라서, 프론트의 경로를 작성해주자 > http://127.0.0.1
                // 이렇게 redirect 를 할게 아니면, 프론트에서 응답 받은 값으로, '조건 분기 처리' 해서, 페이지를 반환 시켜주면 됨 ⭐⭐⭐⭐⭐ 
                // [결론]
                    // ⭐⭐ 여기에 '배포된 프론트의 경로' 를 써야 함 
                    // 프론트 경로는 html 에서 라이브 서버 키고 > 복사해서 > 가져오기 http://127.0.0.1:5500/frontEnd/main.html

        } else { 
            return res.send("비밀번호 틀림");
        }
    } catch (error) {
        console.log(error)
    }
}


exports.viewUser = async(req, res) => {
    
    const {acc_decoded} = req;
    console.log("👍👍👍" , acc_decoded);
        // 이게 비어있을 텐데, 그게 무얼 하면 할 수 있다고❓❓❓ 

    const user = await User.findOne({ 
        where : {name : acc_decoded.name}
    })

    // json 형태로 데이터를 응답 ⭐⭐⭐⭐⭐ 
    res.json(user);
        // 이걸로 내보내서 axio 가 get 해서 그리는거 
}


