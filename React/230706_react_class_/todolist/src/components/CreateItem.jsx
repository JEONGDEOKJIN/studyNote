

import React from 'react'
import {useState  , useEffect} from 'react'

const CreateItem = ({submitHandler , changeHandler}) => {


    return (
        
        <div className='createItem_container' >

        <form onSubmit={submitHandler} >

            <input type="text" className='createItem_input'  onChange={changeHandler} placeholder = "오늘 할 일 적으쇼 ✍" />
            <input type='submit' value="등록" />  

        </form>

        </div>
    )
    }

export default CreateItem