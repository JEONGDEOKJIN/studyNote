import React from 'react'

const DayOfWeek = ({isWeekendClicked}) => {
    
    
    if (isWeekendClicked == false) {
        return (
            <>
                <div className='dayOfWeekdays_container' >
                    {/* 이것도 추후에 컴포넌트로 처리 가능 ✅ */}
                    <div className='dayOfWeek' > 월요일 </div>
                    <div className='dayOfWeek' > 화요일 </div>
                    <div className='dayOfWeek' > 수요일 </div>
                    <div className='dayOfWeek' > 목요일 </div>
                    <div className='dayOfWeek' > 금요일 </div>
                </div>
            </>
        )
        } else {
            return (
                <>
                    <div className='dayOfWeek_container' >
                        {/* 이것도 추후에 컴포넌트로 처리 가능 ✅ */}
                        <div className='dayOfWeek'  > 월요일 </div>
                        <div className='dayOfWeek' > 화요일 </div>
                        <div className='dayOfWeek' > 수요일 </div>
                        <div className='dayOfWeek' > 목요일 </div>
                        <div className='dayOfWeek' > 금요일 </div>
                        <div className='dayOfWeek' > 토요일 </div>
                        <div className='dayOfWeek' > 일요일 </div>
                    </div>
                </>
            )
        }
    }

export default DayOfWeek
