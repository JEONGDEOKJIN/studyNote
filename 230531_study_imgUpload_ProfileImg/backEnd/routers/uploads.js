

// 모듈 설치 밑 require
const routers = require("express").Router();

const { Upload } = require("../mid/imgUpload")



// / 경로에 대한 post 요청 처리 
    routers.post('/' , Upload.single("upload") , (req, res) => {
        const {file , body} = req;
        console.log(file, body)

        res.send("파일 저장됨")
    })
        // [해석]
            // Upload.single("upload") 기능
                // 미들웨어 임 
                // [매개변수 해석] ⭐⭐⭐⭐⭐ 
                    // Upload.single("upload") : 매개변수인 "upload" 는 form 에서 ⭐⭐  이미지 파일을 가지고 있는 것의 key name⭐⭐ 을 작성
                        // ex) index.html > form.append("upload" , file.files[0]); 이렇게 작성되어 있으므로 -> upload 를 작성
                
                // [동작 해석] ⭐⭐⭐⭐⭐ 
                    // 여기에서는, form 데이터 읽어서 
                    // 1) 타입이 file 이면, file 객체 로 넣고 
                    // 2) 타입이 객체면 body 에 담고 
                    // 3) 지정한 경로(여기서는 uploads)에 file 을 저장까지 하고 -> 그다음, (req,res) => { } 이 매개변수가 실행된다. 

        // [기타]
            // 저장할 때 (무슨말인지 모르겠음 😥😥😥😥😥)
                // 메모장에서 파일 경로를 /img 하고, + path 경로를 가져오면
                // ex) /img/upload/spdafjlkdsafj.png 이렇게 backEnd 경로를 쓴다? 

module.exports = routers