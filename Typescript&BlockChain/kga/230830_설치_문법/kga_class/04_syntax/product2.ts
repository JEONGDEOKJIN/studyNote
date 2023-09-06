

// 할인 

interface Discount {
    // 받아서 오버라이드 할 것 이기 때문에, 함수의 내용은 없어!
    getDisCountPrice(price : number) : number
}

// 가격만 수정하는 할인
    // 위의 구조를 받아서 -> 사용을 함 
class FlatDiscount implements Discount {
    private amount : number
    
    constructor (amount : number) {
        this.amount = amount;
    }

    // 부모의 함수를 받아서, 사용함 
    getDisCountPrice(price: number): number {
        return price - this.amount
    }

}

// 할인으로 가격 수정
    // 1) 위에는 가격을 그냥 깎음 
    // 2) 이건, 할인을 적용하는 것
class PercentDiscount implements Discount {
    private amount : number;
    constructor (amount : number) {
        this.amount = amount;
    }

    getDisCountPrice(price: number): number {
        return price * (1 - this.amount / 100)
    }
}

// 가격도 깍고, 할인도 깎고, 두 가지를 다 하는 할인 
class FlatPercentDiscount implements Discount {
    private flatAmount : number
    private percent : number
    constructor (flatAmount : number , percent : number) {
        this.flatAmount = flatAmount;
        this.percent = percent;
    }

    getDisCountPrice(price: number): number {
        const FlatDiscountAmount = price - this.flatAmount;
        return FlatDiscountAmount * (1 - this.percent / 100);
    }

}


// 할인 기능에 대한 유지보수가 좋아진다. 
    // 클래스 하나만 더 추가하면 되는 것


class Products {
    
    // private 로 값을 보호 했기 때문에, 확인하려면, get 써야 함 
    private name : string
    private price : number

    constructor(name : string , price : number) {
        this.name = name;
        this.price = price;
    }

    getName() : string {
        return this.name
    }

    getPrice() : number {
        return this.price
    }
}


class ProductDiscount {
    private product : Products 
    private discount : Discount
    constructor(product : Products , discount : Discount) {
        this.product = product;
        this.discount = discount;
    }

    getPrice() : void{
        console.log(this.discount.getDisCountPrice(this.product.getPrice()))
    }

}


const _product = new Products ("mac" , 100000) 

const _product2 = new Products ("window" , 2000) 


const productDisCount = new PercentDiscount(10);
const productDisCount2 = new FlatDiscount(1000);
const productDisCount3 = new FlatPercentDiscount(1000, 10);

const productWithDiscount = new ProductDiscount(_product , productDisCount);
const productWithDiscount2 = new ProductDiscount(_product2 , productDisCount3);
    // 할인된 가격이 나옴 

productWithDiscount.getPrice()
// $ npx ts-node ./product2.ts -> 90000

productWithDiscount2.getPrice()
// $ npx ts-node ./product2.ts -> 900


// 🔹 전략 패턴 (디자인 패턴 중 하나!)
    // 동적할당한 걸 넘기고 -> 클래스 마다 할인 담당, 수정 담당, 


