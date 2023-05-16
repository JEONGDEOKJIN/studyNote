// 유저관련 회원가입, 로그인 관리하는 기능 


const mysql = require("./config");
    // config 에서 내보낸게 들어오게 됨 ❓❓❓❓❓❓❓❓ 


// 테이블 만들기 
exports.userInit = async () => {
    try {
        // users 테이블이 있는지 확인 
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        const sql = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(20), refresh VARCHAR(255))"
        await mysql.query(sql);
    }
}
    // exports 객체로 내보내는게 이게 이해가 안 돼 😥😥😥😥😥 



// 유저 조회 만들기 등등 

exports.userList = async() => {
    try {
        const [result] = await mysql.query("SELECT * FROM users");
            // 필요한 값은 첫 번째에 들어있기 때문에 이렇게 구조분해할당
            console.log(result)
            return result

    } catch (error) {
        console.log(error)
    }
}


exports.userSelect = async(user_id) => {
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?" , [user_id]);
        console.log(result[0])
        return [result[0]]
            // [[result]] 이렇게 변수 선언하면 > return result 이렇게 해도 된다 ⭐⭐⭐⭐⭐⭐⭐ 

    } catch (error) {
        console.log(error);
    }
}

// 유저를 추가 해주는 거 
    // 원래는 유저의 고유 넘버가 있어야 함 
    // 그런데, 넘버를 가만히 두고, 
    // 이미 있는 유저인지 확인하면서 진행하자 
exports.userInsert = async(user_id , user_pw) => {
    try {
        // 이미 가입한 아이디 인지 확인 
        const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?" , [user_id]);
        if (user.length != 0) {
            // 이미 가입한 아이디임 (중복 아이디임)
            
            // 에러 객체 생성
                // new 동적할당으로 에러 발생시킴
            let err = new Error("중복된 아이디임")
                // 오류의 내용으로 string 들어간다. 
                // 그러면, 어느 줄에서 에러 났는지, 확인 가능 
                // ⭐⭐⭐ 중복 가입 방지 
            console.log(err)
            return err;
        }   

        // 조건문 통과 했으면, 해당 id 가 없는 것 임. 
            // so, 회원가입 시켜주자 
        await mysql.query("INSERT INTO users (user_id , user_pw) VALUES(? , ?)" , [user_id, user_pw]);
            // 이렇게 새롭게 행을 추가? | 행 추가 ❓❓❓ 
    } catch (error) {
        console.log(error)
    }
}


exports.userPwUpdate = async(user_id , user_pw) => {
    try {
        await mysql.query("UPDATE users SET user_pw = ? WHERE user_id = ?", [user_pw, user_id])
    
    } catch (error) {
        console.log(error);
    }
}

// 크립토 
    // 단방향 암호화 임 
    // 맞는지, 검증만 할 수 있어 
    // 복호화해서, 확인을 못 해 
    // 비밀번호를 변경할 수 있지만, 찾기는 안 만든다. 
    // 이제는 단방향 암호화, 
    // 이제, 비밀번호 변경만 할 수 있음. 
    // 그래서, '단방향' '변경' 만 하면 됨. 


// 다른 브라우저에서 로그인 했을 때, 바꿔주는 것 
exports.userRefresh = async(user_id , refresh) => {
    try {
        await mysql.query("UPDATE users SET refresh = ? WHERE user_id = ?" , [refresh, user_id]);
    } catch (error) {
        console.log(error);
    }
}

exports.userDelete = async(user_id) => {
    try {
        await mysql.query("DELETE FROM users WHERE user_id = ?; SET @CNT = 0; UPDATE users SET users.id = @CNT:=@CNT+1; ALTER TABLE users AUTO_INCREMENT = 0;" , [user_id])
    } catch (error) {
        console.log(error)
    }
}
    // 함수들이 제대로 동작하는지 체크하고 > 라우터 만들것 임 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐