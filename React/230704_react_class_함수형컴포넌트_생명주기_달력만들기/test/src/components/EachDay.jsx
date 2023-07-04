
import React, { useState } from "react";
import NumberOfDay from "./NumberOfDay"
import RibbonOfDay from "./RibbonOfDay"


const EachDay = ({day}) => {

    console.log( "EachDay 이 안에 있는거 👉" ,  day)
    // console.log( "EachDay 이 안에 있는거 👉" ,  key)

    // state 설정 
    const [isColorClicked, setColorClicked] = useState(false)
    const [color, setColor] = useState("lemonchiffon")


    function checkColorClicked() {
        setColorClicked(!isColorClicked)
        changeColor()
    }

    function changeColor() {
        if(isColorClicked == true) {
            setColor("blue")
        } else {
            setColor("lemonchiffon")
        }
    }

    return(

        <div onClick={checkColorClicked} className="eachDay"  style={{backgroundColor :  color }} >

            <>
                <RibbonOfDay />

                <NumberOfDay   day = {day} />            
            
            </>

        </div>
    )

}


export default EachDay



