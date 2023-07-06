
import { useEffect, useState } from 'react';
import '../../src/App.css';

// import Image from './components/Image'

import Block from '../components/Block';
// import { imgBomb , imgHappy } from './img';

import {Modal} from "./Modal"

import {Routes, Route } from 'react-router-dom';

  function App() {

    // 이후에 좀 map 써서 다시 세련되게 
    const blocks = {
      block_0 : {
        index : 0, 
      }, 
      block_1 : {
        index : 1, 
        // img : imgHappy
      }, 
      block_2 : {
        index : 2, 
        // mine : false
      }, 
      block_3 : {
        index : 3, 
        // mine : true
      }, 
      block_4 : {
        index : 4, 
        // mine : true
      }, 
      block_5 : {
        index : 5, 
        // mine : false
      }, 
      block_6 : {
        index : 6, 
        // mine : true
      }, 
      block_7 : {
        index : 7, 
        // mine : true
      }, 
      block_8 : {
        index : 8, 
        // mine : false
      }, 

    }

    // 사용자 선택 
    const [userSelect , setUserSelect] = useState(-1);
    
    // 컴퓨터가 선택해서 mine 깐 곳
    const [mineSelect, setMineSelect] = useState(-1);

    // 승패 담을 곳 
    const [result , setResult] = useState(-1);

    // 지뢰 심기
    const [arrMine, setArrMine] = useState([true, false, false, true,  false, true, false, false, false])
    
    // 8개 중 1개를 랜덤으로 뽑고 -> 7개 남는다 


    
    function isBlockClicked (event) {
      console.log(" 클릭된 블록? 👉 " , event.target.id)

      let selectedBlock = event.target.id


      // 지뢰 선택하기 | ✅ 0~9 까지 고르고 - 이걸 3번 하고 - 만약 null 이면 다시 하고 
      setMineSelect(blocks["block_0"])
      console.log("컴퓨터가 선택한 지뢰" , mineSelect)

      // 사용자 클릭하기
      setUserSelect(blocks[`block_${selectedBlock}`])
      console.log("유저가 클릭한 곳" , userSelect)

      // 결과 판단하기 
      if (userSelect.index === mineSelect.index) {
        console.log("지뢰터짐🚀")
        setResult("지뢰터짐") 



      } else {
        setResult("안전함")
      }

    }

    useEffect ( () => {
      let tempMine = [...arrMine]
      tempMine.sort( () => Math.random() - 0.5 )
      setArrMine(tempMine)
    } , [] )


    return (

      <div className="App">

        <div className='blockComponent_container' >


        {arrMine.map((item) => {
          return(
            <Block mine = {item} />
            )
          })}

        {/* <img src = {imgBomb} /> */}
        
        {/* <Block  mine = {true}   />
        <Block  mine = {false}  />
        <Block  mine = {false}  />
        <Block  mine = {false}  />
        <Block  mine = {false}  />
        <Block  mine = {false}  />
        <Block  mine = {true}   />
        <Block  mine = {false}  />
        <Block  mine = {true}   /> */}
        
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
        {/* <Block result = {result} clickFn ={isBlockClicked} /> */}
      
        {/* <Block result = {"안전함"} />
        <Block result = {"지뢰터짐"} />
        <Block result = {"안전함"} />
        <Block result = {"안전함"} />
        <Block result = {"안전함"} />
        <Block result = {"지뢰터짐"} />
        <Block result = {"지뢰터짐"} />
        <Block result = {"안전함"} />
        <Block result = {"안전함"} /> */}






          {/* {
            num.map(( item, index ) => {
              return(
                <>
                  <div   id={index} className='block_container' onClick={isBlockClicked} >
                    {index}

                    <Image result = {result}   />
                      

                  </div>
                </>
              )
            })
          } */}

        </div>


      </div>

      
    );
  }

  export default App;
