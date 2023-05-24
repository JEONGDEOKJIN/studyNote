
// 전역변수 및 모듈 임포트 

const { User } = require("../models/index")

const bcrypt = require("bcrypt")


// 회원가입 메인 화면 보여주기
    exports.signUpMain = (req, res) => {
        
        // 우선 보이는지 확인
        res.render("signUp")
        
    }



// 회원가입 메인화면에 적은 데이터 가져와서 Mysql 에 저장하기 
    exports.signUpCreate = async (req, res) => {

        try {
            // page 데이터 가져오기
            const {user_id , user_pw, name, age} = req.body

            // sequelize 활용해서 저장시키기 
                // 1) 우선, 저장 된게 있는지 확인
                    const result = await User.findOne( {where : {user_id}} )

                    if(result != null) {
                        res.send("이미 가입 된거 같아😌")
                        // console.log("이미 가입 되었슈!")
                    }

                // 2) 이미 저장된게 없으면, page 에서 받은 pw 를, hash 화 하기
                    const hash = bcrypt.hashSync(user_pw, 10)
                        // hashSync 는 '동기적으로 실행' 할 수 있게 해주는 '메소드' 
                        // async, await 와 같은? 

                // 3) hash화 한 pw + page 에서 받은 데이터를 sql에 저장 
                    await User.create({
                        user_id : user_id, 
                        user_pw : hash, 
                        name : name, 
                        age : age, 
                        user_grade : 0, 
                    })
                        // ❓ 여기에서 Model > user.js 에서 column 설정한 대로 key 에 넣어야 ?
                
                // 4) 가입 완료되면 login 으로 가게 하기
                    res.render('/login')

                // 5) 관계가 잘 설정됐는지 확인



        } catch (error) {
            console.log(error)
        }
    }