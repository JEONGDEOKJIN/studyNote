import React from 'react'
import { useContext } from 'react'

import { Global } from './Main'

const TodoItem = () => {

    const {todo , setTodoList} = useContext(Global)

  return (
    <>
        <div>
            오늘 기록 : <span> {todo} </span>    
        </div>
    </>
  )
}

export default TodoItem