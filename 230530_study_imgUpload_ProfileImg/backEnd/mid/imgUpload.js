
const multer = require("multer");

const path = require("path");
    // path 를 왜 가져오지 ❓❓❓❓❓❓❓❓❓❓❓


// 'multer 함수' 안에, 매개변수로, 객체 형태의 인자를 전달 
    // storage 속성을 통해서, 업로드 된 파일을, 어디에 저장시킬지 지정 할 수 있다. 
exports.Upload = multer({
    
    // 1. '어떤 폴더' 에 '어떤 파일' 을 저장할지 
    storage : multer.diskStorage({
        // diskStorage 기능 
            // 서버 컴퓨터의 하드 디스크에 업로드 파일을 저장
            // 객체로 인자값을 전달 
        
            // '파일이 사용되는 폴더' 설정 
                destination : (req, file, done) => {
                    done (null, "uploads")
                        // done 콜백함수 의 첫 번째 매개변수 : 에러 처리 부분
                            // qeury 문 짜고, error 처리 같은 것도 할 수 있음. ❓❓❓❓❓❓❓ 
                                // 음... 이거 사실 잘 모르겠음. 
                        // done 콜백함수 의 두 번째 매개변수 : 파일이 저장될 폴더 이름 
                }, 
            // file 이름 정하기
                filename : (req, file, done) => {
                    // 확장자 추출
                    const ext = path.extname(file.originalname)
                        // [해석]
                            // path 모듈 안에 있는 extname 메소드를 사용해서, 전달받은 file 의 original name 에서 확장자만을 추출

                        // path.extname 기능
                            // '파일 경로' 를 매개변수로 받아서 > '확장자' 를 추출 ex) png, jpg 등
                        // file.originalname
                            // '클라이언트가 업로드한파일의 이름'
                            // ❓❓❓ 그러면, 파일이름은, 확장자 없이 저장되는 건가? 
                                // 파일이름에 확장자가 있는데, 날짜 값을 제목으로 넣기 위해서 이렇게 하는 듯

                    // 파일 이름이 겹치지 않게, 현재 시간 값 추가 
                    const filename = path.basename(file.originalname , ext) + "_" + Date.now() + ext;
                        // [해석]
                            // basename 메소드
                                // path 모듈 안에 있는 기능임. 
                                // 전달받은 file 의 원본 이름이 있고, 거기에, 확장자를 '추가' 하게된다. 
                                // 확장자를 '추가' 및 '제거' 할 수 있다. ex) 1.js => 1
                                // 첫 번째 매개변수 : 파일의 경로 
                                // 두 번째 매개변수 : 옵션
                                // ❓❓❓ 애초에 파일에 확장자가 있는거 아닌가? 근데, 왜 추가, 제거를 하지? 
                                // 아, 지금은 '제거' 하는 거지? 

                    // 완료하고 내보내기
                    done(null , filename)
                            // 첫 번째 매개변수 : 에러 처리 부분 
                            // 두 번째 매개변수 : 서버 컴퓨터에 실제로 저장될 파일명
                }
    }), 

    // 2. 파일 사이즈 설정 (최대 파일 사이즈 설정 )
    limits : {fileSize : 5 * 1024 * 1024}       // 5mb 임 

})