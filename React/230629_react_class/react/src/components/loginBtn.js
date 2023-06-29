

// ES6 문법 사용
    // 전에는 require 로 가져왔음 
    // ES6 에서는 import 를 사용! 

class LoginBtn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogin : false
        }
    }

    render () {
        return (
            <button onClick={
                () => {this.setState({isLogin : !this.state.isLogin})}
            }> 
            
                {this.state.isLogin ? "Logout" : "Login"}
            
            </button>

        )
    }
}


// node.js 에서는 module exports 를 했음. 
// 이제는 export, default 방식을 쓸 것 임 

// export {LoginBtn}      
    // 내보내야할 컴포넌트가 여러개! 일 경우
    // ex) export {LoginBtn , LoginBtn2, LoginBtn3 }      

export default LoginBtn
    // 단일 컴포넌트를 내보내야할 경우