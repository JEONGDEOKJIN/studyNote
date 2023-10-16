import React from 'react'
import { useNavigate } from 'react-router-dom'

const ItemListPage = () => {
  const navigate = useNavigate();

  const registerBtnHandle = () => {
    navigate('/itemUploadPage')
  }

  return (
    <>
    <div>ItemListPage</div>

    <button onClick={registerBtnHandle} > 상품 등록 페이지 이동 </button>
    
    </>

  )
}

export default ItemListPage
