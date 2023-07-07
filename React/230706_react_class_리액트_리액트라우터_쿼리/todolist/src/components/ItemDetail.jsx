
import React from 'react'

import { useState } from 'react'

const ItemDetail = ({index, item}) => {
  
  const [itemChecked , setItemChecked] = useState(false)

  function getCheckboxValue (event)  {
    setItemChecked(!itemChecked)
} 

  return (          
            <div >
                <div className='todo_item' >
                    <div className='todo_item_no itemDeco' > {index+1}  </div>
                    <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
                    <div className= { itemChecked? 'todo_item_list itemDeco check_line_through' : 'todo_item_list itemDeco' }> {item} </div>
                </div>
            </div>
  )
}

export default ItemDetail