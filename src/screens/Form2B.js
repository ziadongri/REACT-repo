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
  const [check_2b, setCheck_2b] = useState(''); 
  const [check_2c, setCheck_2c] = useState('');
  const [check_2d, setCheck_2d] = useState('');
  const [documentB1, setDocumentB1] = useState('');
  const [documentB2, setDocumentB2] = useState('');
  const [documentB3, setDocumentB3] = useState('');
  const [documentB4, setDocumentB4] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [IIActTotal, setIIActTotal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  // const [documentBURL, setDocumentBURL] = useState('');

  const navigate = useNavigate();

  // const handleUpload = (e) => {
  //   const file = e.target.files[0];
  //   setUploadedFile(file);
  // };

  const handleUpload = (e, documentIdentifier) => {
    const file = e.target.files[0];
  
    // Your upload logic here...
  
    if (file) {
      const storageRef = ref(storage, `documents/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            // Update the corresponding document state based on the identifier
            switch (documentIdentifier) {
              case "documentB1":
                setDocumentB1(url);
                break;
              case "documentB2":
                setDocumentB2(url);
                break;
              case "documentB3":
                setDocumentB3(url);
                break;
              case "documentB4":
                setDocumentB4(url);
                break;
                


              // Add cases for other document identifiers as needed
              default: 

                break;
            }
          });
        }
      );
    }
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
    const facultyRef = doc(db, "faculty", uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
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
        setCheck_2b(data.check_2b || '');
        setCheck_2c(data.check_2c || '');
        setCheck_2d(data.check_2d || '');
        setDocumentB1(data.documentB1 || '');
        setDocumentB2(data.documentB2 || '');
        setDocumentB3(data.documentB3 || '');
        setDocumentB4(data.documentB4 || '');
        setIIActTotal(data.IIActTotal || '');
        setResponsibility(data.responsibility || '');
        // setDocumentBURL(data.documentBURL || '');
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

  const handleSave = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
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
      responsibility,
      check_2b,
      check_2c,
      check_2d,
      documentB1,
      documentB2,
      documentB3,
      documentB4
      // documentBURL,
    };
    // if (uploadedFile) {
    //   const storageRef = ref(storage, `documents/${uploadedFile.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
  
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         console.log(url);
    //         setDocumentBURL(url);
    //         data.documentURL = url;
    //         setDoc(docRef, data);
    //       });
    //     }
    //   );
    // }
    if (IIActaSem === "" || IIActbSem === "" || IIActcSem === "" || IIActdSem === "" || IIActa === "" || IIActb === "" || IIActc === "" || IIActd === "" || check_2b === "" || check_2c ==="" || check_2d ==="" || responsibility ==="" || IIActTotal === "") {
      alert("Enter data in the form");
    } else if (IIActaSem < 0 || IIActbSem < 0 || IIActcSem < 0 || IIActdSem < 0 || IIActa < 0 || IIActb < 0 || IIActc < 0 || IIActd < 0 || IIActTotal < 0) {
      alert("Negative values not allowed");
    } else if (!documentB1 || !documentB2 || !documentB3 || !documentB4) {
      alert("Please upload all the required documents");
      return;
    }
    await setDoc(docRef, data);
    // navigate('/form2c');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
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
      responsibility,
      check_2b,
      check_2c,
      check_2d,
      documentB1,
      documentB2,
      documentB3,
      documentB4
      // documentBURL,
    };
    // if (uploadedFile) {
    //   const storageRef = ref(storage, `documents/${uploadedFile.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
  
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         console.log(url);
    //         setDocumentBURL(url);
    //         data.documentURL = url;
    //         setDoc(docRef, data);
    //       });
    //     }
    //   );
    // }
    if (IIActaSem === "" || IIActbSem === "" || IIActcSem === "" || IIActdSem === "" || IIActa === "" || IIActb === "" || IIActc === "" || IIActd === "" || check_2b === "" || check_2c ==="" || check_2d ==="" || responsibility ==="" || IIActTotal === "") {
      alert("Enter data in the form");
    } else if (IIActaSem < 0 || IIActbSem < 0 || IIActcSem < 0 || IIActdSem < 0 || IIActa < 0 || IIActb < 0 || IIActc < 0 || IIActd < 0 || IIActTotal < 0) {
      alert("Negative values not allowed");
    } else if (!documentB1 || !documentB2 || !documentB3 || !documentB4) {
      alert("Please upload all the required documents");
      return;
    }
    await setDoc(docRef, data);
     navigate('/form2c');
  };


  return (
    <Container fluid>
      <Row>
      <Col md={2} className="form-navigation">
    <h3>Form Navigation</h3>
    <ul>
      <li>
        <Link to="/form1">Part A</Link>
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
          
          <h4 style={{fontSize: 20}}>Category II: Co-Curricular, Extension and Profession related activities</h4>

          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Natural of Activity</th>
                  <th>Semester</th>
                  <th>MAX API Score alloted</th>
                  <th>Self apprasial Score</th>
                  <th>Upload Supporting Documents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a.</td>
                  <td>
                    
                    Contribution to Corporate life and management of Institution- 
                    <Col>List yearly or semester-wise responsibilities</Col>
                    
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Text className="text-muted">
            (Minimum characters: 100, Maximum characters: 500)
          </Form.Text>
          <Form.Control
            as="textarea"
            rows={3}
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
            minLength={100}
            maxLength={500}
          />
        </Form.Group>
                    
                    
                  </td>
              
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActaSem}
                      onChange={(e) => setIIActaSem(e.target.value)}
                    />
                  </td>
                  <td>
              <p className='text-center'>35</p>
              </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActa}
                      onChange={(e) => setIIActa(e.target.value)}
                    />
                  </td>
                  <td>
                  <Form.Group controlId="formFile" className="mb-3">
            
            {documentB1 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentB1} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentB1 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB1')} />
            
          </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td></td>
                <td colSpan={5}>
                  Evaluation Criteria:
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

                      </td>
                </tr>
                <tr>
                  <td>b.</td>
                  <td>
                    
                    Extension, Co-curricular and field based activities:
                    <Form.Check
                  type="checkbox"
                  label="a) Field studies / Educational Tour (other than subject related in 1.d)"
                  value="a) Field studies / Educational Tour (other than subject related in 1.d)"
                  checked={check_2b.includes("a) Field studies / Educational Tour (other than subject related in 1.d)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                 <Form.Check
                  type="checkbox"
                  label="b) Placement activity (for coordinators 15 marks)"
                  value="b) Placement activity (for coordinators 15 marks)"
                  checked={check_2b.includes("b) Placement activity (for coordinators 15 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />  
                <Form.Check
                  type="checkbox"
                  label="c) Community Service, Social Orientation other (10 marks)"
                  value="c) Community Service, Social Orientation other (10 marks)"
                  checked={check_2b.includes("c) Community Service, Social Orientation other (10 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                /> 
                 <Form.Check
                  type="checkbox"
                  label="d) IQAC members / DQC / PAC (10 marks)"
                  value="d) IQAC members / DQC / PAC (10 marks)"
                  checked={check_2b.includes("d) IQAC members / DQC / PAC (10 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />  
                  <Form.Check
                  type="checkbox"
                  label="e) IIC members (10 marks)"
                  value="e) IIC members (10 marks)"
                  checked={check_2b.includes("e) IIC members (10 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                /> 
                <Form.Check
                  type="checkbox"
                  label="f) Alumni committee members (10 marks)"
                  value="f) Alumni committee members (10 marks)"
                  checked={check_2b.includes("f) Alumni committee members (10 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="g) Admission cell members (15 marks)"
                  value="g) Admission cell members (15 marks)"
                  checked={check_2b.includes("g) Admission cell members (15 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="h) ATF Coordinators Member & dept supports (5)"
                  value="h) ATF Coordinators Member & dept supports (5)"
                  checked={check_2b.includes("h) ATF Coordinators Member & dept supports (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="i) NSS / NCC / NSO / other (15 marks)"
                  value="i) NSS / NCC / NSO / other (15 marks)"
                  checked={check_2b.includes("i) NSS / NCC / NSO / other (15 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="j) Exam coordinator (10)"
                  value="j) Exam coordinator (10)"
                  checked={check_2b.includes("j) Exam coordinator (10)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="k) Time Table coordinator (10)"
                  value="k) Time Table coordinator (10)"
                  checked={check_2b.includes("k) Time Table coordinator (10)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="l) Project Coordinators (5)"
                  value="l) Project Coordinators (5)"
                  checked={check_2b.includes("l) Project Coordinators (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                
                <Form.Check
                  type="checkbox"
                  label="m) Class teacher (10 marks for 1 semester)"
                  value="m) Class teacher (10 marks for 1 semester)"
                  checked={check_2b.includes("m) Class teacher (10 marks for 1 semester)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="n) Proctor coordinator / NPTEL coordinator (max 3 marks)"
                  value="n) Proctor coordinator / NPTEL coordinator (max 3 marks)"
                  checked={check_2b.includes("n) Proctor coordinator / NPTEL coordinator (max 3 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="o) Project Competition Coordinators (5)"
                  value="o) Project Competition Coordinators (5)"
                  checked={check_2b.includes("o) Project Competition Coordinators (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="p) IIIC Coordinators, IV Coordinators (5)"
                  value="p) IIIC Coordinators, IV Coordinators (5)"
                  checked={check_2b.includes("p) IIIC Coordinators, IV Coordinators (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)"
                  value="q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)"
                  checked={check_2b.includes("q) Any other coordinators (marks based on activeness max 5 provided in the same is not repeated elsewhere)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2b([...check_2b, e.target.value]);
                    } else {
                      setCheck_2b(check_2b.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                    <p></p>
                    All members have to take sign of coordinators of respective
                      committee to validate description of job done. Marks
                      allotted are based on involvement in work.
                    
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActbSem}
                      onChange={(e) => setIIActbSem(e.target.value)}
                    />
                  </td>
                  <td>
                      <p className='text-center'>25</p>
                      </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActb}
                      onChange={(e) => setIIActb(e.target.value)}
                    />
                  </td>
                  <td>
                  <Form.Group controlId="formFile" className="mb-3">
            
            {documentB2 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentB2} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentB2 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB2')} />
            
          </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>c.</td>
                  <td>
                    
                      Students and Staff Related Socio Cultural and Sports Programs (intra/interdepartmental and intercollegiate):
                      <Form.Check
                  type="checkbox"
                  label="1. In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)"
                  value="In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)"
                  checked={check_2c.includes("In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2c([...check_2c, e.target.value]);
                    }
                    else {
                      setCheck_2c(check_2c.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                type = "checkbox"
                label = "2. Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)"
                value = "Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)"
                checked={check_2c.includes("Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheck_2c([...check_2c, e.target.value]);
                  }
                  else {
                    setCheck_2c(check_2c.filter((c) => c !== e.target.value));
                  }
                }
                }
                />
                      {/* <Form.Check
                  type="checkbox"
                  label = "1. In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)"
                  value = "In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)"
                  checked={check_2c.includes("1. In charge for Score/Oscillations/Surge/Intech etc (Judge for project competition in Intech)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2c([...check_2c, e.target.value]);
                    }
                    else {
                      setCheck_2c(check_2c.filter((c) => c !== e.target.value));
                    }
                  }}
                /> */}
                {/* <Form.Check
                type = "checkbox"
                label = "2. Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)"
                value = "Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)"
                checked={check_2c.includes("2. Coordinators of different events based on complexity- (as recommended by in-charge) (coordinated Placement in 5 different companies and coordinated for collaboration with industries)")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheck_2c([...check_2c, e.target.value]);
                  }
                  else {
                    setCheck_2c(check_2c.filter((c) => c !== e.target.value));
                  }
                }
                }
                /> */}
                
                    
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActcSem}
                      onChange={(e) => setIIActcSem(e.target.value)}
                    />
                  </td>
                  <td>
                      <p className='text-center'>20</p>
                      </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActc}
                      onChange={(e) => setIIActc(e.target.value)}
                    />
                  </td>
                  <td>
                  <Form.Group controlId="formFile" className="mb-3">
            
            {documentB3 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentB3} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentB3 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB3')} />
            
          </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>d.</td>
                  <td>
                    
                    Professional Development Activities:
                    
                    <Form.Check
                  type="checkbox"
                  label="Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)"
                  value="Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)"
                  checked={check_2d.includes("Coordinator of student chapters IEEE/IETE/IET/CSI/ISTE (5 points)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Media participation in profession-related talks/debates, etc (5 points)"
                  value="Media participation in profession-related talks/debates, etc (5 points)"
                  checked={check_2d.includes("Media participation in profession-related talks/debates, etc (5 points)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Membership in profession-related committees at state and national levels (max 3)"
                  value="Membership in profession-related committees at state and national levels (max 3)"
                  checked={check_2d.includes("Membership in profession-related committees at state and national levels (max 3)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)"
                  value="Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)"
                  checked={check_2d.includes("Participation in subject associations, conferences, seminars without paper presentation (1 mark each, subject to a max of 3)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                Participation in short-term training courses less than one-week duration:
                    <Col>
                <Form.Check
                  type="checkbox"
                  label="1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)"
                  value="1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)"
                  checked={check_2d.includes("1. IIT/NIT/Govt college/TEQIP (10 each for external, 8 for local)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)"
                  value="2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)"
                  checked={check_2d.includes("2. Industry-related (max 10 for outside Mumbai, 5 in Mumbai)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="3. Not belonging to the above (5 for external, 4 for local)"
                  value="3. Not belonging to the above (5 for external, 4 for local)"
                  checked={check_2d.includes("3. Not belonging to the above (5 for external, 4 for local)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />                    
                    </Col>
                    <Form.Check
                  type="checkbox"
                  label="Boards of Studies, editorial committees of journals (5 points)"
                  value="Boards of Studies, editorial committees of journals (5 points)"
                  checked={check_2d.includes("Boards of Studies, editorial committees of journals (5 points)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_2d([...check_2d, e.target.value]);
                    } else {
                      setCheck_2d(check_2d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActdSem}
                      onChange={(e) => setIIActdSem(e.target.value)}
                    />
                  </td>
                  <td>
                      <p className='text-center'>20</p>
                      </td>
                  
                  <td>
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={IIActd}
                      onChange={(e) => setIIActd(e.target.value)}
                    />
                  </td>
                  <td>
                  <Form.Group controlId="formFile" className="mb-3">
            
            {documentB4 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentB4} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentB4 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB4')} />
            
          </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  
                  
                  <td>Total of Category II</td>
                  <td></td>
                  <td>
                      <p className='text-center'>100</p>
                      </td>
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
          {/* <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            
            {documentBURL && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentBURL} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentBURL && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={handleUpload} />
          </Form.Group>
          </Col>
          </Row>
          </div> */}
          <p className='text-center'>
        *Upload document for above activities. To change the document, upload new document again.
      </p>
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
            <Button variant="primary" type="submit" onClick={handleSave}>
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
