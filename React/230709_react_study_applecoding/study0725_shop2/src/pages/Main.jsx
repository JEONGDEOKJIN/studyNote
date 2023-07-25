import React from 'react'




const Main = () => {
    const [ itemList , setItemList ] = useState(goodsData)

    return (

        


        <div>
            <div className='main_BGI_container' >
                <figure className='main_background_image' > 
                </figure>

            <div className='main_middle_container' > 
                {itemList.map( (item, index) => {
                    return (
                    <MainItem key={item.id} title={item.title} price={item.price} content={item.content}  />
                )
                } )
                }

            </div>

        </div>

        </div>
    )
}

export default Main