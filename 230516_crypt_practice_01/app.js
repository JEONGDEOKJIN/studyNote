

// 🔷 기본 설정 
    // package.json 만들고, start 설정 
        // npm init -y 
    // 사용할 모듈 | express mysql2 path(내장모듈) ejs 
    // 서버 | 서버 객체 만들고 > 대기 상태 로 만들기
    // view 엔진 | 파일 경로 설정, view 엔진 사용을 ejs 로 설정
    // 미들웨어 | body 객체 사용 


// 🔷 전역 변수 
const express = require("express")
const path = require("path")
const crypto = require("crypto")

const mysql2 = require("mysql2/promise");
    // 📛📛📛📛📛📛📛 이게 문법적으로 지금 잘 모르겠음. 

const app = express();


// view 엔진 디렉토리 소스 경로를 page 로 
    app.set('views' , path.join(__dirname , "page"));
    // 😥😥 이게 항상 매번 좀 해석이 완전하지 않네 

// view 엔진을 ejs 로 설정
    app.set("view engine" , "ejs");

// 미들웨어 | body 객체 사용 할 수 있게 | 깊은 탐색 안 되게 설정
app.use(express.urlencoded({extended : false}))


// salt 만드는 함수
    const createSalt = () => {
        // 암호화에 시간이 좀 걸리기때문에 
        return new Promise((resolve, reject)=>{
            // 랜덤 바이트 길이는 64
            crypto.randomBytes(64, (err, result)=>{
                if(err) reject(err);
                // 실패시 err 객체 reject메서드로 반환
                // 성공하면 resolve 메서드로 결과를 16진수로 변환해서 반환
                resolve(result.toString("hex"));
            })
        });
    };

// hash 만드는 함수
    const createHash = (salt, password) => {
        return new Promise((resolve,reject)=>{
            crypto.pbkdf2(
                password, // 해싱할 값을 문자열로 전달
                salt, // salt 값
                165165, // 키 스트레칭 반복 횟수 반복횟수가 많아질수록 어렵게 암호가 되는데 시간도 오래 걸린다.
                64, // 해시값의 바이트 64 바이트
                "sha256", // 해시화 알고리즘
                (err, hash)=>{
                    if(err) reject(err);
                    resolve(hash.toString("hex"));
                }
            )
        })
    }



// 🔷 model | data 영역
    // mysql 연결
        const mysql = mysql2.createPool({
            user : "root", 
            password : "mysqlpwdj", 
            database : "test14_1", 
            multipleStatements : true // 복수 쿼리문 가능 여부 
        })

    // 테이블 초기화 
        // 아이디를 검색해서 > 아이디가 있으면 > 있네 
        // 없으면 > 테이블을 새로 그려줘 
        const userInit = async () => {
            try {
                await mysql.query("SELECT * FROM users");
            } catch (error) {
                await mysql.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128), salt VARCHAR (128) )")
            }
        }
            // 지금 이 방식은 '변수에 함수를 할당' 하는 거지❓❓❓❓❓❓❓ | 좀 약한 문법들이 있네 
        userInit();


// 🔷 라우팅 

    // '/' 요청 처리 
        app.get("/" , (req, res) => {
            res.render("join");
        })

    // '/join' 요청 처리
        
        // id/pw 기입해서 post 요청을 하면 > 중복처리 등을 확인하고 > 회원 가입 승인, sql 에 저장한다.   
            app.post("/join" , async (req, res) => {
                // req 에서 user_id, user_pw 분리 
                    const {user_id, user_pw} = req.body

                // id 중복 등 검사 (회원가입 시켜도 될만한지 검사)
                    // 음... 지금 생각해보면, 이런 흐름으로 해야할 것 같긴 한데, 이번엔 조금 단순화 되었네. 

                // hash값 생성 = 사용자가 기입한 pw + salt 가 암호화 되었다. 
                    const salt = await createSalt();
                    const hash = await createHash( salt, user_pw );
                        // 회원가입 창에서 유저가 기입한 패스워드와 salt 를 더해서, hash 로 만들었음. 

                // ⭐로그인 검증에 필요한 데이터 sql 에 저장⭐
                    // [생각해볼 것]
                        // 이 순간, 'sql 저장 여부' 를 결정할 때, '⭐로그인 검증에 필요한 데이터 인지 여부⭐' 인지가 '유일한 기준' 인지는 모르겠음. 
                        // 다만, 지금 이 순간엔, 중요한 기준이 된다고 생각함. 
                        // 서버는 '자기가 하게 될 행동' 에 필요한 데이터라면, 저장하게 된다. ⭐⭐⭐ 
                    await mysql.query("INSERT INTO users (user_id, user_pw, salt) VALUES(?, ?, ?)" , [user_id, user_pw, salt])
                        // 이미 users 테이블이 만들어져 있는 상황에서, 그 열에 맞춰서, 데이터를 넣어주면 된다, 고 본다. 
                        
                        // ⭐⭐ [지금 이 순간 salt를 sql에 저장하는 이유는] ❓❓❓❓❓ ⭐⭐
                            // '⭐로그인 시도 시, 유효한 패스워드 인지 검증⭐' 할 때, 필요하기 때문.
                            
                            // '패스워드 검증' 이 어떻게 이루어지는데?  
                                // 1) 시도하고 싶은 id 와 pw 를 기입
                                // 2) '기입한 pw + salt' 를 hash 함수에 넣고, 해시값을 도출.
                                // 3) 기존 sql에서 저장된 pw(해시값 형태) 와 '기입한 pw 에서 salt 를 더해 만들어낸 pw' 값이 일치하는지 확인한다.  
                                // 4) 일치하면, 유효한 pw 가 된다. 

                // 회원가입 완료 했으니까, 로그인 창으로 이동 시키기 
                    res.redirect('/login');
        })

    // '/login' 요청 처리 
        
        // get 요청 
            app.get('/login' , (req, res) => {
                res.render('login')
            })

        // post 요청
            // [이곳에서 할일]
                // 1) 요청했을 때 기입한 id, pw 받아온다. 
                // 2) id 가 sql 에 있는지 확인 
                    // sql 에 없으면 > 그런 id 없다. 회원가입 해라 라고 말해줌.  
                // 3) 해당 id 에 해당하는 pw 가 기입 된건지 확인.
                    // '기입된 pw + 해당 id 의 salt 로 hash 만들고' vs '해당 id 의 pw값(hash)' 비교
            app.post('/login' , async (req, res) => {
                const {user_id, user_pw} = req.body;

                const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?;" , [user_id]);
                    // ❓❓❓❓❓❓ 여기 result 에 값을 넣는 건 예상을 못 했는데 

                // id 체크와 동시에, pw 검증 시작
                    // 조건부 하나로 끝난다는게 진짜 신기하다 ⭐⭐⭐⭐⭐⭐ 
                    // id 체크 조건문과 pw 검증 조건문이 ⭐중첩⭐ 되어 있어 ⭐⭐⭐⭐⭐ 
                if(result[0]?.salt) {
                    const salt = result[0].salt;
                    const hash = await createHash(salt, user_pw);   
                        // 로그인 시도자의 pw 와 sql 에 저장된 salt 로 만든 '검증를 기다리고 있는' hash⭐⭐⭐⭐⭐ 
                    
                    console.log(`로그인 시도자의 해시화된 pw : ${hash}`)   // 
                    console.log(`sql 에서 꺼내온 hash : ${result[0].user_pw}`)      // sql 에서 예전에 저장되었다가, 꺼내온 hash

                    if(hash === result[0].user_pw) {
                        // result[0].user_pw | sql 에서 가져온 해당 id 의 pw임. 
                        res.send("로그인 됨~")
                    } else {
                        res.send("비밀번호 틀렸음~")
                    }
                } else {
                    res.send("id 없는 걸로 나오는데? ")
                }

                // 40, 38 // 창문 있고, 화장실 있고, // 
                // 창문이 아예 없음, 화장실 없음,  // "28" // 


            })


// 서버 대기
    app.listen(8080, () => {
    console.log("8080 에서 먹고 있어요🥪")
})

