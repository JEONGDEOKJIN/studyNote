import React from 'react'

// 값 받기 👇👇 
import { useParams } from 'react-router-dom'
import goodsData from '../data'

const Detail = ({title, price, content}) => {

// id 키에 담은 것 꺼내오기 👇👇 
  const {id} = useParams()
  
  // 데이터 뽑히는거 확인
    // console.log("상품 데이터" , goodsData)
    // console.log("상품 데이터_1" , goodsData[0])
    // console.log("상품 데이터_id,title," , goodsData[0].title)
    // console.log("상품 데이터_id,title," , goodsData[0].content)

  return (
    <div>
        <div className='detail_img_container' >
            <figure className='main_item_img' style={{backgroundImage : `url('https://cdn-www.bluestacks.com/bs-images/gametiles_com.Studiosaurus.Gogogothegame1.jpg')` }} > </figure>
            {/* 넣어서 쓰기 👇👇 */}
            <h3> {goodsData[id].title}  </h3> 
            <p> {goodsData[id].content} </p>  
            <p> {goodsData[id].price} </p>  
        </div>

    </div>
  )
}

export default Detail