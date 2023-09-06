import { UserParams } from "../interfaces/login.request";
import UserService from "../service/user.service";

/* [수업] 사용자 서비스 로직 클래스 정의 
    controller 에서 서비스 로직 정의한 것과 동일 
    요청이 들어왔을 때, controller 함수 실했했었지 */

class UserController {
    constructor(private readonly userService : UserService){}
        /* [DJ해석 ver2.0] constructor 가 실행되면, 아래의 UserController 인스턴스 가 생성
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
                    }
                }
            }
        */

    /* [수업] login:type
        이렇게 type 이 들어왔다고 가정하면
        위 경로로 요청이 들어왔을 때, 실행할 함수 */
        
        signin(type : string) {
            // req.body 에서 유저의 정보를 받아옴 
                // 임시객체 
                const loginParams : UserParams = {
                    email : "dj@naver.com",
                    password : "12345"
                }
            // (로그인 시도 했을 때 )
            // this.userService.login("google" loginParams)     // 이렇게 하면, google 로그인 만 나옴 
            this.userService.login(type , loginParams)
                // type 으로 바꿔주면 -> index.ts 에서 바꿔줄 때 마다 이제 반영되어서 결과가 나옴  
        }
            /* [DJ해석 ver2.0] 이 코드 다음 생성되는 UserController instance 👇👇👇 
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


        // 회원가입, signup 로직 
        signup(){
            // 회원가입 로직
        }

        // 

        
}

export default UserController