// 로그인 가입 관련된 작업 
    // 카카오, 네이버, 구글, 인증 시스템 거쳐서 만드는 것 


import {Strategy} from './auth'


// 가입 할 때 넘길 구조
    // 가입할 때, 이메일, 패스워드를 받으니까, 그거 구조를 만든다.
export interface AuthProps {
    email : string
    password : string
}



interface AuthenticationResponse {
    success : boolean   // 성공은 true, false 
    message? : string   // 있건 없건 다 괜찮음
}
    // 요청 받고, 응답 받았을 때, 어떻게 넘어오는지를 정의


// 검증에 대한 메서드를 담고 있는 interface 
interface Authenticator {
    authenticate(credentials : AuthProps) : Promise<AuthenticationResponse>   // 유저의 정보를 받아서 처리 
        // 값을 기다려야 하니까, promise

}


// 이메일 로그인 로직 클래스
    // 이메일 요청을 class 로 만들어보기
export class EmailAuthcenticator implements Authenticator {
    async authenticate(credentials: AuthProps): Promise<AuthenticationResponse> {
        // 로직은 없다. 
        // 백엔드에 요청해서, 응답을 받아야 함. 
        // 요청과 응답 코드가 들어가야 하는 부분 
        // 응답을 받고 나서 return 
        console.log("email 로그인")
        return {success : true}
    }
}

// 로그인이 여러가지 일 수 있는데, 전략 패턴으로 짠다 ⭐⭐⭐
// 카카오로 로그인 했을 때, 로직 클래스
export class KaKaoAuthenticator implements Authenticator {
    async authenticate(credentials: AuthProps): Promise<AuthenticationResponse> {
        // 카카오 로그인 로직 들어갈 부분 
        console.log("kakao 로그인")
        return {success : true}
    }
}


// 로그인에 대한 서비스를 처리할 클래스 구조 
export interface LoginService {
        // 로그인 로직에 대한 함수 구조
        login(type : string , credentials : AuthProps) : Promise<AuthenticationResponse>
            // 유저가 로그인 했을 때, 전달한 값
    }


// 로그인 클래스에 로그인 서비스 구조를 상속 받고 
export class Login implements LoginService {
    constructor(private readonly strategy : Strategy){}   // private readonly : 값을 보호 
    // strategy 타입을 추가 해줘야 함 

    
    async login( type: "email" | "kakao" , credentials:AuthProps ) : Promise<AuthenticationResponse> {
        // email 들어오면, 이렇게 처리하고

        // strategy 로그인 로직이 들어있는 객체

        // 여기에, 어던 로그인 로직으로 처리할지, type 구분해서

        const result = await this.strategy[type].authenticate(credentials)
        return result

    }


}