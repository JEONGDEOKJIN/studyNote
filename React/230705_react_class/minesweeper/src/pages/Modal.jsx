

import React from 'react'
import { Link } from 'react-router-dom'


const Modal = () => {
  return (
    <div className='gameOverModal' >


        <Link to={"/home"} >
          한번 더 하면 이기겠지
        </Link>

        
    </div>
  )
}

export default Modal