import React, {useState, useEffect} from 'react'
import {Link, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginFaculty from './screens/LoginFaculty'
import {auth} from './firebase'
import {signOut } from 'firebase/auth'
import HomeScreen from './screens/HomeScreen'
import Form1 from './screens/Form1'
import Form2A from './screens/Form2A'
import Form2B from './screens/Form2B'
import Form2C from './screens/Form2C'
import Wave from 'react-wavify'
import Header from './assets/header.png'
import FormSubmission from './screens/FormSubmission'
import LoginHOD from './screens/LoginHOD'
import LoginScreen from './screens/LoginScreen'
import LoginPrincipal from './screens/LoginPrincipal'
import Form1AHOD from './screens/Form1AHOD'
import Form1BHOD from './screens/Form1BHOD'
import Form2AHOD from './screens/Form2AHOD'
import Form2BHOD from './screens/Form2BHOD'
import Form2CHOD from './screens/Form2CHOD'
import Form3HOD from './screens/Form3HOD'
import Form1PC from './screens/Form1PC'
import Form2APC from './screens/Form2APC'
import Form2BPC from './screens/Form2BPC'
import Form2CPC from './screens/Form2CPC'
import Form3PC from './screens/Form3PC'



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
      <Navbar  variant="dark" className="ms-auto" style={{backgroundColor: '#A02929', padding: 20}}>
        {/* <Container> */}
          <Navbar.Brand >
            <img src={Header} alt="header" style={{width: '400px', height: '80px'}} />
            
            {/* <Link to="/facultyform" className="text-decoration-none text-white">
              Faculty Form
            </Link> */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuth ? (
              <Nav className="ml-auto">
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto" >
                <Nav.Link>
                  <Link to="/" className="text-decoration-none text-white">
                    Login
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      
      <Container>
      <Row>
        <Col>
         <h1 className="text-center"> Performa for Annual Self-Assessment of Faculty based on Performance Based Appraisal System </h1>
        </Col>
      </Row>
      </Container>
      <Routes>
        <Route path="/" element={<LoginScreen setIsAuth={setIsAuth} />} />
        <Route path="/form1" element={<Form1 />} />

        <Route path="/loginfaculty" element={<LoginFaculty setIsAuth={setIsAuth} />} />
        <Route path="/loginhod" element={<LoginHOD setIsAuth={setIsAuth} />} />
        <Route path="/loginprincipal" element={<LoginPrincipal setIsAuth={setIsAuth} />} />
        <Route path="/form2a" element={<Form2A />} />
        <Route path="/form2b" element={<Form2B />} />
        <Route path="/form2c" element={<Form2C />} />
        <Route path="/formsubmission" element={<FormSubmission />} />
        <Route path="/form1ahod" element={<Form1AHOD />} />
        <Route path="/form1bhod" element={<Form1BHOD />} />
        <Route path="/form2ahod" element={<Form2AHOD />} />
        <Route path="/form2bhod" element={<Form2BHOD />} />
        <Route path="/form2chod" element={<Form2CHOD />} />
        <Route path="/form3hod" element={<Form3HOD />} />
        <Route path="/form1principal" element={<Form1PC />} />
        <Route path="/form2aprincipal" element={<Form2APC />} />
        <Route path="/form2bprincipal" element={<Form2BPC />} />
        <Route path="/form2cprincipal" element={<Form2CPC />} />
        <Route path="/form3principal" element={<Form3PC />} />

        
      </Routes>
    </Router>

  )
}

export default App