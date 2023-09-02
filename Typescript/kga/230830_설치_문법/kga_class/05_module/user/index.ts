import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { GoogleAthenticator } from "./strategy/google.strategy";
import { KakaoAuthenticator } from "./strategy/kakao.strategy";
import { EmailAuthenticator } from "./strategy/email.strategy";
import UserController from "./strategy/user.controller";
// import UserController from "./strategy/user.controller";

// 전략 패턴 객체 생성 
const strategy = new Strategy();

    // [ver2.0 해석]
        // Strategy 클래스를 실행해서, 인스턴스를 생성. 
        // strategy 인스턴스는 아래의 구조를 가짐
        /* 
            {
                strategy: {}, // IStrategy 인터페이스를 따르는 빈 객체로 초기화됨
                set: function() { ... }, // 전략(즉, authenticate 함수)을 strategy 객체에 추가하는 메소드
                login: function() { ... } // 사용자가 선택한 인증 전략을 실행하는 메소드
            }
        */
                // [해석 ver1.0]
                    // 해당 인스턴스에서는 이제, Strategy 의 '멤버 속성 및 멤버 메소드' 를 갖고 있게 됨. (왜냐면, 클래스는 객체를 생성하는 템플릿 이니까.)
                    // 그럼, strategy 객체에는 어떤 멤버 속성과 멤버 메소드가 있고, 그게 어디에서, 왜 필요할까? 


// 전략 등록 
    // 이를 통해 strategy 객체는 다양한 로그인 방식을 알게 됨. 
strategy.set('email' , new EmailAuthenticator());
    // {strategy : {EmailAuthenticator} , set() , login() }
    // 이렇게 담겨 있게 됨.
    
strategy.set("kakao" , new KakaoAuthenticator())
    // {strategy : {EmailAuthenticator} , KakaoAuthenticator{authenticate},  set() , login() }
    
strategy.set("google" , new GoogleAthenticator())
    // {strategy : {EmailAuthenticator} , KakaoAuthenticator{authenticate}, GoogleAuthenticator{authenticate},  set() , login() }


// 이제 이 각각의 클래스 기능을 이해하는데에 좀 어려움을 겪고 있음 😥😥 
// 완성된 객체를 유저 서비스 클래스 생성자의 매개변수도 전달 및 유저 서비스 객체 생성
const userService = new UserService(strategy)
    // [2.0 해석] strategy 의 결과값은 결과적으로 boolean 일 것 이고, 그게 Userservice 로 들어가게 된다. 
    // 사용자의 로그인 요청을 처리할 때, 'strategy' 를 사용하여, 알맞은 전략을 선택한다.
    // [해석] 전략 패턴을 활용하여, 다양한 방식의 로그인 처리를 지원. 
    // [해석] 다양한 로그인 처리 방식을 알게 된 strategy 가 UserService 안으로 들어가면, 무슨 일이 생기는 거야? 

// 유저 로그인 로직 클래스 생성 및 유저 서비스 로직 객체 생성자 매개변수로 전달
const userController = new UserController(userService)



// userController.signup("email");
// userController.signup("google");
userController.signin("kakao");


// $ npx ts-node ./user/index.ts 이렇게 실행