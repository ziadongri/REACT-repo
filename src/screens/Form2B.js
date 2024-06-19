import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc , onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import Footer from './Footer';

function Form2B() {
  const [isEditable, setIsEditable] = useState(true); // default to editable

  const [user, setUser] = useState(null);

  const [check_2b, setCheck_2b] = useState(''); 
  const [check_2c, setCheck_2c] = useState('');
  const [check_2d, setCheck_2d] = useState('');
  const [sub2a1, setSub2a1] = useState('');
  const [sub2a2, setSub2a2] = useState('');
  const [sub2a3, setSub2a3] = useState('');
  const [sub2a4, setSub2a4] = useState('');
  const [sub2a5, setSub2a5] = useState('');
  const [sub2a6, setSub2a6] = useState('');
  const [sub2a7, setSub2a7] = useState('');
  const [sub2a8, setSub2a8] = useState('');
  const [sub2a9, setSub2a9] = useState('');
  const [sub2a10, setSub2a10] = useState('');
  const [sub2a11, setSub2a11] = useState('');
  const [sub2a12, setSub2a12] = useState('');
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
  const [documentB1, setDocumentB1] = useState("");
  const [documentB2, setDocumentB2] = useState("");
  const [documentB3, setDocumentB3] = useState("");
  const [documentB4, setDocumentB4] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [responsibility, setResponsibility] = useState('');
  const [totalsub2a, setTotalSub2a] = useState('');
  const [totalsub2b, setTotalSub2b] = useState('');
  const [totalsub2c, setTotalSub2c] = useState('');
  const [totalsub2d, setTotalSub2d] = useState('');
  const [IIActa, setIIActa] = useState(Math.min(totalsub2a,35));
const [IIActb, setIIActb] = useState(Math.min(totalsub2b,25));
 const [IIActd, setIIActd] = useState(Math.min(totalsub2d,20));
const [IIActc, setIIActc] = useState(Math.min(totalsub2c,20));
  const [IIActTotal, setIIActTotal] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    setIIActa(Math.min(totalsub2a,35));
  }, [totalsub2a]);

useEffect(() => {
  setIIActb(Math.min(totalsub2b,25));
}, [totalsub2b]);

useEffect(() => {
  setIIActc(Math.min(totalsub2d,20));
}, [totalsub2d]);

useEffect(() => {
  setIIActd(Math.min(totalsub2c,20));
}, [totalsub2c]);

  // Fetch HOD's isEditable state
  const fetchHODState = async () => {
    const hodDepartment = "Electronics & Telecommunication Engineering"; // Replace with actual department
    const q = query(
      collection(db, 'hod'),
      where('department', '==', hodDepartment)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const hodData = querySnapshot.docs[0].data();
      setIsEditable(hodData.isEditable);
    }
  };

  useEffect(() => {
    fetchHODState();
  }, []);

  const handleUpload = (e, documentIdentifier) => {
    const file = e.target.files[0];

  
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

            switch (documentIdentifier) {
              case 'documentB1':
                setDocumentB1(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentB2':
                setDocumentB2(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentB3':
                setDocumentB3(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentB4':
                setDocumentB4(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;

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
        navigate('/');
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
        
        setIIActa(data.IIActa || '');
        setIIActb(data.IIActb || '');
        setIIActc(data.IIActc || '');
        setIIActd(data.IIActd || '');
        setCheck_2b(data.check_2b || '');
        setCheck_2c(data.check_2c || '');
        setCheck_2d(data.check_2d || '');
        setSub2a1(data.sub2a1 || '');
        setSub2a2(data.sub2a2 || '');
        setSub2a3(data.sub2a3 || '');
        setSub2a4(data.sub2a4 || '');
        setSub2a5(data.sub2a5 || '');
        setSub2a6(data.sub2a6 || '');
        setSub2a7(data.sub2a7 || '');
        setSub2a8(data.sub2a8 || '');
        setSub2a9(data.sub2a9 || '');
        setSub2a10(data.sub2a10 || '');
        setSub2a11(data.sub2a11 || '');
        setSub2a12(data.sub2a12 || '');
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
        setTotalSub2a(data.totalsub2a || '');
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
  } , [sub2da, sub2db]);

  const Total5 = () => {
    const valuesToSum = [ sub2a1, sub2a2, sub2a3, sub2a4, sub2a5, sub2a6, sub2a7, sub2a8, sub2a9, sub2a10, sub2a11, sub2a12].filter(value => !isNaN(parseFloat(value)));

    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    setTotalSub2a(sum);
  };

  useEffect(() => {
    Total5();
  }, [sub2a1, sub2a2, sub2a3, sub2a4, sub2a5, sub2a6, sub2a7, sub2a8, sub2a9, sub2a10, sub2a11, sub2a12]);

  const handleSave = async (e) => {
    e.preventDefault();

    // Calculate IIActTotal based on IIActa, IIActb, IIActc, and IIActd
    const IIActTotal = IIActa + IIActb + IIActc + IIActd;

    const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
    const data = {
      IIActa,
      IIActb,
      IIActc,
      IIActd,
      IIActTotal,
      responsibility,
      check_2b,
      check_2c,
      check_2d,
      sub2a1,
      sub2a2,
      sub2a3,
      sub2a4,
      sub2a5,
      sub2a6,
      sub2a7,
      sub2a8,
      sub2a9,
      sub2a10,
      sub2a11,
      sub2a12,
      totalsub2a,
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

    // Check if any required field is empty or invalid
    if (
      IIActa === "" ||
      IIActb === "" ||
      IIActc === "" ||
      IIActd === "" ||
      responsibility === "" ||
      totalsub2a === "" ||
      totalsub2b === "" ||
      totalsub2c === "" ||
      totalsub2d === "" ||
      IIActTotal === "" ||
      isNaN(IIActTotal) ||
      IIActTotal < 0 ||
      check_2b.length === 0 ||
      check_2c.length === 0 ||
      check_2d.length === 0 ||
      IIActa < 0 ||
      IIActb < 0 ||
      IIActc < 0 ||
      IIActd < 0 ||
      totalsub2a < 0 ||
      totalsub2b < 0 ||
      totalsub2c < 0 ||
      totalsub2d < 0
    ) {
      alert("Please fill out all fields correctly");
      return;
    }

    // Check if all required documents are uploaded
    if (!documentB1 || !documentB2 || !documentB3 || !documentB4) {
      alert("Please upload all the required documents");
      return;
    }

    // Check if check_2d is selected before navigating
    if (check_2d.length === 0) {
      alert("Please select an option for check_2d");
      return;
    }

    if (check_2b.length === 0) {
      alert("Please select an option for check_2b");
      return;
    }

    if (check_2c.length === 0) {
      alert("Please select an option for check_2c");
      return;
    }

    // All checks passed, save the form data and navigate to the next page
    await setDoc(docRef, data);
    alert("Form saved");
    // navigate('/form2c');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate IIActTotal based on IIActa, IIActb, IIActc, and IIActd
    const IIActTotal = IIActa + IIActb + IIActc + IIActd;

    const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryB");
    const data = {
      IIActa,
      IIActb,
      IIActc,
      IIActd,
      IIActTotal,
      responsibility,
      check_2b,
      check_2c,
      check_2d,
      sub2a1,
      sub2a2,
      sub2a3,
      sub2a4,
      sub2a5,
      sub2a6,
      sub2a7,
      sub2a8,
      sub2a9,
      sub2a10,
      sub2a11,
      sub2a12,
      totalsub2a,
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

    // Check if any required field is empty or invalid
    if (
      IIActa === "" ||
      IIActb === "" ||
      IIActc === "" ||
      IIActd === "" ||
      responsibility === "" ||
      totalsub2a === "" ||
      totalsub2b === "" ||
      totalsub2c === "" ||
      totalsub2d === "" ||
      IIActTotal === "" ||
      isNaN(IIActTotal) ||
      IIActTotal < 0 ||
      check_2b.length === 0 ||
      check_2c.length === 0 ||
      check_2d.length === 0 ||
      IIActa < 0 ||
      IIActb < 0 ||
      IIActc < 0 ||
      IIActd < 0 ||
      totalsub2a < 0 ||
      totalsub2b < 0 ||
      totalsub2c < 0 ||
      totalsub2d < 0
    ) {
      alert("Please fill out all fields correctly");
      return;
    }

    // Check if all required documents are uploaded
    if (!documentB1 || !documentB2 || !documentB3 || !documentB4) {
      alert("Please upload all the required documents");
      return;
    }

    // Check if check_2d is selected before navigating
    if (check_2d.length === 0) {
      alert("Please select an option for check_2d");
      return;
    }

    if (check_2b.length === 0) {
      alert("Please select an option for check_2b");
      return;
    }

    if (check_2c.length === 0) {
      alert("Please select an option for check_2c");
      return;
    }

    // All checks passed, save the form data and navigate to the next page
    await setDoc(docRef, data);
    alert("Form saved");
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
                <tr className="text-center">
                <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
                <th style={{ verticalAlign: 'middle'}}>Natural of Activity</th>
                <th style={{ verticalAlign: 'middle'}}>Spilt-Up Marks Total</th>
                <th style={{ verticalAlign: 'middle'}}>MAX API Score alloted</th>
                <th style={{ verticalAlign: 'middle'}}>Self apprasial Score</th>
                <th style={{ verticalAlign: 'middle'}}>Upload Supporting Documents</th>
                </tr>
              </thead>
              
              <tbody>
                <tr>
                  <td className="text-center">a.</td>
                  <td>
                    
                    Contribution to Corporate life and management of Institution - 
                    <p>List yearly or semester-wise responsibilities</p>
                    
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Text className="text-muted">
            (Minimum characters: 50, Maximum characters: 500)
          </Form.Text>
          <Form.Control
            as="textarea"
            rows={3}
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
            disabled={!isEditable}
            minLength={50}
            maxLength={500}
          />
        </Form.Group>                                        
                  </td>
              
                  <td>
                  <p className='text-center'><Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2a}
                      readOnly
                    /></p>
                  </td>
                  <td>
              <p className='text-center'>35</p>
              </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={IIActa}
                      readOnly
                      // onChange={(e) => setIIActa(Math.min(Number(e.target.value), 35))}
                      disabled={!isEditable}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB1')} disabled={!isEditable} />
            
          </Form.Group>
                  </td>
                </tr>

                <tr>
                  <td></td>
                <td colSpan={5} >
                  <Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
                
                <div>
                  <p>a) Mention the contributions of the following:</p>
                  <table>
                    <tbody>
                      <tr>
                        <td> • Contribution to corporate life in colleges and universities through meetings/popular lectures/subject-related events/articles in college magazines and university volumes - 3 pts each </td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a1 >= 0 ? sub2a1 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a1(Math.max(0, Math.min(10, value)));
                              } else {
                                setSub2a1(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> • Institutional governance responsibilities like Vice-Principal, Deans, HOD, Director, IQAC Coordinator/T&P officer, Exam cell in charge, Admission cell in charge maximum of 25 points (or any other equivalent responsibility)</td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a2 >= 0 ? sub2a2 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a2(Math.max(0, Math.min(25, value)));
                              } else {
                                setSub2a2(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                  <p>b) Organized conference/workshop/seminar/FDP/STTP etc. (Max two events to be considered):</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>1. Conference - 15 points</td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a3 >= 0 ? sub2a3 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a3(Math.max(0, Math.min(15, value)));
                              } else {
                                setSub2a3(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>

                      <br/>
                      <tr>
                        <td>2. Workshop FDP/STTP/certification programs:</td>
                      </tr>
                      <tr>
                        <td><Col><Col>1. One week or more - 10 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a4 >= 0 ? sub2a4 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a4(Math.max(0, Math.min(10, value)));
                              } else {
                                setSub2a4(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><Col><Col>2. Less than a week but greater than two days - 5 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a5 >= 0 ? sub2a5 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a5(Math.max(0, Math.min(5, value)));
                              } else {
                                setSub2a5(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><Col><Col>3. One to two days - 3 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a6 >= 0 ? sub2a6 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a6(Math.max(0, Math.min(3, value)));
                              } else {
                                setSub2a6(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><Col><Col>4. Committee member of ICAST - 2 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a7 >= 0 ? sub2a7 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a7(Math.max(0, Math.min(2, value)));
                              } else {
                                setSub2a7(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><Col><Col>5. Seminars - 1 point</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a8 >= 0 ? sub2a8 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a8(Math.max(0, Math.min(1, value)));
                              } else {
                                setSub2a8(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>

                      <br/>
                      <tr>
                        <td>3. Delivering Lecture/conducting workshop (not paper presentation):</td>
                      </tr>
                      
                      <tr>
                        <td><Col><Col>1. At college level for faculty - 3 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a9 >= 0 ? sub2a9 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a9(Math.max(0, Math.min(3, value)));
                              } else {
                                setSub2a9(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td><Col><Col>2. During STTP - 10 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a10 >= 0 ? sub2a10 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a10(Math.max(0, Math.min(10, value)));
                              } else {
                                setSub2a10(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><Col><Col>3. International - 15 points</Col></Col></td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a11 >= 0 ? sub2a11 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a11(Math.max(0, Math.min(15, value)));
                              } else {
                                setSub2a11(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>

                      <br/>
                      <tr>
                        <td> • Establishing labs with the help of industry/industry/another organization. Max 5 per individual if a group is involved - 10 if only 1 person is involved</td>
                        <td>
                          <Form.Control
                            type="text"
                            style={{ textAlign: "center" }}
                            value={sub2a12 >= 0 ? sub2a12 : 0}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setSub2a12(Math.max(0, Math.min(10, value)));
                              } else {
                                setSub2a12(0);
                              }
                            }}
                            disabled={!isEditable}
                          />
                        </td>
                      </tr>
                      <br/>
                    </tbody>
                  </table>
                </div>

                </td></tr>               

                <tr >
                  <td className="text-center">b.</td>
                  <td>
                    Extension, Co-curricular and field based activities:
                    <p> *Tick the applicable activities and enter the score.</p> 
                                        
                    <tr >
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
                  }} disabled={!isEditable}
                /></td>

                    <td>
                    <Form.Control
                      type="text"    
                      style={{ textAlign: "center" }}                 
                      value={sub2ba >= 0 ? sub2ba : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2ba(Math.max(0, Math.min(10, value)));
                        } else {
                          setSub2ba(0);
                        }
                      }} disabled={!isEditable}
                    />
                    </td>  
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
                  }} disabled={!isEditable}
                /></td>
                     <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bb >= 0 ? sub2bb : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bb(Math.max(0, Math.min(15, value)));
                        } else {
                          setSub2bb(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                    <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2bc >= 0 ? sub2bc : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2bc(Math.max(0, Math.min(10, value)));
                          } else {
                            setSub2bc(0);
                          }
                        }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /> </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bd >= 0 ? sub2bd : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bd(Math.max(0, Math.min(10, value)));
                        } else {
                          setSub2bd(0);
                        }
                      }}  disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /> </td>
                    <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2be >= 0 ? sub2be : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2be(Math.max(0, Math.min(10, value)));
                          } else {
                            setSub2be(0);
                          }
                        }}  disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                    <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2bf >= 0 ? sub2bf : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2bf(Math.max(0, Math.min(10, value)));
                          } else {
                            setSub2bf(0);
                          }
                        }}  disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bg >= 0 ? sub2bg : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bg(Math.max(0, Math.min(15, value)));
                        } else {
                          setSub2bg(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bh >= 0 ? sub2bh : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bh(Math.max(0, Math.min(5, value)));
                        } else {
                          setSub2bh(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bi >= 0 ? sub2bi : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bi(Math.max(0, Math.min(15, value)));
                        } else {
                          setSub2bi(0);
                        }
                      }} disabled={!isEditable}
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
                  }}  disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bj >= 0 ? sub2bj : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bj(Math.max(0, Math.min(10, value)));
                        } else {
                          setSub2bj(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bk >= 0 ? sub2bk : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bk(Math.max(0, Math.min(10, value)));
                        } else {
                          setSub2bk(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bl >= 0 ? sub2bl : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bl(Math.max(0, Math.min(5, value)));
                        } else {
                          setSub2bl(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bm >= 0 ? sub2bm : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bm(Math.max(0, Math.min(20, value)));
                        } else {
                          setSub2bm(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bn >= 0 ? sub2bn : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bn(Math.max(0, Math.min(3, value)));
                        } else {
                          setSub2bn(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bo >= 0 ? sub2bo : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bo(Math.max(0, Math.min(5, value)));
                        } else {
                          setSub2bo(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bp >= 0 ? sub2bp : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bp(Math.max(0, Math.min(5, value)));
                        } else {
                          setSub2bp(0);
                        }
                      }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2bq >= 0 ? sub2bq : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2bq(Math.max(0, Math.min(5, value)));
                        } else {
                          setSub2bq(0);
                        }
                      }} disabled={!isEditable}
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
                      readOnly
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
                      // onChange={(e) => setIIActb(Math.min(Number(e.target.value), 25))}
                      readOnly
                      disabled={!isEditable}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB2')} disabled={!isEditable} />
            
          </Form.Group>
                  </td>
                </tr>

                <tr>
                  <td className="text-center">c.</td>
                  <td>
                    
                      Students and Staff Related Socio Cultural and Sports Programs (intra/interdepartmental and intercollegiate):

                      <p>
                      *Tick the applicable activities and enter the score.
                    </p>

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
                  }} disabled={!isEditable}
                /></td>
                        <td>
                        <Form.Control
                          type="text"
                          style={{ textAlign: "center" }}
                          value={sub2da >= 0 ? sub2da : 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              setSub2da(Math.max(0, Math.min(10, value)));
                            } else {
                              setSub2da(0);
                            }
                          }} disabled={!isEditable}
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
                }} disabled={!isEditable}             
                /></td>
                    <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2db >= 0 ? sub2db : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2db(Math.max(0, Math.min(10, value)));
                        } else {
                          setSub2db(0);
                        }
                      }} disabled={!isEditable}
                    />
                    </td>
                  </tr>
                    
                  </td>

                  <td>
                  <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2d}
                      readOnly
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
                      // onChange={(e) => setIIActc(Math.min(Number(e.target.value), 20))}
                      readOnly
                      disabled={!isEditable}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB3')}  disabled={!isEditable}/>
            
          </Form.Group>
                  </td>
                </tr>

                <tr>
                  <td className="text-center">d.</td>
                  <td>
                    
                    Professional Development Activities:
                    <p> 
                      *Tick the applicable activities and enter the score.
                    </p>
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
                  }} disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2ca >= 0 ? sub2ca : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2ca(Math.max(0, Math.min(5, value)));
                          } else {
                            setSub2ca(0);
                          }
                        }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2cb >= 0 ? sub2cb : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2cb(Math.max(0, Math.min(5, value)));
                          } else {
                            setSub2cb(0);
                          }
                        }} disabled={!isEditable}
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
                  }}  disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2cc >= 0 ? sub2cc : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2cc(Math.max(0, Math.min(3, value)));
                          } else {
                            setSub2cc(0);
                          }
                        }} disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={sub2cd >= 0 ? sub2cd : 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setSub2cd(Math.max(0, Math.min(3, value)));
                        } else {
                          setSub2cd(0);
                        }
                      }} disabled={!isEditable}
                    />

                  </td>
                </tr>
    
                Participation in short-term training courses less than one-week duration:
                <p> 
                      *Tick the applicable activities and enter the score.
                    </p>

                    <>
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
                  }} disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2ce1 >= 0 ? sub2ce1 : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2ce1(Math.max(0,Math.min(30, value)));
                          } else {
                            setSub2ce1(0);
                          }
                        }} disabled={!isEditable}      
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
                  }} disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2ce2 >= 0 ? sub2ce2 : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2ce2(Math.max(0, Math.min(20, value)));
                          } else {
                            setSub2ce2(0);
                          }
                        }
                        } disabled={!isEditable}
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
                  }} disabled={!isEditable}
                /> </td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2ce3 >= 0 ? sub2ce3 : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2ce3(Math.max(0, Math.min(10, value)));
                          } else {
                            setSub2ce3(0);
                          }
                        }
                        } disabled={!isEditable}
                      />
                      </td>
                    </tr>                                  
                    </>

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
                  }} disabled={!isEditable}
                /></td>
                      <td>
                      <Form.Control
                        type="text"
                        style={{ textAlign: "center" }}
                        value={sub2cf >= 0 ? sub2cf : 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setSub2cf(Math.max(0, Math.min(5, value)));
                          } else {
                            setSub2cf(0);
                          }
                        }
                        } disabled={!isEditable}
                      />
                      </td>
                    </tr>
                    
                  </td>
                  <td>
                  <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub2c}
                      readOnly
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
                      // onChange={(e) => setIIActd(Math.min(Number(e.target.value), 20))}
                      readOnly
                      disabled={!isEditable}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentB4')} disabled={!isEditable} />
            
          </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  
                  
                  <td style={{ textAlign: "center" }}>Total of Category II</td>
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

{/* <Footer/> */}
      </Row>
    </Container>
  );
}

export default Form2B;
