import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Form1HOD() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facultyData, setFacultyData] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setUser(user);
        } else {
            navigate('/login');
        }
        });
        setLoading(false);
        return unsubscribe;
    }, []);
    
    const fetchFacultyData = async (uid) => {
        const docRef = doc(db, 'partA', uid);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
            const data = docSnap.data();
            setFacultyData(data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (user) {
            fetchFacultyData(user.uid);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        navigate('/form2hod');
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={facultyData.name} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" value={facultyData.department} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" value={facultyData.designation} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="DOLpromotion">
                            <Form.Label>Date of Last Promotion</Form.Label>
                            <Form.Control type="date" value={facultyData.DOLpromotion} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={facultyData.address} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="contact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" value={facultyData.contact} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={facultyData.email} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="freshQualification">
                            <Form.Label>Fresh Qualification</Form.Label>
                            <Form.Control type="text" value={facultyData.freshQualification} readOnly/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Form1HOD
