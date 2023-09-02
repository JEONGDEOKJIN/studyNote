import {UserParams} from '../interfaces/login.request'
import {AuthenticationResponse, Authenticator} from './Authenticator.interface'


// [1단계] interface 규칙만 생성
interface IStrategy {
    [key : string] : Authenticator
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

// [2단계] '빈 객체' 생성
class Strategy {
    private strategy : IStrategy = { }
        // [ver2.1 해석] 🔵(최신) 
            // [2단계] IStrategy 타입의 변수인 strategy 를 만들었음.
            // 다만, 아직, 해당 객체에, 멤버 속성 및 메소드를 정의한 건 아님!!!
            
            // 그러면, 3단계에서, 만들어진 객체에, '멤버 변수' 와 'set 메소드' 를 추가해보자 


// [3단계] set 메소드 정의만 함 | 실행은 아직 안 함 
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


// [4단계] set 메소드가 index.ts 에서 실행됨!  
	// 그로 인해, 특정 타입과 authenticate  객체가 만들어져 있는 상태 
		/* this.strategy = {
				google(key 에서 할당받은 값): authenticate(credentials)
			};
		*/


// [5단계] set메소드가 실행되었다는 가정하에, 결과를 result 에 넣기
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
}


export default Strategy