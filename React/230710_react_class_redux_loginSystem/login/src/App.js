import './App.css';

import {Routes, Route} from 'react-router-dom'

import {Main , Login, MyPage, Order} from './pages'

function App() {
  return (

    <div className="App">
      <span>
      나는 박민우 탐정이죠. 나는 app.js 에 있습니다. / app.js 에 적으면, 모든 페이지에서 보이네요
      </span>



    {/* [라우터 설정중] 
        1) 궁금한 건, 여기에 설정해도, 렌더링이 안 되나? 
          👉 응 렌더링 안 됨 
        2) 모든 페이지에 대한 라우터를 꼭, app.js 에서 해줘야만 하나?  
          👉 필수적인 건 아님. 그래서, Mypage 컴포넌트 안에서, Routes, Routes 사용해서, 설정할 수 있음. 
          👉 다만, 라우팅을 App.js 에서 '한 눈에 관리' 하는게 1) 유지보수 2) 협업에 좋음 
    */}

      <Routes >
        <Route path='/' element={ <Main /> } >  </Route>
        <Route path='/login' element={ <Login /> } >  </Route>
        <Route path='/mypage' element={ <MyPage /> } >  </Route>
        <Route path='/order' element={ <Order /> } >  </Route>
      </Routes>


    </div>
  );
}


export default App;
