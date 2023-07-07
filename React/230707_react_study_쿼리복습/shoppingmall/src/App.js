import './App.css';

import {Routes, Route} from 'react-router-dom'

import { Main, Login, Shop, Detail, Mypage } from './pages';


function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/' element={ <Main title = {"home"}  /> } />  
        
        <Route path='/login' element={ <Login title = {"login"} /> } />  
        
        <Route path='/shop' element={ <Shop /> } />

        <Route path='/detail' element={ <Detail /> } />  
        
        <Route path='/mypage' element={ <Mypage /> } />  

      </Routes>

    </div>
  );
}

export default App;
