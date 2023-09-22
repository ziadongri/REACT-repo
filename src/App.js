import React, {useState, useEffect} from 'react'
import {Link, HashRouter as Router, Route, Routes} from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import {auth} from './firebase'
import {signOut } from 'firebase/auth'
import HomeScreen from './screens/HomeScreen'

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
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>




  )
}

export default App