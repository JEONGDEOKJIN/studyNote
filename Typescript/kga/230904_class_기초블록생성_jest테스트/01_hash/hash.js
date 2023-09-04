

// 블록체인 암호화 방식 = sha256
const {SHA256} = require("crypto-js")   // 구조분해할당 해서 받기
    // const SHA256 = require("crypto-js/sha")      // 메소드로 내려가서 받기


    /*
        SHA256 은 현재 블록체인에서 가장 많이 채택하고 있는 암호방식
        출력속도가 빠르고, 단방향 암호화 방법을 제공함
        현재까지 큰 단점은 없음. 
        속도가 빨라서, 인증서나, 블록체인에 많이 사용중임
        SHA256 알고리즘은, 256 비트로 구성된 64자리 문자열로 암호화 해준다. 
    */

const str = "안녕하세요";

console.log("해시결과 : " , SHA256(str).toString());
console.log("길이는? : " , SHA256(str).length);

// 이후 데이터 무결점을 머클 검증으로 할 것 임? 
// 데이터가 무결점이라는 걸 

/*
    npm init -y
    npm i crypto-js
    node ./hash.js
*/

