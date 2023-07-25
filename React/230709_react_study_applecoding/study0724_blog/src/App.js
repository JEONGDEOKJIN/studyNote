

import { useState } from 'react';
import './App.css';

import Modal from './component/Modal';
// import CreateItem from './component/WriteItem'

function App() {
  
  let post = '강남 우동 맛집';
  let [title , setTitle] = useState(['게시글 1 ' , '게시게시' , '추천추천' , '이렇게 넣으면?'])
  
  const [likes, setLikes] = useState([0,0,0])

  const [arrModalTitle , setModalTitle] = useState(['첫번째 글 모달 제목' , '두 번째 글 모달' , '세 번째 글 모달'])
  const [targetModalTitle , setTargetModalTitle] = useState("")

  const [isModalOpen, setIsModalOpen] = useState([false , false, false])

  const [createItem , setCreateItem] = useState("테스트")

  // 좋아요 증가 함수 
  function likesIncrease(index) {
    console.log("따봉눌림")
    
    const copy = [...likes]
    copy[index] = copy[index] + 1 
    setLikes(copy)       
  }

  // 게시글 상단, 수정 버튼 눌렀을 때, 첫 번째 글 제목 변경 함수
  const changeTitle = () => {
    console.log("따봉눌림?")
    const copy = [...title]
    copy[0] = '여자 코트 추천';

    setTitle(copy)
  }

  // 게시글 상단, 정렬 버튼 눌렀을 때, 게시글 순서 변경
  const changeOrder = () => {
    console.log("정렬변경눌림")
    const copy = [...title]
    setTitle(copy.sort())
  }

  // 모달창 열기
  const handleModal = () => {
    console.log("모달눌림")
    setIsModalOpen(!isModalOpen)
  }

  // 특정 모달창 열면 -> 해당 인덱스 제목만 보이게 하기
  const handleModalTitle = (index) => {
    console.log("이 모달 눌림" , index)

    setTargetModalTitle(arrModalTitle[index])
  }

  // 글쓰기 버튼 
  const handleCreateItem = () => {
    console.log("버튼 눌림")
    console.log("값 확인" , createItem)

    console.log("맞나요" , title)
    const copyTitle = [...title]

    copyTitle.push(createItem)
    console.log("들어오는지확인" , copyTitle)

    // title 배열에 넣어주기
    setTitle(copyTitle)
  }

  // 글쓰기 삭제 버튼 
  const handleDeleteBtn = (index) => {
    console.log("몇 번째 삭제 버튼?" , index)
    
    const copyTitle = [...title]

    const removed = copyTitle.splice(index , 1)
    console.log("삭제된 값 확인" , removed)

    setTitle(copyTitle)
  }



  return (
    <div className="App">

      <div className='black-nav' > 
        <div> 개발 blog </div>
      </div>

      <div>
        <button onClick={ changeTitle } > 첫 번째 글 제목 수정 </button>
        <button onClick={ changeOrder } > 글 정렬 </button>
      </div>

      {
        title.map( (item , index) => {
          return ( 
          <div className='list' >
              <h3 className='item_title'  onClick={ (e) => { e.stopPropagation(); handleModal(); handleModalTitle(index)}  } > { item } </h3>  
    
              <span className='thumbs' onClick={ () => {likesIncrease(index)} } > 👍 : {likes[index]} </span>  
              
              <span> 2월 17일 발행 </span> 
              <button onClick={() => {handleDeleteBtn(index)}} > 게시글 삭제 </button>


          </div>
          )
        })
      }

      <div>
        <input type="text"  onChange={ (e) => {setCreateItem(e.target.value)} } />
        <button onClick={ () => { handleCreateItem()} }> 글쓰기 </button>
      </div>

      <p> {createItem} </p>
      

      {
        isModalOpen == true ? <Modal targetModalTitle = {targetModalTitle}  changeTitle = {changeTitle}  /> : null
      }


      {/* {
        arrModalTitle.map((item, index) => {
          return(
            isModalOpen == true ? <Modal arrModalTitle = {arrModalTitle[index]}  changeTitle = {changeTitle}  /> : null
          )
        })
      }
 */}

  {/* 나는야 민우왕이다 | 자꾸 왕이 등장한다. 비상 비상.  */}

    </div>
  );
}

export default App;
