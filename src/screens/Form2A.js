import React, { useEffect, useState } from "react";
import { Container,Row, Col,Form,Button, Alert, Table} from "react-bootstrap";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc , onSnapshot, collection, query, where, getDocs} from "firebase/firestore";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadBytes } from "@firebase/storage";
import Footer from './Footer';

function Form2A() {
  const [isEditable, setIsEditable] = useState(true); // default to editable

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theorysub, setTheorysub] = useState("");
  const [practicalsub, setPracticalsub] = useState("");
  
  const [IOddsem, setIOddsem] = useState([]);
  const [IEvensem, setIEvensem] = useState([]);
  const [IActTotal, setIActTotal] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [documentA1, setDocumentA1] = useState("");
  const [documentA2, setDocumentA2] = useState("");
  const [documentA3, setDocumentA3] = useState("");
  const [documentA4, setDocumentA4] = useState("");
  const [documentA5, setDocumentA5] = useState("");
  const [documentA6, setDocumentA6] = useState("");
  const [documentA7, setDocumentA7] = useState("");
  const [documentA8, setDocumentA8] = useState("");
  const [check_d, setCheck_d] = useState('');
  const [check_e, setCheck_e] = useState('');
  const [check_f, setCheck_f] = useState('');
  const [sub1_d1, setSub1_d1] = useState("");
  const [sub1_d2, setSub1_d2] = useState("");
  const [sub1_d3, setSub1_d3] = useState("");
  const [sub1_d4, setSub1_d4] = useState("");
  const [sub1_d5, setSub1_d5] = useState("");
  const [sub1_d6, setSub1_d6] = useState("");
  const [sub1_d7, setSub1_d7] = useState("");
  const [sub1_d8, setSub1_d8] = useState("");
  const [sub1_e1, setSub1_e1] = useState("");
  const [sub1_e2, setSub1_e2] = useState("");
  const [sub1_e3, setSub1_e3] = useState("");
  const [sub1_e41, setSub1_e41] = useState("");
  const [sub1_e42, setSub1_e42] = useState("");
  const [sub1_e5, setSub1_e5] = useState("");
  const [sub1_e6, setSub1_e6] = useState("");
  const [sub1_f1, setSub1_f1] = useState("");
  const [sub1_f2, setSub1_f2] = useState("");
  const [sub1_f3, setSub1_f3] = useState("");
  const [totalsub1d, setTotalsub1d] = useState("");
  const [IActd, setIActd] = useState(Math.min(totalsub1d, 40));
  const [totalsub1e, setTotalsub1e] = useState("");
  const [IActe, setIActe] = useState(Math.min(totalsub1e, 25));
  const [totalsub1f, setTotalsub1f] = useState("");
  const [IActf, setIActf] = useState(Math.min(totalsub1f, 25));
  const [lecturesTaken, setLecturesTaken] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [extraClass, setExtraClass] = useState("");
  const [selectedRadio2, setSelectedRadio2] = useState(null);
  const [remedial, setRemedial] = useState("");
  const [selectedRadio3, setSelectedRadio3] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIActd(Math.min(totalsub1d, 40));
  }, [totalsub1d]);

  useEffect(() => {
    setIActe(Math.min(totalsub1e, 25));
  }, [totalsub1e]);

  useEffect(() => {
    setIActf(Math.min(totalsub1f, 25));
  }, [totalsub1f]);

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

  const calculateMarks2 = () => {
    if (extraClass === 0) {
      return 0; 
    } else if (extraClass === 1) {
      return 1;
    } else if (extraClass === 2) {
      return 2;
    } else if (extraClass === 3) {
      return 3;
    } else if (extraClass === 4) {
      return 4;
    } else if (extraClass === 5) {
      return 5;
    } else if (extraClass >= 5) {
      return 5;
    } };

    const handleRadioChange2 = (e) => {
      const value = Number(e.target.value);
      setExtraClass(value);
      setSelectedRadio2(value);
    };
  
    const IActb = calculateMarks2();

    const calculateMarks3 = () => {
      if (remedial === 0) {
        return 0; 
      } else if (remedial === 1) {
        return 1;
      } else if (remedial === 2) {
        return 2;
      } else if (remedial === 3) {
        return 3;
      } else if (remedial === 4) {
        return 4;
      } else if (remedial === 5) {
        return 5;
      } else if (remedial >= 5) {
        return 5;
      } };

      const handleRadioChange3 = (e) => {
        const value = Number(e.target.value);
        setRemedial(value);
        setSelectedRadio3(value);
      }

      const IActc = calculateMarks3();

  const handleUpload = (e, documentIdentifier) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds the 10MB limit. Please upload a smaller file.");
        return;
      }

      const storageRef = ref(storage, `documents/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // You can update a progress state here if needed
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            switch (documentIdentifier) {

              case 'documentA1':
                setDocumentA1(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA2':
                setDocumentA2(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA3':
                setDocumentA3(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA4':
                setDocumentA4(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA5':
                setDocumentA5(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA6':
                setDocumentA6(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA7':
                setDocumentA7(url);
                alert("Document uploaded successfully!"); // Prompt for successful upload
                break;
              case 'documentA8':
                setDocumentA8(url);
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
      } else {
        navigate("/");
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

  const Total2 =() => {
    const valuesToSum = [sub1_d1, sub1_d2, sub1_d3, sub1_d4, sub1_d5, sub1_d6, sub1_d7, sub1_d8].filter((value) => !isNaN(parseFloat(value)));

    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    setTotalsub1d(sum);
  };

  useEffect(() => {
    Total2();
  }, [sub1_d1, sub1_d2, sub1_d3, sub1_d4, sub1_d5, sub1_d6, sub1_d7, sub1_d8]);

  const Total3 =() => {
    const valuesToSum = [sub1_e1, sub1_e2, sub1_e3, sub1_e41, sub1_e42, sub1_e5, sub1_e6].filter((value) => !isNaN(parseFloat(value)));

    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    setTotalsub1e(sum);
  };

  useEffect(() => {
    Total3();
  }, [sub1_e1, sub1_e2, sub1_e3, sub1_e41, sub1_e42, sub1_e5, sub1_e6]);

  const Total4 =() => {
    const valuesToSum = [sub1_f1, sub1_f2, sub1_f3].filter((value) => !isNaN(parseFloat(value)));

    const sum = valuesToSum.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue);
    }, 0);

    setTotalsub1f(sum);
  };

  useEffect(() => {
    Total4();
  }, [sub1_f1, sub1_f2, sub1_f3]);

  const handleSave = async (e) => {
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
        lecturesTaken,
        extraClass,
        remedial,
        sub1_d1,
        sub1_d2,
        sub1_d3,
        sub1_d4,
        sub1_d5,
        sub1_d6,
        sub1_d7,
        sub1_d8,
        sub1_e1,
        sub1_e2,
        sub1_e3,
        sub1_e41,
        sub1_e42,
        sub1_e5,
        sub1_e6,
        sub1_f1,
        sub1_f2,
        sub1_f3,
        totalsub1d,
        totalsub1e,
        totalsub1f
      };

      if (
        IActa === "" ||
        IActb === "" ||
        IActc === "" ||
        IActd === "" ||
        IActe === "" ||
        IActf === "" ||
        IActTotal === "" ||
        totalsub1d === "" || totalsub1e === "" || totalsub1f === "" || totalsub1d < 0 || totalsub1e < 0 || totalsub1f < 0
      ) {
        alert("Please fill all the fields");
        return;
      } 
      else if (isNaN(IActTotal) || IActTotal < 0) {
        alert("Please enter a valid number for 'Total'");
        return;
      } 
      else if (check_d.length === 0 || check_e.length === 0 || check_f.length === 0) {
        alert("Please select at least one option in each category");
        return;
      } 
      else if (!documentA1 || !documentA2 || !documentA3 || !documentA4 || !documentA5 || !documentA6 || !documentA7 || !documentA8) {
        alert("Please upload all the required documents");
        return;
      }
    
    
      // Save data to Firestore
      await setDoc(docRef, data);
      alert("Data saved");
       console.log("Document saved");
    };
    // navigate('/form2b');
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
        lecturesTaken,
        extraClass,
        remedial,
        sub1_d1,
        sub1_d2,
        sub1_d3,
        sub1_d4,
        sub1_d5,
        sub1_d6,
        sub1_d7,
        sub1_d8,
        sub1_e1,
        sub1_e2,
        sub1_e3,
        sub1_e41,
        sub1_e42,
        sub1_e5,
        sub1_e6,
        sub1_f1,
        sub1_f2,
        sub1_f3,
        totalsub1d,
        totalsub1e,
        totalsub1f
      };

      if (
        IActa === "" ||
        IActb === "" ||
        IActc === "" ||
        IActd === "" ||
        IActe === "" ||
        IActf === "" ||
        IActTotal === "" ||
        totalsub1d === "" || totalsub1e === "" || totalsub1f === "" || totalsub1d < 0 || totalsub1e < 0 || totalsub1f < 0
      ) {
        alert("Please fill all the fields");
        return;
      } 
      else if (isNaN(IActTotal) || IActTotal < 0) {
        alert("Please enter a valid number for 'Total'");
        return;
      } 
      else if (check_d.length === 0 || check_e.length === 0 || check_f.length === 0) {
        alert("Please select at least one option in each category");
        return;
      } 
      else if (!documentA1 || !documentA2 || !documentA3 || !documentA4 || !documentA5 || !documentA6 || !documentA7 || !documentA8) {
        alert("Please upload all the required documents");
        return;
      }
    
    
      // Save data to Firestore
      await setDoc(docRef, data);
      alert("Data saved");
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
        setExtraClass(data.extraClass || 0);
        setRemedial(data.remedial || 0);
        setSub1_d1(data.sub1_d1 || "");
        setSub1_d2(data.sub1_d2 || "");
        setSub1_d3(data.sub1_d3 || "");
        setSub1_d4(data.sub1_d4 || "");
        setSub1_d5(data.sub1_d5 || "");
        setSub1_d6(data.sub1_d6 || "");
        setSub1_d7(data.sub1_d7 || "");
        setSub1_d8(data.sub1_d8 || "");
        setSub1_e1(data.sub1_e1 || "");
        setSub1_e2(data.sub1_e2 || "");
        setSub1_e3(data.sub1_e3 || "");
        setSub1_e41(data.sub1_e41 || "");
        setSub1_e42(data.sub1_e42 || "");
        setSub1_e5(data.sub1_e5 || "");
        setSub1_e6(data.sub1_e6 || "");
        setSub1_f1(data.sub1_f1 || "");
        setSub1_f2(data.sub1_f2 || "");
        setSub1_f3(data.sub1_f3 || "");
        setTotalsub1d(data.totalsub1d || "");
        setTotalsub1e(data.totalsub1e || "");
        setTotalsub1f(data.totalsub1f || "");

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

  //old code
  // const calculateoddpercentage = (index) => {
  //   const newIOddsem = [...IOddsem];
  //   newIOddsem[index].percentage =
  //     ((newIOddsem[index].actualLectures / newIOddsem[index].lectures) * 100).toFixed(2);
  //   setIOddsem(newIOddsem);
  // };

  const calculateoddpercentage = (index) => {
    const newIOddsem = [...IOddsem];
    let calculatedPercentage = (newIOddsem[index].actualLectures / newIOddsem[index].lectures) * 100;
    newIOddsem[index].percentage = Math.min(calculatedPercentage, 100).toFixed(2);
    setIOddsem(newIOddsem);
};

  useEffect(() => {
  IOddsem.map((oddsem, index) => {
      calculateoddpercentage(index);
    });
  }, [IOddsem]);


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

  //old code
  // const calculateevenpercentage = (index) => {
  //   const newIEvensem = [...IEvensem];
  //   newIEvensem[index].percentage =
  //     ((newIEvensem[index].actualLectures / newIEvensem[index].lectures) * 100).toFixed(2);
  //   setIEvensem(newIEvensem);
  // };
  
  const calculateevenpercentage = (index) => {
    const newIEvensem = [...IEvensem];
    let calculatedPercentage = (newIEvensem[index].actualLectures / newIEvensem[index].lectures) * 100;
    newIEvensem[index].percentage = Math.min(calculatedPercentage, 100).toFixed(2);
    setIEvensem(newIEvensem);
};

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
      <h4 style={{fontSize: 20}} className="text-center">Category I: Teaching, Learning and Evaluation related activities</h4>

      <p className='text-center' >
       NOTE: 1. Proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty.
        <br />
        2. Upload document for below activities. To change the document, upload new document again.
      </p>

      <Form onSubmit={handleSubmit}>

      <div className="content-box">
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
            <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
            <th style={{ verticalAlign: 'middle'}}>Courses Taught Lecture / Practical code and name </th>
            <th style={{ verticalAlign: 'middle'}}>Class for which conducted</th>
            <th style={{ verticalAlign: 'middle'}}>Target Lectures / Practicals</th>
            <th style={{ verticalAlign: 'middle'}}>Lectures / Practicals Actually conducted</th>
            <th style={{ verticalAlign: 'middle'}}>% of Classes / Labs conducted</th>
            </tr>
          </thead>

          {IOddsem.map((oddsem, index) => (
            <tbody key={index} >
              <tr >
                <td className='text-center'>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    
                    value={oddsem.course}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].course = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    style={{ textAlign: "center" }}
                    value={oddsem.class}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].class = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                {/* <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    style={{ textAlign: "center" }}
                    value={oddsem.lectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].lectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    style={{ textAlign: "center" }}
                    value={oddsem.actualLectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].actualLectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                    readOnly={!isEditable}
                  />
                </td> */}

                <td>
  <Form.Control
    type="text"
    placeholder="Enter lectures"
    style={{ textAlign: "center" }}
    value={oddsem.lectures}
    onChange={(e) => {
      const newIOddsem = [...IOddsem];
      // Parse input value to integer and ensure it's not NaN
      const newValue = parseInt(e.target.value);
      newIOddsem[index].lectures = isNaN(newValue) ? '' : Math.max(0, newValue);
      setIOddsem(newIOddsem);
    }}
    readOnly={!isEditable}
  />
</td>
<td>
  <Form.Control
    type="text"
    placeholder="Enter actual lectures"
    style={{ textAlign: "center" }}
    value={oddsem.actualLectures}
    onChange={(e) => {
      const newIOddsem = [...IOddsem];
      // Parse input value to integer and ensure it's not NaN
      const newValue = parseInt(e.target.value);
      newIOddsem[index].actualLectures = isNaN(newValue) ? '' : Math.max(0, newValue);
      setIOddsem(newIOddsem);
    }}
    readOnly={!isEditable}
  />
</td>

                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    style={{ textAlign: "center" }}
                    value={oddsem.percentage}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIOddsem(index)} disabled={!isEditable}
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
                <Form.Label>Document uploaded successfully</Form.Label>
                <br />
                <a href={documentA7} target="_blank" rel="noreferrer">
                  View Document
                </a>
              </>
            )}
            {!documentA7 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA7')}
            disabled={!isEditable} />
            
          </Form.Group>
        </Col>
      </Row>
    </div>


        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIOddsem} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Odd Semester Lectures / Practical conducted </Link>
          </Button>
          </Col>
          </Row>
          </div>
      </div>    

      <div className="content-box">      
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
              <th style={{ verticalAlign: 'middle'}}>Courses Taught Lecture / Practical code and name </th>
              <th style={{ verticalAlign: 'middle'}}>Class for which conducted</th>
              <th style={{ verticalAlign: 'middle'}}>Target Lectures / Practicals</th>
              <th style={{ verticalAlign: 'middle'}}>Lectures / Practicals Actually conducted</th>
              <th style={{ verticalAlign: 'middle'}}>% of Classes / Labs conducted</th>
            </tr>
          </thead>
          {IEvensem.map((evensem, index) => (
            <tbody key={index}>
              <tr>
                <td className='text-center'>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    style={{ textAlign: "center" }}
                    value={evensem.course}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].course = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    style={{ textAlign: "center" }}
                    value={evensem.class}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].class = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                {/* <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    style={{ textAlign: "center" }}
                    value={evensem.lectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].lectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    style={{ textAlign: "center" }}
                    value={evensem.actualLectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].actualLectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                    readOnly={!isEditable}
                  />
                </td> */}

<td>
  <Form.Control
    type="text"
    placeholder="Enter lectures"
    style={{ textAlign: "center" }}
    value={evensem.lectures}
    onChange={(e) => {
      const newIEvensem = [...IEvensem];
      // Parse input value to integer and ensure it's not NaN
      const newValue = parseInt(e.target.value);
      newIEvensem[index].lectures = isNaN(newValue) ? '' : Math.max(0, newValue);
      setIEvensem(newIEvensem);
    }}
    readOnly={!isEditable}
  />
</td>
<td>
  <Form.Control
    type="text"
    placeholder="Enter actual lectures"
    style={{ textAlign: "center" }}
    value={evensem.actualLectures}
    onChange={(e) => {
      const newIEvensem = [...IEvensem];
      // Parse input value to integer and ensure it's not NaN
      const newValue = parseInt(e.target.value);
      newIEvensem[index].actualLectures = isNaN(newValue) ? '' : Math.max(0, newValue);
      setIEvensem(newIEvensem);
    }}
    readOnly={!isEditable}
  />
</td>

                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    style={{ textAlign: "center" }}
                    value={evensem.percentage}
                    readOnly={!isEditable}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIEvensem(index)} disabled={!isEditable}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA8')}
            disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIEvensem} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Even Semester Lectures / Practical conducted</Link>
          </Button>
          </Col>
          </Row>
          </div>
      </div>

        <Table striped bordered hover>
          <thead>
            <tr className='text-center' >
              <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
              <th style={{ verticalAlign: 'middle'}}>Natural of Activity</th>
              <th style={{ verticalAlign: 'middle'}}>Spilt-Up Marks Total</th>
              <th style={{ verticalAlign: 'middle'}}>MAX API Score alloted</th>
              <th style={{ verticalAlign: 'middle'}}>Self appraisal Score</th>
              <th style={{ verticalAlign: 'middle'}}>Upload Supporting Documents</th>
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
                

    <Col>
        <Form.Check
          type="radio"
          name="lectures"
          checked={lecturesTaken === 100}
          label="Total lectures conducted > 90% score = 50"
          value={100}
          onChange={handleRadioChange}
          disabled={!isEditable}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          checked={lecturesTaken === 90}
          label="90% > Lectures taken ≥ 80% = 40"
          value={90}
          onChange={handleRadioChange}
          disabled={!isEditable}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          checked={lecturesTaken === 70}
          label="80% > Lectures taken ≥ 70% = 30"
          value={70}
          onChange={handleRadioChange}
          disabled={!isEditable}
        />
      </Col>
      <Col>
        <Form.Check
          type="radio"
          name="lectures"
          checked={lecturesTaken === 0}
          label="No score if number of lectures taken is less than 70%"
          value={0}
          onChange={handleRadioChange}
          disabled={!isEditable}
        />
      </Col>
      
              </td>
              
              <td className='text-center'> - </td>

              <td>
              <p className='text-center'>50</p>
              </td>
    
              <td>
              <Col>
        <Form.Control
          type="text"
          style={{ textAlign: "center" }}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA1')} 
            disabled={!isEditable}/>

            
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

                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 0}
                    label="0 extra lecture/ lab"
                    value={0}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  />  </Col>
              
                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 1}
                    label="1 extra lecture/ lab"
                    value={1}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 2}
                    label="2 extra lectures/ labs"
                    value={2}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 3}
                    label="3 extra lectures/ labs"
                    value={3}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 4}
                    label="4 extra lectures/ labs"
                    value={4}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="extraLectures"
                    checked={extraClass === 5}
                    label="5 extra lectures/ labs or More than 5 extra lectures/ labs"
                    value={5}
                    onChange={handleRadioChange2}
                    disabled={!isEditable}
                  /> </Col>

              
              </td>

              <td className='text-center'> - </td>

              <td>
              <p className='text-center'>5</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={IActb}
                  readOnly
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
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA2')}
                disabled={!isEditable} />
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

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 0}
                    label="0 Remedial lecture/ Revision lecture"
                    value={0}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  />  </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 1}
                    label="1 Remedial lecture/ Revision lecture"
                    value={1}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 2}
                    label="2 Remedial lectures/ Revision lectures"
                    value={2}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 3}
                    label="3 Remedial lectures/ Revision lectures"
                    value={3}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 4}
                    label="4 Remedial lectures/ Revision lectures"
                    value={4}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  /> </Col>

                <Col>
                  <Form.Check
                    type="radio"
                    name="remedial"
                    checked={remedial === 5}
                    label="5 Remedial lectures/ Revision lectures or More than 5 Remedial lectures/ Revision lectures"
                    value={5}
                    onChange={handleRadioChange3}
                    disabled={!isEditable}
                  /> </Col>


              </td>

              <td className='text-center'> - </td>

              <td>
              <p className='text-center'>5</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActc}
                  readOnly
                  max={5}
                  style={{ textAlign: "center" }}
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
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA3')}
                disabled={!isEditable} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td>d.</td>
              <td>
                <Col>
                  Learning material prepared for students: Provide short
                  description of each work done in separate sheet.
                <br/>
                <p>*Tick the applicable activities and enter the score.<br/>Evaluation Criteria:</p></Col>
                
                
                <tr>
                  <td> <Form.Check
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
                  disabled={!isEditable}
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d1 >= 0 ? sub1_d1 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d1(Math.max(0, Math.min(5, value)));
                  } else {
                    setSub1_d1(0);
                  }
                  }} disabled={!isEditable}/>
                  </td>
                </tr>

                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d2 >= 0 ? sub1_d2 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d2(Math.max(0, Math.min(10, value)));
                  } else {
                    setSub1_d2(0);
                  } }} disabled={!isEditable} />
                  </td>
                </tr>

                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d3 >= 0 ? sub1_d3 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d3(Math.max(0, Math.min(10, value)));
                  } else {
                    setSub1_d3(0);
                  } }} disabled={!isEditable} />
                  </td>
                </tr>

                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d4 >= 0 ? sub1_d4 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d4(Math.max(0,Math.min(8, value)));
                  } else {
                    setSub1_d4(0);
                  } }} disabled={!isEditable} />
                  </td>
                </tr>
               
                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d5 >= 0 ? sub1_d5 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d5(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_d5(0);
                  } }} disabled={!isEditable} />
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d6 >= 0 ? sub1_d6 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d6(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_d6(0);
                  } }}  disabled={!isEditable}/>
                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>
                
                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d7 >= 0 ? sub1_d7 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d7(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_d7(0);
                  } }} disabled={!isEditable} />

                  </td>
                </tr>
                
                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                  <td>
                  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_d8 >= 0 ? sub1_d8 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_d8(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_d8(0);
                  } }} disabled={!isEditable}/>

                  </td>

                </tr>
              </td>

              <td className='text-center'> 
              <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub1d}
                      readOnly
                    /> </td>

              <td>
              <p className='text-center'>40</p>
              </td>
              <td>
                {/* <Form.Control
                  type="text"
                  placeholder=""
                  value={IActd}
                  onChange={(e) => setIActd(Math.min(Number(e.target.value), 40))}
                  disabled={!isEditable}
                  max={40}
                  style={{ textAlign: "center" }}
                /> */}
                <Form.Control
                type="text"
                placeholder=""
                value={IActd}
                // onChange={(e) => {
                //   const value = Math.min(Number(e.target.value), 40);
                //   setIActd(value);
                // }}
                readOnly
                disabled={!isEditable}
                max={40}
                style={{ textAlign: "center" }}
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
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA4')} disabled={!isEditable} />
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td>e.</td>
              <td>
                <Col>Updating of subject content course improvement etc.</Col>

                  <tr>
                    <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                    <td>
                    <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e1 >= 0 ? sub1_e1 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e1(Math.max(0, Math.min(3, value)));
                  } else {
                    setSub1_e1(0);
                  }
                  }} disabled={!isEditable} />
                    </td>
                  </tr>

                  <tr>
                    <td> <Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                    <td>
                    <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e2 >= 0 ? sub1_e2 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e2(Math.max(0, Math.min(3, value)));
                  } else {
                    setSub1_e2(0);
                  }
                  }} disabled={!isEditable} />
                    </td>
                  </tr>

                  <tr>
                    <td><Form.Check
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
                  }} disabled={!isEditable}
                />  </td>
                    <td>
                    <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e3 >= 0 ? sub1_e3 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e3(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_e3(0);
                  }
                  }}  disabled={!isEditable}/>
                    </td>
                  </tr>
                
               <tr> 4. Question Paper solution:
                <Col>
                               <tr>
                 <td><Form.Check
                  type="checkbox"
                  label="1. Term Test (1 each max 2) "
                  value="Term Test (1 each max 2)"
                  checked={check_e.includes("Term Test (1 each max 2)")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheck_e([...check_e, e.target.value]);
                    } else {
                      setCheck_e(check_e.filter((c) => c !== e.target.value));
                    }
                  }} disabled={!isEditable}
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e41 >= 0 ? sub1_e41 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e41(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_e41(0);
                  }
                  }} disabled={!isEditable} />
                </td>
               </tr>

               <tr>
                <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e42 >= 0 ? sub1_e42 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e42(Math.max(0, Math.min(5, value)));
                  } else {
                    setSub1_e42(0);
                  }
                  }} disabled={!isEditable}/>
                </td>
               </tr>
                </Col>  

             </tr>

             <tr>
              <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e5 >= 0 ? sub1_e5 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e5(Math.max(0, Math.min(2, value)));
                  } else {
                    setSub1_e5(0);
                  }
                  }} disabled={!isEditable}/>
              </td>
              </tr>                                                      

              <tr>
                <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>
                <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={sub1_e6 >= 0 ? sub1_e6 : 0}
                  onChange={(e) => {
                    const value= parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setSub1_e6(Math.max(0, Math.min(10, value)));
                  } else {
                    setSub1_e6(0);
                  }
                  }} disabled={!isEditable}/>
                </td>
                </tr>    
                <Col>*quality of notes/solution to be considered</Col>
              </td>

              <td > 
              <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub1e}
                      readOnly
                    /> </td>

              <td>
              <p className='text-center'>25</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  readOnly
                  value={IActe}
                  // onChange={(e) => setIActe(Math.min(Number(e.target.value), 25))}
                  disabled={!isEditable}
                  max={25}
                  style={{ textAlign: "center" }}
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
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA5')} disabled={!isEditable} />
              </Form.Group>
              </td>

            </tr>

            <tr>
              <td>f.</td>
              <td>
                <Col>
                  Examination duties (invigilation; Question paper setting, evaluation/ assessment of answer scripts) as per allotment.
                </Col>

                  <tr>
                    <td><Form.Check
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
                  }} disabled={!isEditable}
                />               
                <Col>
                  100% compliance: 5, 80% compliance: 3, less than 80%: no score
                </Col></td>

                    <td>
                    <Form.Control
                          type="text"
                          style={{ textAlign: "center" }}
                          value={sub1_f1 >= 0 ? sub1_f1 : 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              setSub1_f1(Math.max(0, Math.min(5, value)));
                            } else {
                              setSub1_f1(0);
                            }
                          }} disabled={!isEditable}
                        />
                    </td>
                  </tr>

                  <tr>
                    <td>     <Form.Check
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
                  }} disabled={!isEditable}
                />
                <Col>100% compliance: 5, less than 100%: no score.</Col></td>
                    <td>
                    
                    <Form.Control
                          type="text"
                          style={{ textAlign: "center" }}
                          value={sub1_f2 >= 0 ? sub1_f2 : 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              setSub1_f2(Math.max(0, Math.min(10, value)));
                            } else {
                              setSub1_f2(0);
                            }
                          }} disabled={!isEditable}
                        />
                    
                    </td>
                  </tr>

                <tr>
                  <td><Form.Check
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
                  }} disabled={!isEditable}
                /></td>
                  <td>
                  
                    <Form.Control
                          type="text"
                          style={{ textAlign: "center" }}
                          value={sub1_f3 >= 0 ? sub1_f3 : 0}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              setSub1_f3(Math.max(0, Math.min(10, value)));
                            } else {
                              setSub1_f3(0);
                            }
                          }} disabled={!isEditable}
                        />
                    
                  </td>
                </tr>

              </td>

              <td > 
              <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      value={totalsub1f}
                      readOnly
                    /> </td>

              <td>
              <p className='text-center'>25</p>
              </td>
              <td>
                <Form.Control
                  type="text"
                  readOnly
                  value={IActf}
                  // onChange={(e) => setIActf(Math.min(Number(e.target.value), 25))}
                  disabled={!isEditable}
                  min={0}
                  max={25}
                  style={{ textAlign: "center" }}
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
                <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentA6')} disabled={!isEditable}/>
              </Form.Group>
              </td>
            </tr>

            <tr>
              <td></td>
              <td style={{ textAlign: "center" }}>Total of Category I</td>
              <td></td>
              <td>
              <p className='text-center'>150</p>
              </td>
              <td>
                <Form.Control type="text" 
                readOnly
                 value={IActTotal} 
                 style={{ textAlign: "center" }}
                 />
              </td>
            </tr>
          </tbody>

          
        </Table>
      </Form>
      
       

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
            <Button variant="primary" type="submit" onClick={handleSave} >
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
{/* <Footer /> */}
      </Row>
      </Container>
  );
}

export default Form2A;
