import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Form1PC() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [facultyData, setFacultyData] = useState([]);
    const [HODData, setHODData] = useState([]);
    const [name, setName] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    let navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
        } else {
          navigate('/login');
        }
        setLoading(false);
      });
      return unsubscribe;
    }, [navigate]);
  
    // const fetchHODData = async (uid) => {
    //   const docRef = doc(db, 'hod', uid);
    //   try {
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       const data = docSnap.data();
    //       setHODData(data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // useEffect(() => {
    //   if (user) {
    //     fetchHODData(user.uid);
    //   }
    // }, [user]);

    const fetchHODData = async () => {
      const q = query(collection(db, 'hod'), where('department', '==', department));
      const querySnapshot = await getDocs(q);
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ ...doc.data(), id: doc.id });
      });
      setHODData(tempDoc);
    }

    useEffect(() => {
      fetchHODData();
    }
    , [department]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      navigate('/form2aprincipal', { state: {facultyUID: facultyData[0].uid} });
      console.log(facultyData[0].id);
    };

    const fetchFacultyData = async () => {
      const q = query(collection(db, 'faculty'), where('department', '==', department));
      const querySnapshot = await getDocs(q);
      const facultyDoc = [];
      querySnapshot.forEach((doc) => {
        facultyDoc.push({ ...doc.data(), id: doc.id });
      });
      setFacultyData(facultyDoc);
      console.log(facultyDoc);

    }

    useEffect(() => {
      fetchFacultyData();
    }
    , [department]);

    



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
          <Col md={2} className="form-navigation">
            <h3>Form Navigation</h3>
            <ul>
              <li>
                <Link to="/form1principal">Part A</Link>
              </li>
              <li>
                <span className="form2-subsection">Part B</span>
                <ul className="form2-subsection-list">
                  <li>
                    <Link to="/form2aprincipal" className="form2-subsection-link">Category A</Link>
                  </li>
                  <li>
                    <Link to="/form2bprincipal" className="form2-subsection-link">Category B</Link>
                  </li>
                  <li>
                    <Link to="/form2cprincipal" className="form2-subsection-link">Category C</Link>
                  </li>
                </ul>
              </li>
              {/* Add more form links as needed */}
            </ul>
          </Col>
          <Col md={6}>
            <h1>Part A: General Information</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="year">
                <Row>
                  <Col md={3} className="form-label">
                    <Form.Label>Year</Form.Label>
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
              

                <Form.Group className="mb-3" controlId="department">
                <Row>
                    <Col md={3} className="form-label">
                    <Form.Label>Department</Form.Label>
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
                    <Form.Label>HOD Name</Form.Label>
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      as="select"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    >
                      <option value="">Select Name</option>
                      {HODData.map((hod, index) => {
                        return (
                          <option key={index} value={hod.name}>
                            {hod.name}
                          </option>
                        );
                      })}
                    </Form.Control>               
                  </Col>
                </Row>
              </Form.Group>

              {HODData.map((hod, index) => {
                if ((hod.name === name) & (hod.year === year)) {
                  return (
                    <div key={index}>
                      <Form.Group className="mb-3" controlId="name">
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Name</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.name}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='department'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Department</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.department}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='designation'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Designation</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.designation}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='DOLpromotion'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Date of Last Promotion</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.DOLpromotion}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='address'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Address</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.address}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='contact'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Contact</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="tel"
                              placeholder={hod.contact}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='email'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Email</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="email"
                              placeholder={hod.email}
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='freshqualification'>
                        <Row>
                          <Col md={3} className="form-label">
                            <Form.Label>Fresh Qualification</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder={hod.freshQualification}
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

              <Form.Group className="mb-3 align-item-center" controlId="name">
                <Row>
                  <Col md={3} className="form-label">
                    <Form.Label>Faculty Name</Form.Label>
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
                          <option key={index} value={faculty.name}>
                            {faculty.name}
                          </option>
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
                            <Form.Label>Name</Form.Label>
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
                            <Form.Label>Department</Form.Label>
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
                            <Form.Label>Designation</Form.Label>
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
                            <Form.Label>Date of Last Promotion</Form.Label>
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
                            <Form.Label>Address</Form.Label>
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
                            <Form.Label>Contact</Form.Label>
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
                            <Form.Label>Email</Form.Label>
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
                            <Form.Label>Fresh Qualification</Form.Label>
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
                    <Button variant="primary" type="submit">
                      <Link className="text-decoration-none text-white">
                        Save
                      </Link>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      <Link className="text-decoration-none text-white">
                        Next
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Form1PC;