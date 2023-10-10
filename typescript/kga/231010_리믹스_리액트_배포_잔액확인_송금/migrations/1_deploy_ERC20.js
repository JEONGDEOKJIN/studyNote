const ERC20 = artifacts.require("ERC20");

module.exports = (deployer) => {
    // deploy 배포할 컨트랙트 인스턴스를 매개변수로 전달할 것
    deployer.deploy(ERC20, "SoonToken" , "STK" , 10000);
        // [차이점⭐⭐]
            // sol 파일에서 생성자 함수에 input 이 있는 상황 ⭐⭐⭐
            // 그러면, truffle 에서 배포할 때, 생성자함수 매개변수를 어떻게 넣어주나? 
            // deploy 메서드에서는, 첫 번째 매개변수로, 인스턴스를 전달했으면, 뒤에 매개변수로, 순서대로, 생성자 함수의 매개변수를 넣어주면 된다.
                // 이름, 심볼, 단위 

}