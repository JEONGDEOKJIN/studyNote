const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root",
    password : "admin1234",
    database : "test14",
    multipleStatements : false
});

module.exports = mysql;