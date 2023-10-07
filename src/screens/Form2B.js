import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Form2B() {
  const [user, setUser] = useState(null);
  const [IIActaSem, setIIActaSem] = useState('');
  const [IIActbSem, setIIActbSem] = useState('');
  const [IIActcSem, setIIActcSem] = useState('');
  const [IIActdSem, setIIActdSem] = useState('');
  const [IIActa, setIIActa] = useState('');
  const [IIActb, setIIActb] = useState('');
  const [IIActc, setIIActc] = useState('');
  const [IIActd, setIIActd] = useState('');
  const [IIActTotal, setIIActTotal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [documentBURL, setDocumentBURL] = useState("");

  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        fetchData(user.uid);
      } else {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const fetchData = async (uid) => {
    const docRef = doc(db, 'partB', uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIIActaSem(data.IIActaSem || '');
        setIIActbSem(data.IIActbSem || '');
        setIIActcSem(data.IIActcSem || '');
        setIIActdSem(data.IIActdSem || '');
        setIIActa(data.IIActa || '');
        setIIActb(data.IIActb || '');
        setIIActc(data.IIActc || '');
        setIIActd(data.IIActd || '');
        setIIActTotal(data.IIActTotal || '');
        setDocumentBURL(data.documentBURL || '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Total = () => {
    setIIActTotal(
      parseFloat(IIActa) +
        parseFloat(IIActb) +
        parseFloat(IIActc) +
        parseFloat(IIActd)
    );
  };

  useEffect(() => {
    Total();
  }, [IIActa, IIActb, IIActc, IIActd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'partB', user.uid);
    const data = {
      IIActaSem,
      IIActbSem,
      IIActcSem,
      IIActdSem,
      IIActa,
      IIActb,
      IIActc,
      IIActd,
      IIActTotal,
      documentBURL,
    };
    if (uploadedFile) {
      const storageRef = ref(storage, `documents/${uploadedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setDocumentBURL(url);
            data.documentURL = url;
            setDoc(docRef, data, { merge: true });
          });
        }
      );
    }
    await setDoc(docRef, data, { merge: true });
    // navigate('/form2c');
  };


  return (
    <Container fluid>
      <Row>
      <Col md={2} className="form-navigation">
    <h3>Form Navigation</h3>
    <ul>
      <li>
        <Link to="/">Part A</Link>
      </li>
      <li>
        <span className="form2-subsection">Part B</span>
        <ul className="form2-subsection-list">
          <li>
            <Link to="/form2a" className="form2-subsection-link">Category A</Link>
          </li>
          <li>
            <Link to="/form2b" className="form2-subsection-link">Category B</Link>
          </li>
          <li>
            <Link to="/form2c" className="form2-subsection-link">Category C</Link>
          </li>
        </ul>
      </li>
      {/* Add more form links as needed */}
    </ul>
  </Col>
        <Col md={9}>
        <h1>Part B: Academic Performance Indicators</h1>
          
          <h4>Category II: Co-Curricular, Extension and Profession related activities</h4>

          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Natural of Activity</th>
                  <th>Semester</th>
                  <th>MAX API Score alloted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a.</td>
                  <td>
                    <Col>
                    <Col>Contribution to Corporate life and management of Institution- </Col>
                    <Col>List yearly or semester-wise responsibilities</Col>
                    <Col>1.Collaboration with Human Ventures Pvt. Ltd for project</Col>
                    <Col>2.Collaboration with Schaeffler Technology Solution Ltd. for projects</Col>
                    <Col>3.Collaboration with Matoshree NGO for projects</Col>
                    <Col>4.Collaboration with SATCOM India Pvt. Ltd for Placements</Col>
                    <Col>5.Reviewer for ICAST -22</Col>
                    <Col>6.HoD(EXTC)</Col>
                    <Col>7.Convener(one week FDP on Cyber Security & Forensics)</Col>
                    </Col>
                  </td>
              
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActaSem}
                      onChange={(e) => setIIActaSem(e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActa}
                      onChange={(e) => setIIActa(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                <td colSpan={3}>
                  <Col>Evaluation Criteria:</Col>
                <Col>a) Contribution to corporate life in colleges and universities through meetings/popular lectures/subject-related events/articles in college magazines and university volumes - 3 pts each</Col>
                <Col>Institutional governance responsibilities like Vice-Principal, Deans, HOD, Director, IQAC Coordinator/T&P officer, Exam cell in charge, Admission cell in charge maximum of 25 points (or any other equivalent responsibility)</Col>
                <Col>b) Organized conference/workshop/seminar/FDP/STTP etc.(Max two events to be considered)</Col>
                <Col>1. Conference - 15 points</Col>
                <Col>2. Workshop FDP/STTP/certification programs</Col>
                <Col><Col>1. One week or more - 10 points</Col></Col>
                <Col><Col>2. Less than a week but greater than two days - 5 points</Col></Col>
                <Col><Col>3. One to two days - 3 points</Col></Col>
                <Col><Col>4. Committee member of ICAST - ( )</Col></Col>
                <Col><Col>5. Seminars - 1 point</Col></Col>
                <Col>3. Delivering Lecture/conducting workshop (not paper presentation)</Col>
                <Col><Col>1. At college level for faculty - 3 points</Col></Col>
                <Col><Col>2. During STTP - 10 points</Col></Col>
                <Col><Col>3. International - 15 points</Col></Col>
                <Col>Establishing labs with the help of industry/industry/another organization</Col>
                <Col>Max 5 per individual if a group is involved - 10 if only 1 person is involved</Col>

                      </td>
                </tr>
                <tr>
                  <td>b.</td>
                  <td>
                    <Col>
                    <Col>Extension, Co-curricular and field based activities </Col>
                    <Col>a) Field studies / Educational Tour (other than subject related in 1.d)</Col>
                    <Col>b) Placement activity (for coordinators 15 marks)</Col>
                    <Col>c) Community Service, Social Orientation other (10 marks)</Col>
                    <Col>d) IQAC members / DQC / PAC (10 marks)</Col>
                    <Col>e) IIC members (10 marks)</Col>
                    <Col>f) Alumni committee members (10 marks)</Col>
                    <Col>g) Admission cell members (15 marks)</Col>
                    <Col>h) ATF Coordinators Member & dept supports (5)</Col>
                    <Col>i) NSS / NCC / NSO / other (15 marks)</Col>
                    <Col>j) Exam coordinator (10)</Col>
                    <Col>k) Time Table coordinator (10)</Col>
                    <Col>l) Project Coordinators (5)</Col>
                    <Col>m) Class teacher (10 marks for 1 semester)</Col>
                    <Col>n) Proctor coordinator / NPTEL coordinator (max 3 marks)</Col>
                    <Col>o) Project Competition Coordinators (5)</Col>
                    <Col>p) IIIC Coordinators, IV Coordinators (5)</Col>
                    <Col>q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)</Col>
                    <br/>
                    <Col>All members have to take sign of coordinators of respective
                      committee to validate description of job done. Marks
                      allotted are based on involvement in work.</Col>
                    </Col>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActbSem}
                      onChange={(e) => setIIActbSem(e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActb}
                      onChange={(e) => setIIActb(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>c.</td>
                  <td>
                    <Col>
                      <Col>Students and Staff Related Socio Cultural and Sports Programs (intra/interdepartmental and intercollegiate)</Col>
                      <Col>1. In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)</Col>
                      <Col>2. Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)</Col>

                    </Col>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActcSem}
                      onChange={(e) => setIIActcSem(e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActc}
                      onChange={(e) => setIIActc(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>d.</td>
                  <td>
                    <Col>
                    <Col>Professional Development Activities:</Col>
                    <Col>  Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)</Col>
                    <Col>- Media participation in profession-related talks/debates, etc (5 points)</Col>
                    <Col>- Membership in profession-related committees at state and national levels (max 3)</Col>
                    <Col>- Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)</Col>
                    <Col>- Participation in short-term training courses less than one-week duration:</Col>
                    <Col>  <Col> 1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)</Col></Col>
                    <Col>  <Col> 2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)</Col></Col>
                    <Col>  <Col> 3. Not belonging to the above (5 for external, 4 for local)</Col></Col>
                    <Col>- Boards of Studies, editorial committees of journals (5 points)</Col>
                    </Col>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActdSem}
                      onChange={(e) => setIIActdSem(e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActd}
                      onChange={(e) => setIIActd(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>Total of Category II</td>
                  <td></td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={IIActTotal}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload supporting documents (pdf)</Form.Label>
            <Form.Control type="file" onChange={handleUpload} />
          </Form.Group>
          </Col>
          </Row>
          </div>
            <p>*list may be attached for above activities</p>
            <div className="text-center mb-4" >
              <Row>
                <Col>
                  <Button variant="primary">
                    <Link
                      to="/form2a"
                      className="text-decoration-none text-white"
                    >
                      Previous
                    </Link>
                  </Button>
                </Col>
                <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Link className="text-decoration-none text-white">
                Save
              </Link>
            </Button>
          </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Link
                      to="/form2c"
                      className="text-decoration-none text-white"
                    >
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

export default Form2B;
