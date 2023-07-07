

import  React from 'react'
import { useState , useEffect } from 'react'
import ItemDetail from './ItemDetail'

const Item = ({createItem}) => {
    
    const [todoItem, setToDoItem] = useState([])
    
    useEffect( () => {
        if(createItem){
            setToDoItem( prevItem => [...prevItem, createItem] )
        }
        
    } , [createItem])

    return (
        todoItem.map( (item, index) => {
            return(
                <ItemDetail    item = {item} index = {index}   />            
            )

            })
        )
    }

export default Item