import React from 'react'

import { Outlet } from 'react-router-dom'

const Event = () => {
  return (
    <h2>
        오늘의 이벤트 
        <Outlet> </Outlet>
    </h2>
  )
}

export default Event