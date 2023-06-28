const config = {
    dev : {
        username : process.env.DATABASE_USERNAME, 
        password : process.env.DATABASE_PASSWORD, 
        database : process.env.DATABASE_NAME,
        host : process.env.DATABASE_HOST,      // 나중에 배포를 하게 된다면, host 공간에, '데이터 베이스 주소' 를 입력해줄 예정 ⭐⭐⭐⭐⭐ 
                        // 지금은 로컬에 있는 주소니까, 127.0.0.1 넣었음
        dialect : "mysql",
    }
}

module.exports = config;