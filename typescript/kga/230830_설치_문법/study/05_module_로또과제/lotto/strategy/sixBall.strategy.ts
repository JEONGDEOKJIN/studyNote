

// 유저 선택하는 input 인터페이스
import { UserPickParams } from "../interfaces/draw.request";

// 검증 함수(메소드) 인터페이스 | 검증 output 인터페이스  
import { Authenticator , AuthenticationResponse } from "./Authenticator.interface";


export class sixBallAuthenticator implements Authenticator {

    async authenticate(credentials: UserPickParams): Promise<AuthenticationResponse> {
        
        // 로또 
            // 0. 45개 숫자 생성 

            const arrCandidateNums : number[] = []
            const arrWinNums : number[] =[]

            for (let i = 0; i < 45; i++) {
                arrCandidateNums.push(i)
            }

            while(true){
                let uniqueNumState = true
                let winNum
    
                while(true){
                    let winNum = Math.floor(Math.random()*45) + 1
                    
                    arrCandidateNums.map( (item, index) => {
                        item == winNum? uniqueNumState == false : uniqueNumState == true
                    })
    
                    if(uniqueNumState == true)
                        break;
                }
    
                arrWinNums.push(winNum)
                
                if(arrWinNums.length >= 6)
                    break;
            }
            

            // const remainNums = arrCandidateNums.splice(winNum , 1)

            // 남은 숫자들 중, 랜덤으로 하나를 뽑아 
            



        // 1. 문자화
            const sortedCredentials = credentials.pickNumbers.sort()
            const sortedWinNumbs = [1,2,10, 6, 5,3].sort()

        // 2. 오름차순 정렬 
            

        // 3. 비교 

        // if(credentials == [1,2,3,4,5,6]){
        //     return {success : true}
        // } else { 
        //     return {success : false}
        // }

    }

}