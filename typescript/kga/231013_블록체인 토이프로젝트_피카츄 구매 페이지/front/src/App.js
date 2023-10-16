import './App.css';


import { Routes , Route } from "react-router-dom"   // [@front] npm i react-router-dom 


import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ItemListPage from './pages/ItemListPage';
import ItemUploadPage from './pages/ItemUploadPage';


function App() {

  return (
    <>
        <Routes>  
            <Route path='/' element={ <MainPage /> }  />
            <Route path='/login' element = { <LoginPage /> } />
            <Route path='/itemListPage' element = { <ItemListPage /> } />
            <Route path='/itemUploadPage' element = { <ItemUploadPage /> } />
        </Routes>
          {/* ✅ 리액트 Routes 사용하려면, BrowserRouter 로 감싸줘야 함 -> 해당 부분 index.js 에 설치함 */}

    </>

  );
}

export default App;
