import React , {useReducer} from 'react'

const INCREMENT = "INCREMENT";
    // 어떤 상태인지 쉽게 볼 수 있게 대문자! 로 함! 

const DECREMENT = "DECREMENT";

// 더하기 뺄셈만 간단하게 구현!

// useState 를 사용하던 것과, 별로 크게 차이가 없음
    // react 에서 제공해주는 내장 hook 함수



const Reducer = () => {
    
    // 상태의 초기값이 필요함 
        const init = {
            count : 0
        }

    // reducer 함수 : 매개변수로 상태와 액션값을 넣어줄 예정
        // 콜백함수
        // 메뉴판 미리 만들어두는 것 처럼
        const reducer = (state, action) => {
            // type 이라는 키 값을 전달 받을 것 임. 
            // action 객체에 
            // reducer 함수를 꼭 반환값이 있어야 하니까, return! 

            const {type} = action;

            switch (type) {
                case INCREMENT:
                    // 이전 상태를 가지고, 기능을 작성한 뒤, 반환값으로, 상태를 업데이트 해주면 된다. 
                    return {...state , count : state.count + 1} ;

                case DECREMENT:
                    return {...state , count : state.count -1} ;
                    
                default:
                    return state;
            }
        }

    // 함수의 매개변수로 첫 번째는 메뉴판, 두 번째는 초기값을 전달
        const [state , dispatch] = useReducer(reducer , init);
            // 리듀서로 반환받는 걸 가져옴

    return (
        <div>
            지금 count 의 상태는 : {state.count}
            <button onClick={ () => {dispatch ({type : INCREMENT}) } } > 더하기 </button>
            <button onClick={ () => {dispatch ({type : DECREMENT}) } } > 빼기 </button>            
        </div>
    )
    }

export default Reducer