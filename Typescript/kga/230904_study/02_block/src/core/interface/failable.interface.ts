
// 결과에 대한 내용 담기 
    export interface Result<R>{
        isError : false;
        value : R;      
            // [해석] 
                // 어떤 타입이 오게 될지 모른다. 
                    // CF. '타입' 은, 장황하게 정의될 수 있지만, 그래서 '이러한 함수' 또는 '이러한 문자열' 등으로 쉽게 정리해두어야 한다.
                // 객체의 구조는 위를 따라가고, value 에 대한 타입은 원하는대로 작성 가능
    }

    export interface Failure<E>{
        isError : true;
        value : E;
    }

    export type Failable<R,E> = Result<R> | Failure<E>
        /*  [Failable<R,E> 해석]
            'Failable' 이라는 타입은 R과 E 라는 타입 변수를 갖고
            Result 와 Failure interface 가 택 1 이라는 전제하에, 
            Failable 은 Result 인터페이스를 갖거나, 

        */


    /* ['결과에 대한 내용'은 무엇을 의미하는거지?] ❓❓❓❓❓
        1) 언제 Result 가 담기지? 그 안에 담긴 데이터는 어떤 의미지? 
        2) 언제 Failable 이 생겨? 그 안에 담긴 데이터의 의미는?
    */

    /* [generic 타입(제네릭 타입)]
    
        [의의]
            - 타입스크립트의 타입을 변수화 해서, '호출시 구체적인 타입이 지정' 된다. 

        [특징]
            - 타입 스크립트 '추론' 기능이 있어서, 호출할 때, 타입을 명시하지 않아도, 추론해서 알게 됨. 
                (ex) function getText<T>(text : T):T {
                        return text;}
                    
                    getText('hi');  // 이렇게 타입 지정을 안 해도, 'hi' 를 통해 T 에 string 이 들어가겠구나! 를 안다. 
                    getText<string>('hi')   // 원래는 이렇게 지정함

            - '함수, 클래스, interface' 등에 사용됨 
            - 함수 호출, 클래스 호출 시에 구체적인 타입이 지정됨 
            - 동일한 알파벳 = 통일한 타입 이 됨. 

        [실익]
            - '동일한 로직' 을 '다양한 타입' 에 재사용할 수 있음. 
    */

    /* [데이터의 형태와 구조를 정의하는 방식]
            [interface]
                - 특징 
                    - 주로, '객체의 형태' 를 정의할 때 사용됨. 
                    - 주로, class 에서 구현. 

            [type alias]
                - 특징 
                    - 좀 더 일반적
                    - '객체, 배열, 원시타입 등' 다양한 타입 표현에 사용됨

    */
    