import type {Config} from "@jest/types";
    // 모듈의 타입이 정해져 있는 곳에서 Config 가져옴

const config : Config.InitialOptions = {
    // 1. 모듈 파일 확장자 설정 : typescript 와 javascript 둘 다, 테스트 파일, 로 지정 
        moduleFileExtensions : ["ts" , "js"],
        // ts, js 파일 둘 다 지정

    // 2. 테스트 파일 매치 설정 : 파일의 이름의 패턴을 설정
        // 루트경로에서 '모든 폴더' 의 '모든 파일'의 이름 패턴이 test.js or test.ts 
    testMatch : ['<rootDir>/**/*.test.(js|ts)'],

    // 3. 모듈의 이름에 대한 별칭 설정 : @core
        // 이걸 해석하기 위해서, 모듈의 이름을 맵핑! 

        // 별칭으로 지정된 @core를 어떻게 경로를 바꾸어 줄 것 인가?
            // ^@core == @core/**/* 로 시작하는 별칭은, 루트경로에, src/core 의 경로까지 맵핑을 시켜준다.
        moduleNameMapper : {
            "^@core/(.*)$" : "<rootDir>/src/core/$1"
        },

    // 4. 테스트 환경 설정
        // 이건, node 환경에서 실행 시킬 것 임. 
        testEnvironment : "node", 

    // 5. 자세한 노드 설정 출력 : 터미널의 로그들을 더 자세히 출력할지 여부 
        verbose : true, 

    // 6. 프리셋 설정 : jest 를 실행시킬 때, js 랑 할거냐, ts 랑 할거냐? 
        // ts 에서 사용할 jest -> ts-jest 로 설정 
        preset : "ts-jest",

}

export default config;