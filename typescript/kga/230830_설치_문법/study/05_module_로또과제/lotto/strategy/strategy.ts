import { UserPickParams } from '../interfaces/draw.request';
import { AuthenticationResponse, Authenticator } from './Authenticator.interface'


interface IStrategy {
    [key : string] : Authenticator
        // Authenticator 타입 -> '함수 타입' 으로 귀결 | 즉, '동적할당 되는 key' 속성에 대해,  Authenticator타입(input 에 대해서, 검증하고, output 하는 '함수' 타입) 이 온다.

}


class Strategy {

    private strategy : IStrategy = {}
        /* 
            instance = {
                strategy : {
                    [동적할당된 키] : authenticate(input) 메소드
                }
            }
        */

    public set(key : string , authenticate : Authenticator){
        this.strategy[key] = authenticate
    }

    public async draw(type : string, credentials : UserPickParams) : Promise<AuthenticationResponse> {

        const result = await this.strategy[type].authenticate(credentials)

        return result
            /* 이러한 결과가 나옴 {
                success : boolean
                message? : string
            } */
    }
}

    /* Strategy 인스턴스 구조 
        strategy = {
            strategy : {
                [동적할당된 키] : authenticate(input) 메소드
            }
            set : {함수}, 
            draw : {함수}
        }
    */


export default Strategy;