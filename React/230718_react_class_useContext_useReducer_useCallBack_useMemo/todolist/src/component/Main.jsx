
import React , {createContext ,  useState}  from 'react'

import Modal from './Modal'
import TodoItem from './TodoItem'


export const Global = createContext()


const Main = () => {

    // 할일 작성
    const [todo, setTodoList] = useState([ ])

    // 모달창 상태 
    const [isModalOpen , setIsModalOpen] = useState(false)

    
    // function showModal() {
    //     return(
    //         isModalOpen == true? <Modal /> : null
    //     )
    // }


    function handleModal () {
        setIsModalOpen(!isModalOpen)
        console.log(isModalOpen)
        // showModal()
    }


    const obj = {
        todo, 
        setTodoList, 
        handleModal,
    }

    return (
        
            <Global.Provider value={ obj } >

                <TodoItem />    
                <TodoItem />

                <button onClick={handleModal}  > 작성 </button>
                {/* ⭐⭐⭐⭐⭐⭐⭐⭐  */}
                {isModalOpen && <Modal />}  {/* 모달창이 열려있는 경우에만 Modal 컴포넌트를 렌더링합니다. */}


            </Global.Provider>
        
    )
}

export default Main