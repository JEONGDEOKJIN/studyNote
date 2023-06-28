const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root", 
    password : "mysqlpwdj", 
    database : "test12", 
    multipleStatements : true,  // 다중 쿼리문 사용 가능 
})

// 밖으로 내보내기
    module.exports = mysql;
