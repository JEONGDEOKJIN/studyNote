
import './App.css';

import {Main, Login, Shop} from "./pages"

import {Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    {/* 이전에는 switch 문 이었음. 
        switch 문 -> 그 밑에 케이스 케이스 케이스 들 */}
    {/* 조건부 렌더링 Routes 가 Route 들의 부모 컴포넌트 */}
    {/* Route 는 '조건이 만족' 되면 -> 렌더링? 
        Route 컴포넌트는 속성을 2개 주자. 
          path 랑 element 가 들어감
          path 는 '브라우저의 경로' (컴포넌트 페이지를 바꿔서 보여줄 경로) | 경로가 이거면, 바꿔서 보여줄게 
          element 는 보여줄 컴포넌트 | path 조건에 맞으면, element 속성에 있는 것을 보여준다. 

        Route 컴포넌트는 페이지를 정의 해준다. 
        
        */}

      <Routes>
        <Route path='/' element={ <Main /> }  />  
        <Route path='/login' element = { <Login /> }  />  
        <Route path='/shop' element = { <Shop /> }  />    
      </Routes>


    </div>
  );
}

export default App;
