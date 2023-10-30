// 🔹 typescript 변수 타입 지정 

    // js 의 경우 
        // 변수명 = 초기값

    // ts 의 경우 
        // 변수명 : 타입명 = 초기값


// 🔹 node 환경(개발환경) 에서 실행 시켜 볼 수 있나? 
    // node 는 ts 를 해석할 수 없음 
    // 따라서 ts-node 를 써야 함 

    // 기존 js 는 node 를 통해 실행 시켰는데, typescript 는 node 가 해석을 할 수 없음. 
    // 타입 해석도 가능한 ts-node 로 실행 시켜줘야 한다. 

    // ts-node.js 용 typescript 실행 환경
        // typeScript 를 자바스크립트로 컴파일해서 실행 시킬 필요없이, 
        // 'node 환경' 에서 실행 가능

    // ts-node
        // 1. typescript 를 컴파일 내부 컴파일러를 통해, 메모리 상, javascript 코드로 변환
            // 컴파일 한걸, 메모리 상에 들고 있음. 
            // js 파일을 만들지 않는다. 

        // 2. 컴파일된 js 코드를 nodejs 런타임 환경으로 실행 -> 그 다음 코드 실행 결과를 출력
            // 여기에서 타입 검사로, 코드에서 발행할 오류를 미리 또 알려줌. 

        // ts-node 설치 명령어 
        // npm install ts-node @types/node
            // type 에 대한 정보를 미리 다 받는다.
            // node.js 는 js런타임 환경인데, 내장 함수 및 모듈에 대한 타입이 없음. 왜냐면 그렇게 개발되었으니까. 
            // 그래서, 타입 정보가 필요한데, -> node.js 타입 정보를 패키지로 설치해서 사용 한다. -> 이게 @type/node 이 부분임! 
            

    // 실행 가이드 
        // node 환경에서 js 실행할 때 
            // node app.sj 

        // typescript : ts-node 실행
            // npx ts-node app.ts
                // [예시] npx ts-node 01_type/msg.ts
                // 변환된게 파일로 만들어진게 아니라, 메모리에 들고 있는 것 임



