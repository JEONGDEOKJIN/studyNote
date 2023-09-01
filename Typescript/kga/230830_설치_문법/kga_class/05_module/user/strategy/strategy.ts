import {UserParams} from '../interfaces/login.request'

import {AuthenticationResponse, Authenticator} from './Authenticator.interface'


// 전략패턴 객체 구조 정의
    // 전략 패턴 서비스 로직을 하나의 객체에 담아놓고 사용할 것 임 

interface IStrategy {
    [key : string] : Authenticator
        // 해당 구조의 객체를 받을 건데, 객체의 key 를 string 으로 줄거야! 라고 정의 
        // a.b 로 객체를 호출하거나, a["b"] 이렇게 호출했었음 
        // 그래서 key 를 문자열로 지정! 
        // key 가 동적으로 추가 될 수 있다는 의미 ⭐⭐⭐ 
            // 검증객체 구조, 를 갖고 있는 객체가 들어올거야! 라고 만든것 임.

        // [해석] ⭐⭐⭐ 
            // key 라는 변수는 1) string 이어야 하고 2)Authenticator 타입 이어야 하는데, 
            // 'Authenticator 타입' 이라는 말은 
                // 1) authenticate 메소드가 있고, 
                // 2) 그 메소드는 input 에 'UserParams 타입의 credential', output 에 'AuthenticationResponse' 타입, 이 있어야 한다는 의미. 


}

// 서비스 로직들을 가질 객체 구조 정의
class Strategy {
    private strategy : IStrategy = { }
        // [해석] 
            // IStrategy 타입의 strategy 변수를 만든다. 
            // 'IStrategy 타입' 은 1) string 이어야 하고, 2) Authenticator 타입 이어야 한다. 
            // 'Authenticator 타입' 은 1) authenticate 메소드가 있고 2) 해당 메소드의 input 에는 'UserParams 타입의 credential' 3) output 에 'AuthenticationResponse' 타입, 이 있어야 한다. 
            // 📛📛 'UserParams 타입의 credential' 은 1) email : string 2) password : string 의 형식이어야 한다. 
                // [질문] 그러면, 이때, 값은 실제로 비어 있나? 아니면, 그냥 아직 할당이 안 된 상태 인가? ❓❓❓ 
                    // 👉 비어 있는 상태, 후에, set 메서드를 통해, strategy 객체 내부에 동적으로 값(전략)을 추가 음. 

            // 'AuthenticationResponse' 은 1) success : boolean 2) message? : string 이어야 함. 
                // [질문] 그러면, strategy 변수에는, 결국, 1) userParms 가 들어와서 2) authenticate 가 실행되고 3) 그 결과값인, AuthenticationResponse 이게 담겨야 하나? 
                    // 👉 아니, strategy 변수는 1) IStrategy 타입의 2) 빈 객체 임. 
                    // 👉 strategy 변수에는 1) 여러 전략이 담기게 된다. -> 언제 전략이 담기는 건데? -> 그러면, 이 때, 들어올 때, 저 타입 유형을 지켜야 겠네!? 


    // 서비스 로직을 객체에 추가할 함수 | ⭐⭐⭐⭐⭐ '전략'을 '등록' 
        // 이 key 가 객체에 추가되는 key 가 될 것 임. 
    public set(key : string , authenticate : Authenticator){
        // key 값을 받고, 서비스 로직 추가
        this.strategy[key] = authenticate
            // 이 위에 key 로 , 전달할 객체를 추가  
            // [해석] 객체 동적할당
    }
        // [해석]
            // '전략'이 '등록' 되는 부분 ⭐⭐⭐
        // [해석]
            // key가 "google"이면, this.strategy["google"] 위치에 authenticate 객체(구글 로그인 로직을 포함한 객체)가 저장됩니다.
            // key가 "email"이면, this.strategy["email"] 위치에 authenticate 객체(이메일 로그인 로직을 포함한 객체)가 저장됩니다.



    public async login (type : string, credentials : UserParams) : Promise<AuthenticationResponse>{
        // google, {email , password} google 에 대한 키 값을 실행시키면서, 임시 객체 값을 전달
        const result = await this.strategy[type].authenticate(credentials); 
            // 여기에 성공 실패가 담길 것 
            // type 이 구글이면, 구글 로그인 로직 함수가 실행될 것. 

        return result
    }
}


export default Strategy
