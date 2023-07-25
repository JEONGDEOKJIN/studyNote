import React from 'react'

const MainItem = ({title, price, content}) => {
    return (
        <div className='main_item_img_container' >
            <figure className='main_item_img' style={{backgroundImage : `url('https://cdn-www.bluestacks.com/bs-images/gametiles_com.Studiosaurus.Gogogothegame1.jpg')` }} > </figure>
            <h3> {title}  </h3>
            <p> {content} </p>  
            <p> {price} </p>  
        </div>
    )
}

export default MainItem