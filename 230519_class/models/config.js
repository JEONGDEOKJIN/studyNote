
const dot = require("dotenv").config();


const config = {
    dev : {
        user : process.env.USER, 
        password : process.env.PASSWORDS, 
        database : process.env.DATABASES,       // ⭐⭐ key 이름을 변경하면, 여기도 변경 
        host : process.env.HOSTS,
        
        // USERNAME : "root",
        // PASSWORD : "mysqlpwdj",
        // DATABASE : "test18",
        // HOST : "127.0.0.1",

        // 사용하는 데이터 베이스 
        dialect : "mysql"
    }
};


console.log(config);
module.exports = config;