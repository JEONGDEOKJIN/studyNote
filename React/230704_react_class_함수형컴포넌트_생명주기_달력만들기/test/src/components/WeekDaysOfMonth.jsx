



import React, { useState } from 'react'

import EachDay from './EachDay'



const DaysOfMonth = () => {

    function makingDays () {
        
        // let days = ["", "", "", "" , ""]
        let days = []

        for (let i = 3;  i <= 31;  i += 7 ) {
            if (i <= 31) days.push(i)
            if (i+1 <= 31) days.push(i+1)
            if (i+2 <= 31) days.push(i+2)
            if (i+3 <= 31) days.push(i+3)
            if (i+4 <= 31) days.push(i+4)
        }

        return days

    } 

    const [day , setDay] = useState(makingDays());

    return (
        <div className='DaysOfMonth'   >

            {day.map( (item, index) => {
                return (
                        <>
                            <EachDay day={item}  style={{width : "55rem"}} />
                        </>
                    )
            })}

        </div>
    )
}

export default DaysOfMonth
