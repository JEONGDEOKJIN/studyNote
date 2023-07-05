import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 이거 가져오기 ⭐⭐⭐ 
import {BrowserRouter} from 'react-router-dom'

// 리액트 라우터 
  // 리액트는 페이지가 '한 개 임' (index.html 하나)
  // 근데, 어떻게, 여러개의 페이지를 보여줄까? 
  // '페이지를 컴포넌트로 구성' 하고, 하위 컴포넌트를 몰아서, 페이지 형태로 구색 맞춰서 브라우저에 보여준다. 

  // '페이지가 전환된다.' 는 건, 
  // '페이지 컴포넌트' 를 '조건마다, 바꿔서 보여주면!' 되는 것. 
  // '페이지 전환' 했을 때, -> 링크가 변함
    // so, url 조건처리 해주면 된다는 말. 
    // 리액트는 특성상, url 변경을 해도, 새로고침이 안 됨. 새로고침 되면, 상태값이 망가짐. 
    // so, 브라우저가 새로고침 되지 않고, 내용만! 교체되는 구조! ⭐
    // 조건은 '브라우저의 url' 에 따라, 페이지 컴포넌트를 맞춰서 보여주면 된다. 

    // 결국은, 페이지 이동은 '눈속임' 

    // 이걸 하려면, '리액트 라우터' 라이브러리를 사용해야 함. 

    // 라우터가 변환되면, 공부할 때 가장 좋은 건, 리액트 공식 홈페이지!! 
    // https://reactrouter.com/en/v6.3.0 ✅
    // 리액트는 공부할 때, 공식홈페이지 RM 잘 하면 좋음 ⭐⭐⭐⭐⭐ 


  // 🔹 리액트 설치 
    // npm install react-router-dom@6





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  // BrowserRouter 감싸야 함. 
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
