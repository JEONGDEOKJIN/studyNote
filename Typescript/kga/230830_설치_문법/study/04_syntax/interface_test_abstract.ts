// '접근 제한 = 추상 클래스, 데이터 타입 제한 = 추상 클래스, 값 접근 = super' 를 사용하는 방식 



// interface 를 implements 해서, 클래스 만들어보기
    interface ICar2 {
    
        getName() : string

        // 근데 이렇게 걸면 안 돼
            // id : number
            // name : string
            // brand : string
            // hit? : number
    }

    abstract class ICar2 {
        private id : number

        constructor(id : number){
            this.id = id;
        }
    }
        // 추상 클래스
            // 1) extends 로 상속 받고, super 로 constructor 호출해서 사용한다. 
            // 2) 직접 인스턴스를 생성할 수 없음. 
            // 3) 상속 받을 때는 super 를 사용. 


    class Car extends ICar2 implements ICar2{

        private price : number
        private name : string
        private brand : string

        private discountAmount : number
        
        constructor(name : string , price : number ){
            super(1)
            this.brand = this.brand
            
            console.log(this)
        }

        // get 메소드를 설정하여, private 데이터에 접근하기 
        getName() : string { 
            return this.name;
        }
            // [해석] private 설정된 데이터는 클래스의 인스턴스(외부) 에서 접근 불가니까, 메소드로 만들어서 가져온다. ⭐⭐⭐ 

        getPrice() : number { 
            return this.price - this.discountAmount
        }

        getProduct() {
            return {
                name : this.name, price : this.getPrice(), brand : this.brand
            }
        }


    }


    const myCar = new Car("내꺼" , 10000)





    // const DJCar = new Car("현대")      // Car { brand: '현대', id: 0, name: 'DJ' }
    // DJCar.tellMeWhatIbuy()

// 이거 실행해서 보기 
    // // npm init -y 
    // npm install -D typescript
    // npm install -D ts-node ./product.ts ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
