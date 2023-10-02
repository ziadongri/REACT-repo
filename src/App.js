import React, {useState, useEffect} from 'react'
import {Link, HashRouter as Router, Route, Routes} from 'react-router-dom'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import {auth} from './firebase'
import {signOut } from 'firebase/auth'
import HomeScreen from './screens/HomeScreen'
import Form1 from './screens/Form1'
import Form2A from './screens/Form2A'
import Form2B from './screens/Form2B'
import Form2C from './screens/Form2C'
import Wave from 'react-wavify'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/'
    })
    .catch((error) => {
      console.log(error)
    })
  }
  


  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth')
    if (storedAuth) {
      setIsAuth(true)
    }
  }, [])

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand >
            <Link to="/facultyform" className="text-decoration-none text-white">
              Faculty Form
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuth ? (
              <Nav className="mr-auto">
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </Nav>
            ) : (
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link to="/" className="text-decoration-none text-white">
                    Login
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Wave fill='#A02929'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
      />
      <Container>
      <Row>
        <Col>
         <h1 className="text-center"> Performa for Annual Self-Assessment of Faculty based on Performance Based Appraisal System Year 2022 to 2023 </h1>
        </Col>
      </Row>
      </Container>
      <Routes>
        <Route path="/" element={<Form1 />} />
        <Route path="/login" element={<LoginScreen setIsAuth={setIsAuth} />} />
        <Route path="/form2a" element={<Form2A />} />
        <Route path="/form2b" element={<Form2B />} />
        <Route path="/form2c" element={<Form2C />} />
      </Routes>
    </Router>




  )
}

export default App