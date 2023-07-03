// babel

// 자바스크립트 코드의 변환을 도와주는 도구
// 자바스크립트를 컴파일 해주는 도구

// 자바스크립트 문법이 진화를 꾸준히 했고
// ES5 -> ES6 문법이 개발되고
// ES6 문법이 개발 되었는데 ES5에서 개발 것들을 모두
// 변환하기 힘들어서
// babel로 문법을 쉽게 고쳐서 쓰려고 변환 시켜준다.

// 모듈 시스템

// ---------------- commonjs = (require, module.exports) ---//
// a.js
// const text = "하이하이";
// module.exports = {text};

// b.js
// const { text } = require("a.js")
// console.log(text);

// --------------------------------------------------------//

// ----------------ES6---------------------------------//
// a.js
// const text = "하이하이"

//1. export {text}; 여러개를 내보낼 경우
//2. export default text; 단일로 내보낼경우

// b.js
// 1. import {text} from "a.js"
// 2. import text from "a.js"
// console.log(text);

// babel 기본 사용법

// babel은 기본적으로 자바스크립트로 구성 되어있다
// npm을 통해서 설치 가능

// 1. babel 기본 구성 설치

// npm init -y 기본 설정 package.json

// npm install @babel/core @babel/cli @babel/preset-env

// 2. babel 환경 구성
// .babelrc 파일 만들기
// rc = Run Commands, Run Control 등등의 의미

    /*
        json으로 설정
        {
            "presets" : ["@babel/preset-env"]
        }


    */

// 3. babel 실행

// npx babel [변환할 파일 명] --out-file [내보낼 경로]

// npx babel app.js --out-file dist/app.js