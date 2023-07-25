
import './App.css';

// react-router
  import { Routes , Route , Link } from 'react-router-dom';

// 컴포넌트 import
  import MainItem from './component/MainItem';

// page import
  import Detail from './pages/Detail'
  import About from './pages/About'
  import Main from './pages/Main'

// bootstrap 
  // 버튼
  import { Button } from 'react-bootstrap';
  // 부트스트랩 navBar
  import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';



function App() {
  // 데이터 들어오는것 확인 
    // console.log("데이터 잘 들어오나 확인" , goodsData)
    // console.log("id" , goodsData[0].id)
    // console.log("title" , goodsData[0].title)
    // console.log("content" , goodsData[0].content)
    // console.log("price" , goodsData[0].price)


  return (
    <div className="App">

    {/* 부트스트랩 nav-bar */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">UnderDuck🐣</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <br />

    <Routes>
        <Route path="/" element = { <Main/> }> </Route>
        <Route path="/pricing" element = {<div>pricing</div>}> </Route>
        <Route path="/detail" element = { <Detail /> } > </Route>
        <Route path="/about" element = { <About /> }> </Route>
      </Routes>

    </div>
  );
}

export default App;
