

import  React from 'react'
import { useState , useEffect } from 'react'

const Item = ({createItem}) => {

    
    const [todoItem, setToDoItem] = useState([])

    const [itemChecked , setItemChecked] = useState(false)
    
    useEffect( () => {
        if(createItem){
            setToDoItem( prevItem => [...prevItem, createItem] )
        }
        
    } , [createItem])

    
    let clickNumber
    function getCheckboxValue (event)  {
        console.log(event.target.value)
        clickNumber = event.target.value
        setItemChecked(!itemChecked)
        console.log(clickNumber)

        // console.log(event.target)
        // setItemChecked( preItem => [...preItem , event.target.value ])

        // if(event.target.checked){
        //     setItemChecked(!itemChecked)
        // }
    } 


    return (
        
        todoItem.map( (item, index) => {

            // 여기에 이제 컴포넌트 만들고 , > 컴포넌트로 반복문 돌리면 된다. 
            return (
            <div key = {index}>
                <div className='todo_item' >
                    <div className='todo_item_no itemDeco' > {index+1}  </div>
                    <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
                    <div className= { index===clickNumber ? 'todo_item_list itemDeco check_line_through' : 'todo_item_list itemDeco'  }> {item} </div>
                </div>
            </div>

            )

            // return (
            // <div key = {index}>
            //     <div className='todo_item' >
            //         <div className='todo_item_no itemDeco' > {index+1}  </div>
            //         <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
            //         <div className='todo_item_list itemDeco  ' > {item} </div>
            //     </div>
            // </div>

            // )



            // if(itemChecked){
            //     return(
            //         <div key = {index}>
            //             <div className='todo_item' >
            //                 <div className='todo_item_no itemDeco' > {index+1}  </div>
            //                 <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
            //                 <div className='todo_item_list itemDeco check_line_through ' > {item} </div>
            //             </div>
            //         </div>
            //         )

            // } else {

            //     return(
            //         <div key = {index}>
            //             <div className='todo_item' >
            //                 <div className='todo_item_no itemDeco' > {index+1}  </div>
            //                 <div className='todo_item_check itemDeco ' > <input type="checkbox" value={index} onClick={getCheckboxValue} />  </div>
            //                 <div className='todo_item_list itemDeco ' > {item} </div>
            //             </div>
            //         </div>
            //         )
            // }
            })
        )
    }

export default Item