

import { useState } from 'react';
import './App.css';

function App() {
  

  let post = '강남 우동 맛집';
  let [title , setTitle] = useState(['남자남자 코트 추천' , '남자 코트 추천' , '강남 코트 추천'])
  const [likes , setLikes] = useState(0)


  function likesIncrease() {
    console.log("따봉눌림")
    setLikes(likes + 1)
      // 바로 return 될 값을 작성하면 됨. 
      // [주의] 
        // 여기가 포인트임 
        // 이 부분이 계속 틀렸음. 
        // likes = likes + 1 계속 이렇게 썼음. 
        // 왜 이렇게 쓰냐면, 안에 있는 걸로 갈아치워주는 함수이기 때문에.       
  }

  const changeTitle = () => {
    console.log("다봉?")
    title[0] = '여자 코트 추천';
  }


  return (
    <div className="App">

      <div className='black-nav' > 
        <div> 개발 blog </div>
      </div>


      <div>
        <button onClick={ changeTitle } > 글 수정 </button>
      </div>

      <div className='list' >
          <h3> { title[0] } </h3>
          <p> 2월 17일 발행 </p>
      </div>
      <div className='list' >
          <h3> { title[1] } </h3>
          <p> 2월 17일 발행 </p>
      </div>
      <div className='list' >
          <h3> { title[2] }  <span className='thumbs' onClick={likesIncrease} > 👍 : {likes} </span> </h3>
          <p> 2월 17일 발행 </p>
      </div>




    </div>
  );
}

export default App;
