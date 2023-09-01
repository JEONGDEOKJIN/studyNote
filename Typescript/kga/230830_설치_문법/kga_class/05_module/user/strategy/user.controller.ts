import { UserParams } from "../interfaces/login.request";
import UserService from "../service/user.service";

// 사용자 서비스 로직 클래스 정의 
    // controller 에서 서비스 로직 정의한 것과 동일 
    // 요청이 들어왔을 때, controller 함수 실했했었지 

class UserController {
    constructor(private readonly userService : UserService){}

    // login:type
        // 이렇게 type 이 들어왔다고 가정하면
        // 위 경로로 요청이 들어왔을 때, 실행할 함수
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

        // 회원가입, signup 로직 
        signup(){
            // 회원가입 로직
        }

        // 

        
}

export default UserController