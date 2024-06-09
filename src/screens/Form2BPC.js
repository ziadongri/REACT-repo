import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { auth, db, storage } from '../firebase';
import { doc, collection, getDoc, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

function Form2BPC() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [facultyData, setFacultyData] = useState(null);

    const location = useLocation();
    const facultyUID = location.state.facultyUID;
    console.log(facultyUID);
    let navigate = useNavigate();

    if (!facultyUID) {
        alert("Something went wrong!");
    }

    useEffect(() => {   
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user); }
                else {
                    navigate('/');
                }
                setLoading(false);
            });
            return unsubscribe;
          }, [navigate]);


    
          useEffect(() => {
            const fetchData = async () => {
              const facultyRef = doc(db, "faculty", facultyUID);
              const docRef = doc(facultyRef, "partB", "CategoryB");
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setFacultyData(docSnap.data());
                console.log("Document data:", docSnap.data());
              } else {
                console.log("No such document!");
              }
        
            }
            fetchData();
          } , [facultyUID]);  
          
     const handleSubmit = async () => {

            navigate('/form2cprincipal', { state: { facultyUID: facultyUID } });
            // console.log("Document written with ID: ", facultyUID);
          }

    const handleForm2APCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form2aprincipal', { state: { facultyUID: facultyUID } });
      }

      const handleForm2CPCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form2cprincipal', { state: { facultyUID: facultyUID } });
      }
    
      const handleForm3PCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form3principal', { state: { facultyUID: facultyUID } });
      }     

          if (loading) {
            return <p>Loading...</p>;
          }
          
          if (!facultyData) {
            return <p>Faculty data not found.</p>;
          }
        

          return (
            <Container fluid>
              <Row>

              <Col md={11} className="mx-auto text-center" >
                <h1 className="text-center">Part B: Academic Performance Indicators</h1>
                  
                  <h4 style={{fontSize: 20}} className="text-center">Category II: Co-Curricular, Extension and Profession related activities</h4>

                  <p className='text-center'>
        NOTE: Upload document for above activities. To change the document, upload new document again.
      </p>
        
                  <Form onSubmit={handleSubmit}>
                    <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                        <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
                        <th style={{ verticalAlign: 'middle'}}>Natural of Activity</th>
                        <th style={{ verticalAlign: 'middle'}}>Spilt-Up Marks Total</th>
                        <th style={{ verticalAlign: 'middle'}}>MAX API Score alloted</th>
                        <th style={{ verticalAlign: 'middle'}}>Self apprasial Score</th>                      
                        <th style={{ verticalAlign: 'middle'}}>Verified API Score</th>
                         <th style={{ verticalAlign: 'middle'}}>Supporting Documents</th>
                        </tr>
                        
                      </thead>

                      <tbody>
                        <tr>
                        <td className="text-center">a.</td>
                          <td style={{ textAlign: "left" }}>
                            Contribution to Corporate life and management of Institution - 
                            <p>List yearly or semester-wise responsibilities</p>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Text className="text-muted">
                              (Minimum characters: 50, Maximum characters: 500)
                            </Form.Text>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={facultyData.responsibility}
                              // onChange={(e) => setResponsibility(e.target.value)}
                              // minLength={100}
                              // maxLength={500}
                              readOnly
                            />
                          </Form.Group>
                          </td>

                          <td>
                  <p className='text-center'>-</p>
                  </td>
                      <td>
              <p className='text-center'>25</p>
              </td>
                      <td>{facultyData.IIActa}</td>
                          <td>
                            {facultyData.IIActaHOD}
                          </td>

                          <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentB1} target="_blank">
              View file here
            </a>
          </Form.Group>
          </Col>
          </Row>
          </div>
              </td> 
                        </tr>

                        <tr style={{ textAlign: "left" }}>
                          <td></td>
                        <td colSpan={6}>
                          <Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
                        <Col>a) Contribution to corporate life in colleges and universities through meetings/popular lectures/subject-related events/articles in college magazines and university volumes - 3 pts each</Col>
                        <Col>Institutional governance responsibilities like Vice-Principal, Deans, HOD, Director, IQAC Coordinator/T&P officer, Exam cell in charge, Admission cell in charge maximum of 25 points (or any other equivalent responsibility)</Col>
                        <p></p>
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
                              </td></tr>

                        <tr>
                          <td>b.</td>
                          <td style={{ textAlign: "left" }}>
                            Extension, Co-curricular and field based activities:
                            <p> 
                      *Tick the applicable activities and enter the score.
                    </p>

                    <tr>
                      <td><Form.Check
                  type="checkbox"
                  label="a) Field studies / Educational Tour (other than subject related in 1.d)"
                  
                  checked={facultyData.check_2b.includes("a) Field studies / Educational Tour (other than subject related in 1.d)")}
                  readOnly
                /></td>
                <td>
                  <Form.Control
                   type="text"  style={{ textAlign: "center" }}
                   value={facultyData.sub2ba >= 0 ? facultyData.sub2ba : 0}
                   readOnly
                  /></td>                
                    </tr>

                    <tr>
                      <td><Form.Check
                  type="checkbox"
                  label="b) Placement activity (for coordinators 15 marks)"
                  checked={facultyData.check_2b.includes("b) Placement activity (for coordinators 15 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bb >= 0 ? facultyData.sub2bb : 0}  
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox" 
                label="c) Community Service, Social Orientation other (10 marks)"
                checked={facultyData.check_2b.includes("c) Community Service, Social Orientation other (10 marks)")}
                readOnly /></td>
                <td>
                  <Form.Control
                  type="text"  style={{ textAlign: "center" }}
                  value={facultyData.sub2bc >= 0 ? facultyData.sub2bc : 0}
                  readOnly
                  />
                </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="d) IQAC members / DQC / PAC (10 marks)"
                  checked={facultyData.check_2b.includes("d) IQAC members / DQC / PAC (10 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bd >= 0 ? facultyData.sub2bd : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="e) IIC members (10 marks)"
                  checked={facultyData.check_2b.includes("e) IIC members (10 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2be >= 0 ? facultyData.sub2be : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="f) Alumni committee members (10 marks)"
                  checked={facultyData.check_2b.includes("f) Alumni committee members (10 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bf >= 0 ? facultyData.sub2bf : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="g) Admission cell members (15 marks)"
                  checked={facultyData.check_2b.includes("g) Admission cell members (15 marks)")} 
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bg >= 0 ? facultyData.sub2bg : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="h) ATF Coordinators Member & dept supports (5)"
                  checked={facultyData.check_2b.includes("h) ATF Coordinators Member & dept supports (5)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"   style={{ textAlign: "center" }}
                    value={facultyData.sub2bh >= 0 ? facultyData.sub2bh : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="i) NSS / NCC / NSO / other (15 marks)"
                  checked={facultyData.check_2b.includes("i) NSS / NCC / NSO / other (15 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bi >= 0 ? facultyData.sub2bi : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="j) Exam coordinator (10)"
                  checked={facultyData.check_2b.includes("j) Exam coordinator (10)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bj >= 0 ? facultyData.sub2bj : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="k) Time Table coordinator (10)"
                  checked={facultyData.check_2b.includes("k) Time Table coordinator (10)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"   style={{ textAlign: "center" }}
                    value={facultyData.sub2bk >= 0 ? facultyData.sub2bk : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="l) Project Coordinators (5)"
                  checked={facultyData.check_2b.includes("l) Project Coordinators (5)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"   style={{ textAlign: "center" }}
                    value={facultyData.sub2bl >= 0 ? facultyData.sub2bl : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="m) Class teacher (10 marks for 1 semester)"
                  checked={facultyData.check_2b.includes("m) Class teacher (10 marks for 1 semester)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bm >= 0 ? facultyData.sub2bm : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="n) Proctor coordinator / NPTEL coordinator (max 3 marks)"
                  checked={facultyData.check_2b.includes("n) Proctor coordinator / NPTEL coordinator (max 3 marks)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bn >= 0 ? facultyData.sub2bn : 0}
                    readOnly
                    />
                  </td>
                    </tr>
                
                <tr>
                  <td><Form.Check type="checkbox"
                  label="o) Project Competition Coordinators (5)"
                  checked={facultyData.check_2b.includes("o) Project Competition Coordinators (5)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bo >= 0 ? facultyData.sub2bo : 0}
                    readOnly
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check type="checkbox"
                  label="p) IIIC Coordinators, IV Coordinators (5)"
                  checked={facultyData.check_2b.includes("p) IIIC Coordinators, IV Coordinators (5)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bp >= 0 ? facultyData.sub2bp : 0}
                    readOnly
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check type="checkbox"
                  label="q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)"
                  checked={facultyData.check_2b.includes("q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2bq >= 0 ? facultyData.sub2bq : 0}
                    readOnly
                    />
                  </td>
                </tr>
                
                <p></p>
                    All members have to take sign of coordinators of respective
                      committee to validate description of job done. Marks
                      allotted are based on involvement in work.
                            
                </td>

                <td>{facultyData.totalsub2b}</td>
                          <td>  <p className='text-center'>25</p>
                      </td>                    
                          <td>{facultyData.IIActb}</td>
                          <td>
                            {facultyData.IIActbHOD}
                          </td>

                          <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentB2} target="_blank">
              View file here
            </a>
          </Form.Group>
          </Col>
          </Row>
          </div>
              </td> 
                        </tr>

                        <tr>
                          <td>c.</td>
                          <td style={{ textAlign: "left" }}>
                          Students and Staff Related Socio Cultural and Sports Programs (intra/interdepartmental and intercollegiate):

                          <p>
                          *Tick the applicable activities and enter the score.
                          </p>
                        
                  <tr>
                    <td><Form.Check type="checkbox"
                  label="1. In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)"
                  checked={facultyData.check_2c.includes("In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)")}
                  readOnly />
                </td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2da >= 0 ? facultyData.sub2da : 0}
                    readOnly
                    />
                  </td>
                  </tr>

                  <tr>
                    <td><Form.Check type="checkbox"
                  label="2. Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)"
                  checked={facultyData.check_2c.includes("Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2db >= 0 ? facultyData.sub2db : 0}
                    readOnly
                    />
                  </td>
                  </tr> </td>

                  <td>{facultyData.totalsub2d}</td>
                          <td>
                      <p className='text-center'>20</p>
                      </td>
                          <td>{facultyData.IIActc}</td>
                          <td>
                            {facultyData.IIActcHOD}
                          </td>

                          <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentB3} target="_blank">
              View file here
            </a>
          </Form.Group>
          </Col>
          </Row>
          </div>
              </td>
                        </tr>

                        <tr>
                          <td>d.</td>
                          <td style={{ textAlign: "left" }}>               
                Professional Development Activities:
                <p> 
                      *Tick the applicable activities and enter the score.
                    </p>
                    <tr>
                      <td><Form.Check type="checkbox"
                  label="Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)"
                  checked={facultyData.check_2d.includes("Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2ca >= 0 ? facultyData.sub2ca : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="Media participation in profession-related talks/debates, etc (5 points)"
                  checked={facultyData.check_2d.includes("Media participation in profession-related talks/debates, etc (5 points)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2cb >= 0 ? facultyData.sub2cb : 0}
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="Membership in profession-related committees at state and national levels (max 3)"
                  checked={facultyData.check_2d.includes("Membership in profession-related committees at state and national levels (max 3)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2cc >= 0 ? facultyData.sub2cc : 0}  
                    readOnly
                    />
                  </td>
                    </tr>

                    <tr>
                      <td><Form.Check type="checkbox"
                  label="Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)"
                  checked={facultyData.check_2d.includes("Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2cd >= 0 ? facultyData.sub2cd : 0}
                    readOnly
                    />
                  </td>
                    </tr>
                  
                Participation in short-term training courses less than one-week duration:
                <p>*Tick the applicable activities and enter the score.</p>
                                                                         
                  <>
                  <tr>
                    <td><Form.Check type="checkbox"
                  label="1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)"
                  checked={facultyData.check_2d.includes("1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2ce1 >= 0 ? facultyData.sub2ce1 : 0}
                    readOnly
                    />
                  </td>
                  </tr>

                  <tr>
                    <td><Form.Check type="checkbox"
                  label="2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)"
                  checked={facultyData.check_2d.includes("2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)")}
                  readOnly /></td>
                    <td>
                      <Form.Control
                      type="text"  style={{ textAlign: "center" }}
                      value={facultyData.sub2ce2 >= 0 ? facultyData.sub2ce2 : 0}
                      readOnly
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td><Form.Check type="checkbox"
                  label="3. Not belonging to the above (5 for external, 4 for local)"
                  checked={facultyData.check_2d.includes("3. Not belonging to the above (5 for external, 4 for local)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2ce3 >= 0 ? facultyData.sub2ce3 : 0}
                    readOnly
                    />
                  </td>
                  </tr></>
                  
                  <tr>
                    <td><Form.Check type="checkbox"
                  label="Boards of Studies, editorial committees of journals (5 points)"
                  checked={facultyData.check_2d.includes("Boards of Studies, editorial committees of journals (5 points)")}
                  readOnly /></td>
                  <td>
                    <Form.Control
                    type="text"  style={{ textAlign: "center" }}
                    value={facultyData.sub2cf >= 0 ? facultyData.sub2cf : 0}
                    readOnly
                    />
                  </td>
                  </tr>
                           
                          </td>

                          <td>{facultyData.totalsub2c}</td>
                          <td>
                      <p className='text-center'>20</p>
                      </td>
                          <td>{facultyData.IIActd}</td>
                          <td>
                            {facultyData.IIActdHOD}
                          </td>

                          <td>
              <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentB4} target="_blank">
              View file here
            </a>
          </Form.Group>
          </Col>
          </Row>
          </div>
              </td> 
                        </tr>

                        <tr>
                          <td></td>
                          <td>Total of Category II</td>
                          <td></td>
                          <td>
                      <p className='text-center'>100</p>
                      </td>
                          <td>{facultyData.IIActTotal}</td>
                          <td>
                            {facultyData.IIActTotalHOD}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                  
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
                        {/* <Col>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      <Link className="text-decoration-none text-white">
                        Save
                      </Link>
                    </Button>
                  </Col> */}
                        <Col>
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            <Link
                              to="/form2cprincipal"
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

export default Form2BPC;