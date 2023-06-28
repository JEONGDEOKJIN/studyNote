const {userInit , userInsert, userSelect } = require('./usersModel')
    // usersModel 안에서 usersinit 을 내보냈으니까
    // 여기에서 cntrl space bar 눌러서 가져올 수 있어 ⭐⭐⭐⭐⭐  

userInit();

module.exports = {userInsert, userSelect};