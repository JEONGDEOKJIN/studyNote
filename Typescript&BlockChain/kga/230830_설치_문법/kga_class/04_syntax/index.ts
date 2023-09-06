// js 변수 선언 
    let num = 20;
    const str = "javascript";
    const nam = NaN;    
        // 특수 타입 
        // 숫자를 문자로 변환했을 때?
    const bool = true;
    const nullValue = null;
    const undefinedValue = undefined;

    const obj = {};
    const arr = [];

    const fn = (a:any) => {
        console.log(a)
    }
        // any : 모든 타입을 다 통과 시킴 

const sum = (a:any , b:any) => {
    return a + b;
}

const any = ""

const unknown = ""; 



// ts 변수 선언 
    let num2 : number = 20;
    const str2 : string = "typescript";
    const nan2 : number = NaN;
    const infinity2 : number = Infinity;

    const bool2 : boolean = true;
    const nullValue2 : null = null;
    const undefinedValue2 : undefined = undefined;

    const obj2 : object = {};
    
    const arr2 : Array<number> = [1,2,3];
    // const arr2 : Array<number> = [1,2,"3"];
        // 배열은 '배열 안에 있는 요소' 가 어떤 타입인가! 를 지정해야 함 
        // 요소를 "3" 문자열이 들어가면 오류

    // 제네릭 타입 
        // 설정 요소가 number 라고 지정 
        // 데이터 타입을 매개변수화 시킬 수 있다. 
        const arr3 : Array<number | string> = [1,2,"3"];


    //  함수 - void
    const fn2 = (a:number):void => {
        console.log(a);

    }
    // void
        // 함수 실행 시 비어있다! 는 것을 의미.
        // 반환값이 없는 함수! 를 의미
        // 안 쓰면 -> void 임.  

    // 함수 - return 타입이 number
    const sum2 = (a:number , b : number) : number => {
        
        return a+b;
        // return "1";  이건 오류! ✅ -> 왜냐면, 문자열! 을 반환하니까

    }
        // void 가 아니라, :number 로 반환값 타입을 써주면 -> 반환값이 숫자! 여야 함 


    // any : 어떤 타입이건 할당 가능
    const any2 : any = " "; 
        // any 를 남발하면, 타입 스크립트를 쓰는 이유가 없음
        // 남발 하지 말것. 
        // type 의 안정성이 보장되지 않음 
        console.log(any2.length);   // 동작함🔵
        
    // unknown2 : 1) 어떤 타입이건 가져올 수 있고 2) 타입 안정성을 지킬 수 있음. 
    const unknown2 : unknown = "";
        // console.log(unknown2.length);   // 동작 안함📛📛
            // 왜냐면, unkwno2 가 뭔지 모르니가 -> 길이 부르면 위험해! 

        if(typeof unknown2 === 'string')
        console.log(unknown2.length)
            // 이렇게 타입 검사를 하고 넘어가면 -> 오류가 안 남! 


