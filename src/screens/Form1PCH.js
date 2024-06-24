import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, setDoc} from 'firebase/firestore';
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';
import Footer from './Footer';

function Form1PCH() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [facultyData, setFacultyData] = useState([]);
    const [HODData, setHODData] = useState([]);
    const [name, setName] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    // const [isEditablePrincipal, setIsEditablePrincipal] = useState(true);
    let navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
        } else {
          navigate('/');
        }
        setLoading(false);
      });
      return unsubscribe;
    }, [navigate]);

    // const fetchFacultyData = async () => {
    //   const q = query(collection(db, 'faculty'), where('department', '==', department));
    //   const querySnapshot = await getDocs(q);
    //   const facultyDoc = [];
    //   querySnapshot.forEach((doc) => {
    //     facultyDoc.push({ ...doc.data(), id: doc.id });
    //   });
    //   setFacultyData(facultyDoc);
    //   console.log(facultyDoc);

    // }

    // useEffect(() => {
    //   fetchFacultyData();
    // }
    // , [department]);

    const fetchFacultyData = async () => {
      try {
        console.log("Fetching faculty data for department:", department);
        const q = query(collection(db, 'faculty'), where('department', '==', department));
        const querySnapshot = await getDocs(q);
        const facultyDoc = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Checking email:", data.email);
          if (isAllowedEmail(data.email)) { // Check if email is in allowed list
            console.log("Allowed email found:", data.email);
            facultyDoc.push({ ...data, id: doc.id });
          }
        });
        console.log("Fetched faculty data:", facultyDoc);
        setFacultyData(facultyDoc);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };
  
    const isAllowedEmail = (email) => {
      const allowedEmails = [
        'jayashreek@somaiya.edu',
        'mnemade@somaiya.edu',
        'radhika.kotecha@somaiya.edu',
        'sarita.ambadekar@somaiya.edu',
        'harsham@somaiya.edu',
        'vice_principal@somaiya.edu',
        'khurshiddongrk@gmail.com'
      ];
      // Check if email exists in the allowed list (case insensitive)
      return allowedEmails.some(allowedEmail => allowedEmail.toLowerCase() === email.toLowerCase());
    };
  
    useEffect(() => {
      if (department) {
        fetchFacultyData();
      }
    }, [department]);


    // const toggleEditableStatePrincipal = async () => {
    //   const newState = !isEditablePrincipal;
    //   setIsEditablePrincipal(newState);
  
     
    //   const principalDocRef = doc(db, 'principal', user.uid);
    //   try {
    //     await updateDoc(principalDocRef, { isEditablePC: newState });
    //   } catch (error) {
    //     console.error("Error updating document: ", error);
    //   }
    // };

    // const fetchPrincipalData = async (uid) => {
    //   const docRef = doc(db, 'principal', uid);
    //   try {
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       const data = docSnap.data();
    //       setIsEditablePrincipal(data.isEditablePC ?? true); // default to editable
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // useEffect(() => {
    //   if (user) {
    //     fetchPrincipalData(user.uid);
    //   }
    // }, [user]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      navigate('/form2apch', { state: {facultyUID: facultyData[0].uid} });
      console.log(facultyData[0].id);
    };


    if (loading) {
      return (
        <div className="text-center mt-5">
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <Container fluid>
        <Row>
          
          <Col md={11} className="mx-auto "  >
            <h1 className="text-center">Part A: General Information</h1>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="year">
                <Row>
                  <Col md={3} className="form-label">
                    <Form.Label>Year of Appraisal:</Form.Label>
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
                    <Form.Label>Department:</Form.Label>
                    </Col>
                    <Col md={9}>
                    <Form.Control

                        as="select"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        <option value="Basic Sciences & Humanities">Basic Sciences & Humanities</option>
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
                    <Form.Label>Faculty Name:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      as="select"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                    >
                      <option value="">Select Name</option>
                      {facultyData.map((faculty, index) => {
                        return (
                          (faculty.year === year) ? (
                          <option key={index} value={faculty.name}>
                            {faculty.name}
                          </option>
                          ) : null
                        );
                      })}
                    </Form.Control>               
                  </Col>
                </Row>
              </Form.Group>

              
            </Form>

            <Form onSubmit={handleSubmit}>
              {/* Display faculty data based on the selected name */}
              {facultyData.map((faculty, index) => {
                if ((faculty.name === facultyName) & (faculty.year === year)) {
                  return (
                    <div key={index}>
                      <Form.Group className="mb-3" controlId="name">
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Name:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.name}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='department'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Department:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.department}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='designation'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label> Current Designation:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.designation}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='DOLpromotion'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Date of Last Promotion:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.DOLpromotion}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='address'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Address for correspondence:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.address}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='contact'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Contact:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="tel"
                              placeholder={faculty.contact}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='email'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Email Address:</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="email"
                              placeholder={faculty.email}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='freshqualification'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Whether acquired any degrees or fresh qulifications during the year: (Yes/No)</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={faculty.freshQualification}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                    </div>
                  );
                } else {
                  return null; // Don't display if the name doesn't match
                }
              })}

              

              <div className="text-center mb-4">
                <Row>               
                  <Col>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      <Link className="text-decoration-none text-white">
                        Next
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* <br/>
              <div className="text-center">
      
        <Button onClick={toggleEditableStatePrincipal}>
          {isEditablePrincipal ? "Disable Faculty Inputs" : "Enable Faculty Inputs"}
        </Button>
      
    </div> */}
            </Form>
          </Col>
          {/* <Footer/> */}
        </Row>
      </Container>
    );
  }
  
  export default Form1PCH;