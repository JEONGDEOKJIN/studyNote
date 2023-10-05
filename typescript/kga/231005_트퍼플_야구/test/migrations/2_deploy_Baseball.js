
// 빌드 폴더 안에, 컴파일된, Baseball.json 을 가져와서 -> Baseball 변수에 할당
const Baseball = artifacts.require("Baseball");

module.exports = (deployer) => {

    // 컴파일된 Baseball 파일을 deploy 
    deployer.deploy(Baseball)
        // deployer 는 truffle이 실행될 때, 자동으로 채워진다. 
        // deployer.deploy : 이더리움 네트워크에, 뭔가를 올릴 것 이다. 

}