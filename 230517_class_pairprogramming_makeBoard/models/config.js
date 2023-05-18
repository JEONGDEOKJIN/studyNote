// 데이터 베이스 연결 

const mysql2 = require("mysql2/promise");


const mysql = mysql2.createPool({
    user : "root", 
    password : "mysqlpwdj",
    database : "test17",
    multipleStatements : true, 
});


module.exports = mysql;