const { resolve } = require("path");
const {userInsert, userSelect} = require("../models");
    // ("../models") 이렇게 하면, index.js 를 자동으로 찾아서 내보낸다. 

const bcrypt = require("bcrypt");
const { rejects } = require("assert");


// 모듈 추가, 암호화 모듈
    // 강력한 암호화를 지원함. 
    // 쉽게 사용 가능함. 
    // 이 녀석은 메소드만 쓰면 됨. 
    // 실무에서 이걸 쓸 것 
    // bcrypt 모듈 
        // 이 기반이 crypto (버전 1에 있던거)
        // npm i bcrypt

        // 구조
            // $2a$[cost]$[salt][hash]
            // 구성요소 
                // alg
                    // 알고리즘, 이건 고정 
                    // $2a$
                // cost 
                    // 키 스트레칭 회수
                    // 10 이라고 쓰면 > 2의 10승이 된다. 
                    // 2의 ^ 으로 들어간다.
                    // 많이 사용하는 횟수가 10. 
                    // 이것보다 높이면, 많이 느려짐. > 2의 10승 = 1024번 
                // salt 
                    // 솔트를 자동적으로 만든다? 
                    // '우리가 입력한 문자열의 일부' 를 솔트로 만든다. ⭐⭐⭐⭐⭐
                    // 인코딩 된 salt 값 문자열의 일부분을 솔트값으로 쓴다. 알고리즘에서. 
                // hash 
                    // '비밀번호' 와 'salt' 값을 합해서, hash 화 시킨 값 (인코딩 된 값)
                
                // 비교하려면, 이제, 솔트? 

        // bcrypt 만든 곳 
            // 보안에 유명한 OpenBSD 에 사용 
            // 크립토 기반으로 만들어짐
            // 반복횟수를 늘려서, 연산속도를 늦출 수 있기 때문에, 연산능력이 증가해도, 공격에 대비할 수 있다. 
            // 컴퓨터의 자원은 유한하기 때문에 이게 가능 ⭐⭐⭐⭐⭐⭐ 
            // 암호화된 string 중에서, 일부분을 salt 값으로 사용하고 있다. 


        const createHash = (password) => {
            return new Promise ( (resolve, reject) => {
                // 여기는 이제 hash 를 만든다.
                bcrypt.hash(password, 10, (err, data) => {
                    if (err) reject(err);
                    resolve (data) // 에러가 없으면, 여기로 보낸다 ⭐⭐⭐⭐⭐⭐⭐ 
                })
                    // 해쉬 값을 만드는 메소드임 
                    // 매개변수 | password, 10승 만큼 반복, 
                    // salt 는 이놈이 자동으로 만든다. ⭐⭐⭐⭐⭐⭐⭐ 

            }) 
        }

        const compare = (password, hash) => {
            // password 이건 문자열 
            // hash 이건 해시화된 문자열 

            return new Promise((resolve, reject) => {
                // compare 메소드를 사용해서, 문자열과 해시값을 매개변수로 전달해주고, 
                // 유효성 검증 결과를 확인한다.
                
                bcrypt.compare(password, hash, (err, same) => {
                    resolve(same);
                        // true false 가 나온다. 
                })
                // 비교할 hash 를 넣음 
            })
        }

    // 회원가입 
        exports.Signup = async (req, res) => {
            const {user_id, user_pw} = req.body;
            try {
                const hash = await createHash(user_pw);
                await userInsert(user_id, hash);
                res.redirect('/login');
            } catch (error) {
                console.log(error)
            }
        }

    // 로그인 
        exports.Login = async (req, res) => {
            const {user_id, user_pw} = req.body;
            try {
                const data = await userSelect(user_id);
                if(!data?.user_id) {
                    return res.send("아이디 없음")
                }

                const compare_pw = await compare(user_pw, data.user_pw)
                    // 비밀번호 해시화 했을 때, 이 해시가 맞는지 확인
                    // 해쉬화한 비밀번호랑, 📛📛📛📛📛📛📛📛📛📛📛📛📛 여기가 약해 

                if (!compare_pw){
                    return res.send("비밀번호 틀림")
                }

                res.send("로그인 됨")

            } catch (error) {
                console.log(error);
            }
        }