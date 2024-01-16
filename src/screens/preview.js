import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Table,
} from "react-bootstrap";
import { auth, db, storage } from "../firebase";
import { doc, collection, getDoc, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function preview() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [partA, setPartA] = useState([]);
    const [partB, setPartB] = useState([]);
    const [partC, setPartC] = useState([]);
    const [partD, setPartD] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate("/login");
            }
        });
    }
    , []);

    const fetchPartA = async () => {
        const partARef = doc(db, "faculty", user.uid);
        const docSnap = await getDoc(partARef);
        if (docSnap.exists()) {
            setPartA(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    const fetchPartB = async () => {
        const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setPartB(docSnap.data());
    } else {
        console.log("No such document!");
    }
    }

    const fetchPartC = async () => {
        const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setPartC(docSnap.data());
    } else {
        console.log("No such document!");
    }
    }

    const fetchPartD = async () => {
        const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryC");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setPartD(docSnap.data());
    } else {
        console.log("No such document!");
    }
    }

    
  return (
   <Container fluid>
      <Row>
      
        <Col>
          <h1>Part A: General Information</h1>
          <Form >
            <Form.Group className="mb-3 align-item-center" controlId="name">
            <Row>
          <Col md={3} className="form-label">
            <Form.Label>Name</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={partA.name}
              readOnly
            />
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
            <Form.Group className="mb-3" controlId="designation">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Designation</Form.Label>
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
              <Form.Label>Date of last promotion</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                type="date"
                placeholder="Enter date of last promotion"
                value={DOLpromotion}
                onChange={(e) => setDOLpromotion(e.target.value)}
              />
              </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
            <Row>
                <Col md={3} className="form-label">
              <Form.Label>Address</Form.Label>
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
              <Form.Label>Contact</Form.Label>
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
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Fresh Qualification</Form.Label>
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
            {/* <Button variant="primary" type="submit">
              <Link to="/form2a" className="text-decoration-none text-white">
                Next
              </Link>
            </Button> */}
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
                  <Link className="text-decoration-none text-white">
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
