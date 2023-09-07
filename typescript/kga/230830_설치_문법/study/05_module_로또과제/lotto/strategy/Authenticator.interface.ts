
import { UserPickParams } from '../interfaces/draw.request'


// 당첨 여부를 반환(확실하진 않음)
export interface AuthenticationResponse {
    success : boolean
    message? : string
}


// 검증하는 함수 타입 : 사용자가 4개, 6개, 등을 입력하면(UserPickParams) -> 당첨번호 확인해서(authenticate) -> 당첨여부를 내뱉음(AuthenticationResponse)
export interface Authenticator {
    authenticate(credentials : UserPickParams) : Promise<AuthenticationResponse>
}
    /* 로그인 케이스에서, '사용자가 로그인 정보' 를 입력하면 -> 맞는지 확인받고(authenticate) -> success 여부를 return 하는 것 처럼, 
        로또 케이스에서, '사용자가 숫자 4개를 고르면' -> 당첨 번호에 맞는지 확인하고(authenticate) -> success 여부를 'AuthenticationResponse' 타입으로 반환
    */
