


import React , {useEffect, useState}  from 'react'

import DaysOfMonth from "./DaysOfMonth"
import WeekDaysOfMonth from "./WeekDaysOfMonth"



const Body = ({isClicked , isWeekendClicked}) => {
    
    console.log("isWeekendClicked 잘 들어오나" , isWeekendClicked)
    console.log( "isClicked 클릭여부" ,  isClicked )

    if (isClicked == false) {
        return null
    } else {

        if (isWeekendClicked === false) {
            return(
                <div>
                    <div className='weekdaysOfMonth_container' >
                        <WeekDaysOfMonth />
                    </div>
                </div>
            )
        } else {
            return (
                <div> 
                    <div className='daysOfMonth_container'   >
                        <DaysOfMonth />
                    </div>        
                </div>
            )
        }
    }
}

export default Body




