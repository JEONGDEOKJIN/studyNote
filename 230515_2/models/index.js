
const {userInit, userList, userInsert, userSelect, userPwUpdate, userRefresh, userDelete} = require("./usersModel");
    // ❓ 이렇게 가져오는거 잘 이해가 안 돼 




userInit();
    // 테이블이 있는지 확인하고 > 없으면, CREATE TABLE



// async function test() {

//     userList();
//         // users 테이블에 있는 모든 데이터를 return 함

//     // userSelect(1)
//         // id 를 넣으면 > 뭔가가 나와야 함 (😥 아직 안 돼)  

//     // userInsert("aaa" , "12311")
//         // id, pw 를 기입하면 > 회원 가입 됨

//     // userPwUpdate("aaa" , "bbb");
//         // aaa 유저의 비번을 bbb222 로 변경 😥😥😥 | 안 되는데 

//     // 되는지 확인  😥😥😥 안 되네 
//     userDelete("test1")

// }


// test();

module.exports = { userList, userInsert, userSelect, userPwUpdate, userRefresh, userDelete };
