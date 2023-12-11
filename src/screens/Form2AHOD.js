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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Form2AHOD() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState(null);
  const [IActaHOD, setIActaHOD] = useState("");
  const [IActbHOD, setIActbHOD] = useState("");
  const [IActcHOD, setIActcHOD] = useState("");
  const [IActdHOD, setIActdHOD] = useState("");
  const [IActeHOD, setIActeHOD] = useState("");
  const [IActfHOD, setIActfHOD] = useState("");
  const [IActTotalHOD, setIActTotalHOD] = useState("");
  const location = useLocation();
  const facultyUID = location.state.facultyUID;
  console.log(facultyUID);
  let navigate = useNavigate();
 
  const Total = () => {
    let IActTotalHOD = parseInt(IActaHOD) + parseInt(IActbHOD) + parseInt(IActcHOD) + parseInt(IActdHOD) + parseInt(IActeHOD) + parseInt(IActfHOD);
    setIActTotalHOD(IActTotalHOD);
  }

  useEffect(() => {
    Total();
  }
  , [IActaHOD, IActbHOD, IActcHOD, IActdHOD, IActeHOD, IActfHOD]);

  

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

  useEffect(() => {
    const fetchData = async () => {
      const facultyRef = doc(db, "faculty", facultyUID);
      const docRef = doc(facultyRef, "partB", "CategoryA");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFacultyData(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }

      if (docSnap.exists()) {
        setIActaHOD(docSnap.data().IActaHOD);
        setIActbHOD(docSnap.data().IActbHOD);
        setIActcHOD(docSnap.data().IActcHOD);
        setIActdHOD(docSnap.data().IActdHOD);
        setIActeHOD(docSnap.data().IActeHOD);
        setIActfHOD(docSnap.data().IActfHOD);
        setIActTotalHOD(docSnap.data().IActTotalHOD);
      }
    }
    fetchData();
  } , [facultyUID]);

  const handleSave = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        IActaHOD: IActaHOD,
        IActbHOD: IActbHOD,
        IActcHOD: IActcHOD,
        IActdHOD: IActdHOD,
        IActeHOD: IActeHOD,
        IActfHOD: IActfHOD,
        IActTotalHOD: IActTotalHOD,
      });
    } else {
      await setDoc(docRef, {
        IActaHOD: IActaHOD,
        IActbHOD: IActbHOD,
        IActcHOD: IActcHOD,
        IActdHOD: IActdHOD,
        IActeHOD: IActeHOD,
        IActfHOD: IActfHOD,
        IActTotalHOD: IActTotalHOD,
      });
    }
    alert("Data Saved");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        IActaHOD: IActaHOD,
        IActbHOD: IActbHOD,
        IActcHOD: IActcHOD,
        IActdHOD: IActdHOD,
        IActeHOD: IActeHOD,
        IActfHOD: IActfHOD,
        IActTotalHOD: IActTotalHOD,
      });
    } else {
      await setDoc(docRef, {
        IActaHOD: IActaHOD,
        IActbHOD: IActbHOD,
        IActcHOD: IActcHOD,
        IActdHOD: IActdHOD,
        IActeHOD: IActeHOD,
        IActfHOD: IActfHOD,
        IActTotalHOD: IActTotalHOD,
      });
    }
    navigate('/form2bhod', { state: { facultyUID: facultyUID } });
    // console.log(facultyAUID)
  }

  const handleForm2BHODNavigation = async (e) => {
    e.preventDefault();
    navigate('/form2bhod', { state: { facultyUID: facultyUID } });
  }

  // const handleForm1BHODNavigation = async (e) => {
  //   e.preventDefault();
  //   navigate('/form1bhod', { state: { facultyUID: facultyUID } });
  // }

  const handleForm2CHODNavigation = async (e) => {
    e.preventDefault();
    navigate('/form2chod', { state: { facultyUID: facultyUID } });
  }

  const handleForm3HODNavigation = async (e) => {
    e.preventDefault();
    navigate('/form3hod', { state: { facultyUID: facultyUID } });
  }
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (!facultyData) {
    return <p>Faculty data not found.</p>;
  }

  return (
    <Container fluid >
      <Row>
      <Col md={2} className="form-navigation">
          <h3>Form Navigation</h3>
          <ul>
            <li>
              <Link to="/form1bhod">Part A</Link>
            </li>
            <li>
              <span className="form2-subsection">Part B</span>
              <ul className="form2-subsection-list">
                <li>
                  <Link 
                  to = "/form2ahod"
                  className="form2-subsection-link">Category A</Link>
                </li>
                <li>
                  <Link onClick={handleForm2BHODNavigation} className="form2-subsection-link">Category B</Link>
                </li>
                <li>
                  <Link onClick={handleForm2CHODNavigation} className="form2-subsection-link">Category C</Link>
                </li>
              </ul>
            </li>
            <li>
            <Link onClick={handleForm3HODNavigation}>Part C</Link>
          </li>
            {/* Add more form links as needed */}
          </ul>
        </Col>
        
        <Col md={9}>
      <h1>Part B: Academic Performance Indicators</h1>
      <h4 className="fw-lighter">Category I: Teaching, Learning and Evaluation related activities</h4>
      <p>
        *proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty
      </p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught code and name</th>
              <th>Class for which conducted</th>
              <th>Target Lectures/ Practical</th>
              <th>Lectures/ Practical Actually conducted</th>
              <th>% of Classes conducted</th>
            </tr>
          </thead>
          {facultyData.IOddsem.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{data.course}</td>
                <td>{data.class}</td>
                <td>{data.lectures}</td>
                <td>{data.actualLectures}</td>
                <td>{data.percentage}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught code and name</th>
              <th>Class for which conducted</th>
              <th>Target Lectures/ Practical</th>
              <th>Lectures/ Practical Actually conducted</th>
              <th>% of Classes conducted</th>
            </tr>
          </thead>
          {facultyData.IEvensem.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{data.course}</td>
                <td>{data.class}</td>
                <td>{data.lectures}</td>
                <td>{data.actualLectures}</td>
                <td>{data.percentage}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Natural of Activity</th>
              <th>MAX API Score alloted</th>
              <th>Verified API Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a.</td>
              <td>
                <Col>
                  Lectures, Seminars, tutorials, practical, contact hours
                  undertaken taken as percentage of lectures allocated
                </Col>
                <Col>Total lectures conducted {">"} 90% score = 50</Col>
                <Col>90% {">"} Lectures taken ≥ 80% = 40</Col>
                <Col> 80% {">"} Lectures taken ≥ 70% = 30</Col>
                <Col>
                  no score if number of lectures taken is less than 70%{" "}
                </Col>
              </td>
              <td>{facultyData.IActa}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActaHOD}
                  onChange={(e) => setIActaHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>b.</td>
              <td>
                <Col> Lectures or lab in excess of UGC norms </Col>
                <Col>(One point for each extra class) </Col>
                <Col>
                  {" "}
                  This refers to lecture load allotted above 16/week for Asst
                  Prof or above 14/week for Associate Prof and Professor. Repeat
                  classes for diploma students may be given 5 marks
                </Col>
              </td>
              <td>{facultyData.IActb}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActbHOD}
                  onChange={(e) => setIActbHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>c.</td>
              <td>
                <Col>
                  {" "}
                  Remedial lectures or Revision Lectures actually conducted for
                  weak students (one point for each extra class in other than
                  mentioned in 1.a)
                </Col>
              </td>
              <td>{facultyData.IActc}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActcHOD}
                  onChange={(e) => setIActcHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>d.</td>
              <td>
                <Col>
                  Learning material prepared for students: Provide short
                  description of each work done in separate sheet
                </Col>
                <Col>Evaluation Criteria:</Col>
                <Col>1. Quality PPT made by self (5)</Col>
                <Col>2. Animations/virtual labs/website (10)</Col>
                <Col>
                  3. Good quality video lectures available on public platforms
                  (recorded online lectures not to be considered) (10)
                </Col>
                <Col>
                  4. Arranged guest lecture (2 points per lecture. The guest
                  should be external faculty from reputed institute or industry)
                </Col>
                <Col>5. Arranged subject related Industrial Visit (2 pts)</Col>
                <Col>6. Use of ICT (max 2)</Col>
                <Col>7. Innovative pedagogy (max 2)</Col>
                <Col>8. Content beyond syllabus(max 2)</Col>{" "}
              </td>
              <td>{facultyData.IActd}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActdHOD}
                  onChange={(e) => setIActdHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>e.</td>
              <td>
                <Col>Updating of subject content course improvement etc</Col>
                <Col>
                  <Col>1. Updated lecture notes (max 3)</Col>
                  <Col>2. Updated lab manual (max 3)</Col>
                  <Col>3. Question bank (2 marks)</Col>
                  <Col>
                    4. Question Paper solution
                    <Col>1. Term Test (1 each max 2)</Col>
                    <Col>2. Model University solution (5)</Col>
                  </Col>
                  <Col>5. Assignment solution (1 each max 2)</Col>
                  <Col>6. Syllabus setting (5 marks each)(max 2)</Col>
                </Col>
                <Col>*quality of notes/solution to be considered</Col>
              </td>
              <td>{facultyData.IActe}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActeHOD}
                  onChange={(e) => setIActeHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>g.</td>
              <td>
                <Col>
                  Examination duties (invigilation; Question paper setting, evaluation/ assessment of answer scripts) as per allotment.
                </Col>
                <Col>
                  1. Invigilation (flying squad duties/Joint CC/any exam related
                  duties) (max 5 points)
                </Col>
                <Col>
                  100% compliance: 5, 80% compliance: 3, less than 80%: no score
                </Col>
                <Col>
                  2. Evaluation of answer script, preparation of result list on
                  time as specified by Examination Section (max 10 points)
                </Col>
                <Col>100% compliance: 5, less than 100%: no score.</Col>
                <Col>Question paper setting (5 each, max score 10)</Col>
              </td>
              <td>{facultyData.IActf}</td>
              <td>
                <Form.Control
                  type="number"
                  value={IActfHOD}
                  onChange={(e) => setIActfHOD(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>Total of Category I</td>
              <td>{facultyData.IActTotal}</td>
              <td>{IActTotalHOD}</td>
            </tr>
          </tbody>
        </Table>
        <div className="text-center mb-4" >
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              <Link to="/form1bhod" className="text-decoration-none text-white">
                Previous
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSave}>
              {/* <Link className="text-decoration-none text-white"> */}
                Save
              {/* </Link> */}
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Link onClick={handleForm2BHODNavigation} className="text-decoration-none text-white">
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

export default Form2AHOD
