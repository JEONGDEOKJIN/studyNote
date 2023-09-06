

// '접근 제한 = 자식 클래스, interface 규정 = get메소드 통째로, 값 가져오기 = get메소드 사용'  하는 방식 

// interface 를 implements 해서, 클래스 만들어보기
    interface ICar1 {
        // id : number
        // name : string
        // brand : string
        // hit? : number

        getName() : string

    }

    class Car1 implements ICar1 {

        private id : number
        private price : number
        private name : string
        private brand : string

        private discountAmount : number

        // 접근제한자 vs interface 
            // public 접근 제한자는 작동
                // public id : number
                // public price : number
                // public name : string
                // public brand : string

                // public discountAmount : number

        constructor(brand : string , price : number ){
            this.id = 0
            this.name = ""
            this.discountAmount = 0
            this.brand = brand
            this.price = price
            // console.log(this)
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
            return {name : this.name, price : this.getPrice(), brand : this.brand}
        }


    }


    const myCar1 = new Car1("내꺼" , 10000)

    console.log(myCar1.getPrice())
    




    // const DJCar = new Car("현대")      // Car { brand: '현대', id: 0, name: 'DJ' }
    // DJCar.tellMeWhatIbuy()

// 이거 실행해서 보기 
    // // npm init -y 
    // npm install -D typescript
    // npm install -D ts-node ./product.ts ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
