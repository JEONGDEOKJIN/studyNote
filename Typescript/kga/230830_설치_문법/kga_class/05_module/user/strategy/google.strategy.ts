// user 로그인 시도할 때 입력값
import { UserParams } from '../interfaces/login.request'
import {AuthenticationResponse, Authenticator} from "./Authenticator.interface"


// 검증 객체 구조 상속 
export class GoogleAthenticator implements Authenticator {

    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        // 구글 로그인 로직 작성 부분 
        console.log(credentials)     // 값을 찍어봄
        console.log("google login 성공")

        // 반환값의 객체는 AuthenticationResponse 인터페이스로 구조 정의 해놓은 것. 
        return {success : true}
            // AuthenticationResponse interface 이 객체 구조로 반환이 되어야 하기 때문에 -> 따라서 message 도 써야 
            // 근데, message 는 ? 표시니까 써도 되고 안 써도 되고 

    }

}