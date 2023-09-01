// 타입 추론 없이 배열 선언
    // 타입 추론이 없다는 말이 무슨 말 이지❓❓
    // generic 이랑 비교하면, 배열 안에 string 이 들어갈지, number 가 들어갈지, ts 가 판단할 필요가 없다는 의미.
    // ex) '제네릭 타입' 은 const arr3 : Array<number | string> = [1,2,"3"]; 이렇게 되어서 👉 array 안에 number 또는 string, 그 어떤 것 이든 들어갈 수 있음.
const strArr : string [] = ["1" , "2" , "3"];
const numArr : number[] = [1,2,3];

// 튜플 
    // 각 배열의 자리에 타입을 지정 
const tuple : [string , number, object] = ['hello' , 123 , {}]; 

