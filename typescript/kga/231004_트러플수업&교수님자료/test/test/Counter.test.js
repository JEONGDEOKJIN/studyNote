


const Counter = artifacts.require("Counter");
    // [Counter 가 들어와 지는 과정]
        // 1) Counter.sol 파일로 작성 완료
        // 2) build 폴더에 Counter.json 으로 들어와있음 
        // 3) build 폴더에 있는 Counter.json 을 가져오기 
        // 4) truffle 라이브러리 중 artifacts 기능을 통해, 이렇게 Counter 를 가져올 수 있음.

        
// contract : 테스트 케이스를 정의하기 위한 최상위 구조 
contract("Counter" , (account) => {
    // account 는 네트워크에 있는 계정들이 들어온다. 매개변수로. 
    console.log(account);

    // describe : 테스트 그룹 단위 
    describe("counter contract" , () => {

        // it 테스트 단위 
        let counter ;
        it( "counter 1" , async () => {
            // 테스트 내용
                // 배포한 내용 조회 -> counter 에 담기 
                // 배포한 컨트랙트의 인스턴스를 counter 에 담아준다. 
            counter = await Counter.deployed()
        } )

        // 인스턴스 가져온거에서, 원격 프로시져 해서, call 호출
        it("counter 2" , async () => {
            console.log(await counter.getValue.call())
        })

        // 이때, 트랜잭션 발생하니까, 가스비 지급
        it( "counter 3" , async () => {
            await counter.setValue(20);
            console.log(await counter.getValue.call())  // 인스ㅌ너스 가져온거에서, 이제 원격 프로시져 해서 call

        } )

    })

})