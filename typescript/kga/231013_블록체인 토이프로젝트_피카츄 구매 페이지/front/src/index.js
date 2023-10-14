import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>  
    <App />
  </BrowserRouter>
    // BrowserRouter : 리액트 <Routes> 를 사용하기 위한 것 

);


reportWebVitals();
