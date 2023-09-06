// 카카오 로그인 시도 로직 


// 고객의 입력 정보 가져오기
import { UserParams } from '../interfaces/login.request'

// 검증 관련된
import {AuthenticationResponse, Authenticator  } from './Authenticator.interface'   


// 검증 객체 구조 상속
// 카카오 로그인 검증 클래스 정의
export class KakaoAuthenticator implements Authenticator{

    async authenticate(credentials: UserParams): Promise<AuthenticationResponse> {
        
        // 카카오 로그인 로직 
        console.log("kakao login 성공")
        return {success : true}
    }


}
    // 검증에 관한 구조를 상속!