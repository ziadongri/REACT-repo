import React, {useState, useEffect} from 'react'
import { Container, Button, Row, Col} from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import {auth, provider} from '../firebase'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import Wave from 'react-wavify'
// import Footer from './Footer'

function LoginScreen({setIsAuth}) {
    const [error, setError] = useState(null)
    let navigate = useNavigate()

    const handleFacultySignIn = () => {
        navigate('/loginfaculty')
    }

    const handleHODSignIn = () => {
        navigate('/loginhod')
    }

    const handlePrincipalSignIn = () => {
        navigate('/loginprincipal')
    }


    const handleAlertDismiss = () => {
        setError(null)
    }

    useEffect(() => {   
        if(localStorage.getItem('isAuth')) {
            setIsAuth(true)
        }
    }
    , [])


  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <Button variant="primary" onClick={handleFacultySignIn} className="w-100 mt-3">Login As Faculty</Button>
                <Button variant="primary" onClick={handleHODSignIn} className="w-100 mt-3">Login As HOD</Button>
                <Button variant="primary" onClick={handlePrincipalSignIn} className="w-100 mt-3">Login As Principal</Button>
            </Col>
        </Row>
        <Wave fill='#A02929'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3,
          
        }}
        style={{
          position: 'fixed',
            bottom: 0,
            left: 0,
            // width: '100%',
            zIndex: -1
        }}
            
      />
      {/* <Footer /> */}
    </Container>
    
  )
}

export default LoginScreen