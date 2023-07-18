
import React , {createContext , useContext, useState} from 'react'


// useContext
    // 리액트에서 제공해주는 '내장 훅' 임. 
    // '전역 상태 관리' 를 도와주는 함수 임. 

    // 리액트는 데이터의 흐름이 '단방향' 임 -> 그래서 불편함 -> 그래서 전역 상태를 사용함 
    // '전역 상태' 를 사용할 때 도움받을 수 있는 함수가 'react hook' 함수가 있음. 

    // props 로 데이터를 넘겨주지 않아도, 컴포넌트들이, 데이터를 공유 할 수 있도록 해줌. 


export const Global = createContext()
    // createContext() 함수를 호출해서 Global 객체 생성 
    // context 객체 생성


const Context01 = () => {
    return <Context02></Context02>
}

const Context02 = () => {

    const { name, setName } = useContext(Global);
        // Global 은 패일을 배서 

        // value 로 전달한 값을 받기 위해 
            // useContext() 매개변수로 context 객체를 전달 해준다.


    return <>
        내 이름은 {name}
        <button onClick={() => { setName("soon2") }} >  이름 변경  </button>
    </>
    // 이렇게 하면, 여기에 묶인 것만 사용할 수 있는게 만들어짐❓❓❓❓❓❓ 
    // 이건 컨텍스트로 만들어서, context01의 자식들만 접근할 수 있게 됨 ⭐⭐⭐⭐⭐⭐ 
    // redux 에서 변경되고 -> 일부만 다뤄야 할 때 -> 이 방식을 사용 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
}
    // Context02 는 Context01 로 부터 받지 않아도, (부모로 부터 값을 받지 않아도)
    // Context02 가 '전역값에 접근' 해서 사용할 수 있게 됨 ⭐⭐⭐⭐⭐⭐ 

    // Context02 에 데이터를 전달한 적이 없음. 
    // 그런데, 값을 하나 만들어서, 자식 컴포넌트들은 어디서나 전역갑에 접근할 수 있게 됨. 



const Context = () => {
    // Context 최상단 부모 컴포넌트
    const [name, setName] = useState("soon")

    // 부모의 상태변수와 상태변수 update 함수 인 setName 을 객체의 키 값으로 obj 에 선언 
    const obj = {
        name, 
        setName
    }

    return (
        // 전역 상태를 관리할 때, Global.Provider 를 최상단 트리로 감싸주고
        // value 는 정해진 키 값임 
        // value 에는 '전달할 데이터' 를 넣어준다. (전역 상태!) ⭐⭐⭐
        <Global.Provider value={ obj }>
            {/* <div>Context</div> */}
            <Context01></Context01>
        </Global.Provider>
            // 이렇게 감싸서 -> 이 안에 있는 것들이 사용할 수 있게 한다 ⭐⭐⭐⭐⭐ 
            // 넘길 때는 value 라는 ⭐⭐'정해진 키값' 을 사용! 

    )
}

export default Context