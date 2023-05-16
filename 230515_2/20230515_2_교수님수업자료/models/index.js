const {userInit,userList,userInsert,userSelect,userPwUpdate,userRefresh,userDelect} = require("./usersModel");

userInit();

// async function test(){
//     userDelect("aaa");
// };

// test();

module.exports = {userList,userInsert,userSelect,userPwUpdate,userRefresh,userDelect};