const mysql = require("./config");
    // 이렇게 하면, config 에서 만든거 바로 가져올 수 있음. 



exports.userInit = async () => {
    try {
        await mysql.query("SELECT * FROM users")
    } catch (error) {
        await mysql.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128) )" )
    }
}

exports.userSelect = async (user_id) => {
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?" , [user_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}


exports.userInsert = async(user_id, user_pw) => {
    try {
        // 일단 중복되는 id 인지 확인 먼저 하기 
        const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?" , [user_id])

        if (user.length != 0) {
            // 이미 존재하는 아이디 
            let err = new Error ("중복 아이디임")
            console.log(err)
            return err
                // 중복 아이디면 에러 문구 띄우기
        }

        // 중복되지 않았으면, 회원가입 정상적으로 시키기 
        await mysql.query("INSERT INTO users(user_id, user_pw) VALUES(?, ?) " , [user_id, user_pw]);
    
    } catch (error) {
        console.log(error)
    }
}