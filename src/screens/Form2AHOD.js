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
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";

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

const fetchData = async () => {
  const facultyRef = doc(db, "faculty", facultyUID);
  const docRef = doc(facultyRef, "partB", "CategoryA");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setFacultyData(docSnap.data());
    const data = docSnap.data();
    setIActaHOD(data.IActaHOD); 
    setIActbHOD(data.IActbHOD);
    setIActcHOD(data.IActcHOD);
    setIActdHOD(data.IActdHOD);
    setIActeHOD(data.IActeHOD);
    setIActfHOD(data.IActfHOD);
    setIActTotalHOD(data.IActTotalHOD);
  } else {
    console.log("No such document!");
  }
}


  useEffect(() => {
    
    fetchData();
  } , [facultyUID]);

  const handleSave = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};
    const data = {
      IActaHOD: IActaHOD,
      IActbHOD: IActbHOD,
      IActcHOD: IActcHOD,
      IActdHOD: IActdHOD,
      IActeHOD: IActeHOD,
      IActfHOD: IActfHOD,
      IActTotalHOD: IActTotalHOD,
    };
    
    if (IActaHOD === "" || IActbHOD === "" || IActcHOD === "" || IActdHOD === "" || IActeHOD === "" || IActfHOD === "") {
      alert("Please fill all the fields");
      return;
    } else if ( IActaHOD < 0 || IActbHOD < 0 || IActcHOD < 0 || IActdHOD < 0 || IActeHOD < 0 || IActfHOD < 0) {
      alert("Please enter positive values only");
      return;
    } else if (isNaN(IActTotalHOD)) {
      alert("Please fill numbers only");
      return;
    } 
    await setDoc(docRef, data, { merge: true });

    alert("Data Saved");
  } 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};
    const data = {
      IActaHOD: IActaHOD,
      IActbHOD: IActbHOD,
      IActcHOD: IActcHOD,
      IActdHOD: IActdHOD,
      IActeHOD: IActeHOD,
      IActfHOD: IActfHOD,
      IActTotalHOD: IActTotalHOD,
    };
    
    if (IActaHOD === "" || IActbHOD === "" || IActcHOD === "" || IActdHOD === "" || IActeHOD === "" || IActfHOD === "") {
      alert("Please fill all the fields");
      return;
    } 
    else if ( IActaHOD < 0 || IActbHOD < 0 || IActcHOD < 0 || IActdHOD < 0 || IActeHOD < 0 || IActfHOD < 0) {
      alert("Please enter positive values only");
      return;
    } 
    else if (isNaN(IActTotalHOD)) {
      alert("Please fill numbers only");
      return;
    } 
    await setDoc(docRef, data, { merge: true });

    alert("Data Saved");
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
 
        <Col md={11} className="mx-auto text-center" >
      <h1 className="text-center">Part B: Academic Performance Indicators</h1>
      <h4 style={{fontSize: 20}} className="text-center">Category I: Teaching, Learning and Evaluation related activities</h4>

      <p className='text-center' >
       NOTE: 1. Proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty.
        <br />
        2. Upload document for below activities. To change the document, upload new document again.
      </p>

      <div className="content-box">
               <Table striped bordered hover>
          <thead>
            <tr className="text-center">
            <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
            <th style={{ verticalAlign: 'middle'}}>Courses Taught code and name</th>
            <th style={{ verticalAlign: 'middle'}}>Class for which conducted</th>
            <th style={{ verticalAlign: 'middle'}}>Target Lectures/ Practical</th>
            <th style={{ verticalAlign: 'middle'}}>Lectures/ Practical Actually conducted</th>
            <th style={{ verticalAlign: 'middle'}}>% of Classes conducted</th>
            </tr>
          </thead>

          {facultyData.IOddsem.map((data, index) => (
            <tbody key={index}>
              <tr className="text-center">
                <td >{index + 1}</td>
                <td >{data.course}</td>
                <td>{data.class}</td>
                <td>{data.lectures}</td>
                <td>{data.actualLectures}</td>
                <td>{data.percentage}</td>
              </tr>
            </tbody>
          ))}
        </Table>

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA7} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div> 
      </div>
      
      <div className="content-box">
               <Table striped bordered hover>
          <thead>
            <tr className="text-center">
            <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
            <th style={{ verticalAlign: 'middle'}}>Courses Taught code and name</th>
            <th style={{ verticalAlign: 'middle'}}>Class for which conducted</th>
            <th style={{ verticalAlign: 'middle'}}>Target Lectures/ Practical</th>
            <th style={{ verticalAlign: 'middle'}}>Lectures/ Practical Actually conducted</th>
            <th style={{ verticalAlign: 'middle'}}>% of Classes conducted</th>
            </tr>
          </thead>

          {facultyData.IEvensem.map((data, index) => (
            <tbody key={index}>
              <tr className="text-center">
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

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA8} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div> 
      </div>

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
            <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
            <th style={{ verticalAlign: 'middle'}}>Natural of Activity</th>
            <th style={{ verticalAlign: 'middle'}}>Spilt-Up Marks Total</th>
            <th style={{ verticalAlign: 'middle'}}>MAX API Score alloted</th>
            <th style={{ verticalAlign: 'middle'}}>Self appraisal Score</th>
            <th style={{ verticalAlign: 'middle'}}>Supporting Documents</th>
            <th style={{ verticalAlign: 'middle'}}>Verified API Score</th>
            </tr>
          </thead>

          <tbody >
            <tr >
              <td>a.</td>
              <td style={{ textAlign: "left" }}>
                <Col >
                  Lectures, Seminars, tutorials, practical, contact hours
                  undertaken taken as percentage of lectures allocated
                </Col>
                <Col>- Total lectures conducted {">"} 90% score = 50</Col>
                <Col>- 90% {">"} Lectures taken ≥ 80% = 40</Col>
                <Col>- 80% {">"} Lectures taken ≥ 70% = 30</Col>
                <Col>- no score if number of lectures taken is less than 70%{" "}
                </Col>
              </td>

              <td className='text-center'> - </td>

              <td><p className='text-center'>50</p></td>
              <td><p className='text-center'>{facultyData.IActa}</p></td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA1} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>

              <td >
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={IActaHOD}
                  onChange={(e) => setIActaHOD(Math.min(Number(e.target.value), 50))}
                  max={50}
                />
              </td>
            </tr>

            <tr >
              <td>b.</td>
              <td style={{ textAlign: "left" }}>
                <Col> Lectures or lab in excess of UGC norms </Col>
                <Col>(One point for each extra class) </Col>
                <Col>
                  {" "}
                  This refers to lecture load allotted above 16/week for Asst
                  Prof or above 14/week for Associate Prof and Professor. Repeat
                  classes for diploma students may be given 5 marks
                </Col>
              </td>

              <td className='text-center'> - </td>

              <td>
              <p className='text-center'>5</p>
              </td>
              <td><p className='text-center'>{facultyData.IActb}</p></td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA2} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={IActbHOD}
                  onChange={(e) => setIActbHOD(Math.min(Number(e.target.value), 5))}
                  max={5}
                />
              </td>
            </tr>

            <tr>
              <td>c.</td>
              <td style={{ textAlign: "left" }}>
                <Col>
                  {" "}
                  Remedial lectures or Revision Lectures actually conducted for
                  weak students (one point for each extra class in other than
                  mentioned in 1.a)
                </Col>
              </td>

              <td className='text-center'> - </td>
              <td>
              <p className='text-center'>5</p>
              </td>
              <td>
              <p className='text-center'>{facultyData.IActc}</p>
              </td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA3} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={IActcHOD}
                  onChange={(e) => setIActcHOD(Math.min(Number(e.target.value), 5))}
                  max={5}
                />
              </td>
            </tr>

            <tr>
              <td>d.</td>
              <td style={{ textAlign: "left" }}>
                <Col>
                  Learning material prepared for students: Provide short
                  description of each work done in separate sheet
                </Col>
                <br/>
                <p>*Tick the applicable activities and enter the score.<br/>Evaluation Criteria:</p>
              
                    <tr>
                      <td><Form.Check
                  type="checkbox"
                  label="1. Quality PPT made by self (5)"
                 
                  checked={facultyData.check_d.includes("Quality PPT made by self (5)")}
                  readOnly
                 
                /></td>

                      <td>
                      <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={facultyData.sub1_d1 >= 0 ? facultyData.sub1_d1 : 0}
                      readOnly
                    />

                      </td>
                    </tr>

                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="2. Animations/virtual labs/website (10)"
                 
                  checked={facultyData.check_d.includes("Animations/virtual labs/website (10)")}
                  readOnly                 
                />
                  </td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d2 >= 0 ? facultyData.sub1_d2 : 0}
                  readOnly  
                /></td>
                 </tr>
                  
               <tr>
                <td><Form.Check
                  type="checkbox"
                  label="3. Good quality video lectures available on public platforms (recorded online lectures not to be considered) (10)"
              
                  checked={facultyData.check_d.includes("Good quality video lectures available on public platforms")}
                  readOnly
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d3 >= 0 ? facultyData.sub1_d3 : 0}
                  readOnly
                />
                </td>
               </tr>
                
                <tr>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="4. Arranged guest lecture (2 points per lecture. The guest
                    should be external faculty from reputed institute or industry)"                 
                  checked={facultyData.check_d.includes("Arranged guest lecture (2 points per lecture. The guest should be external faculty from reputed institute or industry)")}
                  readOnly
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d4 >= 0 ? facultyData.sub1_d4 : 0}
                  readOnly
                />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="5. Arranged subject related Industrial Visit (2 pts)"                
                  checked={facultyData.check_d.includes("Arranged subject related Industrial Visit (2 pts)")}
                  readOnly               
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d5 >= 0 ? facultyData.sub1_d5 : 0}
                  readOnly
                />
                  </td>
                </tr>

                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="6. Use of ICT (max 2)"                 
                  checked={facultyData.check_d.includes("Use of ICT (max 2)")}
                  readOnly                  
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d6 >= 0 ? facultyData.sub1_d6 : 0}
                  readOnly
                />                   
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="7. Innovative pedagogy (max 2)"                  
                  checked={facultyData.check_d.includes("Innovative pedagogy (max 2)")}
                  readOnly                
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d7 >= 0 ? facultyData.sub1_d7 : 0}
                  readOnly
                />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="8. Content beyond syllabus(max 2)"                
                  checked={facultyData.check_d.includes("Content beyond syllabus(max 2)")}
                  readOnly                  
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_d8 >= 0 ? facultyData.sub1_d8 : 0}
                  readOnly
                />
                </td>
                </tr>
                
              </td>
              
              <td className='text-center'> 
                  {facultyData.totalsub1d}</td>
              <td>
              <p className='text-center'>40</p>
              </td>
              <td>
              <p className='text-center'>{facultyData.IActd}</p>
              </td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA4} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>

              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={IActdHOD}
                  onChange={(e) => setIActdHOD(Math.min(Number(e.target.value), 40))}
                  max={40}
                />
              </td>
            </tr>

            <tr>
              <td>e.</td>
              <td style={{ textAlign: "left" }}>
                <Col>Updating of subject content course improvement etc</Col>

                <tr>
                  <td>                <Form.Check
                  type="checkbox"
                  label="1. Updated lecture notes (max 3)"
                  checked={facultyData.check_e.includes("Updated lecture notes (max 3)")}
                  readOnly
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_e1 >= 0 ? facultyData.sub1_e1 : 0}
                  readOnly
                />
                </td>
                </tr>

                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="2. Updated lab manual (max 3)"
                  checked={facultyData.check_e.includes("Updated lab manual (max 3)")}
                  readOnly
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_e2 >= 0 ? facultyData.sub1_e2 : 0}
                  readOnly
                />
                </td>
                </tr>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="3. Question bank (2 marks)"
                  checked={facultyData.check_e.includes("Question bank (2 marks)")}
                  readOnly
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_e3 >= 0 ? facultyData.sub1_e3 : 0}
                  readOnly
                />
                </td>
                </tr>

                <tr>4. Question Paper solution:
                  <Col>
                
                <tr>
                  <td><Form.Check
                      type="checkbox"
                      label="1. Term Test (1 each max 2)"
                      checked={facultyData.check_e.includes("Term Test (1 each max 2)")}
                      readOnly
                    /></td>
                    <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={facultyData.sub1_e41 >= 0 ? facultyData.sub1_e41 : 0}
                      readOnly
                    />
                    </td>
                </tr>

                <tr>
                  <td><Form.Check
                      type="checkbox"
                      label="2. Model University solution (5)"
                      checked={facultyData.check_e.includes("Model University solution (5)")}
                      readOnly
                    /></td>
                    <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={facultyData.sub1_e42 >= 0 ? facultyData.sub1_e42 : 0}
                      readOnly
                    />
                    </td>
                </tr>
                </Col>

                </tr>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="5. Assignment solution (1 each max 2)"
                  checked={facultyData.check_e.includes("Assignment solution (1 each max 2)")}
                  readOnly
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_e5 >= 0 ? facultyData.sub1_e5 : 0}
                  readOnly
                />
                </td>
                </tr>

                 <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="6. Syllabus setting (5 marks each)(max 2)"
                  checked={facultyData.check_e.includes("Syllabus setting (5 marks each)(max 2)")}
                  readOnly
                  /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_e6 >= 0 ? facultyData.sub1_e6 : 0}
                  readOnly
                />
                  </td>
                  </tr> 

                <Col>*quality of notes/solution to be considered</Col>
              </td>

              <td className='text-center'> {facultyData.totalsub1e} </td>
              <td>
              <p className='text-center'>25</p>
              </td>
              <td>{facultyData.IActe}</td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA5} target="_blank">
              View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={IActeHOD}
                  style={{ textAlign: "center" }}
                  onChange={(e) => setIActeHOD(Math.min(Number(e.target.value), 25))}
                  max={25}
                />
              </td>
            </tr>

            <tr>
              <td>f.</td>
              <td style={{ textAlign: "left" }}>
                <Col>
                  Examination duties (invigilation; Question paper setting, evaluation/ assessment of answer scripts) as per allotment.
                </Col>
                
                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="1. Invigilation (flying squad duties/Joint CC/any exam related duties) (max 5 points)"
                  checked={facultyData.check_f.includes("Invigilation (flying squad duties/Joint CC/any exam related duties) (max 5 points)")}
                  readOnly
                />
                <Col>
                  100% compliance: 5, 80% compliance: 3, less than 80%: no score
                </Col></td>
                <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_f1 >= 0 ? facultyData.sub1_f1 : 0}
                  readOnly
                />
                </td>
                </tr>

                <tr>
                    <td><Form.Check
                  type="checkbox"
                  label="2. Evaluation of answer script, preparation of result list on time as specified by Examination Section (max 10 points)"
                  checked={facultyData.check_f.includes("Evaluation of answer script, preparation of result list on time as specified by Examination Section (max 10 points)")}
                  readOnly
                />
                <Col>100% compliance: 5, less than 100%: no score.</Col></td>
                <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_f2 >= 0 ? facultyData.sub1_f2 : 0}
                  readOnly
                />
                </td>
                </tr>

                <tr>
                  <td><Form.Check
                  type="checkbox"
                  label="Question paper setting (5 each, max score 10)"
                  checked={facultyData.check_f.includes("Question paper setting (5 each, max score 10)")}
                  readOnly
                /></td>
                <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={facultyData.sub1_f3 >= 0 ? facultyData.sub1_f3 : 0}
                  readOnly
                />
                </td>
                </tr>
              </td>

              <td className='text-center'> {facultyData.totalsub1f} </td>
              <td>
              <p className='text-center'>25</p>
              </td>
              <td>{facultyData.IActf}</td>

              <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentA6} target="_blank">
              View file here
            </a>
          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={IActfHOD}
                  style={{ textAlign: "center" }}
                  onChange={(e) => setIActfHOD(Math.min(Number(e.target.value), 25))}
                  max={25}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>Total of Category I</td>
              <td></td>
              <td>
              <p className='text-center'>150</p>
              </td>
              <td>{facultyData.IActTotal}</td>
              <td></td>
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
              {/* <Link className="text-decoration-none text-white"> */}
                Next
              {/* </Link> */}
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
