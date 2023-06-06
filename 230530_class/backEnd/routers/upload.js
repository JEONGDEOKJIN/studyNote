const routers = require("express").Router();


const { Upload } = require("../mid/imgUpload");


// upload.single
// form 읽어서 타입이 FILE이면 FILE 객체에 담아주고
// 타입이 객체면 BODY 객체에 담아준다.
routers.post("/" ,  Upload.single("upload") , (req, res) => {
    const {file , body} = req;

    console.log(file, body);
    // 데이터 베이스에 이미지 경로를 추가 

    // 저장할 때 
        // 메모장에서 파일 경로를 /img 하고 + path 경로 가져오면 
        // ex) /img/upload/spdafjlkdsafj.png
        // 이러면, back 엔드 경로를 쓰고 

    res.send("파일 저장됨");
})


    // Upload.single 
        // 매개변수 : ("form 에서 저장한 파일의 name 의 인풋을 전달")
        // 매개변수 : form 에서 이미지 파일을 가지고 있는 input 의 name 을 작성해준다. 


module.exports = routers