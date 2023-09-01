// class 를 사용할 때 유지보수 편하기 위해 많이 사용

// 상품의 구조 정의
// interface IProduct {
//     name : string
//     price : number

// }


class Product  {
    // private 접근 불가 키워드
    // 다른 곳에서, 참조가, 안 되는 값 | get method 같은 걸로 가져올 수 있고, 직접 참고 안 됨
    private name : string
    private price : number
    private discountAmount : number

    constructor(name : string , price : number){
        this.name = name;
        this.price = price;
        this.discountAmount = 0;
    }

    // private 키워드로 직접 참조가 안 되기 때문에, 값을 확인하고 싶으면, get 메서드를 사용해서, 값을 호출한다. 
        // 값을 보호! 했음. 직접 수정, 삭제가 안 됨! 
    getName() : string {
        return this.name;
    }

    getPrice() : number {
        return this.price - this.discountAmount
    }

    // name 이랑 price 한번에 보는 함수
    getProduct(){
        return { name : this.name, price : this.getPrice() }
    }

    // 할인가 조정
        // set 메서드로 할인가 조정 
    setDiscountAmount (amount : number) : void {
        this.discountAmount = amount
    }

}

    const product = new Product("블록" , 1000)

    console.log(product.getProduct());      // { name: '블록', price: 1000 }

    product.setDiscountAmount(200);
    console.log(product.getProduct());      // { name: '블록', price: 800 }


// npm init -y 
// npm install -D typescript
// npm install -D ts-node ./product.ts ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐


// 📛 다만, 확장성이 부족함
    // 전략 패턴⭐⭐⭐ 
        // 하나의 패턴을 클래스로 만들어둔다. 
        // 클래스 하나를 만들면 유지보수가 편해짐 ⭐⭐⭐⭐⭐ 
    
        // 1번 할인 
        // 2번 할인 
        // 3번 할인 
        // 이렇게 짜두면, 새로운 할인이 추가되면 -> 4번 할인! 으로 추가하면 됨 
        // 이렇게 하기 위해 클래스를 넣는 것 . 
        // 이렇게 하면, '유지보수' 가 편함 ⭐⭐⭐ 