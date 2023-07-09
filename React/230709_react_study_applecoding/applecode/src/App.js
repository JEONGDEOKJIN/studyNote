
import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';


function App() {

  const [itemTitle, setItemTitle] = useState(['남자코트 추천' , '강남우동맛집' , '파이썬 독학']);

  const [likeNum, setLikeNum] = useState(0)

  const [isModalClicked , setIsModalClicked] = useState(false)


  function handleLikeBtn () {
    setLikeNum(likeNum + 1)
  }

  function changeTitle () {
    setItemTitle(["여자코트 추천" , '강남우동맛집' , '파이썬독학'])
  }

  function sortTitle () {
    const copy = [...itemTitle]
    setItemTitle(copy.sort())
  }

  function showModal() {
    return (
      isModalClicked==true? <Modal /> : null
    )

  }


  function handleModal () {

    setIsModalClicked(!isModalClicked)
    console.log(isModalClicked)
    // 클릭되면 -> 켜고, 클릭되지 않으면 -> 끈다. 
    showModal()
  }

  

  return (
    <div className="App">

      
      <div className='black-nav' >
        <h5> ReactBlog </h5>
      </div>

      <button onClick={changeTitle} > 글수정 </button>
      <button onClick={sortTitle} > 글 가나다 순 정렬 </button>


      <div className='list' >
        <h3 onClick={handleModal} className='listTitle' > {itemTitle[0]}
          <span className='thumbs'  onClick={ handleLikeBtn } > 👍 : {likeNum} </span>
        </h3>
          <p> 7월 19일 발행 </p>
      </div>

      <div className='list' >
        <h3 onClick={handleModal} className='listTitle' > {itemTitle[1]}
          <span className='thumbs'  onClick={ handleLikeBtn } > 👍 : {likeNum} </span>
        </h3>
          <p> 7월 19일 발행 </p>
      </div>

      <div className='list' >
        <h3 onClick={handleModal} className='listTitle' > {itemTitle[2]}
          <span className='thumbs'  onClick={ handleLikeBtn } > 👍 : {likeNum} </span>
        </h3>
          <p> 7월 19일 발행 </p>
      </div>





    </div>
  );
}

export default App;
