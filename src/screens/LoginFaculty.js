import React, {useState, useEffect} from 'react'
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import {auth, provider } from '../firebase'
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import Wave from 'react-wavify'
import { db, storage } from "../firebase"
import { doc, collection, getDoc, setDoc, updateDoc, addDoc } from "firebase/firestore"

function LoginFaculty({setIsAuth}) {
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState(null)
    const [user, setUser] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    const navigate = useNavigate();
    
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/form1')
        })
        .catch((error) => {
            setError(error.message)
        })
    }

    // const handleSignIn = () => {
     
    //   signInWithPopup(auth, provider)
    //   .then((result) => {
    //       const credential = GoogleAuthProvider.credentialFromResult(result)
    //       const token = credential.accessToken
    //       const user = result.user
    //       if (user.email.endsWith("@somaiya.edu")) {
    //           localStorage.setItem('isAuth', true)
    //           setIsAuth(true)
    //           navigate('/form1');
    //       } else {
    //           setError("Login allowed only from Somaiya domain.");
    //       }
    //   })
    //   .catch((error) => {
    //       setError(error.message)
    //   })
    // }
    
const handleAlertDismiss = () => {
    setError(null);
};

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user)
          } else {
            setUser(null)
          }
        }
        )
        return unsubscribe
      }
      , [])
    
      const fetchFacultyData = async (uid) => {
        const docRef = doc(db, "faculty", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      }
    
      const fetchHODData = async (uid) => {
        const docRef = doc(db, "hod", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      }
    
      const fetchPrincipalData = async (uid) => {
        const docRef = doc(db, "principal", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      }
    
      const handleNavigation = () => {
        if (userData) {
          if (window.location.pathname === '/') {
            if (userData.role === 'faculty') {
              window.location.pathname = '/form1'
            } else if (userData.role === 'hod') {
              window.location.pathname = '/form1ahod'
            }
            else if (userData.role === 'principal') {
              window.location.pathname = '/form1principal'
            }
          }
        }
      }
    
      useEffect(() => {
        if (user) {
          fetchFacultyData(user.uid)
          fetchHODData(user.uid)
          fetchPrincipalData(user.uid)
        }
      }
      , [user])
    
      useEffect(() => {
        if (userData) {
          handleNavigation()
        }
      }
      , [userData])


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
                </Card>
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
          zIndex: 1,
          bottom: 0,
          left: 0,
        }}
      />
    </Container>
    
  )
}

export default LoginFaculty
