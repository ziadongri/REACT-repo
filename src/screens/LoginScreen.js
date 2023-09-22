import React, {useState} from 'react'
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import {auth, provider} from '../firebase'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

function LoginScreen({setIsAuth}) {
    const [error, setError] = useState(null)
    let navigate = useNavigate()

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/')
        })
        .catch((error) => {
            setError(error.message)
        })
    }

    const handleAlertDismiss = () => {
        setError(null)
    }

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <Card className="p-3 mt-5">
                    <h1 className="text-center">Login</h1>
                    {error && (
                        <Alert variant="danger" dismissible onClose={handleAlertDismiss}>
                            {error}
                        </Alert>
                    )}
                    <Form>
                        <Button variant="primary" onClick={handleSignIn} className="w-100 mt-3">Sign In with Google</Button>
                    </Form>
                    <p className="mt-3">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    </Container>
    
  )
}

export default LoginScreen
