import UserService from "./service/user.service";
import Strategy from "./strategy/strategy";
import { GoogleAthenticator } from "./strategy/google.strategy";
import { KakaoAuthenticator } from "./strategy/kakao.strategy";
import { EmailAuthenticator } from "./strategy/email.strategy";
import UserController from "./strategy/user.controller";
// import UserController from "./strategy/user.controller";

// 전략 패턴 객체 생성 
const strategy = new Strategy();

    /* [ver2.0 해석]
        Strategy 클래스를 실행해서, 인스턴스를 생성. (클래스는 객체를 찍어내는 템플릿 이기 때문에, 당연한 수순.) 
        그러면 집중해야 하는 건, 클래스에서 어떤 구조를 만들었고, 그로 인해 ✅인스터스는 어떤 속성 및 메소드를 가진 객체가 되었는가 하는 점 
            // -> 이건 UML 로 분석이 되지 않을까?
        strategy 인스턴스는 아래의 구조를 가짐
        
            {
                strategy: {}, // IStrategy 인터페이스를 따르는 빈 객체로 초기화됨
                set: function() { ... }, // 전략(즉, authenticate 함수)을 strategy 객체에 추가하는 메소드
                login: function() { ... } // 사용자가 선택한 인증 전략을 실행하는 메소드
            }
        
    /*

// 전략 등록 
    strategy.set('email' , new EmailAuthenticator());
        /* [수업] {strategy : {EmailAuthenticator} , set() , login() } 이렇게 담겨 있게 됨.
            이를 통해 strategy 객체는 다양한 로그인 방식을 알게 됨. 
        */

        /* [DJ 해석] 이 코드가 실행되고, instance 에서 벌어지는 일
            strategy = {
                strategy : {
                    email : new EmailAuthenticator() 
                    set : {함수}
                    login : {함수}
            }
        */
    
    strategy.set("kakao" , new KakaoAuthenticator())
        /* [수업] {strategy : {EmailAuthenticator} , KakaoAuthenticator{authenticate},  set() , login() } */

        /* [DJ 해석] 이 코드가 실행되고, instance 에서 벌어지는 일
            strategy = {
                strategy : {
                    email : new EmailAuthenticator(), 
                    kakao : new KakaoAuthenticator(),  
                    set : {함수정의}, 
                    login : {함수정의}
            }
        */


    strategy.set("google" , new GoogleAthenticator())
        /* [수업] {strategy : {EmailAuthenticator} , KakaoAuthenticator{authenticate}, GoogleAuthenticator{authenticate},  set() , login() }  */

        /* [DJ 해석] 이 코드가 실행되고, instance 에서 벌어지는 일
            strategy = {
                strategy : {
                    email : new EmailAuthenticator(), 
                    kakao : new KakaoAuthenticator(),  
                    google : new GoogleAthenticator(),  
                    set : {함수정의}, 
                    login : {함수정의}
            }
        */


// 완성된 객체를 유저 서비스 클래스 생성자의 매개변수도 전달 및 유저 서비스 객체 생성
    const userService = new UserService(strategy)
    /* [수업] 사용자의 로그인 요청을 처리할 때, 'strategy' 를 사용하여, 알맞은 전략을 선택한다. */

    /* [2.1ver 해석]
        1) [알게된 점] 인스턴스가 어떻게 만들어지는지를 그려낼 수 있으면, 이 흐름을 이해하는데에 많은 도움이 된다
        2) UserService 클래스의 매개변수로 'strategy 인스턴스' 가 들어간다. 그러면, 들어가서 무슨일이 벌어지나? 
        
        3) 이 코드를 거치고 나오는 instance
            UserService 의 instance = {
                        strategy : {
                            // 이건 UserService 밖에서 들어온 service 인스턴스👇👇👇 
                            strategy : {
                                email : new EmailAuthenticator(), 
                                kakao : new KakaoAuthenticator(),  
                                google : new GoogleAthenticator(),  
                                set : {함수정의}, 
                                login : {함수정의}
                        }, 
                        login : (type, credentials) => {
                            const result = this.strategy.login(type, credentials)   
                                // this 는 현재 클래스에 의해 만들어진 인스턴스
                                // strategy 객체에 login 메소드가 이미 이 있다고 가졍
                                // ⭐⭐⭐ 이 부분에서 'type' 을 '선택' 해서 -> login 메소드를 실행하고 -> 결과를 result 에 담음 ⭐⭐⭐
                                // 언제 'type' 이 선택되는지! 를 잘 봐야 함. 
                            return result
                        } 
                    }
        4) 이제, 이 instacne 가 UserController 클래스에 전달
        
    */
    
    


// 유저 로그인 로직 클래스 생성 및 유저 서비스 로직 객체 생성자 매개변수로 전달
const userController = new UserController(userService)

    /* [DJ해석] 이 코드를 거치면 나오는 instance
        UserController instance = {
            userService : {
                    ✅ UserService클래스의 인스턴스 | index.ts 에서 UserController 의 매개변수로 넣은게 여기로 들어옴✅✅
                strategy : {
                        email : new EmailAuthenticator(), 
                        kakao : new KakaoAuthenticator(),  
                        google : new GoogleAthenticator(),  
                        set : {함수정의}, 
                        login : {함수정의}
                }, 
                login : (type, credentials) => {
                    const result = this.strategy.login(type, credentials)   
                        // this 는 현재 클래스에 의해 만들어진 인스턴스
                        // strategy 객체에 login 메소드가 이미 이 있다고 가졍 ⭐⭐⭐
                        // ⭐⭐⭐ 이 부분에서 'type' 을 '선택' 해서 -> login 메소드를 실행하고 -> 결과를 result 에 담음 ⭐⭐⭐
                        // 언제 'type' 이 선택되는지! 를 잘 봐야 함. 
                    return result
                }, 
                signin : (type) => {
                    👇👇👇 이 UserParams 는 어디서 온거지?? -> 아 import 해왔구나
                    const loginParams : UserParams = {
                        email : "dj@naver.com",
                        password : "12345"
                    }
                    this.userService.login(type , loginParams)
                        // this = UserController 클래스 실행으로 인해 생기는 인스턴스 
                        // this.userService.login = UserController 클래스를 실행해서 생기는 인스턴스의 userService 속성 안에 있는 login 속성
                        // this.userService.login(type , loginParams) = 이제, 해당 login 속성에 type과 loginParams를 전달
                        // 이 순간, login params 에 무엇이 전달되는지, 어떻게 쌓여가는지! 를 알아야 함.⭐⭐⭐ 
                        // 뭔가 하나씩 하나씩, 쌓여가는 느낌이다. ⭐⭐
                }
            }
        }
    */



// userController.signup("email");
// userController.signup("google");
userController.signin("kakao");


// $ npx ts-node ./user/index.ts 이렇게 실행