import { Component } from "react";


class Mycom extends Component {

    // 컴포넌트의 '구조는 같은데', '내용이 다른 경우' => props 사용 가능 
    // props 사용 이유 : 재사용성! 이 용이해서 사용 
    // props 로 값을 받아서, 그려주면 된다. 

    constructor(props){
        super(props)
        // constructor 공간에서 this 쓰려면, 부모의 생성자 함수를 호출해야 쓸 수 있음. ⭐⭐⭐⭐⭐⭐
            // 익숙해지거나 | 이해 하거나 
        this.state = {
            num : 0,
            name : ""
        }
    }

    // 컴포넌트가 초기에 생성되면
        // 1) constructor 실행 -> 2) render 3) componentDidMount 가 실행됨 
    
    componentDidMount () {
        console.log("나 생성!")
    }
        // 이게 왜 필요하지❓❓❓❓❓❓❓❓❓❓❓ 

    // 컴포넌트 상태가 변하면 -> 상태 변환 후 -> component DidUpdate()
    componentDidUpdate() {
        console.log( this.props.name +  " 인데 나 상태 변함 | 리렌더링 됨 | 첫 번째 컴포넌트면 첫 번째 컴포넌트만 변해, 두 번째는 안 변해 ")
    }
        // 상태 변하는걸 확인하려면, state 값 변화시켜야 함 

    render() {
        return(
            <div className={"com " + this.props.Cname} >
                {this.props.name} 
                <button onClick={ () => {
                    this.setState({ ...this.state, num : this.state.num += 1 })
                    console.log(this.state.num);

                }} > 상태 변경 </button>
            </div>
        )
        // 한칸 띄워야 클래스 2개 전달 가능 ⭐⭐⭐⭐⭐⭐⭐ 
    }
    
}


class Mycom2 extends Component {
    render() {
        return(
            <>
                <div>
                    안녕 나는 컴포넌트2 입니다
                </div>
                
            </>
        )
    }
    
}

// 다수의 컴포넌트를 내보낼 경우
    export {Mycom, Mycom2};

// 한개의 컴포넌트만 내보낼 경우 
    export default Mycom;
