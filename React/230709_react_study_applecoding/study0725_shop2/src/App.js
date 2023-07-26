
import './App.css';

// react-router
  import { Routes , Route , Link, useNavigate , Outlet } from 'react-router-dom';

// page import
  import Detail from './pages/Detail'
  import About from './pages/About'
  import Main from './pages/Main'
  import Event from './pages/Event'

// bootstrap 
  // navBar
  import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';

function App() {

  const navigate = useNavigate()

  return (
    <div className="App">

    {/* 부트스트랩 nav-bar */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">UnderDuck🐣</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') } } >Home</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/about') } } >About</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/pricing') } } >Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <br />

    <Routes>
        <Route path="/" element = { <Main/> }> </Route>
        <Route path="/about" element = { <About /> }> </Route>
        <Route path="/pricing" element = {<div>pricing</div>}> </Route>
        <Route path="/detail/:id" element = { <Detail  /> } > </Route>

        <Route path="event" element = { <Event/> }> 
          <Route path='one' element = { <p> 트러플 오일 </p>   }>  </Route>
          <Route path='two' element = { <p> 생일 기념 쿠폰 받기 </p>   }>  </Route>
        </Route>
        
        <Route path='*' element = { <div> 없는 페이지 입니다 </div> } >  </Route>
      </Routes>

    </div>
  );
}

export default App;
