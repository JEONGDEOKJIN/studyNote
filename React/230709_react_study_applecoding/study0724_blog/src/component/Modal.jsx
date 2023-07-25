import React from 'react'

const Modal = ({changeTitle, targetModalTitle}) => {

  return (
    <div className='modal'>
        <button onClick={() => changeTitle()} >글 수정</button>
        <h3>{targetModalTitle}</h3>
        <p>내용</p>
    </div>
  )
}

export default Modal