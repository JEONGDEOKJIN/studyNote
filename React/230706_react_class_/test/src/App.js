import './App.css';

import { Route, Routes , Navigate } from 'react-router-dom';
  // Routes 가 예전엔 switch 였음 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
import { useState } from 'react';

import {Detail, Login, Main, Mypage, Shop} from './pages'

function App() {

  const [login, setLogin] = useState(false)

  const Redirect = () => {

    // Navigate : 브라우저의 경로를 바꿔준다. 
    // 페이지 리다이렉트 가능! 
    // 마이페이지는 보호받는 페이지가 된다. 
      // 즉, 로그인 되었을 때만 볼 수 있는 페이지! 

    // 로그인이 안 되어 있는 상태면 -> 메인 페이지로 이동 시킨다. 
    return login === true ? <Mypage login={login} /> : <Navigate to={'/'} />;
    // return login === true ? <Mypage login={login} /> : <Navigate to={'/login'} />;
      // 이쪽으로 이동 시켜도

  }

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={ <Main login={login}  /> } />
        <Route path='/login' element={ <Login  login={login} setLogin={setLogin}  /> } />
        
        <Route path='/shop' element={ <Shop login={login} /> } />

        {/* 저 값을 넣어서, 데이터베이스에 요청해서, 상품을 가져올 수 있음. 
            매개변수 id 는 데이터베이의 id 는 해당 상품의 id. 
            num 은 해당 상품의 번호 
            name 은 해당 상품의 이름 
            이렇게 넘어가면 -> 디테일 페이지에서 params 값을 받을 것 임 
            
        */}
        <Route path='/detail/:id/:num/:name' element={ <Detail login={login} /> } />

        {/* 마이페이지는 '로그인이 되어 있으면' 들어갈 수 있게 처리하기
          로그인 상태값은 지금은 APP 에 줄 것 
          로그인 정보는 모든 페이지에서 필요 
          그러려면, 모든 자식에게 줄 수 있어야 하니까, 부모에게 ⭐⭐⭐ > so, app 에 
          다만, redux 를 배우면 -> app 에 하지 않아도 됨. redux 를 배우면 그곳에 저장하면 됨 

        */}


        <Route path='/mypage' element={ <Redirect /> } />

      </Routes>

    </div>
  );
}

export default App;
