import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Form1BHOD() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState([]);
  const [HODData, setHODData] = useState({});
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [isEditable, setIsEditable] = useState(true); // default to editable

  let navigate = useNavigate();

  const toggleEditableState = async () => {
    const newState = !isEditable;
    setIsEditable(newState);
  
    // Update the state in Firestore
    const hodDocRef = doc(db, 'hod', user.uid);
    try {
      await updateDoc(hodDocRef, { isEditable: newState });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  

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


  const fetchHODData = async (uid) => {
    const docRef = doc(db, 'hod', uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHODData(data);
        setIsEditable(data.isEditable ?? true); // default to editable
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHODData(user.uid);
    }
  }, [user]);

  const fetchFacultyData = async () => {
    const facultyRef = collection(db, 'faculty');
    const q = query(
      facultyRef, 
      where('department', '==', HODData.department),
      where('role', '==', 'faculty'),
    );
    getDocs(q)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setFacultyData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    if (HODData.department) {
      fetchFacultyData();
    }
  }, [HODData]);

  const queryData = async () => {
    if (HODData.department && name && year) {
      const facultyRef = collection(db, 'faculty');
      const q = query(
        facultyRef,
        where('role', '==', 'faculty'),
        where('department', '==', HODData.department),
        where('name', '==', name),
        where('year', '==', year)
      );
      getDocs(q)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setFacultyData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (HODData.department) {
      queryData();
    }
  }, [HODData, name, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/form2ahod', { state: {facultyUID: facultyData[0].uid} });
    console.log(facultyData[0].uid);
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
  <div className="container">
    <Container fluid>
      <Row>
      
        <Col md={11} className="mx-auto ">
          <h1 className="text-center">Part A: General Information</h1>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="year">
              <Row>
                <Col md={3} className="form-label">
                  <Form.Label>Year: </Form.Label>
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
                    as="select"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option value="">Select Name</option>
                    {/* {facultyData.map((faculty, index) => {
                      return (
                        <option key={index} value={faculty.name}>
                          {faculty.name}
                        </option>
                      );
                    })} */}
                    {/* (if (facultyData.year === year) {
                      return (  
                        <option key={index} value={faculty.name}>
                          {faculty.name}
                        </option>
                      );
                    }) */}
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
              if ((faculty.name === name) & (faculty.year === year)) {
                return (
                  <div key={index}>
                    <Form.Group className="mb-3" controlId="name">
                      <Row>
                        <Col md={3} className="form-label">
                          <Form.Label>Name: </Form.Label>
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
                          <Form.Label>Designation:</Form.Label>
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
                          <Form.Label>Address:</Form.Label>
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
                          <Form.Label>Email:</Form.Label>
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
                          <Form.Label>Fresh Qualification:</Form.Label>
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

            <div className="text-center">
              <Row>
                <Col>
                <Button variant="primary" >
            <Link to="/form1ahod" className="text-decoration-none text-white">
                Previous
              </Link>
            </Button>
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    <Link className="text-decoration-none text-white">
                      Save
                    </Link>
                  </Button>
                </Col>
                <Col>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    <Link to="/form2ahod" className="text-decoration-none text-white">
                      Next
                    </Link>
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
          <br />

          <div className="text-center">
          <Button onClick={toggleEditableState}>
  {isEditable ? "Disable Faculty Inputs" : "Enable Faculty Inputs"}
</Button>

          </div>


        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default Form1BHOD;
