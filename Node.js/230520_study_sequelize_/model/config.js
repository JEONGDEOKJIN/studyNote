
const dot = require("dotenv").config();

const config = {
    dev : {
        username : process.env.USER, 
        password : process.env.PASSWORDS,  // ⭐⭐ key 이름을 변경하면, 여기도 변경 ❓❓
        database : process.env.DATABASES,  
        HOSTS : process.env.HOSTS, 

        dialect : "mysql"       // 사용하는 데이터 베이스
    }
}

module.exports = config;