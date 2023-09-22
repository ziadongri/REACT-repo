import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
    };
    await setDoc(docRef, data, { merge: true });
    // navigate('/form2c');
  };

  return (
    <Container>
      <Row>
      <Col md={3} className="form-navigation">
    <h3>Form Navigation</h3>
    <ul>
      <li>
        <Link to="/">Form 1</Link>
      </li>
      <li>
        <span className="form2-subsection">Form 2</span>
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
          <h1>Category 2</h1>
          <h4>CO-CURRICULAR, EXTENSION AND PROFESSION RELATED ACTIVITIES</h4>

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
                      1. Contribution to Corporate life and management of
                      Institution
                      List yearly or semester-wise responsibilities
                      1. Collaboration with Human Ventures Pvt. Ltd for project
                      2. Collaboration with Schaeffler Technology Solution Ltd.
                      for projects
                      3. Collaboration with Matoshree NGO for projects
                      4. Collaboration with SATCOM India Pvt. Ltd for Placements
                      5. Reviewer for ICAST -22
                      6. HoD(EXTC)
                      7. Convener(one week FDP on Cyber Security & Forensics)
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
                  <td>b.</td>
                  <td>
                    <Col>
                      Extension, Co-curricular and field based activities
                      a) Field studies /Educational Tour (other than subject
                      related in 1.d)
                      b) Placement activity (for coordinators 15 marks)
                      c) Community Service, Social Orientation other (10 marks)
                      d) IQAC members/DQC/PAC (10 marks)
                      e) IIC members (10 marks)
                      f) Alumni committee members (10 marks)
                      g) Admission cell members (15 marks)
                      h) ATF Coordinators Member& dept supports (5)
                      i) NSS/NCC/NSO/other (15 marks)
                      j) Exam coordinator (10)
                      k) Time Table coordinator (10)
                      l) Project Coordinators (5)
                      m) Class teacher (10 marks for 1 semester)
                      n) Proctor coordinator /NPTEL coordinator (max 3 marks)
                      o) Project Competition Coordinators (5)
                      p) IIIC Coordinators, IV Coordinators(5)
                      q) Any other coordinators (marks based on activeness max 5
                      provided in the same is not repeated elsewhere)
                      All members have to take sign of coordinators of respective
                      committee to validate description of job done. Marks
                      allotted are based on involvement in work.
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
                      Students and Staff Related Socio Cultural and Sports
                      Programs (intra/interdepartmental and intercollegiate)
                      1. In charge for Score/Oscillations/Surge/Intech etc
                      (Judge for project competition in Intech)
                      2. Coordinators of different events based on complexity-
                      (as recommended by in-charge)
                      (coordinated Placement in 5 different companies and
                      coordinated for collaboration with industries)
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
                      4 Professional Development Activities
                      coordinator of student chapters IEEE/IETE/IET/CSI/ISTE
                      etc (5 points)
                      Media participation in profession related talks/debates etc
                      (5 points.)
                      Membership in profession related committees at state and
                      national level (max 3)
                      Participation in subject associations, conferences, seminars
                      without paper presentation (1 marks each subject to max 3)
                      Participation in short term training courses less than
                      one-week duration
                      1. IIT /NIT/Govt college/ TEQIP (10 each for external 8
                      for local)
                      2. Industry related (max 10 for outside Mumbai 5 in
                      Mumbai)
                      3. not belonging to above (5 for external 4 for local)
                      Boards of Studies, editorial committees of journals– (5pts)
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
                  <td>Total of II</td>
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
            <p>*list may be attached for above activities</p>
            <div className="text-center">
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
