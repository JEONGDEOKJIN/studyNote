/* eslint 체크 : eslint-disable no-undef */

// 빌드 파일 안에 컴파일된 Counter.json 가져오기 
const Baseball = artifacts.require("Baseball")

module.exports = (deployer) => {
    // [해석] 
        // truffle 프레임워크가, 이 구문이 동작할 때, deployer 매개변수를, 알아서 채워넣음 
        // 이게, 프레임워크가 주는 효과

    // build 폴더에서 가져온 Baseball json 내용으로 배포 진행 
    deployer.deploy(Baseball)
    
}