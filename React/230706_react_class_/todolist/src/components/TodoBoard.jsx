

import React from 'react'
import {useState , useEffect} from 'react'
import { Title , Item , CreateItem} from '../components'



const TodoBoard = () => {

  const [createItem, setCreateItem] = useState("")

  function submitHandler (event) {
      event.preventDefault();
      // const {value} = event.target
      console.log("@TodoBoard 컴포넌트 | input 에서 제출한 값 오고 있나 확인" , event.target[0].value)
      setCreateItem(event.target[0].value)
      console.log( "@TodoBoard 컴포넌트 | createItem state 에 저장됐나 확인" , createItem)
  }

  function  changeHandler (event) {
      // console.log("적고 있는거 확인" , event.target.value)
  }


  return (

    <div className='todoBoard' >

        <Title />

        <Item  createItem = {createItem} />

        <CreateItem submitHandler={submitHandler}   changeHandler = {changeHandler} />

    </div>
  )
}

export default TodoBoard