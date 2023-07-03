

const path = require("path");
const { output } = require("../webpack01/webpack.config");

// 웹팩 구성 객체 내보내기 
    module.exports = {
        // 진입점, 시작점
        entry : "./src/index.js",

        // 모듈의 규칙 설정 (번들링 할 때의 규칙 설정)
        module : {
            rules : [{
                // test : 파일 확장자와 일치하는 정규식의 키
                    // .css 확장자의, css 확장자를 가진 규칙을 설정
                test : /\.css$/,
                    // use 확장자에 맞는 파일을 처리할 때 사용할 로더를 지정
                    // style-loader, css-loader 를 사용할 것 임. 
                    // CSS 파일을 번들링 할 것 임. 
                use : ["style-loader" , "css-loader"], 
            }
            ]
        },

        // 번들링된 파일 내보내기 속성
        output : {
            // 내보내는 파일의 이름
            filename : "bundle.js",

            // 내보내는 파일의 경로
            path : path.join(__dirname , "dist")

        }

    }


    // 내부적으로 이런 설정들이 다 되어 있음. 
    // 어디에서 확인 할 수 있지? 