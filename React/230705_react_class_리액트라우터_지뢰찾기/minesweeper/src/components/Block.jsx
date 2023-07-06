

import {imgBomb , imgHappy} from "../img/index"
import { useState , useEffect } from "react"
import Modal from "../pages/Modal"
import { Link } from 'react-router-dom'

import {Routes, Route} from 'react-router-dom'


const Block = ({mine}) => {

    const [blockClicked , setBlockClicked] = useState(false)

    // const [gameOver, setGameOver] = useState(false)

    // function gameOver() {

    //     if (1 == 1) {
    //         return(
    //             <Modal />
    //         )
    //     }

    // }

    function checkBlockClick () {
        setBlockClicked(!blockClicked)
    }


    if (blockClicked == false) {
        
        return(
            <div className='block_container_ready'  onClick={checkBlockClick} >
                두근두근
            </div>
        )
        
    } else {
        if (mine == true) {

            return (
                <div className='block_container_bomb'  > 
                    지뢰 터짐, 게임 끝
                    <img src={imgBomb} style={{width : "3rem"}} />
                    
                    <Link to={"/Modal"} > 게임끝 낫배드 였어 </Link>


                </div>
            )
            


        } else {
            return(
                <div className='block_container' > 
                살았음. 운이 좋아!! 
                <img src={imgHappy} style={{width : "3rem"}} />
                </div>
            )
        }
    }
}

export default Block