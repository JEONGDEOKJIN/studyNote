import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { GoogleAthenticator } from "./strategy/google.strategy";
import { KakaoAuthenticator } from "./strategy/kakao.strategy";
import { EmailAuthenticator } from "./strategy/email.strategy";
import UserController from "./strategy/user.controller";
// import UserController from "./strategy/user.controller";

// 전략 패턴 객체 생성 
const strategy = new Strategy();
    // {strategy : {} , set() , login() } 이러헥 있는게 생성되어서, strategy 안에 있음. 


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
    // 사용자의 로그인 요청을 처리할 때, 'strategy' 를 사용하여, 알맞은 전략을 선택한다. 
    // [해석] 전략 패턴을 활용하여, 다양한 방식의 로그인 처리를 지원. 
    // [해석] 다양한 로그인 처리 방식을 알게 된 strategy 가 UserService 안으로 들어가면, 무슨 일이 생기는 거야? 

// 유저 로그인 로직 클래스 생성 및 유저 서비스 로직 객체 생성자 매개변수로 전달
const userController = new UserController(userService)


// userController.signup("email");
// userController.signup("google");
userController.signin("kakao");


// $ npx ts-node ./user/index.ts 이렇게 실행