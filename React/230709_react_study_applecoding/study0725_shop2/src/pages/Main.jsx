import React from 'react'


import { useState } from 'react'
import goodsData from '../data'
import MainItem from '../component/MainItem'

import { useNavigate } from 'react-router-dom'

const Main = () => {
    const [ itemList , setItemList ] = useState(goodsData)

    const navigate = useNavigate()

    return (

        <div>
            <div className='main_BGI_container' >
                <figure className='main_background_image' > 
                </figure>

            <div className='main_middle_container' > 
                {itemList.map( (item, index) => {
                    return (
                    <MainItem  key={item.id} title={item.title} price={item.price} content={item.content}  />
                    )
                } )
                }

            </div>

        </div>

        </div>
    )
}

export default Main