

const {User} = require("../models");
const bcrypt = require("bcrypt")


exports.signUp = async (req, res) => {
    try {

        const {user_id , user_pw} = req.body;

        const user = await User.findOne({
            where : {user_id}
        })

        if (user != null) {
            return res.send("중복 회원 가입이야!")
        }

        const hash = bcrypt.hashSync(user_pw , 10);     // 10번 동안 반복해라 

        await User.create({
            user_id, 
            user_pw : hash, 
            profile_img : "http://localhost:8001/img/ad5191be-fea8-4398-b6a9-2d7e86c0e77c_1685429277257.jpg",
            // 이미지 경로를 이렇게 넣는게 맞나❓❓❓❓❓ 

        })

        res.redirect("http://127.0.0.1:8001/frontEnd/login.html")
            // 이 경로가 맞나❓❓❓❓❓ 

    } catch (error) {
        
    }

}
