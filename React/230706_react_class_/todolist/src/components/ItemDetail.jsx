
import React from 'react'

const ItemDetail = ({index, item, itemChecked, getCheckboxValue , clickNumber}) => {
  return (
          
            // <div >
            //     <div className='todo_item' >
            //         {/* <div>{clickNumber} </div> */}
            //         <div className='todo_item_no itemDeco' > {index+1}  </div>
            //         <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
            //         <div className= { clickNumber == index? 'todo_item_list itemDeco check_line_through' : 'todo_item_list itemDeco' }> {item} </div>
            //     </div>
            // </div>
            <div >
                <div className='todo_item' >
                    {/* <div>{clickNumber} </div> */}
                    <div className='todo_item_no itemDeco' > {index+1}  </div>
                    <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
                    <div className= { clickNumber == index? 'todo_item_list itemDeco check_line_through' : 'todo_item_list itemDeco' }> {item} </div>
                </div>
            </div>


  )
}

export default ItemDetail