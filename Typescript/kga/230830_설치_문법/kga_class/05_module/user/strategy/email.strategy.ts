
// 유저의 입력값
import { UserParams } from '../interfaces/login.request'
import { AuthenticationResponse, Authenticator } from './Authenticator.interface'

// 이메일 로그인 검증 클래스 정의 
export class EmailAuthenticator implements Authenticator { 
    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        // 이메일 로직 부분
        console.log("email 로그인 성공");

        return { success : true }
    }
}

// 이렇게 하면, 구글 로그인 하나가 -> 이렇게 추가 
// 다른 로그인 추가 되면 -> 밑에만 추가하면 됨. 

