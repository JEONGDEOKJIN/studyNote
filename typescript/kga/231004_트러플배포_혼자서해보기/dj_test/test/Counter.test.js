
const Counter = artifacts.require("Counter");
    // [Counter 가 들어와 지는 과정]
        // 1) Counter.sol 파일로 작성 완료
        // 2) build 폴더에 Counter.json 으로 들어와있음 
        // 3) build 폴더에 있는 Counter.json 을 가져오기 
        // 4) truffle 라이브러리 중 artifacts 기능을 통해, 이렇게 Counter 를 가져올 수 있음.


// contract : 테스트 케이스를 정의하기 위한 '최상위' 구조 
contract("Counter" , (account) => {


    // account 는 네트워크에 있는 계정들을 의미한다. 이것들은, truffle 프레임워크에 의해, , 자동적으로, 채워진다.  
    console.log("현재 네트워크에 있는 계정들" , account)
        // [궁금증] 근데, 이걸 하니까, 현재, 배포하지 않은 CA 들도 나옴. 뭐지❓❓❓

    // describe : 테스트 그룹 단위 
    describe( "counter contract" , ( ) => {
        
        // it 테스트 단위 
        let counter;

        // 배포한 컨트랙트 내용 조회
        it( "counter 1" , async () => {
            // 배포한 컨트랙트 내용 조회
            counter = await Counter.deployed();
                // console.log("배포한 컨트랙트 내용 조회" , counter)

                // [해석] Counter 는 '배포 되기 전 구조 및 정의'
                // Counter.deployed() 는 배포되고 난 후 의 내용 
        } )

        // getValue 사용했을 때 값 조회
        it( "counter 2" , async() => {
            console.log( "counter 2 - call" , await counter.getValue.call() )
            // console.log( "counter 2 - getValue()" , await counter.getValue() )
        } )

        // 'setValue' 로 변경(가스비 발생) 하고 -> getValue 로 조회 
        it("counter 3", async () => {
            await counter.setValue(20);
            console.log("setValue(20) 설정하고 -> getValue 로 가져오기" , await counter.getValue.call());
        });
    

    } )





})