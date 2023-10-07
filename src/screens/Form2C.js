import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table } from 'react-bootstrap'
import {auth, db, storage } from '../firebase'
import {doc, collection, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {Link, useNavigate} from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Form2C(){
    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(null)

    const [ IIIaActa1, setIIIaActa1]= useState('') 
    const [ IIIaActa2, setIIIaActa2]= useState('')
    const [ IIIaActb1, setIIIaActb1]= useState('')
    const [ IIIaActb2, setIIIaActb2]= useState('')
    const [ IIIaActb3, setIIIaActb3]= useState('')
    const [ IIIaActb4, setIIIaActb4]= useState('')
    const [ IIIaActb5, setIIIaActb5]= useState('')
    const [ IIIaActb6, setIIIaActb6]= useState('')
    const [ ResearchArticle, setResearchArticle]= useState([])
    const [ ResearchProjectON, setResearchProjectON]= useState([])
    const [ ResearchProjectCOMP, setResearchProjectCOMP]= useState([])
    const [ ResearchGuidance, setResearchGuidance]= useState([])
    const [ TrainingCourse, setTrainingCourse]= useState([])
    const [PaperPresentConference, setPaperPresentConference]= useState([])
    const[ InvitedLecture, setInvitedLecture]= useState([])
    const [Award, setAward]= useState([])
    const [email, setEmail]= useState('')
    const [uploadedFile, setUploadedFile] = useState(null);
  const [documentCURL, setDocumentCURL] = useState("");

    const navigate = useNavigate();

    const handleUpload = (e) => {
      const file = e.target.files[0];
      setUploadedFile(file);
    };

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


    // useEffect(() => {
    //   Total()
    // }, [IIActa, IIActb, IIActc, IIActd])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const docRef = doc(db, 'partB', user.uid);
      const data = {
        IIIaActa1,
        IIIaActa2,
        IIIaActb1,
        IIIaActb2,
        IIIaActb3,
        IIIaActb4,
        IIIaActb5,
        IIIaActb6,
        ResearchArticle,
        ResearchProjectON,
        ResearchProjectCOMP,
        ResearchGuidance,
        TrainingCourse,
        PaperPresentConference,
        InvitedLecture,
        Award,
        documentCURL,
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
              setDocumentCURL(url);
              data.documentURL = url;
              setDoc(docRef, data, { merge: true });
            });
          }
        );
      }
      await setDoc(docRef, data, { merge: true });
      navigate('/FormSubmission');
      // navigate('/form2');
    };


    const fetchData = async (uid) => {
      const docRef = doc(db, 'partB', uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIIIaActa1(data.IIIaActa1 || '');
          setIIIaActa2(data.IIIaActa2 || '');
          setIIIaActb1(data.IIIaActb1 || '');
          setIIIaActb2(data.IIIaActb2 || '');
          setIIIaActb3(data.IIIaActb3 || '');
          setIIIaActb4(data.IIIaActb4 || '');
          setIIIaActb5(data.IIIaActb5 || '');
          setIIIaActb6(data.IIIaActb6 || '');
          setResearchArticle(data.ResearchArticle || []);
          setResearchProjectON(data.ResearchProjectON || []);
          setResearchProjectCOMP(data.ResearchProjectCOMP || []);
          setResearchGuidance(data.ResearchGuidance || []);
          setTrainingCourse(data.TrainingCourse || []);
          setPaperPresentConference(data.PaperPresentConference || []);
          setInvitedLecture(data.InvitedLecture || []);
          setAward(data.Award || []);
          setDocumentCURL(data.documentCURL || '');
        // } else {
        //   setError('User not found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (user) {
        fetchData(user.uid);
      }
    }, [user]);

    const handleAddResearchArticle = () => {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle,
        { title: '', booktitle: '', isbn: '', peerreview: '', coauthor: '' },
      ]);
    };

    const handleRemoveResearchArticle = (index) => {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle.filter((item) => prevResearchArticle.indexOf(item) !== index),
      ]);
    };

    const handleAddResearchProjectON = () => {
      setResearchProjectON((prevResearchProjectON) => [
        ...prevResearchProjectON,
        { title: '', agency: '', period: '', amount:'' },
      ]);
    }

    const handleRemoveResearchProjectON = (index) => {
      setResearchProjectON((prevResearchProjectON) => [
        ...prevResearchProjectON.filter((item) => prevResearchProjectON.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchProjectCOMP = () => {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP,
        { title: '', agency: '', period: '', amount: ''},
      ]);
    }

    const handleRemoveResearchProjectCOMP = (index) => {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP.filter((item) => prevResearchProjectCOMP.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchGuidance = () => {
      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance,
        { enrolled: '', thesis: '', degree: ''},
      ]);
    }

    const handleRemoveResearchGuidance = (index) => {
      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance.filter((item) => prevResearchGuidance.indexOf(item) !== index),
      ]);
    }

    const handleAddTrainingCourse = () => {
      setTrainingCourse((prevTrainingCourse) => [
        ...prevTrainingCourse,
        { programme: '', duration: '', organizedby: ''},
      ]);
    }

    const handleRemoveTrainingCourse = (index) => {
      setTrainingCourse((prevTrainingCourse) => [
        ...prevTrainingCourse.filter((item) => prevTrainingCourse.indexOf(item) !== index),
      ]);
    }

    const handleAddPaperPresentConference = () => {
      setPaperPresentConference((prevPaperPresentConference) => [
        ...prevPaperPresentConference,
        { titlepaper: '', titleseminar: '', organisedby: '', level: ''},
      ]);
    }

    const handleRemovePaperPresentConference = (index) => {
      setPaperPresentConference((prevPaperPresentConference) => [
        ...prevPaperPresentConference.filter((item) => prevPaperPresentConference.indexOf(item) !== index),
      ]);
    }

    const handleAddInvitedLecture = () => {
      setInvitedLecture((prevInvitedLecture) => [
        ...prevInvitedLecture,
        { titlelecture: '', titleconference: '', organisedby: '', level: ''},
      ]);
    }

    const handleRemoveInvitedLecture = (index) => {
      setInvitedLecture((prevInvitedLecture) => [
        ...prevInvitedLecture.filter((item) => prevInvitedLecture.indexOf(item) !== index),
      ]);
    }

    const handleAddAward = () => {
      setAward((prevAward) => [
        ...prevAward,
        { award: '', agencyinvolved: '', level: '', discipline: ''},
      ]);
    }

    const handleRemoveAward = (index) => {
      setAward((prevAward) => [
        ...prevAward.filter((item) => prevAward.indexOf(item) !== index),
      ]);
    }

    return(
      
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

        <h1>Category III: (Assessment must be based on evidence produced by the teacher such as: copy of publications, project sanction letter, utilization and completion certificates issued by the University and acknowledgements for patent filing and approval letters, students’ Ph.D. award letter, etc.)</h1>
        <Form onSubmit={handleSubmit}></Form>

        <Table striped bordered hover>
        <thead>
        <tr>
          <th>III (a)</th>
          <th>Research Publication (Journals)</th>
          <th>Max API Score allotted: No maximum score. A percentage of three
          years score is considered for promotion as per UGC notification Feb 2018</th>
        </tr>
      </thead>

        <tr>
          <th>Sr.No</th>
          <th>Title with Journal name , Volume no. page No ISSN/ISBN No</th>
          <th>Index (indicate serial numbers against applicable)</th>
        </tr>

        <tbody>
        <tr>
          <td>a.</td>
          <td> A Modern Approach To Conventional Silk Farming</td>
          <td>
          <Form.Label>SCI</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActa1}
              onChange={(e) => setIIIaActa1(e.target.value)}/>
              <Form.Label>WOS</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActa2}
              onChange={(e) => setIIIaActa2(e.target.value)}/></td>
        </tr>

        <tr>
        <td>b.</td>
          <td> Bone Age Estimation System Using Deep Learning</td>
          <td>
          <Form.Label>ESCI</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb1}
              onChange={(e) => setIIIaActb1(e.target.value)}/>

              <Form.Label>SCOPUS</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb2}
              onChange={(e) => setIIIaActb2(e.target.value)}/>
              
              <Form.Label>UGC CARE</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb3}
              onChange={(e) => setIIIaActb3(e.target.value)}/>

              <Form.Label>Having ISBN/ISSN</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb4}
              onChange={(e) => setIIIaActb4(e.target.value)}/>

              <Form.Label>Proceedings</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb5}
              onChange={(e) => setIIIaActb5(e.target.value)}/>

              <Form.Label>guide/mentor (mention serial number of paper )</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={IIIaActb6}
              onChange={(e) => setIIIaActb6(e.target.value)}/></td>
            </tr>

            <tr>
              <td></td>
              <td colspan="2"><Col>Evaluation Criteria:</Col>
              <Col>1. Refereed Journals</Col>
              <Col>   • SCI –- 40 / publication</Col>
              <Col>   • ESCI –- 30 / publication</Col>
              <Col>   • SCOPUS –- 20 / publication</Col>
              <Col>   • UGC CARE –- 15 / publication</Col>

              <Col>2. Non-refereed but recognized and reputable journals and periodicals, having ISBN/ISSN numbers –- 10 / publication</Col>
              <Col>3. Conference proceedings as full papers, etc. (Abstracts not to be included) –- 10 / publication</Col>
              <Col>4. Guide or mentor of the faculty gets 40% of the total points</Col>
              </td>
              
            </tr>
            </tbody>
        </Table>

        <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (b)</th>
      <th colSpan="3">Research Projects</th>
      <th colSpan="2">Max API Score allotted: 100</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Book Title</th>
      <th>ISBN</th>
      <th>Peer Review</th>
      <th>Co-author</th>
        </tr>
      </thead>

      {
        ResearchArticle.map((researcharticle,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={researcharticle.title}
                  onChange={(e) =>{
                    const newResearchArticle = [...ResearchArticle]
                    newResearchArticle[index].title = e.target.value
                    setResearchArticle(newResearchArticle)
                  } }/>
              </td>
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter booktitle"
                value={researcharticle.booktitle}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].booktitle = e.target.value
                  setResearchArticle(newResearchArticle)
                } }/>
              </td>
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter isbn"
                value={researcharticle.isbn}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].isbn = e.target.value
                  setResearchArticle(newResearchArticle)
                } }/>
                
              </td>
              
              
              <td>
                <Form.Control
                type="text"
                placeholder="Enter peerreview"
                value={researcharticle.peerreview}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].peerreview = e.target.value
                  setResearchArticle(newResearchArticle)
                } }/>
              </td>
              <td>
                <Form.Control
                type="text"
                placeholder="Enter coauthor"
                value={researcharticle.coauthor}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].coauthor = e.target.value
                  setResearchArticle(newResearchArticle)
                } }/>
              </td>
              
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchArticle(index)}
                >
                  Remove
                </Button>
              </td>

            </tr>
           
          </tbody>
        ))
      }
      <tr>
            <td></td>
              <td colspan="5">Evaluation Criteria:
              <Col>1. Text or Reference Books Published by International Publishers with an established peer review system---- 50 /sole author; 10 /chapter in an edited book</Col>
<Col>2. Subjects Books by National level publishers/State and Central Govt. Publications with ISBN/ISSN numbers ---25 /sole author, and 5/ chapter in edited books</Col>
<Col>3. Subject Books by Other local publishers with ISBN/ISSN numbers --- 15 / sole author, and 3 / chapter in edited book</Col>
<Col>4. Chapters in knowledge based volumes by Indian/National level publishers within/ISSN numbers & with numbers of national & international directories--- 5 / Chapter</Col>
<Col>5. Chapters contributed to edited knowledge based volumes published by International Publishers
- 10 /Chapter</Col>
<Col>6. Chapters in knowledge based volumes by Indian/National level publishers with ISBN/ISSN numbers and with numbers of national and international directories ----5 / Chapter</Col>
<Col>**API for joint publications is as follows:</Col>
<Col>5. Guide or mentor of the faculty gets 40% of the total points</Col>
<Col>6. Proceedings of conferences not considered as a book (example springer conference series). Also one publication is considered only under a single category.</Col>

              </td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchArticle}>
            <Link className="text-decoration-none text-white">Add Research Article</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (c)</th>
      <th colSpan="4">Research Projects (Ongoing)</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Agency</th>
      <th>Period</th>
      <th>Amount</th>
        </tr>
      </thead>

      {
        ResearchProjectON.map((researchprojecton,index) => (
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={researchprojecton.title}
                  onChange={(e) =>{
                    const newResearchProjectON = [...ResearchProjectON]
                    newResearchProjectON[index].title = e.target.value
                    setResearchProjectON(newResearchProjectON)
                  } }/>
              </td> 
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter agency"
                value={researchprojecton.agency}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].agency = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } }/>
              </td> 
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter period"
                value={researchprojecton.period}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].period = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } }/> 
              </td>
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter amount"
                value={researchprojecton.amount}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].amount = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } }/> 
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchProjectON(index)}
                >
                  Remove
                </Button> 
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td colSpan="4"><Col>Evaluation Criteria:</Col>
          <Col>a) Major Projects amount mobilized with grants above 20.0 lakhs 30 points</Col>
<Col>a) Major Projects amount mobilized with grants above 5.0 lakhs 20 points</Col>
<Col>b) Major Projects Amount mobilized with a minimum of Rs. 3.00 lakhs up to Rs. 5.00 lakhs 15 points</Col>
<Col>c) Minor Projects (Amount mobilized with grants above Rs. 25,000 up to Rs. 3 lakh 10 points</Col>
<Col>d) Consultancy Projects amount mobilized with grants above 2.0 lakhs 10 points</Col>
<Col>e) Consultancy Projects completed-Major above 5 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>f) Consultancy Projects completed- Minor below 3 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>g) Projects Outcome /Outputs in the form of Patent/Technology transfer/ Product/Process 30 points at the National level and 50 at the international level</Col>
<Col>h) Need-based projects of the college 10 points</Col>

      </td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchProjectON}>
            <Link className="text-decoration-none text-white">Add Research Project(Ongoing)</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (c)</th>
      <th colSpan="4">Research Projects (Completed)</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Agency</th>
      <th>Period</th>
      <th>Amount</th>
        </tr>
      </thead>

      {
        ResearchProjectCOMP.map((researchprojectcomp,index) => (
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={researchprojectcomp.title}
                  onChange={(e) =>{
                    const newResearchProjectCOMP = [...ResearchProjectCOMP]
                    newResearchProjectCOMP[index].title = e.target.value
                    setResearchProjectCOMP(newResearchProjectCOMP)
                  } }/>
              </td> 
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter agency"
                value={researchprojectcomp.agency}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].agency = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } }/>
              </td> 
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter period"
                value={researchprojectcomp.period}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].period = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } }/> 
              </td>
              <td>
              
                <Form.Control
                type="text"
                placeholder="Enter amount"
                value={researchprojectcomp.amount}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].amount = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } }/> 
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchProjectCOMP(index)}
                >
                  Remove
                </Button> 
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td colSpan="4"><Col>Evaluation Criteria:</Col>
          <Col>a) Major Projects amount mobilized with grants above 20.0 lakhs 30 points</Col>
<Col>a) Major Projects amount mobilized with grants above 5.0 lakhs 20 points</Col>
<Col>b) Major Projects Amount mobilized with a minimum of Rs. 3.00 lakhs up to Rs. 5.00 lakhs 15 points</Col>
<Col>c) Minor Projects (Amount mobilized with grants above Rs. 25,000 up to Rs. 3 lakh 10 points</Col>
<Col>d) Consultancy Projects amount mobilized with grants above 2.0 lakhs 10 points</Col>
<Col>e) Consultancy Projects completed-Major above 5 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>f) Consultancy Projects completed- Minor below 3 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>g) Projects Outcome /Outputs in the form of Patent/Technology transfer/ Product/Process 30 points at the National level and 50 at the international level</Col>
<Col>h) Need-based projects of the college 10 points</Col>
      </td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchProjectCOMP}>
            <Link className="text-decoration-none text-white">Add Research Project (Completed) </Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (d)</th>
      <th colSpan="3">Research Guidance</th>
      
    </tr>
    <tr>
      <th>Enrolled</th>
      <th>Thesis Submitted</th>
      <th>Degree Awarded</th>
        </tr>
      </thead>
      
      {
        ResearchGuidance.map((researchguidance,index) => (
          <tbody key={index}>
           <tr>
            <td>{index + 1}</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter enrolled"
                value={researchguidance.enrolled}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].enrolled = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } }/>
            </td>
              
            <td>
              <Form.Control
                type="text"
                placeholder="Enter thesis"
                value={researchguidance.thesis}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].thesis = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } }/>
            </td>
            
            <td>
              <Form.Control
                type="text"
                placeholder="Enter degree"
                value={researchguidance.degree}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].degree = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } }/>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleRemoveResearchGuidance(index)}>
                Remove
              </Button>
            </td>               
           </tr>
          </tbody>
        ))     
      }
      <tr>
        <td></td>
        <td><Col>Evaluation Criteria:</Col>
          <Col>M. Phil /ME     <Col>Degree awarded–5 /each candidate</Col>
                               <Col>Thesis submitted–2 /each candidate</Col></Col>

          <Col>PhD              <Col>Degree awarded	–10 /each candidate</Col> 
                                 <Col>Thesis submitted–7 /each candidate</Col></Col>

        </td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchGuidance}>
            <Link className="text-decoration-none text-white">Add Research Guidance</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (e-i)</th>
      <th colSpan="3">TRAINING COURSES AND Faculty Development Programs (not less than one week) max 30pts</th>
      </tr>
      <tr>
      <th>Programme</th>
      <th>Duration</th>
      <th>Organized by</th>
        </tr>
      </thead>
      {
        TrainingCourse.map((trainingcourse,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter programme"
                  value={trainingcourse.programme}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].programme = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter duration"
                  value={trainingcourse.duration}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].duration = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter organizedby"
                  value={trainingcourse.organizedby}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].organizedby = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } }/>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveTrainingCourse(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td><Col>Evaluation Criteria:</Col>
          <Col>a. courses (not less than three Weeks)/Workshops of not less than one week 20 / each event</Col>
<Col>b. International conference/Seminar / Symposia 20 / each event</Col>
<Col>c. National conference/Seminar / Symposia	10 / each event</Col>
<Col>d. State level / university / college level conference/Seminar / Symposia	5 / each event</Col>
<Col>e. Online courses of a four weeks duration or more	20pts (proof of successful completion to be submitted)</Col>
</td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddTrainingCourse}>
            <Link className="text-decoration-none text-white">Add Training Course</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (e-ii)</th>
      <th colSpan="4">PAPER PRESENTATIONS IN CONFERENCES AND SEMINARS</th>
    </tr>
    <tr>
      <th>Title of paper</th>
      <th>Title of Seminar/Conference</th>
      <th>Organized by</th>
      <th>Level</th>
        </tr>
      </thead>

    {
      PaperPresentConference.map((paperpresentconference,index) => (
        <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter titlepaper"
                value={paperpresentconference.titlepaper}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].titlepaper = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } }/>
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter titleseminar"
                value={paperpresentconference.titleseminar}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].titleseminar = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } }/>
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter organisedby"
                value={paperpresentconference.organisedby}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].organisedby = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } }/>
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter level"
                value={paperpresentconference.level}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].level = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } }/>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleRemovePaperPresentConference(index)}>
                Remove
              </Button>
            </td>
          </tr>
        </tbody>
      ))
    }
    <tr>
      <td></td>
      <td colSpan="4"><Col>*Level – write I for International, N for National, S for state, R for regional, C for college or University</Col>
      <Col>Evaluation Criteria:</Col>
      <Col>Participation and Presentation of research papers (oral/poster) in</Col>
      <Col>a)	International / Foreign conference etc.,---10/ each</Col>
      <Col>b)	National	–-7.5 / each</Col>
      <Col>c)	Regional/State level	–-5/ each</Col>
      <Col>d)	Local – University/College level	3/each</Col>
      <Col>one publication is considered only under a single categor</Col></td>
    </tr>
    </Table>
    <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddPaperPresentConference}>
            <Link className="text-decoration-none text-white">Add Paper Present Conference</Link>
          </Button>
          </Col>
          </Row>
          </div>
 
    <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (e-iii)</th>
      <th colSpan="4">INVITED LECTURES AND CHAIRMANSHIP AT NATIONAL OR INTERNATIONAL CONFERENCE/SEMINAR</th>
    </tr>
    <tr>
      <th>Title of Lecture</th>
      <th>Title of Seminar/Conference</th>
      <th>Organized by</th>
      <th>Level</th>
        </tr>
      </thead>

      {
        InvitedLecture.map((invitedlecture,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter titlelecture"
                  value={invitedlecture.titlelecture}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].titlelecture = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter titleconference"
                  value={invitedlecture.titleconference}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].titleconference = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter organisedby"
                  value={invitedlecture.organisedby}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].organisedby = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter level"
                  value={invitedlecture.level}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].level = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } }/>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveInvitedLecture(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td><Col>Evaluation Criteria:</Col>
        <Col>a)	International / Foreign conference etc.,---10/ each</Col>
        <Col>b)	National	–-7.5 / each</Col>
        <Col>c)	Regional/State level/local	–-5/ each</Col>
</td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddInvitedLecture}>
            <Link className="text-decoration-none text-white">Add Invited Lecture</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (F)</th>
      <th colSpan="4">AWARDS AND HONOURS (Maximum 50 points)</th>
    </tr>
    <tr>
      <th>Award</th>
      <th>Agency Involved</th>
      <th>Level</th>
      <th>Discipline</th>
        </tr>
      </thead>

      {
        Award.map((award,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter award"
                  value={award.award}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].award = e.target.value
                    setAward(newAward)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter agencyinvolved"
                  value={award.agencyinvolved}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].agencyinvolved = e.target.value
                    setAward(newAward)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter level"
                  value={award.level}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].level = e.target.value
                    setAward(newAward)
                  } }/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter discipline"
                  value={award.discipline}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].discipline = e.target.value
                    setAward(newAward)
                  } }/>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveAward(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td><Col>Evaluation Criteria:</Col>
        <Col>Discipline specific Awards:</Col>
        <Col>1.	Awards by Foreign Universities,AccreditedInternational Bodies-	--50 /each</Col>
        
        <Col>2.	By national bodies like by UGC,CSIR, DST, DBT, ICAR & other Government bodies and Professional Academies like Bhatnagar Award etc.	–- 50 /each</Col>
        <Col>3.	State level/university level	–-	20 /eachd) Regional / local		–- 10 /each</Col>
        <br/>
        <Col>Honours/ Recognitions</Col>
        <Col>a.	Foreign countries Governments and International bodies like UNESCO etc. –--50 /each</Col>
        <Col>b.	National like Padma Sri etc.	–-- 50 /each</Col>
        <Col>c.	State level/university level	–-- 20 /each</Col>
        <Col>d.	Regional / local by GO/NGOs/Rotary/Lions etc.,	5 /each</Col>
        <Col>e.	Professional Subject Based associations	–-- 5 /each</Col>
        <br/>
        <Col>Fellowship Titles</Col>
        <Col>a.	Foreign universities/bodies like FRCP, FRCS etc.,	50 /each</Col>
        <Col>b.	Indian Science and other Academies like Fellow of Indian National Science Academy FNA, FNASC, FAMS etc.,	50 /each</Col>
        <Col>c.	Discipline specific National level Associations	10 /each</Col>
        <Col>Post-doctoral degrees</Col>
        <Col>d.	D.Sc from an university based on post-doctoral thesis	50 /each</Col></td>
      </tr>
      </Table>
      <div className="text-center mb-3">
            <Row>
              <Col>
              <Button variant="primary" onClick={handleAddAward}>
            <Link className="text-decoration-none text-white">Add Award</Link>
          </Button>
          </Col>
          </Row>
          </div>
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

      <p>*If a paper presented in Conference/Seminar is published in the form of Proceedings, the points would accrue for the publication (III(a) and not under presentation (III(e)(ii)).</p>
       
      <div className='text-center mb-4'>
        <Row>
          
          <Col>
            <Button variant="primary" >
            <Link to="/form2b" className="text-decoration-none text-white">
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>

        </Row>
          </div>
          {/* <Link to="/form2" className="btn btn-primary ms-2">Next</Link> */}
        </Col>
      </Row>
    </Container>
    )}

export default Form2C