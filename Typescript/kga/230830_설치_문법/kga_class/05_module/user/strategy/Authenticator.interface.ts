
// 응답 정보 객체의 구조 정의

import { UserParams } from "../interfaces/login.request"

    // 응답 받았을 때, 그 객체의 구조
export interface AuthenticationResponse {
    success : boolean

    // message : 옵셔닝, 키가 있어도 되고, 없어도 되는 구조 
    message? : string

}


// 검증 객체 구조 정의
export interface Authenticator {
    // 로그인 검증을 할 함수 선언
    authenticate(credentials : UserParams) : Promise<AuthenticationResponse>
        // 유저가 입력한 값을 받는다. -> 따라서, UserParams


}