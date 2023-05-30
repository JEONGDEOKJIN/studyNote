
const multer = require("multer");
const path = require("path");

// multer 함수 안에 매개변수로 객체 형태의 인자를 전달
    // storage 속성을 통해서, 업로드 된 파일을 어디에 저장시킬지 지정 할 수 있다. 
exports.Upload = multer({
    storage : multer.diskStorage({
        // diskStorage 메서드 : 서버 컴퓨터의 하드 디스크에 업로드 파일을 저장한다. 
        // 객체로 인자값을 전달. 

        // destination 속성을 사용하면, '파일이 사용되는 폴더' 를 설정 할 수 있다. 
            destination : (req, file, done) => {
                // done 콜백 함수의 두 번째 인자값으로, 폴더의 이름을, 설정해주면 된다. 
                // 서버 컴퓨터 폴더명
                // 오류 내용이 있으면, 작성 해주면 된다. 
                    done(null , "uploads/")
                    // [해석]
                        // 첫 번째 매개변수는 에러 처리의 부분
                        // 두 번째 매개변수는 파일이 저장될 폴더 이름
        },     
        filename : (req, file, done) => {
            // filename 속성값에서, 매개변수 file.originalname 은 '클라이언트가 업로드한 파일의 이름' 을 나타낸다.
            // file.originalname : 사용자가 업로드한 파일 원본명
            
            // 확장자 받기 
                const ext = path.extname(file.originalname);
                // extname : '파일의 경로'를 매개변수로 받고, 파일의 '확장자'를 추출 한다. ex) png, js 등 
                
            // 파일 저장할 이름 
                // 파일 저장할 때, 이름이 같으면 (2) 막 이런게 생김 -> 그러면, 파일 이름 '예측' 이 안 되고 -> '관리 어려움' 
                // so, 파일명 겹치지 않게 하려면, '⭐그 시간에 저장⭐' 되었다는 걸 추가
                // 그러면, 겹칠 일이 없을것
                // ex) 1 이라는 이미지를 저장하는데, 20230530 이런식으로 저장 > 그러면, 동일하게 1 이름으로 저장해도, 겹치지 않게 됨. 
                const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
                    // basename 기능 | 확장자를 '추가' '제거' 할 수 있다. 
                        // ex) 1.js => 1
                        // 첫 번째 매개변수 : 파일의 경로 
                        // 두 번째 매개변수 : 옵션

            done(null , filename);
                // 첫 번째 매개변수 : 에러 처리의 부분 
                // 두 번째 매개변수 : 서버 컴퓨터에 실제로 저장할 파일명

        } 

    }),
        // 파일 사이즈 설정 (최대 파일의 사이즈 설정)
        limits : {fileSize : 5 * 1024 * 1024},      // 5MB


});

