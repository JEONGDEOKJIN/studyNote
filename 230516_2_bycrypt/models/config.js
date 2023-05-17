const mysql2 = require("mysql2/promise")
    // promise 하는 이유가 뭐지❓❓❓❓❓❓❓❓❓❓ 
    // createPool 이걸 해서, 

const mysql = mysql2.createPool({
    user : "root", 
    password : "mysqlpwdj",
    database : "test14", 
    multipleStatements : false

})


module.exports = mysql
    // 다른 파일에서 이 파일의 반환값을 이제 받을 수 있음