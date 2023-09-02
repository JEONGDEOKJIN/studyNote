import {UserParams} from '../interfaces/login.request'

import {AuthenticationResponse, Authenticator} from './Authenticator.interface'


// 전략패턴 객체 구조 정의
    // 전략 패턴 서비스 로직을 하나의 객체에 담아놓고 사용할 것 임 

interface IStrategy {
    [key : string] : Authenticator
        // [수업 필기]
            // 해당 구조의 객체를 받을 건데, 객체의 key 를 string 으로 줄거야! 라고 정의 
            // a.b 로 객체를 호출하거나, a["b"] 이렇게 호출했었음 
            // 그래서 key 를 문자열로 지정! 
            // key 가 동적으로 추가 될 수 있다는 의미 ⭐⭐⭐ 
                // 검증객체 구조, 를 갖고 있는 객체가 들어올거야! 라고 만든것 임.

        // [ver2.1 해석] 🔵(최신) 
            // 이곳은 1단계. 1단계는 'interface 규칙을 생성' 하기만 함. | 실제로 객체를 생성하지 않음! 
            // 어떤 규칙을 생성하는가? 
                // IStrategy (interface of strategy) 라는 규칙은
                    // 1) 객체 여야 하고 
                    // 2) 객체 key 를 동적할당으로 생성하는 부분이 있어야 하고 
                    // 3) 객체 key 의 값은 Authenticator 타입을 따라야 해 
                    // 4) 'Authenticator 타입' 은 input 에 'UserParams 타입의 credential 변수' 가 들어가고, 
                        // -> 그 input 이 authenticate 메소드에 의해 처리되고 
                        // -> output 이 'AuthenticationResponse' 타입으로 나오면, 
                        // 그 output 이 key 의 값이 되는거야. 

            // 그러면, 2단게에서, 규칙에 근거해서, 객체를 생성, 해보자. 
        
}

// 서비스 로직들을 가질 객체 구조 정의
class Strategy {
    private strategy : IStrategy = { }
        // [ver2.1 해석] 🔵(최신) 
            // [2단계] IStrategy 타입의 변수인 strategy 를 만들었음.
            // 다만, 아직, 해당 객체에, 멤버 속성 및 메소드를 정의한 건 아님!!!
            
            // 그러면, 3단계에서, 만들어진 객체에, '멤버 변수' 와 'set 메소드' 를 추가해보자 

                    // [ver2.0 해석] 
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
            // [수업 필기] 이 위에 key 로 , 전달할 객체를 추가  
            
            
        }
            // [ver2.1 해석] 🔵(최신)
                // 3단계에서 set 메소드의 기능을 정의한다. 
                // 만약 set 메소드가 어떠한 맥락에서 실행된다면, 다음의 일이 벌어진다. 
                    // 1) string 으로 된 key 가 생긴다. 
                    // 2) 해당 key 에 Authenticator 타입이  authenticate 변수에 담긴다. 
                // 즉, set 이 어떠한 맥락에서 실행된다면, 다음의 객체가 만들어지는 것 이다.             
                    // [예시] set 메소드를 someObject.set('login', loginAuthenticator); 이렇게 호출하면, 아래와 같은 객체가 된다 ⭐⭐⭐⭐⭐
                        /* 
                            this.strategy = {
                                google(key 에서 할당받은 값): loginAuthenticator
                            };
                        */ 
                        /* 또는 이렇게 나온다 ⭐⭐⭐⭐⭐⭐⭐ 
                            this.strategy = {
                                google(key 에서 할당받은 값): authenticate(credentials)
                            };
                        */

                // 다만, 이렇게 정의된 set 메소드가 아직 실행된 건 아님! 
                // 이제 4단계에서 set 메소드를 실행하자 
                
                                    // [ver2.0 해석]
                                        // 외부에서 접근할 수 있는(public) 멤버 함수인 set 을 만든다. 
                                        // 이 set 은 1) 문자로 된 key 를 할당 받고 2) Authenticator 타입인 authenticate 변수가 매개변수로 들어온다. 
                                            // 'Authenticator 타입' 은 input 에 'UserParams 타입의 credential 변수' 가 들어가고, 
                                            // -> 그 input 이 authenticate 메소드에 의해 처리되고 
                                            // -> output 이 'AuthenticationResponse' 타입은, 필수적으로 success 를 boolean 타입으로 반환하므로,
                                            // ⭐⭐ 결국, authenticate 변수에는, ' 타입의 값' 이 들어가고 -> 한단계 더 들어가면, 그제서야 boolean 값이 나오게 된다.
                                                // 포인트는 '해당 타입' 이 어디에 할당되는가! AuthenticationResponse하는 걸, 쉬운 말로 설명할 수 있어야 한다. ⭐⭐ 

                                        // 이렇게 authenticate 변수 값이 정해지면, 이 객체의 strategy 속성의 동적할당된 key 에는 Authenticator 타입의 값이 들어가고,
                                            // 해당 객체에서 authenticate 메서드를 호출하면, ⭐⭐⭐ (나는 메서드 호출로 해석하지 못 했는데! 이렇게 할 수도 있네)
                                            // 'AuthenticationResponse 타입의 값' 을 프로미스로 반환하게 된다.  

                                        // 이렇게 , 값이 정해진 authenticate 변수값은, 해당 객체의 strategy 속성의 key 의 value 로 할당된다 ⭐⭐⭐
                                            // 이때, 할당은, '객체나 함수 등의 참조(reference) 를 할당' 하는 것 이다. -> 따라서, strategy 객체에서, 해당 key 를 사용해서, authenticate 메소드를 호출하면 -> 원래의 authenticate 변수가 가리키는 객체나 함수인 authenticate 메서드가 실행된다.
                                                // (이게, 참조에 의한 할당(pass-by-reference)
                                            // 다만, 이게 100% 이해 되지는 않음. 😥😥😥 



    public async login (type : string, credentials : UserParams) : Promise<AuthenticationResponse>{
        // google, {email , password} google 에 대한 키 값을 실행시키면서, 임시 객체 값을 전달
        const result = await this.strategy[type].authenticate(credentials); 
            // 여기에 성공 실패가 담길 것 
            // type 이 구글이면, 구글 로그인 로직 함수가 실행될 것. 

        return result
    }
        // [ver2.1 해석] 🔵(최신)
            // login 메소드의 전제는 set 메소드가 이미 실행되어서, type 와 authenticate 가 할당되어 있다! 라는 점 이다. 
            // 이제 login 메소드에서는 뭘 하나?  
                // 1) 여러개의 strategy 중 '선택' 한다. 
                // 2) 그렇게 선택한 속성의 메소드를 실행 한다. 
            // 구체적으로 코드로 보면 
                // this.strategy[type] = 이 부분은 다양한 key 중 하나의 type 을 선택 
                // authenticate(credentials) = 이 부분은 해당 type 에 이미! 할당되어 있는 authenticate 를 실행
                // const result =  authenticator 타입에 의해, AuthenticationResponse 타입을 반환한다.

                                    // [2.0ver 해석] | 예전 버전 
                                        // login 메소드의 input : 1) 문자열로 된 type 변수 2) UserParams 타입의 credentials 변수
                                                // 'UserParams 타입 예시
                                                    // export interface UserParams {
                                                    //     email : string
                                                    //     password : string
                                                    // }
                                        // login 메소드 처리 순서 
                                            
                                            // 1) 'type 변수에 적인 문자열' 이 this.strategy 라는 객체의 '속성' 이 된다. 
                                                /* 예를 들어, 이렇게 되나?
                                                        this.strategy = {
                                                        "google(type에google이라고 적힌경우)": authenticate(credentials)
                                                    };
                                                */  

                                                // 여기에서 authenticate, credentials 는 어디에서 오나? 
                                                    // authenticate 는 set 메소드의 매개변수 아니야? 

}


export default Strategy
