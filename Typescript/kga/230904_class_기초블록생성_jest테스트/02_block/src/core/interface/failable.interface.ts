

// 결과에 대한 내용 담기
    // 제네릭을 써서, 매개변수화! (함수의 매개변수 처럼 작동⭐⭐⭐⭐⭐)
    // 사용할 때, 이렇게 작성
export interface Result<R>{
    isError : false;
    value : R ; // 어떤 값인지 모르니까, 매개변수로 쓸래!
    // value 는 우리가 원하는 걸 가질래! 
    // 객체의 구조는 위를 따라가고, value 에 대한 타입은 원하는 대로 작성 가능
}


export interface Failure<E>{
    isError : true;
    value : E;
}

export type Failable<R,E> = Result<R> | Failure<E>
    // 만든 것에 이제 타입을 2개 
    // 결과값이 있으면 -> Result R 을 사용
    // 없으면 -> Failure E 를 사용!


    /* 이렇게 매개변수 처럼 쓰이게 된다 ⭐⭐⭐⭐⭐⭐ 
        let a (a, b) => {
            console.log(a , b)
        }
        a("stringgogo" , "매개변수2개!")


    */