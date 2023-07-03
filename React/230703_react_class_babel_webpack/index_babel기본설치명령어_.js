// babel.js
    // 자바스크립트 코드의 변환을 도와주는 도구 
    // 자바스크립트를 컴파일, 해주는 도구
    // 자바스크립트 문법이 진화를 꾸준히 했고, 
    // ES5 -> ES6 로 문법이 개발되고, 
    // ES6 문법이 개발되었는데, ES5 에서 개발한 것들을 모두, 변환하기 힘들었음. 
    // 그래서, BABEL 로 문법을 쉽게 고쳐서 쓰려고 변환시켜 준다. 



// 모듈 시스템 (ES5 에서 내보내는 경우)
    // common js 에서는  
        // 1) 내보낼 때 : module.exports  
        // 2) 가져올 때 : require 사용 

    // a_내보내는파일.js 
        // const text = "하이하이";
        // module.exports = text;
    
    // b_가져오는파일.js 
        // const {text} = require ("a.js")
        // console.log(text);



// ES6 문법에서의 모듈 시스템 
    // a.js 에서 먼저 내보낸다. 
    const text = "하이하이";

    // 첫 번째, 내보내는 법 : export {text};
        // 여러개를 내보낼 경우
    
    // 두 번째, 내보내는 법 : export default text 
        // 단일로 내보낼 경우 



    // b.js 에서 받는 것 
    // 1) import {test} from "a.js"
    // 2) import text2 from "a.js"
            // 이름을 변경해서 사용해도 됨import text from "a.js"
    // console.log(text)


    // babel 기본 사용법
        // babel 은 기본적으로, 자바스크립트로 구성, 되어 있다. 
        // npm 을 통해, 설치 가능. 

    // babel 설치 ⭐⭐⭐⭐⭐ 
        // 1. babel 기본 구성 설치 
            // 1) $ cd babel01 // 해당 폴더로 이동 (먼저 bable 폴더가 설치되어 있어야 함✅✅)
            // 2) npm init -y // package json 기본 설정 

            // 3) npm install @babel/core @babel/cli @babel/preset-env

            // 4) npm install @babel/plugin-transform-modules-commonjs (bebel2 의 경우는 이것도!)


        // 2. babel 의 환경구성 
            // .babelrc 만들기 
            // .babelrc 에서 rc 는 'run commands, run control 등의 의미' 
                // 환경 구성 할 때 만드는 파일이 rc 가 붙는다. 

            /* 설정할 때, json 으로 설정 
            
            {
                "presets" : [@babel/preset-env]
            }

            */


        // 3. babel 실행 
            // 1) npx babel [변환할 파일명] --out-file [내보낼경로]        
                // npx babel app.js --out-file dist/app.js

                // $ npx babel server.js --out-file dist/server.js (babel2 의 경우이렇게)

        // 4. babel rc 맞춰주기!
            //  bebel 02 : "plugins" : ["@babel/plugin-transform-modules-commonjs"]
                // a

        // 5. 시사점 
            // es6 로 적은 문법을 es5 로 변환해줌
            // bable 의 역할 : js 를 정상적으로 변환해준다!  



// babel03 : jsx 문법 컴파일 하기 
    // 1. babel 기본 구성 설치 
        // 1) $ cd babel03 // 해당 폴더로 이동 (먼저 bable 폴더가 설치되어 있어야 함✅✅)
        // 2) npm init -y // package json 기본 설정 
        // 3) npm install @babel/core @babel/cli
        // 4) npm install @babel/preset-react (이걸 babel rc로)

    // 2. 컴파일 
        // 1) npx babel [변환할 파일명] --out-file [내보낼경로]        
            // npx babel app.js --out-file dist/app.js


// 🔹 webpack 
// babel 코드 자체를 변환할 때, 단일 파일을! 변환할 때!

// webpack 
    // 의의 
        // 모듈 번들러임. 
        // 모듈 번들러 = 여러 파일을 하나의 파일로 구성(번들링) 해주는 것
        // ex) 1번.js 2번.js 3번.js 이것들을 모두 가져온다. 👉 ⭐하나의 파일⭐로 구성해준다.  

// 모듈 
    // 모듈은 프로그램을 구성할 때, 구성요소로, 관련된 데이터나 함수를 '하나로' 묶은 단위. 

    // user 
        // user.controller
        // user.service 
        // user.view
        // 이런 기능들이 쪼개져 있다고 해보자. 
        // 이런 것들이 하나당 모듈임. 
        // 이 모듈로 만든걸, 하나로 합쳐주는게 번들러
        // 번들러는 의존성을 가지고 동작하는 모듈 코드들을, 하나의 파일로 만들어주는 것. 

    // webpack 속성 
        // CF. babel 속성은 1) preset 2) plugin 을 사용  
        // webpack 의 속성 
            // 1) entry : 진입점을 지정. 시작점으로 사용할 모듈을 webpack 에 알려줌 
            // 2) output : 내보내는 번들링 방법을 결정. 생성한 번들링 파일의 위치, 이름을 설정 
            // 3) loaders : 번들링 중에, 모듈의 소스 코드에 적용되는 자바스크립트, css, 이미지 파일을 처리
            // 4) plug-in : 웹팩을 사용할 때, 추가 기능 사용시, 번들 최적화. | 어떤 플러그인을 쓸지를 작성해줘야 함. 
                // html 파일 생성이나, 환경 변수 삽입 등등


// webpack 기본 사용 
    // 공부 해야하는 이유 : 굳이 설치 안 해도, 이것들이 설치되는구나 라고 알아야 
    
    // 1. 관련 패키지 설치 
        // npm init -y  // packagejson 기본 설정
        // npm install webpack webpack-cli  // 웹팩이랑, 웹팩 cli 설치 

    // 2. 프로젝트 생성 |번들링할 구조 만들기 
        // 1) src 폴더 만들것임. 이 안에 파일을 작성하고, 번들링 진행할 것 임. 

        // 2) webpack 의 설정 파일 
            // webpack.config.js

    // 3. 실행 
        // npx webpack


// 🔹 webpack02 

    // loaders 속성을 사용해서 '다양한 유형의 파일'을 모듈화 할 수 있음.
    // css 파일, image 파일 등등을 번들링 해보자. 

    // 1. 패키지 설치 
        // 폴더는 webpack02 로 이동
        // npm init -y
        // npm install webpack webpack-cli css-loader style-loader
            // css, style 로더를 라이브러리로 넣은 것 임. 

    // 2. 프로젝트 구성 
        // src 폴더에 index.css, index.js 두 파일 생성 
    
    // 3. webpack.config.js 추가 

    // 4. npx webpack 로 실행  
        // 그러면, 
            // 1) dist 폴더 생기고, 
            // 2) bundle.js 에 합쳐진 css 파일들이 있어 



// 🔹 webpack03 

    // webpack plugin 사용해서, 'html 파일' 을 만들어볼 것 임
        // 1. 패키지 설정
                // 폴더는 webpack03 로 이동
                // npm init -y
                // npm install webpack webpack-cli html-webpack-plugin

        // 2. 프로젝트 구성 
            // src 폴더에 app.js, index.html, index.js 두 파일 생성 


        // 3. babel 설정 
            // 1) babelrc 파일 을 webpack 폴더 안에 만들기 
            /* 
            {
                "presets" : ["@babel/preset-env" , "babel/presets-react"]
            }
            */

        // 4. 리액트 설치 
            // npm i react react-dom
            // npm i @babel/preset-env @babel/preset-react (✅✅✅ 골뱅이 필수! preset 오타 주의!)
            // npm i @babel/core babel-loader

        // 5. webpack.config.js 설정 



    
// npx create-react-app [폴더명]