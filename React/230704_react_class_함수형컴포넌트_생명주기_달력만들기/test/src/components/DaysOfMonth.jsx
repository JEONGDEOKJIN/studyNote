



import React, { useState } from 'react'

import EachDay from './EachDay'



const DaysOfMonth = () => {

    function makingDays () {
        
        let days = ["", "", "", "" , ""]

        for (let i = 1;  i <= 31;  i++ ) {
            days.push(i)
        }
        
        return days

    } 

    const [day , setDay] = useState(makingDays());

    return (
        <div className='DaysOfMonth'   >

            {day.map( (item, index) => {
                return (
                        <>
                            <EachDay day={item} />
                        </>
                    )
            })}

        </div>
    )
}

export default DaysOfMonth
