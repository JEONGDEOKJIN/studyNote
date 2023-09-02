// 유저의 서비스 로직 클래스 정의 

import { UserParams } from "../interfaces/login.request";
import {AuthenticationResponse} from '../strategy/Authenticator.interface'
import Strategy from '../strategy/strategy'

class UserService {

    // strategy 
        // [해석] 원래 이렇게 멤버 변수로 정의되어 있어야 하는데, constructor 에서 접근제한자를 사용해서, 
        // [해석] 멤버 변수가 선언되어 있다고 하는 거구나! 알겠음! 

    // 전략패턴 유저 로그인 서비스 로직 객체 
    // 이메일, 카카오, 구글, 세가지 로그인 로직을 사용 할 것 임.  
    constructor (private readonly strategy : Strategy){}
        // [해석] 
            // 클래스 이름을 타입으로 사용하면 해당 변수에는 해당 클래스의 인스턴스만 할당될 수 있음. ⭐⭐⭐ 
            // 즉, 현재, Strategy 는 class 임. 그런데, 왜 strategy 변수가 Strategy 타입을 갖는다는 건지 이해를 못 했음. 
            // 어떤 타입을 갖게 하려면, interface 를 거쳐야 하는데, 거치지 않았으니까! ⭐⭐⭐⭐⭐ 
            // 근데 알고 보니, Typescript 에서, 1) class 이름으로도 타입 지정을 할 수 있고 2) 그렇게 되면, 해당 변수에는, 해당 클래스의 인스턴스만 할당 될 수 있다는 걸 알게 되었음. 
            // 따라서, strategy 변수에는 Strategy의 인스턴스만 올 수 있음. 
            // 그러면, 'Strategy의 인스턴스' 는? 

        // 타입을 이후에 만들 것 임 
    async login (type : string, credentials : UserParams) : Promise<AuthenticationResponse> {
            const result = await this.strategy.login(type, credentials)
            return result
    }  // 응답값 성공 여부를 여기에 적을 것 임
    // credentials :  유저가 입력한 정보의 객체 구조 
}

// 로그인 추가되면 -> strategy 폴더에 추가해서 사용하면 됨

export default UserService