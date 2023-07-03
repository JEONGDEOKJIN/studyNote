

const path = require("path")


// html-webpack-plugin 의 기능 
    // html 파일을 만들어줌 
    // 어플리케이션에 포함된 번들을 관리하는 프로세스를 만들어줌 
    // 주로, 리액트 같은 어플리케이션을 작성할 때, 주로 사용 
    // SPA 같은 어플리케이션을 쓸 때 사용 


const HtmlWebpackPlugin = require("html-webpack-plugin");

// webpack 구성 객체 내보내기 
    module.exports = {
        // 개발 모드 설정 (development 으로 하면, 빌드할 때 시간을 최적화 단계를 건너뛰고, 나중에 최적화 할게~ 라는 말) 
            mode : "development",   // 실제로 배포할 때는, 배포 모드! 로 하면 된다

        // 진입점 , 시작점 
            entry : "./src/index.js",

        // 모듈의 규칙 
            module : {
                rules : [
                    {
                        // test : .js .jsx 확장자를 가진 파일에 대한 규칙을 설정 
                        test : /\.(js|jsx)$/,
                        
                        // node_modules 폴더를 제외하고 파일 처리 
                        // 제외할 폴더 
                        exclude : /node_modules/,
                            // 여기에 제외할 파일 
                        
                        // babel-loader 를 이용해서, 파일을 번들링 한다. 
                        use : ["babel-loader"],
                    }
                ]
            }, 

            // 플러그인 설정
            plugins : [
                // HtmlWebpackPlugin 사용해서, index.html 을 번들링 폴더에 생성
                new HtmlWebpackPlugin ( {
                    template : "src/index.html",
                    filename : "index.html",
                })
            ], 

            // 번들링 된 것을 내보낼 속성 
            output : {
                // 번들 파일 이름 
                filename : "bundle.js", 

                // 경로 설정 
                path : path.join(__dirname , "dist"),
            }

    }