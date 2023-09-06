// 유저의 서비스 로직 클래스 정의 

import { UserParams } from "../interfaces/login.request";
import {AuthenticationResponse} from '../strategy/Authenticator.interface'
import Strategy from '../strategy/strategy'

class UserService {

    /* [수업] 전략패턴 유저 로그인 서비스 로직 객체
        이메일, 카카오, 구글, 세가지 로그인 로직을 사용 할 것 임 */
    constructor (private readonly strategy : Strategy){}

        /* [해석ver2.0] 이 코드를 지나고 instance 에서 벌어지는 일 | 🔵 최신

            strategy인스턴스 = {
                    strategy : {
                        email : new EmailAuthenticator(), 
                        kakao : new KakaoAuthenticator(),  
                        google : new GoogleAthenticator(),  
                        set : {함수정의}, 
                        login : {함수정의}
                } 이고, 
            
            'UserService 클래스의 constructor'는, 'strategy 인스턴스(strategy변수)'를 받아서, '(이미 생긴) 클래스의 strategy 속성'에 할당한다. ⭐⭐⭐ (이걸 몰랐음😥)
            왜냐면, 이미 완성된 Class 를 타입으로 지정하면, 이미 완성된 class 의 인스턴스를 사용한다는 의미, 가 되기 때문!
                (이게☝☝ 핵심인데, 이 부분을 잘 몰랐음 😥😥😥)

            따라서, constructor 를 실행하면, 아래와 같은 UserService 인스턴스가 생김 👇👇
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
        */

        
        // [수업] 타입을 이후에 만들 것 임 
    async login (type : string, credentials : UserParams) : Promise<AuthenticationResponse> {
            const result = await this.strategy.login(type, credentials)
            return result
    } 
        /* [해석ver2.0] 1) constructor 로 객체를 생성하고 2) 이 코드를 지나면 instance 에서 벌어지는 일 | 🔵 최신
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

        */
    
    
    // 응답값 성공 여부를 여기에 적을 것 임
    // credentials :  유저가 입력한 정보의 객체 구조 
}

// 로그인 추가되면 -> strategy 폴더에 추가해서 사용하면 됨

export default UserService