import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


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
  const [ sub2ba, setSub2ba] = useState('');
  const [ sub2bb, setSub2bb] = useState('');
  const [ sub2bc, setSub2bc] = useState('');
  const [ sub2bd, setSub2bd] = useState('');
  const [ sub2be, setSub2be] = useState('');
  const [ sub2bf, setSub2bf] = useState('');
  const [ sub2bg, setSub2bg] = useState('');
  const [ sub2bh, setSub2bh] = useState('');
  const [ sub2bi, setSub2bi] = useState('');
  const [ sub2bj, setSub2bj] = useState('');
  const [ sub2bk, setSub2bk] = useState('');
  const [ sub2bl, setSub2bl] = useState('');
  const [ sub2bm, setSub2bm] = useState('');
  const [ sub2bn, setSub2bn] = useState('');
  const [ sub2bo, setSub2bo] = useState('');
  const [ sub2bp, setSub2bp] = useState('');
  const [ sub2bq, setSub2bq] = useState('');
  const [ sub2ca, setSub2ca] = useState('');
  const [ sub2cb, setSub2cb] = useState('');
  const [ sub2cc, setSub2cc] = useState('');
  const [ sub2cd, setSub2cd] = useState('');
  const [ sub2ce1, setSub2ce1] = useState('');
  const [ sub2ce2, setSub2ce2] = useState('');
  const [ sub2ce3, setSub2ce3] = useState('');
  const [ sub2cf, setSub2cf] = useState('');
  const [ sub2da, setSub2da] = useState('');
  const [ sub2db, setSub2db] = useState('');
  const [documentB1, setDocumentB1] = useState('');
  const [documentB2, setDocumentB2] = useState('');
  const [documentB3, setDocumentB3] = useState('');
  const [documentB4, setDocumentB4] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [totalsub2b, setTotalSub2b] = useState('');
  const [totalsub2c, setTotalSub2c] = useState('');
  const [totalsub2d, setTotalSub2d] = useState('');
  const [IIActTotal, setIIActTotal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
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
        setSub2ba(data.sub2ba || '');
        setSub2bb(data.sub2bb || '');
        setSub2bc(data.sub2bc || '');
        setSub2bd(data.sub2bd || '');
        setSub2be(data.sub2be || '');
        setSub2bf(data.sub2bf || '');
        setSub2bg(data.sub2bg || '');
        setSub2bh(data.sub2bh || '');
        setSub2bi(data.sub2bi || '');
        setSub2bj(data.sub2bj || '');
        setSub2bk(data.sub2bk || '');
        setSub2bl(data.sub2bl || '');
        setSub2bm(data.sub2bm || '');
        setSub2bn(data.sub2bn || '');
        setSub2bo(data.sub2bo || '');
        setSub2bp(data.sub2bp || '');
        setSub2bq(data.sub2bq || '');
        setSub2ca(data.sub2ca || '');
        setSub2cb(data.sub2cb || '');
        setSub2cc(data.sub2cc || '');
        setSub2cd(data.sub2cd || '');
        setSub2ce1(data.sub2ce1 || '');
        setSub2ce2(data.sub2ce2 || '');
        setSub2ce3(data.sub2ce3 || '');
        setSub2cf(data.sub2cf || '');
        setSub2da(data.sub2da || '');
        setSub2db(data.sub2db || '');
        setDocumentB1(data.documentB1 || '');
        setDocumentB2(data.documentB2 || '');
        setDocumentB3(data.documentB3 || '');
        setDocumentB4(data.documentB4 || '');
        setIIActTotal(data.IIActTotal || '');
        setTotalSub2b(data.totalsub2b || '');
        setTotalSub2c(data.totalsub2c || '');
        setTotalSub2d(data.totalsub2d || '');
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
  }, [IIActa, IIActb, IIActc, IIActd], );

  const Total2 = () => {
    // Filter out NaN values and convert them to 0
    const valuesToSum = [
      sub2ba, sub2bb, sub2bc, sub2bd, sub2be, sub2bf, sub2bg, sub2bh, sub2bi,
      sub2bj, sub2bk, sub2bl, sub2bm, sub2bn, sub2bo, sub2bp, sub2bq
    ].filter(value => !isNaN(parseFloat(value)));
  
    // Sum the numeric values
    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);
  
    // Set the total value
    setTotalSub2b(sum);
  };
  
  useEffect(() => {
    Total2();
  }, [sub2ba, sub2bb, sub2bc, sub2bd, sub2be, sub2bf, sub2bg, sub2bh, sub2bi, sub2bj, sub2bk, sub2bl, sub2bm, sub2bn, sub2bo, sub2bp, sub2bq]);

  const Total3 = () => {
    // Filter out NaN values and convert them to 0
    const valuesToSum = [
      sub2ca, sub2cb, sub2cc, sub2cd, sub2ce1, sub2ce2, sub2ce3, sub2cf
    ].filter(value => !isNaN(parseFloat(value)));

    // Sum the numeric values
    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    // Set the total value
    setTotalSub2c(sum);
  };

  useEffect(() => {
    Total3();
  }, [sub2ca, sub2cb, sub2cc, sub2cd, sub2ce1, sub2ce2, sub2ce3, sub2cf]);

  const Total4 = () => {
    // Filter out NaN values and convert them to 0
    const valuesToSum = [
      sub2da, sub2db
    ].filter(value => !isNaN(parseFloat(value)));

    // Sum the numeric values
    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    // Set the total value
    setTotalSub2d(sum);
  };

  useEffect(() => {
    Total4();
  }
  , [sub2da, sub2db]);



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
      sub2ba,
      sub2bb,
      sub2bc,
      sub2bd,
      sub2be,
      sub2bf,
      sub2bg,
      sub2bh,
      sub2bi,
      sub2bj,
      sub2bk,
      sub2bl,
      sub2bm,
      sub2bn,
      sub2bo,
      sub2bp,
      sub2bq,
      totalsub2b,
      sub2ca, 
      sub2cb,
      sub2cc,
      sub2cd,
      sub2ce1,
      sub2ce2,
      sub2ce3,
      sub2cf,
      totalsub2c,
      sub2da,
      sub2db,
      totalsub2d,
      documentB1,
      documentB2,
      documentB3,
      documentB4
      // documentBURL,
    };

    if (IIActaSem === "" || IIActbSem === "" || IIActcSem === "" || IIActdSem === "" || IIActa === "" || IIActb === "" || IIActc === "" || IIActd === "" || check_2b === "" || check_2c ==="" || check_2d ==="" || responsibility ==="" || totalsub2b==="" || totalsub2c==="" || totalsub2d==="" ||IIActTotal === "") {
      alert("Enter data in the form");
    } else if (IIActaSem < 0 || IIActbSem < 0 || IIActcSem < 0 || IIActdSem < 0 || IIActa < 0 || IIActb < 0 || IIActc < 0 || IIActd < 0 || totalsub2b<0 || totalsub2c<0 || totalsub2d<0 || IIActTotal < 0) {
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
      sub2ba,
      sub2bb,
      sub2bc,
      sub2bd,
      sub2be,
      sub2bf,
      sub2bg,
      sub2bh,
      sub2bi,
      sub2bj,
      sub2bk,
      sub2bl,
      sub2bm,
      sub2bn,
      sub2bo,
      sub2bp,
      sub2bq,
      totalsub2b,
      sub2ca,
      sub2cb,
      sub2cc,
      sub2cd,
      sub2ce1,
      sub2ce2,
      sub2ce3,
      sub2cf,
      totalsub2c,
      sub2da,
      sub2db,
      totalsub2d,
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
    if (IIActaSem === "" || IIActbSem === "" || IIActcSem === "" || IIActdSem === "" || IIActa === "" || IIActb === "" || IIActc === "" || IIActd === "" || check_2b === "" || check_2c ==="" || check_2d ==="" || responsibility ==="" || totalsub2b==="" || totalsub2c==="" || totalsub2d==="" ||IIActTotal === "") {
      alert("Enter data in the form");
    } else if (IIActaSem < 0 || IIActbSem < 0 || IIActcSem < 0 || IIActdSem < 0 || IIActa < 0 || IIActb < 0 || IIActc < 0 || IIActd < 0 || totalsub2b<0 || totalsub2c<0 ||  totalsub2d<0 ||IIActTotal < 0) {
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
      <div className="sticky-navigation">
    <h3>Form Navigation</h3>
    <ul>
      <li>
      <span className="form1-subsection">Part A</span>
      <Link to="/form1" className="nav-link">General Information</Link>
      </li>
      <li>
        <span className="form2-subsection">Part B</span>
        <ul className="form2-subsection-list">
          <li>
            <Link to="/form2a" className="form2-subsection-link nav-link">Category l</Link>
          </li>
          <li>
            <Link to="/form2b" className="form2-subsection-link nav-link">Category ll</Link>
          </li>
          <li>
            <Link to="/form2c" className="form2-subsection-link nav-link">Category lll</Link>
          </li>
        </ul>
      </li>
      {/* Add more form links as needed */}
    </ul>
  </div>
  </Col>
        <Col md={9}>
        <h1 className="text-center">Part B: Academic Performance Indicators</h1>
          
          <h4 style={{fontSize: 20}} className="text-center">Category II: Co-Curricular, Extension and Profession related activities</h4>

          <p className='text-center'>
        NOTE: Upload document for above activities. To change the document, upload new document again.
      </p>

          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Natural of Activity</th>
                  <th>Spilt-Up Marks Total</th>
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
                  <p className='text-center'>-</p>
                  </td>
                  <td>
              <p className='text-center'>35</p>
              </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={IIActa}
                      onChange={(e) => setIIActa(Math.min(Number(e.target.value), 35))}
                      max={35}
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
                <td colSpan={5} >
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
                <Col><Col>4. Committee member of ICAST - 2 points</Col></Col>
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
                    <tr>
                      <td><Form.Check
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
                /></td>
                    <td><Form.Control
                      type="text"                     
                      value={sub2ba}
                      onChange={(e) => setSub2ba(e.target.value)}
                    /></td>
                      
                    </tr>
                 
                     <tr>
                      <td><Form.Check
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
                /></td>
                     <td>
                      <Form.Control
                        type="text"
                        value={sub2bb}
                        onChange={(e) => setSub2bb(e.target.value)}
                      />
                     </td>
                     </tr>
                   
                   <tr>
                    <td> <Form.Check
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
                /></td>
                    <td>
                      <Form.Control
                        type="text"
                        value={sub2bc}
                        onChange={(e) => setSub2bc(e.target.value)}
                      />
                    </td>
                   </tr>
                
                <tr>
                  <td><Form.Check
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
                /> </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bd}
                      onChange={(e) => setSub2bd(e.target.value)}
                    />
                  </td>
                </tr>
                  
                  <tr>
                    <td><Form.Check
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
                /> </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={sub2be}
                        onChange={(e) => setSub2be(e.target.value)}
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td><Form.Check
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
                /></td>
                    <td>
                      <Form.Control
                        type="text"
                        value={sub2bf}
                        onChange={(e) => setSub2bf(e.target.value)}
                      />
                    </td>
                  </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bg}
                      onChange={(e) => setSub2bg(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
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
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bh}
                      onChange={(e) => setSub2bh(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bi}
                      onChange={(e) => setSub2bi(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bj}
                      onChange={(e) => setSub2bj(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bk}
                      onChange={(e) => setSub2bk(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bl}
                      onChange={(e) => setSub2bl(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bm}
                      onChange={(e) => setSub2bm(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bn}
                      onChange={(e) => setSub2bn(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bo}
                      onChange={(e) => setSub2bo(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bp}
                      onChange={(e) => setSub2bp(e.target.value)}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2bq}
                      onChange={(e) => setSub2bq(e.target.value)}
                    />
                  </td>
                </tr>
                
                    <p></p>
                    All members have to take sign of coordinators of respective
                      committee to validate description of job done. Marks
                      allotted are based on involvement in work.
                    
                  </td>
                  <td>
                  <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2b}
                    />
                  </td>
                  
                  <td>
                      <p className='text-center'>25</p>
                      </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={IIActb}
                      onChange={(e) => setIIActb(Math.min(Number(e.target.value), 25))}
                      max={25}
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

                      <tr>
                        <td><Form.Check
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
                /></td>
                        <td>
                        <Form.Control
                          type="text"
                          value={sub2da}
                          onChange={(e) => setSub2da(e.target.value)}
                        />
                        </td>
                      </tr>
                      
                  <tr>
                    <td><Form.Check
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
                /></td>
                    <td>
                    <Form.Control
                      type="text"
                      value={sub2db}
                      onChange={(e) => setSub2db(e.target.value)}
                    />
                    </td>
                  </tr>
                    
                  </td>
                  <td>
                  <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2d}
                    />
                  </td>
                  <td>
                      <p className='text-center'>20</p>
                      </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={IIActc}
                      onChange={(e) => setIIActc(Math.min(Number(e.target.value), 20))}
                      max={20}
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
                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        value={sub2ca}
                        onChange={(e) => setSub2ca(e.target.value)}
                      />
                      </td>
                    </tr>
                    
                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        value={sub2cb}
                        onChange={(e) => setSub2cb(e.target.value)}
                      />
                      </td>
                    </tr>

                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        value={sub2cc}
                        onChange={(e) => setSub2cc(e.target.value)}
                      />
                      </td>
                    </tr>
                
                <tr>
                  <td><Form.Check
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
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      value={sub2cd}
                      onChange={(e) => setSub2cd(e.target.value)}
                    />

                  </td>
                </tr>
                
                
                Participation in short-term training courses less than one-week duration:
                    <Col>
                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="number"
                        value={sub2ce1}
                        onChange={(e) => setSub2ce1(e.target.value)}
                      />
                      </td>
                    </tr>

                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="number"
                        value={sub2ce2}
                        onChange={(e) => setSub2ce2(e.target.value)}
                      />
                      </td>
                    </tr>

                    <tr>
                      <td><Form.Check
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
                /> </td>
                      <td>
                      <Form.Control
                        type="number"
                        value={sub2ce3}
                        onChange={(e) => setSub2ce3(e.target.value)}
                      />
                      </td>
                    </tr>                                  
                    </Col>

                    <tr>
                      <td><Form.Check
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
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        value={sub2cf}
                        onChange={(e) => setSub2cf(e.target.value)}
                      />
                      </td>
                    </tr>
                    
                  </td>
                  <td>
                  <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2c}
                    />
                  </td>
                  <td>
                      <p className='text-center'>20</p>
                      </td>
                  
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={IIActd}
                      onChange={(e) => setIIActd(Math.min(Number(e.target.value), 20))}
                      max={20}
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
                      style={{ textAlign: "center" }}
                      value={IIActTotal}
                      readOnly
                    />
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
