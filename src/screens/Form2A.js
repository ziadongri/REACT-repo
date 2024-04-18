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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadBytes } from "@firebase/storage";

function Form2A() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theorysub, setTheorysub] = useState("");
  const [practicalsub, setPracticalsub] = useState("");
  const [IActb, setIActb] = useState("");
  const [IActc, setIActc] = useState("");
  const [IActd, setIActd] = useState("");
  const [IActe, setIActe] = useState("");
  const [IActf, setIActf] = useState("");
  const [IOddsem, setIOddsem] = useState([]);
  const [IEvensem, setIEvensem] = useState([]);
  const [IActTotal, setIActTotal] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  // const [documentAURL, setDocumentAURL] = useState([]);
  const [documentA1, setDocumentA1] = useState("");
  const [documentA2, setDocumentA2] = useState("");
  const [documentA3, setDocumentA3] = useState("");
  const [documentA4, setDocumentA4] = useState("");
  const [documentA5, setDocumentA5] = useState("");
  const [documentA6, setDocumentA6] = useState("");
  const [documentA7, setDocumentA7] = useState("");
  const [documentA8, setDocumentA8] = useState("");
  const [check_d, setCheck_d] = useState([]);
  const [check_e, setCheck_e] = useState([]);
  const [check_f, setCheck_f] = useState([]);
  const [lecturesTaken, setLecturesTaken] = useState("");

  const navigate = useNavigate();

  const calculateMarks = () => {
    if (lecturesTaken > 90) {
      return 50; // Score for lectures taken greater than 90%
    } else if (lecturesTaken >= 80) {
      return 40; // Score for lectures taken between 80% and 90%
    } else if (lecturesTaken >= 70) {
      return 30; // Score for lectures taken between 70% and 80%
    } else {
      return 0; // No score for lectures taken less than 70%
    }
  };

  // Event handler to update lecturesTaken and calculate marks
  const handleRadioChange = (e) => {
    setLecturesTaken(Number(e.target.value));
  };

  // Calculate marks initially
  const IActa = calculateMarks();

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
              case 'documentA1':
                setDocumentA1(url);
                break;
              case 'documentA2':
                setDocumentA2(url);
                break;
              case 'documentA3':
                setDocumentA3(url);
                break;
              case 'documentA4':
                setDocumentA4(url);
                break;
              case 'documentA5':
                setDocumentA5(url);
                break;
              case 'documentA6':
                setDocumentA6(url);
                break;
              case 'documentA7':
                setDocumentA7(url);
                break;
              case 'documentA8':
                setDocumentA8(url);
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
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const Total = () => {
    setIActTotal(
      parseFloat(IActa) +
        parseFloat(IActb) +
        parseFloat(IActc) +
        parseFloat(IActd) +
        parseFloat(IActe) +
        parseFloat(IActf)
    );
  };

  useEffect(() => {
    Total();
  }, [IActa, IActb, IActc, IActd, IActe, IActf]);

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   const facultyRef = doc(db, "faculty", user.uid);
  //   const docRef = doc(facultyRef, "partB", "CategoryA");
  //   const data = {
  //     IActa,
  //     IActb,
  //     IActc,
  //     IActd,
  //     IActe,
  //     IActf,
  //     IOddsem,
  //     IEvensem,
  //     IActTotal,
  //     // documentAURL,
  //     documentA1,
  //     documentA2,
  //     documentA3,
  //     documentA4,
  //     documentA5,
  //     documentA6,
  //     check_d,
  //     check_e,
  //     check_f
  //   };

  //   if (uploadedFile) {
  //     const storageRef = ref(storage, `documents/${uploadedFile.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           console.log(url);
  //           setDocumentA1(url);
  //           setDocumentA2(url);
  //           setDocumentA3(url);
  //           setDocumentA4(url);
  //           setDocumentA5(url);
  //           setDocumentA6(url);

  //           // setDocumentAURL(url);
  //           // setDocumentAURL([...documentAURL, url]);

  //           data.documentURL = url;
  //           setDoc(docRef, data);
  //           // addDoc( collection(db, "partB"), data);
  //             // .then(() => {
  //             //   console.log("Document successfully written!");
  //             //   navigate("/form2b");
  //             // }
  //             // )
  //             // .catch((error) => {
  //             //   console.error("Error writing document: ", error);
  //             // });
  //         });
  //       }
  //     );
  //   }

  //   if (IActa === "" || IActb === "" || IActc === "" || IActd === "" || IActe === "" || IActf === "" || IActTotal === "") {
  //     alert("Please fill all the fields");
  //     return;
  //   } else if (IActa < 0 || IActb < 0 || IActc < 0 || IActd < 0 || IActe < 0 || IActf < 0 || IActTotal < 0) {
  //     alert("Please enter valid numbers");
  //     return;
  //   } 
  //   else if (check_d.length === 0 || check_e.length === 0 || check_f.length === 0) {
  //     alert("Please select atleast one option in each category");
  //     return;
  //   }
  //   else if (isNaN(IActTotal)) {
  //     alert("Please enter valid numbers");
  //     return;
  //   } else if (documentA1 === "") {
  //     alert("Please upload the document");
  //     return;
  //   } else if (documentA2 === "") {
  //     alert("Please upload the document");
  //     return;
  //   }
  //   else if (documentA3 === "") {
  //     alert("Please upload the document");
  //     return;
  //   }
  //   else if (documentA4 === "") {
  //     alert("Please upload the document");
  //     return;
  //   }
  //   else if (documentA5 === "") {
  //     alert("Please upload the document");
  //     return;
  //   }
  //   else if (documentA6 === "") {
  //     alert("Please upload the document");
  //     return;
  //   }
  //   else {
  //   await setDoc(docRef, data);
  //   }
  //   // navigate('/form2');
  // };
  
  const handleSave = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", user.uid);
    const docRef = doc(facultyRef, "partB", "CategoryA");
    const data = {
      IActa,
      IActb,
      IActc,
      IActd,
      IActe,
      IActf,
      IOddsem,
      IEvensem,
      IActTotal,
      documentA1,
      documentA2,
      documentA3,
      documentA4,
      documentA5,
      documentA6,
      documentA7,
      documentA8,
      check_d,
      check_e,
      check_f,
      lecturesTaken
    };
  
    // Add logic to handle document URLs here, if needed
  
    // Ensure the required fields are filled and valid
    if (
      IActa === "" ||
      IActb === "" ||
      IActc === "" ||
      IActd === "" ||
      IActe === "" ||
      IActf === "" ||
      IActTotal === ""
    ) {
      alert("Please fill all the fields");
      return;
    } else if (isNaN(IActTotal) || IActTotal < 0) {
      alert("Please enter a valid number for 'Total'");
      return;
    } else if (check_d.length === 0 || check_e.length === 0 || check_f.length === 0) {
      alert("Please select at least one option in each category");
      return;
    } else if (!documentA1 || !documentA2 || !documentA3 || !documentA4 || !documentA5 || !documentA6 || !documentA7 || !documentA8) {
      alert("Please upload all the required documents");
      return;
    }
  
    // Save data to Firestore
    await setDoc(docRef, data);
  };
  

  const handleSubmit = async (e) => {
    {
      e.preventDefault();
      const facultyRef = doc(db, "faculty", user.uid);
      const docRef = doc(facultyRef, "partB", "CategoryA");
      const data = {
        IActa,
        IActb,
        IActc,
        IActd,
        IActe,
        IActf,
        IOddsem,
        IEvensem,
        IActTotal,
        documentA1,
        documentA2,
        documentA3,
        documentA4,
        documentA5,
        documentA6,
        documentA7,
        documentA8,
        check_d,
        check_e,
        check_f,
        lecturesTaken
      };
    
      // Add logic to handle document URLs here, if needed
    
      // Ensure the required fields are filled and valid
      if (
        IActa === "" ||
        IActb === "" ||
        IActc === "" ||
        IActd === "" ||
        IActe === "" ||
        IActf === "" ||
        IActTotal === ""
      ) {
        alert("Please fill all the fields");
        return;
      } else if (isNaN(IActTotal) || IActTotal < 0) {
        alert("Please enter a valid number for 'Total'");
        return;
      } else if (check_d.length === 0 || check_e.length === 0 || check_f.length === 0) {
        alert("Please select at least one option in each category");
        return;
      } else if (!documentA1 || !documentA2 || !documentA3 || !documentA4 || !documentA5 || !documentA6 || !documentA7 || !documentA8) {
        alert("Please upload all the required documents");
        return;
      }
    
      // Save data to Firestore
      await setDoc(docRef, data);
    };
    navigate('/form2b');
  };
   

  const fetchData = async (uid) => {
    const facultyRef = doc(db, "faculty", uid);
    const docRef = doc(facultyRef, "partB", "CategoryA");
  
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        setIActb(data.IActb || "");
        setIActc(data.IActc || "");
        setIActd(data.IActd || "");
        setIActe(data.IActe || "");
        setIActf(data.IActf || "");
        setIOddsem(data.IOddsem || []);
        setIEvensem(data.IEvensem || []);
        setIActTotal(data.IActTotal || "0");
        // setDocumentAURL(data.documentURL || "");
        setDocumentA1(data.documentA1 || "");
        setDocumentA2(data.documentA2 || "");
        setDocumentA3(data.documentA3 || "");
        setDocumentA4(data.documentA4 || "");
        setDocumentA5(data.documentA5 || "");
        setDocumentA6(data.documentA6 || "");
        setDocumentA7(data.documentA7 || "");
        setDocumentA8(data.documentA8 || "");
        setCheck_d(data.check_d || []);
        setCheck_e(data.check_e || []);
        setCheck_f(data.check_f || []);
        setLecturesTaken(data.lecturesTaken || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (user) {
      fetchData(user.uid);
    }
  }, [user]);

  const calculateoddpercentage = (index) => {
    const newIOddsem = [...IOddsem];
    newIOddsem[index].percentage =
      ((newIOddsem[index].actualLectures / newIOddsem[index].lectures) * 100).toFixed(2);
    setIOddsem(newIOddsem);
  };

  useEffect(() => {
  IOddsem.map((oddsem, index) => {
      calculateoddpercentage(index);
    });
  }, [IOddsem]);



  // useEffect(() => {
  //   IOddsem.map((oddsem, index) => {
  //     calculateoddpercentage(index);
  //   });
  // }, [IOddsem]);

  const handleAddIOddsem = () => {
    setIOddsem((prevIOddsem) => [
      ...prevIOddsem,
      {
        course: "",
        class: "",
        lectures: "",
        actualLectures: "",
        percentage: "",
      },
    ]);
  };

  const handleRemoveIOddsem = (index) => {
    setIOddsem((prevIOddsem) => prevIOddsem.filter((oddsem, i) => i !== index));
  };

  const calculateevenpercentage = (index) => {
    const newIEvensem = [...IEvensem];
    newIEvensem[index].percentage =
      ((newIEvensem[index].actualLectures / newIEvensem[index].lectures) * 100).toFixed(2);
    setIEvensem(newIEvensem);
  };

  // useEffect(() => {
  //   calculateevenpercentage();
  // }, [IEvensem]);
  
  useEffect(() => {
    IEvensem.map((evensem, index) => {
      calculateevenpercentage(index);
    });
  }, [IEvensem]);

  const handleAddIEvensem = () => {
    setIEvensem((prevIEvensem) => [
      ...prevIEvensem,
      {
        course: "",
        class: "",
        lectures: "",
        actualLectures: "",
        percentage: "",
      },
    ]);
  };

  const handleRemoveIEvensem = (index) => {
    setIOddsem((prevIEvensem) =>
      prevIEvensem.filter((evensem, i) => i !== index)
    );
  }

  return (
    <Container fluid >
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
      <h4 className="fw-lighter">Category I: Teaching, Learning and Evaluation related activities</h4>
      <p>
        *proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty
      </p>
      <Form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught Lecture / Practical code and name </th>
              <th>Class for which conducted</th>
              <th>Target Lectures / Practicals</th>
              <th>Lectures / Practicals Actually conducted</th>
              <th>% of Classes / Labs conducted</th>
            </tr>
          </thead>

          {IOddsem.map((oddsem, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    value={oddsem.course}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].course = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    value={oddsem.class}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].class = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    value={oddsem.lectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].lectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    value={oddsem.actualLectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].actualLectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    value={oddsem.percentage}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIOddsem(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
          
        </Table>
       
        <div className="text-center mb-3">
          <Row>
            <Col>
            <Form.Group controlId="formFile" className="mb-3">
            
            {documentA7 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentA7} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentA7 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA7')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIOddsem}>
            <Link className="text-decoration-none text-white">Add Odd Semester Lectures / Practical conducted </Link>
          </Button>
          </Col>
          </Row>
          </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught Lecture / Practical code and name </th>
              <th>Class for which conducted</th>
              <th>Target Lectures / Practicals</th>
              <th>Lectures / Practicals Actually conducted</th>
              <th>% of Classes / Labs conducted</th>
            </tr>
          </thead>
          {IEvensem.map((evensem, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    value={evensem.course}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].course = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    value={evensem.class}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].class = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    value={evensem.lectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].lectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    value={evensem.actualLectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].actualLectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    value={evensem.percentage}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIEvensem(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
          
        </Table>

        <div className="text-center mb-3">
          <Row>
            <Col>
            <Form.Group controlId="formFile" className="mb-3">
            
            {documentA8 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentA8} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentA8 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA8')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIEvensem}>
            <Link className="text-decoration-none text-white">Add Even Semester Lectures / Practical conducted</Link>
          </Button>
          </Col>
          </Row>
          </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Natural of Activity</th>
              <th>MAX API Score alloted</th>
              <th>Self appraisal Score</th>
              <th>Upload Supporting Documents</th>
            </tr>
          </thead>

          {/* <Form.Group className="mb-3" controlId="theorysub"> */}
          <tbody>
            <tr>
              <td>a.</td>
              <td>
                <Col>
                  Lectures, Seminars, tutorials, practical, contact hours
                  undertaken taken as percentage of lectures allocated.
                </Col>
                <br/>
                {/* <Col>• Total lectures conducted {">"} 90% score = 50</Col>
                <Col>• 90% {">"} Lectures taken ≥ 80% = 40</Col>
                <Col>• 80% {">"} Lectures taken ≥ 70% = 30</Col>
                <Col>
                • No score if number of lectures taken is less than 70%{" "}
                </Col> */}

<Col>
        <Form.Check
          type="radio"
          name="lectures"
          label="Total lectures conducted > 90% score = 50"
          value={100}
          onChange={handleRadioChange}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          label="90% > Lectures taken ≥ 80% = 40"
          value={90}
          onChange={handleRadioChange}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          label="80% > Lectures taken ≥ 70% = 30"
          value={70}
          onChange={handleRadioChange}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          label="No score if number of lectures taken is less than 70%"
          value={0}
          onChange={handleRadioChange}
        />
      </Col>
      
              </td>
              <td>
              <p className='text-center'>50</p>
              </td>
    
              <td>
              <Col>
        <Form.Control
          type="text"
          
          value={IActa}
          readOnly
        />
      </Col>
              
            </td>
              
              <td>
              <Form.Group controlId="formFile" className="mb-3">
            
            {documentA1 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentA1} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentA1 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA1')} />
            
          </Form.Group>
              </td>
            </tr>

            <tr>
              <td>b.</td>
              <td>
                <Col> Lectures or lab in excess of UGC norms. </Col>
                <Col>(One point for each extra class) </Col>
                <br/>
                <Col>
                  {" "}
                  This refers to lecture load allotted above 16/week for Asst
                  Prof or above 14/week for Associate Prof and Professor. Repeat
                  classes for diploma students may be given 5 marks.
                </Col>
              </td>
              <td>
              <p className='text-center'>5</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActb}
                  onChange={(e) => setIActb(Math.min(Number(e.target.value), 5))}
                  max={5}
                />
              </td>
              <td>
              <Form.Group controlId="formFile" className="mb-3">
                { documentA2 && (
                  <>
                  <Form.Label>Doucment uploaded successfully</Form.Label>
                  <br />
                  <a href={documentA2} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                  </>
                )}
                {!documentA2 && (
                  <Form.Label>Upload supporting documents (pdf)</Form.Label>
                )}
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA2')} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td>c.</td>
              <td>
                <Col>
                  {" "}
                  Remedial lectures or Revision Lectures actually conducted for
                  weak students (one point for each extra class in other than
                  mentioned in 1.a).
                </Col>
              </td>
              <td>
              <p className='text-center'>5</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActc}
                  onChange={(e) => setIActc(Math.min(Number(e.target.value), 5))}
                  max={5}
                />
              </td>
              <td>
              <Form.Group controlId="formFile" className="mb-3">
                { documentA3 && (
                  <>
                  <Form.Label>Doucment uploaded successfully</Form.Label>
                  <br />
                  <a href={documentA3} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                  </>
                )}
                {!documentA3 && (
                  <Form.Label>Upload supporting documents (pdf)</Form.Label>
                )}
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA3')} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td>d.</td>
              <td>
                <Col>
                  Learning material prepared for students: Provide short
                  description of each work done in separate sheet.
                </Col>
                <Col>Evaluation Criteria:</Col>
                <Form.Check
                  type="checkbox"
                  label="1. Quality PPT made by self (5)"
                  value="Quality PPT made by self (5)"
                  checked={check_d.includes("Quality PPT made by self (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="2. Animations/virtual labs/website (10)"
                  value="Animations/virtual labs/website (10)"
                  checked={check_d.includes("Animations/virtual labs/website (10)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="3. Good quality video lectures available on public platforms (recorded online lectures not to be considered) (10)"
                  value="Good quality video lectures available on public platforms"
                  checked={check_d.includes("Good quality video lectures available on public platforms")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="4. Arranged guest lecture (2 points per lecture. The guest should be external faculty from reputed institute or industry)"
                  value="Arranged guest lecture (2 points per lecture. The guest should be external faculty from reputed institute or industry)"
                  checked={check_d.includes("Arranged guest lecture (2 points per lecture. The guest should be external faculty from reputed institute or industry)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="5. Arranged subject related Industrial Visit (2 pts)"
                  value="Arranged subject related Industrial Visit (2 pts)"
                  checked={check_d.includes("Arranged subject related Industrial Visit (2 pts)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="6. Use of ICT (max 2)"
                  value="Use of ICT (max 2)"
                  checked={check_d.includes("Use of ICT (max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                
                <Form.Check
                  type="checkbox"
                  label="7. Innovative pedagogy (max 2)"
                  value="Innovative pedagogy (max 2)"
                  checked={check_d.includes("Innovative pedagogy (max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="8. Content beyond syllabus(max 2)"
                  value="Content beyond syllabus(max 2)"
                  checked={check_d.includes("Content beyond syllabus(max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_d([...check_d, e.target.value]);
                    } else {
                      setCheck_d(check_d.filter((c) => c !== e.target.value));
                    }
                  }}
                />

              </td>
              <td>
              <p className='text-center'>40</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActd}
                  onChange={(e) => setIActd(Math.min(Number(e.target.value), 40))}
                  max={40}
                />
              </td>
              <td>
              <Form.Group controlId="formFile" className="mb-3">
                { documentA4 && (
                  <>
                  <Form.Label>Doucment uploaded successfully</Form.Label>
                  <br />
                  <a href={documentA4} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                  </>
                )}
                {!documentA4 && (
                  <Form.Label>Upload supporting documents (pdf)</Form.Label>
                )}
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA4')} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td>e.</td>
              <td>
                <Col>Updating of subject content course improvement etc</Col>
                <Form.Check
                  type="checkbox"
                  label="1. Updated lecture notes (max 3)"
                  value="Updated lecture notes (max 3)"
                  checked={check_e.includes("Updated lecture notes (max 3)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="2. Updated lab manual (max 3)"
                  value="Updated lab manual (max 3)"
                  checked={check_e.includes("Updated lab manual (max 3)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="3. Question bank (2 marks)"
                  value="Question bank (2 marks)"
                  checked={check_e.includes("Question bank (2 marks)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />  
                <Col>4. Question Paper solution</Col>
                                 
                  <Col>
                  <Form.Check
                  type="checkbox"
                  label="1. Term Test (1 each max 2)"
                  value="Term Test (1 each max 2)"
                  checked={check_e.includes("Term Test (1 each max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="2. Model University solution (5)"
                  value="Model University solution (5)"
                  checked={check_e.includes("Model University solution (5)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                  </Col>
                <Form.Check
                  type="checkbox"
                  label="5. Assignment solution (1 each max 2)"
                  value="Assignment solution (1 each max 2)"
                  checked={check_e.includes("Assignment solution (1 each max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="6. Syllabus setting (5 marks each)(max 2)"
                  value="Syllabus setting (5 marks each)(max 2)"
                  checked={check_e.includes("Syllabus setting (5 marks each)(max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                
                <Col>*quality of notes/solution to be considered</Col>
              </td>
              <td>
              <p className='text-center'>25</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActe}
                  onChange={(e) => setIActe(Math.min(Number(e.target.value), 25))}
                  max={25}
                />
              </td>
              <td>
              <Form.Group controlId="formFile" className="mb-3">
                { documentA5 && (
                  <>
                  <Form.Label>Doucment uploaded successfully</Form.Label> 
                  <br />
                  <a href={documentA5} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                  </>
                )}
                {!documentA5 && (
                  <Form.Label>Upload supporting documents (pdf)</Form.Label>
                )}
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA5')} />
              </Form.Group>
              </td>

            </tr>

            <tr>
              <td>f.</td>
              <td>
                <Col>
                  Examination duties (invigilation; Question paper setting, evaluation/ assessment of answer scripts) as per allotment.
                </Col>
                <Form.Check
                  type="checkbox"
                  label="1. Invigilation (flying squad duties/Joint CC/any exam related duties) (max 5 points)"
                  value="Invigilation (flying squad duties/Joint CC/any exam related duties) (max 5 points)"
                  checked={check_f.includes("Invigilation (flying squad duties/Joint CC/any exam related duties) (max 5 points)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_f([...check_f, e.target.value]);
                    } else {
                      setCheck_f(check_f.filter((c) => c !== e.target.value));
                    }
                  }}
                />               
                <Col>
                  100% compliance: 5, 80% compliance: 3, less than 80%: no score
                </Col>
                <Form.Check
                  type="checkbox"
                  label="2. Evaluation of answer script, preparation of result list on time as specified by Examination Section (max 10 points)"
                  value="Evaluation of answer script, preparation of result list on time as specified by Examination Section (max 10 points)"
                  checked={check_f.includes("Evaluation of answer script, preparation of result list on time as specified by Examination Section (max 10 points)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_f([...check_f, e.target.value]);
                    } else {
                      setCheck_f(check_f.filter((c) => c !== e.target.value));
                    }
                  }}
                />
                <Col>100% compliance: 5, less than 100%: no score.</Col>
                <Form.Check
                  type="checkbox"
                  label="3. Question paper setting (5 each, max score 10)"
                  value="Question paper setting (5 each, max score 10)"
                  checked={check_f.includes("Question paper setting (5 each, max score 10)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_f([...check_f, e.target.value]);
                    } else {
                      setCheck_f(check_f.filter((c) => c !== e.target.value));
                    }
                  }}
                />
              </td>
              <td>
              <p className='text-center'>25</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActf}
                  onChange={(e) => setIActf(Math.min(Number(e.target.value), 25))}
                  max={25}
                />
              </td>
              <td>
              <Form.Group controlId="formFile" className="mb-3">
                { documentA6 && (
                  <>
                  <Form.Label>Doucment uploaded successfully</Form.Label>
                  <br />
                  <a href={documentA6} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                  </>
                )}
                {!documentA6 && (
                  <Form.Label>Upload supporting documents (pdf)</Form.Label>
                )}
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA6')} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>Total of Category I</td>
              <td>
              <p className='text-center'>150</p>
              </td>
              <td>
                <Form.Control type="text" placeholder="" value={IActTotal} />
              </td>
            </tr>
          </tbody>

          {/* <Row>
            <Col>
              <Button variant="primary" type="submit">
                <Link to="/" className="btn btn-primary ms-2">
                  Previous
                </Link>
              </Button>
            </Col>
            <Col>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                <Link to="/form2b" className="btn btn-primary ms-2">
                  Next
                </Link>
              </Button>
            </Col>
          </Row> */}
          {/* <Link to="/form2" className="btn btn-primary ms-2">Next</Link> */}
        </Table>
      </Form>
      {/* <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            
            {documentAURL && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentAURL} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentAURL && (
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
            <Button variant="primary" type="submit">
              <Link to="/form1" className="text-decoration-none text-white">
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
  );
}

export default Form2A;
