# tsconfig.json 

- compilerOptions
    - ts 파일을 컴파일 진행시, '어떤 형태로 컴파일을 진행할지' 속성을 정의하는 부분 

- include 
    - 컴파일 진행할 폴더를 지정

- exclude 
    - 컴파일에서 제외할 폴더 지정


## compilerOptions 자주 사용하는 속성
    - module : 모듈 시스템 지정 
        - common js 같은게 들어감 

<br>

    - outDir : 내보낼, 경로 지정
    
<br>

    - target : 번들링 문법 지정
        - ex) ES5, ES6 이렇게 번들링 하는 문법을 지정해준다. 
<br>
    - esModuleInterop : true 
        - [역할] import, export 문법을 자연스럽게 변경 해주는 행위 
        - 웬만하면 'true' 로 설정.
        - commonJS 형식과 ES6 형식의 혼용을 자연스럽게 통합 해주는 속성 

    - strict : true 로 두자 | 엄격! 

    - baseUrl
        - 모듈의 상대 경로를 지정 
        - 모듈의 상대 경로를 src 로 할거면 -> ./src

    - paths
        - "baseUrl" 경로를 기준으로, 상대 위치를 가져오는 매핑값(경로를 변수처럼 사용할 수 있음)
        - dist 까지의 경로를 @build




- 설정
``` sh
npm init -y
npx tsc --init
```

- tsconfig 에 설정할 것
``` json
{
    "compilerOptions" : {
        "module" : "CommonJS",
        "outDir" : "./dist", 
        "target" : "ES6",
        "esModuleInterop" : true, 
        "strict" : true, 
        "baseUrl" : "./src", 
        "paths" : {
            "@user/*" : ["user/*"]  // user 아래 있는 걸 모두 이렇게 지정? ❓❓ 
        }
    }
    , "include" : ["src/**/*"]  // 모든 폴더 및 모든 파일
    , "exclude" : ["**/*.test.ts"]    // 컴파일에서 제외할 파일 
        // .ts 확장자가 붙은 애들은 제외 하겠다!

}


```



``` json 
// package.json 추가 
{
    "build" : "tsc"
}




```