// '컴파일 된 결과물' 가져오기
const Counter = artifacts.require("Counter")
    // [필요성] '컴파일된 결과물' 을 '이더리움 네트워크' 에 올릴 수 있도록 하기 위함 
    // [해석] 
        // artifacts : 컴파일된 결과를 가져올 수 있는 truffle 의 라이브러리 
        // artifacts.require("Counter") : 컴파일 된 결과 중, 파일 이름이 Counter 인 것을 가져온다. 


module.exports = (deployer) => {

    // Counter 파일, 배포하기 
    deployer.deploy(Counter)
        // [해석]
            // deployer : module.exports 실행시, Truffle 에 의해 주입 된다. 
            // deployer.deploy : 이더리움 네트워크에 올라가게 한다. 
            // Counter : 1) '작성한 solidity' 가 2) '컴파일된 파일' 을 3) 'artifacts' 로 가져온 파일
            // deploy 매개변수 = 배포할 스마트 컨트랙트 = 트러플 콘솔에서 이 이름을 불러야 함 ⭐⭐
}
    // [해석]
        // 익명함수의 매개변수인 deployer 는 Truffle 이 해당 함수를 실행할 때, 자동적으로, 채워준다. 
    
    // [배포 완료 되면]
        // 1) '스마트 컨트랙트의 바이트 코드' 가 '이더리움 네트워크' 에 배포 
        // 2) 그 결과, 해당 컨트랙트 주소(CA, contract address) 가 생성된다. 