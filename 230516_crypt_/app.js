// 오늘까지 하면, 로그인, 회원가입 마스터 가능 

// 비밀번호 암호화를 crypto 로 

// 비밀번호를 만들 때, 단방향 암호화를 사용. 


// 🔷 암호화
    // 암호화는 '단방향' 과 '양방향' 이 있음. 

    // '단방향' 은 '한쪽 으로만'. 
        // 즉, 원본값을 알아낼 수 없음 (복호화가 불가능) > 따라서, '안전' 함. 

        // '단방향 암호화' 는 복잡한 알고리즘으로 암호화 시킴. 
        // so, 원본값을 복호화 할 수 없다. 

    // '양방향' 은 '복호화' 가 가능하다. 
        // 데이터를 전송할 때, 데이터를 암호화해서, 안전하게 전달할 때 사용. 
        // 비밀번호는 유효 검사만 함. 

        // 원본값을 복구는 아니고, 그 값을 비교만 해서 맞는지 확인 ⭐⭐⭐⭐⭐⭐ 
        // 네이버 같은 사이트는, 비밀번호 찾기를 시도하면, 원본을 알려주지 않고, 변경하라고 시킴. 
        // 이 녀석들도 비밀번호값을 몰라 
        // 비밀번호를 알려주거나, 메일로 알려주지 않고, 비밀번호 변경을 시켜줌. 
        // 원본 비밀번호를 알 수 없기 때문에. ⭐⭐ 

        // 복호화는 암호문을 원본으로 변경해주는 것. 
            // 인코딩된 걸, 원본으로 
            // 복호화는 되는데, 왜 원본은 모르지❓❓❓❓❓❓❓❓❓ 

    // crypto 모듈을 사용해서, 암호화를 만들어보자. 
        // crypto 는 node.js 내장모듈 
        // 기본적인 암호화 알고리즘 기능을 제공함. 
        // crypto 는 단방향? 양방향? 


    const crypto = require("crypto");

// const { resourceUsage } = require("process");

    // 임의의 비밀번호를 변수에 담아두자
        const pw = "123adsfasdfsafdsadf"

    // 해시 객체 생성 
        // 해시에 사용할 알고리즘을 매개변수로 전달 
        let hashA = crypto.createHash("sha256")
        // 해시화 라는 건? 
            // 알고리즘을 통해, 데이터를 고정된 크기의 고유한 값으로 바꿔주는 것 
            // ex) 문자열을 일정한 크기의 것으로 변경하는 것. ❓❓❓
            // 이렇게 해서, 해시 문자열을 뽑아내기 위해
        // sha256
            // 이 알고리즘은 '데이터'를 '256비트의 고정 크기 해시값' 으로 변환해주는 알고리즘 
            // 원본 데이터의 길이에 상관없이, 항상 256 비트(32바이트) 의 해시값을 생성한다. 

            // 64자리의 16진수로 표현
            // 16진수는 컴퓨터 주소, 색상 코드, 암호화, 컴퓨터 메모리 주소 등등에 사용
                // 컴퓨터(2진수) 와 사람(10진수) 사이에, 소통할 수 있는 진수
            
            // 16진수를 구하는 법
                // 10 진수는 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 
                // 16 진수는 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F 10(16은 10으로 침)
                
                // 10진수를 16으로 나누고, 나머지를 16진수로 표현. 
                // 나눈 몫을 0 이 될 때 까지 반복. 
                
                // 30 을 16진수로 변환 
                    // 1E
                    // 30 나누기 16 > 몫 1, 나머지 14 임.
                    // 16진수에서 14 는 E 에 해당. 
                    // 몫이 1 을 16으로 나누면, 나머지가 1 > 이걸 16진수에서는 1에 해당 
                    // SO, 1E

    // 비밀번호를 해시객체에 넣어주자 
        // let hashing = hashA.update(pw); 
            // 매개변수로 암호화 시킬 문자열

        // console.log(hashing)
            // hashing 을 확인하면, [Symbol(kFinalized)]: false  : 아직 해싱(인코딩) 이 안 되어서 false 가 나옴 
            // 해싱(인코딩) 완료하려면, digest 메소드 사용(매개변수로 반환받을 인코딩 방식 지정). 그러면, 해시값을 반환하면서, 해싱(인코딩)이 완료. 

        // let hashString = hashing.digest("hex")
            // '매개변수로 반환받을 인코딩 방식' 을 16진수로 지정
            // 해시값을 16진수의 문자열로 반환

        // console.log(hashString)
            // a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
            // 2936b3e7517cd6ff51db31fe07144b174a504228ffa6b0feaa57bd474ceaa022 (비번을 좀 더 늘린 경우)
            // pw 를 변경해도 > 고정된 길이로 나온다. ⭐⭐⭐⭐⭐ 

            // 문제는, 똑같은 문자로 만들면, 똑같은 결과값이 나온다. 📛 
                // ex) pw 에 abc 넣으면 > 해시값 끝이 항상 022 가 된다. ⭐⭐⭐⭐⭐ > 이러면 탈취의 위험성이 있음
            
            // 이걸 해결하기 위해, salt 값을 사용해서, 예측이 불가능한 데이터를 만들어준다. 
                // 'salt 값'으로 랜덤 값을 우리가 만들어서, 원본의 데이터에 추가해서 암호화 시켜주는 것. 
                // salt 값으로 추가했기 랜덤값을 추가했기 때문에, 예측이 어려움. 
                // salt 값을 지정했다면, .env 에 넣어주면 됨. 
                // 다만, '지정' 할 일은 없을 것 임. 


        // 🔷 salt 값을 만들어보자.
        
            // 난수 생성 메서드를 사용해서, salt 값을 만들어 보자. 
                // crypto.randomBytes(32, (err, result) => {
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         console.log(result.toString("hex"));
                //             // 랜덤값이 계속 생김 

                //             // '버퍼 객체' 가 나오니가, result 를 16진수로 변경
                //     }
                // })
                // 32 | 32 비트의 길이로 만들고 싶어. | 32비트 길이의 '랜덤한 byte' 가 생성



        // 이렇게 난수를 만들어서, 회원가입 할 때, 계정마다 salt 값을 주고, 사용하는 방법도 있다. 
            // (salt 값을 데이터 베이스에 같이 저장)
            // 그러면, 모든 pw 가 '고유의 salt 값' 을 갖고 있게 할 수 있다. 
            // '계정마다', '고유의 salt' 값을 갖게 된다. ⭐⭐⭐⭐⭐  
            // 사람들마다, salt 값을 다르게 


    // 🔷 salt 값을 만들어주는 함수 
        
        const createSalt = () => {
            // 버퍼객체가 나온다. 
            // 버퍼객체가 나오면, 암호화에 시간이 좀 걸림 
            // 따라서, promise 로 비동기 처리 할 것 임 

            // PROMISE 에서 기다리고, 기다렸다가, 밑에 처리를 할 수 있게
            // resolve 는 then, reject 는 catch 로 잡는다. 
            return new Promise( (resolve, reject) => {
                crypto.randomBytes(64 , (err, result) => {
                    if (err) reject (err);
                        // 실패하면, err 객체 reject 메소드로 반환
                    resolve (result.toString("hex"))
                        // 성공하면, resolve 메서드로, 결과를, 16진수로 변환해서 변환
                        // 이런 솔트 값을 추가해서, 예측 불가능하게 함 
                })
                    // 랜덤 바이트 길이는 64바이트
            
            } )
        }


    // 키 스트레칭 
        // 일부러 오래 걸리게 만들어서, 해킹하는 걸 어렵게 
        // 어떻게 오래걸리게 하냐면, 해시함수를 반복시킨다. > 일부러 오래 걸리게 한다. 
        // 해킹 시도할 때, 비밀번호를 대입해서 시도할 때, 암호화 작업을 일부러 오래 걸리게
        // 해시화 함수를 일부러 오래!! 
        // 비밀번호를 대입하는 공격을 힘들게 만든다. 
        // 해킹범 짜증나게 하자

    // 키 스트레칭 쓰기 위한 메소드 
        // pbkdf2 메서드 사용해서, 키 스트레칭 기법 사용

    const createHash = (salt, password) => {
        return new Promise( (resolve, reject) => {
            crypto.pbkdf2(
                // 해싱할 값 을 문자열로 전달 
                password, 

                // 추가할 랜덤 난수, salt 값
                salt, 

                // key 스트레칭 반복 횟수
                    // 반복 횟수가 많아질 수록, 암호화가 어렵고, 시간도 오래 걸린다.  
                165133, 

                // 해시값의 바이트, 64바이트,  
                64, 

                // 해시화 시킬 알고리즘 
                "sha256", 

                // 콜백 함수 
                (err, hash) => {
                    if (err) reject(err);
                    resolve(hash.toString("hex"));
                }
            )
        })
    }

    const test = async () => {
        const salt = await createSalt(); // 랜덤 난수 생성 
        const hash = await createHash(salt, pw)
            // pw | 위에서 만든 더미 패스워드
        console.log(hash);
    }

    test();
        // 7b3548687b4947e95fa03c8213938bace5987e3fe8cae5473bd21294da1a358b1aab4a07347b1a0ff6e505ff501727a45992a4777f4d2f429798fc49be4f7c7c
        // 이게 비밀번호로 뽑혀짐. 
        // 이게 sql 에 저장되게 됨. 원본값이 뭔지 모름. 
        // 이 비밀번호가 맞는지 보려면, salt 값이 필요해 
        // salt 값 + 위에서 만든 pw 있으면 확인 가능 ⭐⭐ 


// 🔷 간단하게 회원가입 만들기 
    // 이번 방식 : salt 값을 각각의 회원마다 갖게 한다. 

    // 프로젝트 시작 
        // 1. packjson 
            // npm init -y
        // 2. 사용할 모듈 
            // express mysql2 path(내장모듈) ejs 
        // 3. 서버객체 만들고, 서버 대기 상태 
        // 4. view 엔진 | 파일 경로 설정, view 엔진으로 ejs 사용
        // 5. body 객체 사용 


    const express = require("express");
    const path = require("path");

    const mysql2 = require("mysql2/promise");
    // 요약하면 'mysql2/promise'는 ⭐'비동기 처리'⭐ 하기 위해서 해줘야 함 
        // Promise 및 async/await 구문을 사용하여,
        // 보다 관리하기 쉬운 방식으로 MySQL 작업을 관리하기 위해 
        // MySQL2 라이브러리의 Promise 기반 버전을 가져오는 데 사용됩니다.
        
    // const { userInfo } = require("os");
    // const { create } = require("domain");

    const app = express();

    app.set("views" , path.join(__dirname, "page"));
    app.set("view engine" , "ejs");

    app.use(express.urlencoded({extended : false}));

    const mysql = mysql2.createPool({
        user : "root", 
        password : "mysqlpwdj", 
        database : "test13", 
        multipleStatements : true
    })


    // 테이블 초기화 
        const usersInit = async () => {
            try {
                await mysql.query("SELECT * FROM users")
            } catch (error) {
                await mysql.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128) , salt VARCHAR(128) )")
            }
        }

    usersInit();

    app.get("/" , (req, res) => {
        res.render("join")
    })


    app.get("/login" , (req, res) => {
        res.render("login");
    })


    app.post("/join",  async (req,res) => {
        const {user_id, user_pw} = req.body;

        // 랜덤 난수 받기
        const salt = await createSalt(); 

        // 비밀번호가 될 해시값
        const hash = await createHash(salt, user_pw)

        await mysql.query("INSERT INTO users (user_id, user_pw, salt) VALUES(?,?,?)" , [user_id, hash, salt]);
            // 비밀번호를 이제 hash 로 쓴다 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
            // 그대로 비밀번호를 넣는게 아니라 hash화 된걸 넣는다 
            // 이렇게 저장되면, 123 이 > 이상한 값이 되고 > 원래 값으로 뽑을 수 없어 

            // 로그인 할 때 비교하려면, salt 값을 알고 있어야 함. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
            // 이 사람만의 salt 값임. 

        res.redirect('/login')
    })


    app.post('/login' , async (req, res) => {
        const {user_id, user_pw} = req.body;

        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?;" , [user_id]);
            // 있으면 결과 있을 것 
            // 없으면 없을 것 

        if (result[0]?.salt) {
            const salt = result[0].salt;
            const hash = await createHash(salt, user_pw)
                // 입력한 비밀번호  salt 로 hash 값을 만든다. 

            // 지금 만든 hash 값이랑, 지금 조회한 유저의 pw 랑 같으면 > ⭐⭐⭐⭐⭐⭐⭐⭐ 여기가 어려워 
            if(hash == result[0].user_pw) {
                res.send("로그인 됨")
            } else {
                res.send('비밀번호 틀렸음')
            }
        } else {
            res.send("유저 없음.")
        }

    })

    app.listen ( 8050, () => {
        console.log("8050 에서, 듣는중🚀")
    })