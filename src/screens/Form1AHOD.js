import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../firebase';
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Form1AHOD() {

  
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [DOLpromotion, setDOLpromotion] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [freshQualification, setFreshQualification] = useState('');
  const [year, setYear] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);


  const fetchData = async (uid) => {
    const docRef = doc(db, 'hod', uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setDepartment(data.department);
          setDesignation(data.designation);
          setDOLpromotion(data.DOLpromotion);
          setAddress(data.address);
          setContact(data.contact);
          setEmail(data.email);
          setFreshQualification(data.freshQualification);
          setYear(data.year);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      fetchData(user.uid);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'hod', user.uid);
    const data = {
      role: 'hod',
      name,
      department,
      designation,
      DOLpromotion,
      address,
      contact,
      email,
      freshQualification,
      year,
    };
    await setDoc(docRef, data, { merge: true });
    alert('Data saved successfully');
    //navigate('/form2');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'hod', user.uid);
    const data = {
      role: 'hod',
      name,
      department,
      designation,
      DOLpromotion,
      address,
      contact,
      email,
      freshQualification,
      year,
    };
    await setDoc(docRef, data, { merge: true });
    alert('Data saved successfully');
    //navigate('/form2');
  };

  if (loading) {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Loading...</h1>
          </Col>
        </Row>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

    return (
      
        <Container fluid>
      <Row>
      
        <Col md={11} className="mx-auto " >
          <h1 className="text-center">Part A: General Information</h1>
          <Form onSubmit={handleSubmit}>
            
          <Form.Group className="mb-3" controlId="year">
            <Row>

                <Col md={3} className="form-label">
              <Form.Label>Year of Appraisal: </Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control

                as="select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="2022-23">2022-23</option>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
                <option value="2028-29">2028-29</option>
                <option value="2029-30">2029-30</option>
                <option value="2030-31">2030-31</option>
        <option value="2031-32">2031-32</option>
        <option value="2032-33">2032-33</option>
        <option value="2033-34">2033-34</option>
        <option value="2034-35">2034-35</option>
        <option value="2035-36">2035-36</option>
        <option value="2036-37">2036-37</option>
        <option value="2037-38">2037-38</option>
        <option value="2038-39">2038-39</option>
        <option value="2039-40">2039-40</option>
              </Form.Control>
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="department">
              <Row>
                <Col md={3} className="form-label">
              <Form.Label>Department: </Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                as="select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
              </Form.Control>
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3 align-item-center" controlId="name">
            <Row>
          <Col md={3} className="form-label">
            <Form.Label>Name: </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </Col>
        </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="designation">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Current Designation: </Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="DOLpromotion">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Date of last promotion: </Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="date"
                placeholder="Enter date of last promotion"
                value={DOLpromotion ? DOLpromotion.split('-').reverse().join('-') : ''}
      onChange={(e) => {
        const [year, month, day] = e.target.value.split('-');
        setDOLpromotion(`${day}-${month}-${year}`);
      }}
              />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Address for correspondence:</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Contact:</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="tel"
                placeholder="Enter contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                pattern='[0-9]{10}'
                minLength={10}
                maxLength={10}
              />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Email Address:</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="freshQualification">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Whether acquired any degrees or fresh qulifications during the year: (Yes/No)</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter fresh qualification"
                value={freshQualification}
                onChange={(e) => setFreshQualification(e.target.value)}
              />
              </Col>
              </Row>
            </Form.Group>

          

          </Form>
          <div className="text-center">
            <Row>
            <Col>
            <Button variant="primary" type="submit" onClick={handleSave}>
              <Link className="text-decoration-none text-white">
                Save
              </Link>
            </Button>
          </Col>
              <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  <Link to="/form1bhod" className="text-decoration-none text-white">
                    Next
                  </Link>
                </Button>
              </Col>
            </Row>
            </div>
        </Col>
      </Row>
    </Container>
  
  
  )
}

export default Form1AHOD
