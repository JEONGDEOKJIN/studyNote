import React, { useState } from 'react'
import axios from 'axios'


const ItemUploadPage = () => {

  const [itemData , setItemData] = useState();

  const handleItemRegister = (e) => {
    console.log("input 에 값 넣음")
    console.log(e.target.value)
    setItemData(e.target.value)
  }

  const sendItemData = async () => {
    await axios.post("")
  }

  return (

    <>
        <div>
            @ItemUploadPage <br></br>
            - input 에 정보 입력 및 이미지로 상품 등록 <br></br>
            - 상품 등록하면 👉 DB 에 저장 <br></br>
        </div>
    
        {/* 상품 등록 페이지 */}
        <label> 상품 등록 </label>
        <input onChange={handleItemRegister} /> 
        <button onClick={handleItemRegister} > 등록 완료 </button>

    </>



  )
}

export default ItemUploadPage