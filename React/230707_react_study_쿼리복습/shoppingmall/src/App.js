import './App.css';

import {Routes, Route} from 'react-router-dom'

import { Main, Login, Shop, Detail, Mypage } from './pages';

import { useState } from 'react';


function App() {


  const [isLogin , setIsLogin] = useState(false);

  function loginBtnClick () {
    // 로그인 완료 버튼 클릭되면 
    setIsLogin(!isLogin)
  } 

  return (
    <div className="App">

      <Routes>

        <Route path='/' element={ <Main title = {"home"}  isLoginCompleted = {isLogin}  /> } />  
        
        <Route path='/login' element={ <Login title = {"login"} /> } />  
        
        <Route path='/shop' element={ <Shop /> } />

        <Route path='/detail' element={ <Detail /> } />  
        
        <Route path='/mypage' element={ <Mypage /> } />  

      </Routes>

    </div>
  );
}

export default App;
