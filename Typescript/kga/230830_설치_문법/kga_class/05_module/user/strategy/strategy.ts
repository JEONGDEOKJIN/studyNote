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
                        // 동적할당은 어떤 속성인지를 지금 정하지 않고, 나중에, 변수 안에 값을 넣어줌으로써 결정된다.
                    // 3) 객체 key 의 값은 Authenticator 타입 임. 
                    // 4) 'Authenticator 타입'은 ✅'함수' 임.(😥😥😥몰랐었음)
                        // ⭐⭐⭐ 이 부분이 굉장히 중요함. 두루뭉실한 타입으로 읽는게 아니라, js 타입 까지 읽어낼 수 있어야 한다. ⭐⭐⭐ 
                    // 5) 어떤 함수냐면, 
                        // input 으로 'UserParams' 입력을 받고, output 으로 'AuthenticationResponse' 타입을 내보내는 메소드
                    // 6) 결국, strategy 객체의 각 key는 ⭐'함수를 참조(😥😥😥몰랐었음)'⭐ 하며, 함수를 호출할 때, AuthenticationResponse 타입을 반환

            // 그러면, 2단게에서, 규칙에 근거해서, 객체를 생성, 해보자. 
}


class Strategy {
    // [class 를 대하는 팁]
        // 1) '클래스 정의를 보고 -> 어떤 객체가 생성될 것 인가.' 를 그려나갈 수 있어야 한다. ⭐⭐⭐ 
            // 왜냐면, '실행되는 코드 맥락' 을 볼 때, 만나는 건, 인스턴스 다. 
            // 그 '인스턴스의 속성과 메소드'를 알아야, 해당 '실행 코드 맥락' 의 기능을 이해할 수 있다. 
            // '인스턴스의 속성과 메소드'를 알기 위해서는, 클래스 안에서 '어떤 속성과 메소드' 로 정의 되었는지 알아야 한다. 
            // 그러면, 클래스가 정의된 부분을 들어가서 확인할 텐데, 그때, '이 클래스에 따라서 -> 어떤 객체가 만들어질까.' 를 자연스럽게 그릴 수 있으면 도움이 될 것 이다. 

    // [2단계] '빈 객체' 생성
    private strategy : IStrategy = { }
        // [ver2.1 해석] 🔵(최신) 
            // [2단계] IStrategy 타입의 변수인 strategy 를 만들었음.
            // 다만, 아직, 해당 객체에, 멤버 속성 및 메소드를 정의한 건 아님!!!
            
            // 2단계를 거치면, 인스턴스는 이런 모양이 됨 
                /* instance = { 
                        strategy : {}
                    }
                */
            // 그러면, 3단계에서, 만들어진 객체에, '멤버 변수' 와 'set 메소드' 를 추가해보자 


// [3단계] set 메소드 정의만 함 | 실행은 아직 안 함 
    // 서비스 로직을 객체에 추가할 함수 | ⭐⭐⭐⭐⭐ '전략'을 '등록' 
        // 이 key 가 객체에 추가되는 key 가 될 것 임. 
    public set(key : string , authenticate : Authenticator){
        // key 값을 받고, 서비스 로직 추가
        this.strategy[key] = authenticate
            // [수업 필기] 이 위에 key 로 , 전달할 객체를 추가  
        }

            // [ver2.2 해석] | 클래스를 '객체 관점(이 코드를 거치면, instance 는 이렇게 됨(1)UML 을 적는 느낌 2)class가 실행되면 객체가 되니까 그걸 생각)' 추가 | 🔵최신
                // 3단계에서 set 메소드의 기능을 정의한다. 
                
                // '클래스는 객체를 만들어 내는 템플릿' 이라는 관점에서, 이 코드로 인해, 해당 객체 안에서 어떤 일이 벌어지는가! 를 해석해보면 
                    // this = 새롭게 만들어질 객체 인스턴스
                    // this.strategy = '2단계에서 만들어진 strategy 라는 빈 객체'
                    // this.strategy[key] = 해당 빈 객체에서 '속성'을 동적으로 할당 
                    // "this.strategy[key] = authenticate" = 해당 속성에 authenticate 메소드를 할당

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
                // 결국, 이 코드를 거치면, instance 는 이렇게 됨 ⭐⭐⭐ 
                    /*
                        1) instance 정의
                            instance = {
                                strategy : {}
                                set : function(key, authenticate){      // 객체에서 함수 부분 정의가 이렇게 되는 부분을 약했음. 😥😥😥 
                                    this.strategy[key] = authenticate;
                                }
                            }
                        2) set 메소드 실행되면 벌어지는 일
                            instance = {
                                strategy : {
                                    google : authenticate
                                }
                                set : function(key, authenticate){
                                    this.strategy[key] = authenticate;
                                }
                            }
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
        // [ver2.2 해석] | 클래스를 '객체 관점' 에서 해석하기 추가 | 🔵최신
            // login 메소드의 전제는 set 메소드가 이미 실행되어서, type 와 authenticate 가 할당되어 있다! 라는 점 이다. 
            // 이제 login 메소드에서는 뭘 하나?  
                // 1) 여러개의 strategy 중 '선택' 한다. 
                // 2) 그렇게 선택한 속성의 메소드를 실행 한다. 
            // 구체적으로 코드로 보면 
                // this.strategy[type] = 이 부분은 다양한 key 중 하나의 type 을 선택 
                // authenticate(credentials) = 이 부분은 해당 type 에 이미! 할당되어 있는 authenticate 를 실행
                // const result =  authenticator 타입에 의해, AuthenticationResponse 타입을 반환한다.

            // 이 코드를 거치면, 객체 instance 는 이렇게 됨
                /* 
                1) instance 정의
                instance = {
                    strategy : {}, 
                    set : (key, authenticate) => this.strategy[key] = authenticate;
                    login : (type, credentials) => {
                        const result = await this.strategy[type].authenticate(credentials);
                        return result
                    } 
                }

                2) login 메소드 실행되고 나면, ⭐⭐instance 객체 정의를 건드는게 아님⭐⭐ credentials 매개변수를 투입해서, '실행' 한다.
                    instance = {
                        strategy : {
                            google : authenticate(⭐credentials⭐)  
                                // 이렇게 코드가 변화하는게 아님. 
                                // 단지, 이전 코드와 다른 건, ⭐credentials이 매개변수로 들어간다는 것⭐ 
                                // [시사점] 메소드가 '실행' 된다는 건, 메소드 안에 매개변수가 들어간다. 는 것을 의미할 수도 있다는 것. ⭐⭐
                        }
                        set : {나름의 함수 정의}
                        login : {나름의 함수 정의}
                    }
                */
}


export default Strategy