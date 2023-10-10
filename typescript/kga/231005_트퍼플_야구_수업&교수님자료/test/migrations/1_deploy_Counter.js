

// eslint 는 무시 

// 빌드 폴더 안에, 컴파일된, Counter.json 을 가져온다.
const Counter = artifacts.require("Counter");

module.exports = (deployer) => {
    // deployer.deploy 메서드로, 
    // 가져온 json 파일 내용으로 배포를 진행
    deployer.deploy(Counter);
}

