// 경로 설정 할 때 path 를 많이 사용 
const path = require("path");


// webpack 의 구성 객체를 만들어서 내보내 주자 
module.exports = {

    // 진입점, 시작점 설정 
    entry : "./src/index.js" , 

    // 번들된 파일의 내보낼 옵션 (어떤 파일로 내보낼 건지)
    output : {
        filename : "bundle.js", 
        
        // 파일의 폴더 설정 (내보낼 폴더 설정)
        path : path.join(__dirname , "dist"),

    } 

}