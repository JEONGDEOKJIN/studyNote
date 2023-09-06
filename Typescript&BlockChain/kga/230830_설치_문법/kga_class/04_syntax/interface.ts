// // 추상 클래스


// // interface 는 '객체의 구조'를 정의하는 '타입'
//     interface IBlock {
//         id : number
//         title : string
//         content : string
//         date : number
//         like : number   
//         hit? : number       
//             // [hit 해석] 객체의 구조에서, hit 가 있어도 되고, 없어도 되는 문법
//     }
//         // [해석] 추상 interface 라고 함 

//     const Block : IBlock = {
//         id : 0,
//         title : '', 
//         content : '', 
//         date : 0, 
//         like : 0,
//         hit : 0,
//     }
    
    
//     const Block2 : IBlock = {
//         id : 0,
//         title : '', 
//         content : '', 
//         date : 0, 
//         like : 0,
//         // 이 자리에 hit 이 없어도 가능함! 
        
//     }


//     // 추상 
//     // interface 
//     // class


//     interface IProduct {
//         name : string
//         price? : number
//     }



//     class product implements IProduct {
//         name : string 
//         // price : number

//         constructor(name : string , price : number) {
//             this.name = name;
//             // this.price = price;
//         }   
//         // 구조를 체크하려고 쓰는 키워드임! ⭐⭐⭐
//         // 평소 쓰는 상속 개념이랑 다름! ⭐⭐⭐ 😥😥😥😥😥😥

//     }
//     // [해석] implements 키워드는 class 에 구조가 만족하는지 여부 체크 