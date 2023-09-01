import {EmailAuthcenticator, KaKaoAuthenticator, AuthProps, Login, LoginService} from "./Authent"

interface IEmailSender {
    sendEmail( email : string ) : void
}

// 이 구조를 상속받은 클래스가 됨!
    // 구조를 상속받으면, 무조건 저 구조가 있어야 함
class EmailSender implements IEmailSender {
    sendEmail(email: string): void {
        
    }
}


// I 를 붙이면 -> interface 라고 알려준다.


export interface Strategy {
    email : EmailAuthcenticator
    kakao : KaKaoAuthenticator
}


class Auth {

    // private 키워드가 붙어서, 생성자에 넘겨받은 값이, 객체에, 추가 된다. 
    constructor( 
        private readonly authProps : AuthProps, 
        private readonly emailSender : EmailSender, 
        private readonly loginService : LoginService){ }

        // 로그인 로직 하나만 더 추가하면 됨
        // 로그인 로직 구조
        public async login() {
            console.log(this);
            await this.loginService.login("kakao" , this.authProps)
        }

        // 이메일 인증 처리 구조 
        public register() : void {
            this.emailSender.sendEmail(this.authProps.email);
        }
    }


// 유저의 email 과 password 임시 객체 
    const authProps : AuthProps = {email : "soon@naver.com" , password : "12345"}
    const _emailSender = new EmailSender(); 

    // 이메일 로그인 로직 클래스 동적할당
    const _email = new EmailAuthcenticator();    

    // 카카오 로그인 로직 클래스 동적 할당 
    const _kakao = new KaKaoAuthenticator();
    


// 로그인 서비스 로직을 갖고 있는 객체 
    const _strategy : Strategy ={
        email : _email , 
        kakao : _kakao , 
    }

    const _loginService = new Login(_strategy)
    const auth = new Auth(authProps, _emailSender, _loginService)
        // authProps, _emailSender, _loginService 이게 추가된 이유는 private 가 붙었기 때문에
        

    auth.login()
