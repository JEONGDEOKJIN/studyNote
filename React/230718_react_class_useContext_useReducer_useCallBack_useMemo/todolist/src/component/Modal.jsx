import React from 'react'

import {  createContext , useContext } from 'react'

import { Global } from './Main'

// export const Global = createContext()

const Modal = () => {

    const {todo , setTodoList } = useContext(Global)

return (
    <div>

        <input type="text" onChange={ (e) => {setTodoList(e.target.value)} }/>
        <button> 할일 작성 완료 </button>

            {/* 
                이렇게 완료가 되는거면, button 은 무슨일을 하게 되는거지? 
                모달창을 닫나?
            */}

    </div>
    )
}

export default Modal