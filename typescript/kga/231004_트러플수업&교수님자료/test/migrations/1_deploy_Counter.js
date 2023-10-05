
// artifacts : 컴파일한 내용에서 파일을 찾아서 불러온다.
const Counter = artifacts.require("Counter");
    // artifacts : 컴파일된 결과를 가져올 수 있는 truffle 의 라이브러리 
    // artifacts.require("Counter") : 컴파일 된 결과 중, 파일 이름이 Counter 인 것을 가져온다. 

    // 빌드된 파일 가져오기
        // 빌드된 파일 중 counter 가져온다.

module.exports = (deployer) => {
    
    // deployer 배포 내용이 포함된 객체를 전달받고, 
    // deployer 메서드가, 해당 컴파일된 내용을 네트워크에 배포 진행
    deployer.deploy(Counter)    
        // json 파일인 Counter 를 가져와서, => deploy 에 넣고, => 배포 진행

}
    // deployer : 배포하는 내용을 담은 객체 