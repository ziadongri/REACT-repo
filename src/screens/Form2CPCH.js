import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert, Table} from 'react-bootstrap';
import {auth, db , storage} from '../firebase';
import {doc, collection, getDoc, setDoc, updateDoc, addDoc} from 'firebase/firestore';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

function Form2CPCH() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState(null);

  const [ ResearchPublicationPhod, setResearchPublicationPhod] = useState([]);
  const [ ResearchArticlePhod, setResearchArticlePhod] = useState([]);
  const [ ResearchProjectONPhod, setResearchProjectONPhod] = useState([]);
  const [ ResearchProjectCOMPPhod, setResearchProjectCOMPPhod] = useState([]);
  const [ ResearchNeedProjectPhod, setResearchNeedProjectPhod] = useState([]);
  const [ ResearchGuidancePhod, setResearchGuidancePhod] = useState([]);
  const [ TrainingCoursePhod, setTrainingCoursePhod] = useState([]);
  const [ PaperPresentConferencePhod, setPaperPresentConferencePhod] = useState([]);
  const [ InvitedLecturePhod, setInvitedLecturePhod] = useState([]);
  const [ AwardPhod, setAwardPhod] = useState([]);
  const [ IIIActPhodTotal, setIIIActPhodTotal] = useState('');
    const location = useLocation();
    const facultyUID = location.state.facultyUID;
    console.log(facultyUID);
    let navigate = useNavigate();

    if(!facultyUID){  
      alert("Something went wrong!");
    }
    
    const Total = () => {
      let IIIActPhodTotal = parseInt(ResearchPublicationPhod) + parseInt(ResearchArticlePhod) + parseInt(ResearchProjectONPhod) + parseInt(ResearchProjectCOMPPhod) + parseInt(ResearchNeedProjectPhod) + parseInt(ResearchGuidancePhod) + parseInt(TrainingCoursePhod) + parseInt(PaperPresentConferencePhod) + parseInt(InvitedLecturePhod) + parseInt(AwardPhod);
      setIIIActPhodTotal(IIIActPhodTotal);
    }

    useEffect(() => {
      Total();
    }, [ResearchPublicationPhod, ResearchArticlePhod, ResearchProjectONPhod, ResearchProjectCOMPPhod, ResearchNeedProjectPhod, ResearchGuidancePhod, TrainingCoursePhod, PaperPresentConferencePhod, InvitedLecturePhod, AwardPhod]);

    useEffect(() => {
      const unsubscribe= auth.onAuthStateChanged (async (user) => {
        if (user) {
          setUser(user);}
        else{
          navigate('/');
        }
        setLoading(false);
      });
      return unsubscribe;
    }, [navigate]);



const fetchData = async () => {
  const facultyRef = doc(db, "faculty", facultyUID);
  const docRef = doc(facultyRef, "partB", "CategoryC");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setFacultyData(docSnap.data());
    const data = docSnap.data();
    setResearchPublicationPhod(data.ResearchPublicationPhod || []);
    setResearchArticlePhod(data.ResearchArticlePhod || []);
    setResearchProjectONPhod(data.ResearchProjectONPhod || []);
    setResearchProjectCOMPPhod(data.ResearchProjectCOMPPhod || []);
    setResearchNeedProjectPhod(data.ResearchNeedProjectPhod || []);
    setResearchGuidancePhod(data.ResearchGuidancePhod || []);
    setTrainingCoursePhod(data.TrainingCoursePhod || []);
    setPaperPresentConferencePhod(data.PaperPresentConferencePhod || []);
    setInvitedLecturePhod(data.InvitedLecturePhod || []);
    setAwardPhod(data.AwardPhod || []);
    setIIIActPhodTotal(data.IIIActPhodTotal || '');

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

 useEffect(() => {
  fetchData();
  }, [facultyUID]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const facultyRef = doc(db, "faculty", facultyUID);
      const docRef = doc(facultyRef, "partB", "CategoryC");
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
    
      // Check for empty, null, or undefined values
      if (
        ResearchPublicationPhod < 0 ||
        ResearchArticlePhod < 0 ||
        ResearchProjectONPhod < 0 ||
        ResearchProjectCOMPPhod < 0 ||
        ResearchNeedProjectPhod < 0 ||
        ResearchGuidancePhod < 0 ||
        TrainingCoursePhod < 0 ||
        PaperPresentConferencePhod < 0 ||
        InvitedLecturePhod < 0 ||
        AwardPhod < 0 ||
        IIIActPhodTotal < 0
      ) {
        alert("Please fill in all the required fields.");
        return;
      } 
      else if (isNaN(IIIActPhodTotal)) {
        alert("Please fill numbers only");
        return;
      } 
    
      // Construct data object
      const data = {
        ResearchPublicationPhod,
        ResearchArticlePhod,
        ResearchProjectONPhod,
        ResearchProjectCOMPPhod,
        ResearchNeedProjectPhod,
        ResearchGuidancePhod,
        TrainingCoursePhod,
        PaperPresentConferencePhod,
        InvitedLecturePhod,
        AwardPhod,
        IIIActPhodTotal
      };
    
      // Update document with data
      await updateDoc(docRef, data);
      alert("Data saved successfully!");
      navigate('/form3pch', {state: {facultyUID: facultyUID}});
    }

    
    const handleSave = async (e) => {
      e.preventDefault();
      const facultyRef = doc(db, "faculty", facultyUID);
      const docRef = doc(facultyRef, "partB", "CategoryC");
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
    
      // Check for empty, null, or undefined values
      if (
        ResearchPublicationPhod < 0 ||
        ResearchArticlePhod < 0 ||
        ResearchProjectONPhod < 0 ||
        ResearchProjectCOMPPhod < 0 ||
        ResearchNeedProjectPhod < 0 ||
        ResearchGuidancePhod < 0 ||
        TrainingCoursePhod < 0 ||
        PaperPresentConferencePhod < 0 ||
        InvitedLecturePhod < 0 ||
        AwardPhod < 0 ||
        IIIActPhodTotal < 0
      ) {
        alert("Please fill in all the required fields.");
        await updateDoc(docRef, data);
        return;
      } 
      else if (isNaN(IIIActPhodTotal)) {
        alert("Please fill numbers only");
        await updateDoc(docRef, data);
        return;
      } 
    
      // Construct data object
      const data = {
        ResearchPublicationPhod,
        ResearchArticlePhod,
        ResearchProjectONPhod,
        ResearchProjectCOMPPhod,
        ResearchNeedProjectPhod,
        ResearchGuidancePhod,
        TrainingCoursePhod,
        PaperPresentConferencePhod,
        InvitedLecturePhod,
        AwardPhod,
        IIIActPhodTotal
      };
    
      // Update document with data
      await updateDoc(docRef, data);
      alert("Data saved successfully!");
    }
    
    const handleForm2AHODPCNavigation = async (e) => {
      e.preventDefault();
      navigate('/form2apch', { state: { facultyUID: facultyUID } });
    }

    const handleForm2BHODPCNavigation = async (e) => {
      e.preventDefault();
      navigate('/form2bpch', { state: { facultyUID: facultyUID } });
    }

    const handleForm3HODPCNavigation = async (e) => {
      e.preventDefault();
      navigate('/form3pch', { state: { facultyUID: facultyUID } });
    }


  const handleResearchPublicationInputChange = (value, index) => {
  
    const updatedPhodArray = [...ResearchPublicationPhod];
    updatedPhodArray[index] = value;
    setResearchPublicationPhod(updatedPhodArray);
  };

  const handleResearchArticleInputChange = (value, index) => {
    const updatedPhodArray = [...ResearchArticlePhod];
    updatedPhodArray[index] = value;
    setResearchArticlePhod(updatedPhodArray);
  };

  const handleResearchProjectONInputChange = (value, index) => {
    const updatedPhodArray = [...ResearchProjectONPhod];
    updatedPhodArray[index] = value;
    setResearchProjectONPhod(updatedPhodArray);
  };


    const handleResearchProjectCOMPInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...ResearchProjectCOMPPhod];
      updatedPhodArray[index] = value;
      setResearchProjectCOMPPhod(updatedPhodArray);
    };

    const handleResearchNeedProjectInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly  
      const updatedPhodArray = [...ResearchNeedProjectPhod];
      updatedPhodArray[index] = value;
      setResearchNeedProjectPhod(updatedPhodArray);
    };

    const handleResearchGuidanceInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...ResearchGuidancePhod]; 
      updatedPhodArray[index] = value;
      setResearchGuidancePhod(updatedPhodArray);
    };

    const handleTrainingCourseInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...TrainingCoursePhod];
      updatedPhodArray[index] = value;
      setTrainingCoursePhod(updatedPhodArray);
    };

    const handlePaperPresentConferenceInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...PaperPresentConferencePhod];
      updatedPhodArray[index] = value;
      setPaperPresentConferencePhod(updatedPhodArray);
    };

    const handleInvitedLectureInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...InvitedLecturePhod];
      updatedPhodArray[index] = value;
      setInvitedLecturePhod(updatedPhodArray);
    };

    const handleAwardInputChange = (value, index) => {
      // Create a copy of the array to avoid mutating the state directly
      const updatedPhodArray = [...AwardPhod];
      updatedPhodArray[index] = value;
      setAwardPhod(updatedPhodArray);
    };

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (!facultyData) {
      return <p>Faculty not found!</p>;
    }


  return (
    <Container fluid>
      <Row>
   
  <Col md={11} className="mx-auto text-center" >

  <h1 className="text-center">Part B: Academic Performance Indicators</h1>
        
        <h4  style={{fontSize: 20}} className="text-center">Category III: (Assessment must be based on evidence produced by the teacher such as: copy of publications, project sanction letter, utilization and completion certificates issued by the University and acknowledgements for patent filing and approval letters, students’ Ph.D. award letter, etc.)</h4>

        <p className='text-center'>
        NOTE: 1. If a paper presented in Conference/Seminar is published in the form of Proceedings, the points would accrue for the publication (III(a) and not under presentation (III(e)(ii))).
        <br/>
        2. Upload document for above activities. To change the document, upload new document again.
      </p>
        <Form onSubmit={handleSubmit}></Form>

        <div className="content-box">
        <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (a)</th>
      <th colSpan="1" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Publications (Journals)</th>
      <th colSpan="3" style={{ textAlign: "center", verticalAlign: "middle" }}>Max API Score allotted: No maximum score. A percentage of three
years score is considered for promotion as per UGC notification Feb
2018</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title with Journal name , Volume No., page No., ISS/ISBN No.</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Index (indicate serial numbers against applicable)</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
    </tr>
      </thead>
      
    {facultyData.ResearchPublication.map((data, index) => (
  <tbody key={index}>
    <tr style={{ textAlign: "left" }}>
      <td style={{ textAlign: "center" }}>{index + 1}</td>
      <td><Col>• Paper Title: {data.title}</Col>
      <br/>
      <Col>• Enter Journal Name: {data.journal}</Col>
      <br/>
      <Col>• Enter Volume No.: {data.volume}</Col>
      <br/>
     <Col>• Enter Page No.: {data.page}</Col>
      <br/>
      <Col>• Enter ISBN/ISSN No.: {data.isbn}</Col></td>

      <td><Col>• SCI: {data.sci || ''}</Col>
      <br/>
      <Col>• WOS: {data.wos || ''}</Col>
      <br/>
      <Col>• ESCI: {data.esci || ''}</Col>
      <br/>
      <Col>• SCOPUS: {data.scopus || ''}</Col>
      <br/>
      <Col>• UGC CARE: {data.ugccare || ''}</Col>
      <br/>
      <Col>• Having ISBN/ISSN: {data.isbnissn || ''}</Col>
      <br/>
      <Col>• Proceedings: {data.proceedings || ''}</Col>
      <br/>
      <Col>• Guide/Mentor (mention serial number of paper): {data.guidementor || ''}</Col> </td>     
      
      
      <td style={{ textAlign: "center" }}>{data.selfscore}</td>
      <td>
      {/* <Form.Control
      key={index}
  type="text"
  placeholder=""
  style={{ textAlign: "center" }}
  value={(ResearchPublicationHOD && ResearchPublicationHOD[index]) || ''}
  onChange={(e) => handleResearchPublicationInputChange(e.target.value, index)}
  /> */}

<Form.Control
  key={index}
  type="text" // Changed back to "text" to remove the arrows
  placeholder=""
  style={{ textAlign: "center" }}
  value={(ResearchPublicationPhod && ResearchPublicationPhod[index]) || '0'}
  onChange={(e) => {
    const value = e.target.value;
    const updatedValues = [...ResearchPublicationPhod];
    
    if (value === '') {
      updatedValues[index] = 0; 
    } else {
      const numericValue = Number(value);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 40) {
        updatedValues[index] = numericValue;
      } else if (numericValue > 40) {
        updatedValues[index] = 40;
      } else if (numericValue < 0) {
        updatedValues[index] = 0;
      }
    }
    setResearchPublicationPhod(updatedValues);
  }}
  pattern="\d*" // Ensure that only numeric input is allowed
  min={0} 
  max={40}
/>


  </td>
  </tr>

  </tbody>
))}

            <tr style={{ textAlign: "left" }}>
              <td></td>
              <td colspan="6" ><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
                <Col>1. Refereed Journals
                <Col>• SCI –- 40 / publication</Col>
                <Col>• ESCI –- 30 / publication</Col>
                <Col>• SCOPUS–- 20 / publication</Col>
                <Col>• UGC CARE –- 15/ publication</Col>
              </Col>
              <Col>2. Non-refereed but recognized and reputable journals and periodicals, having ISBN/ISSN
              numbers–- 10 / publication</Col>
              <Col>3. Conference proceedings as full papers, etc. (Abstracts not to be included) –- 10/publication</Col>
              <Col>4. Guide or mentor of the faculty gets 40% of the total points</Col>
              </td>
              </tr>
        
        </Table>

        <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC1} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (b)</th>

      <th colSpan="3" style={{ textAlign: "center", verticalAlign: "middle" }}>Books/Articles/ Chapters published in books</th>

      <th colSpan="4" style={{ textAlign: "center", verticalAlign: "middle" }}>Max API Score allotted</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title with Page No.</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Book Title, editor and publisher</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>ISS/ISBN No.</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Whether Peer Reviewed?</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>No of Coauthors. Specify if first author.</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {facultyData.ResearchArticle.map((data, index) => (
  <tbody key={index}>
    <tr  style={{ textAlign: "left" }}>
      <td style={{ textAlign: "center" }}>{index + 1}</td>
      <td>
      <Col>• Enter title with Page No.: {data.title}</Col>
      <br/>
      <Col>•  Is it a Book or Chapter: {data.whatis}</Col>
      <br/>
      <Col>• If it is Chapter, Enter No. of Chapter/Chapters: {data.chapters}</Col>
      </td>
      <td>
      <Col>• Enter Book Title:{data.booktitle}</Col>
      <br/>
      <Col>• Enter Editor/Editors: {data.editor}</Col>
      <br/>
      <Col>• Enter Publisher: {data.publisher}</Col></td>
      <td style={{ textAlign: "center" }}>{data.isbn}</td>
      <td style={{ textAlign: "center" }}>{data.peerreview}</td>
      <td style={{ textAlign: "center" }}><Col>{data.coauthor}</Col>
      <br/>
      <Col>• First Author: {data.mainauthor}</Col></td>
      
      <td style={{ textAlign: "center" }}>{data.selfscore}</td>
      <td>
         <Form.Control
         key={index}
          type="text"
          style={{ textAlign: "center" }}
          value={(ResearchArticlePhod && ResearchArticlePhod[index]) || '0'}
          onChange={(e) => {
            const value = e.target.value;
            const updatedValues = [...ResearchArticlePhod];
            
            if (value === '') {
              updatedValues[index] = 0; 
            } else {
              const numericValue = Number(value);
              if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 50) {
                updatedValues[index] = numericValue;
              } else if (numericValue > 50) {
                updatedValues[index] = 50;
              } else if (numericValue < 0) {
                updatedValues[index] = 0;
              } 
            } 
            setResearchArticlePhod(updatedValues);
          }}
          pattern="\d*" 
          min={0}
          max={50}
        /> 
      </td>
    </tr>
  </tbody>
))}

<tr style={{ textAlign: "left" }}>
            <td></td>
              <td colspan="7" ><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
              <Col>1. Text or Reference Books Published by International Publishers with an established peer review system---- 50 /sole author; 10 /chapter in an edited book</Col>
<Col>2. Subjects Books by National level publishers/State and Central Govt. Publications with ISBN/ISSN numbers ---25 /sole author, and 5/ chapter in edited books</Col>
<Col>3. Subject Books by Other local publishers with ISBN/ISSN numbers --- 15 / sole author, and 3 / chapter in edited book</Col>
<Col>4. Chapters in knowledge based volumes by Indian/National level publishers within/ISSN numbers & with numbers of national & international directories--- 5 / Chapter</Col>
<Col>5. Chapters contributed to edited knowledge based volumes published by International Publishers
- 10 /Chapter</Col>
<Col>6. Chapters in knowledge based volumes by Indian/National level publishers with ISBN/ISSN numbers and with numbers of national and international directories ----5 / Chapter</Col>
<p></p>
<Col >**API for joint publications is as follows:</Col>
<Col>1. Guide or mentor of the faculty gets 40% of the total points</Col>
<Col>2. Proceedings of conferences not considered as a book (example springer conference series). Also one publication is considered only under a single category.</Col>

              </td>
      </tr>
      </Table>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC2} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>

      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Projects (Ongoing)</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Amount</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {facultyData.ResearchProjectON.map((data,index) => (
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td ><Col>Title: {data.title}</Col>
              <br/>
              <Col>Select: {data.whatis}</Col>
              </td>
              <td>{data.agency}</td>
              <td>FROM: {data.periodfrom} <br/> TO: {data.periodto}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              <td>
              
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center"}}
                  value={(ResearchProjectONPhod && ResearchProjectONPhod[index]) || '0'}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedValues = [...ResearchProjectONPhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 30) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 30) {
                        updatedValues[index] = 30;
                      } else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      }
                    }
                    setResearchProjectONPhod(updatedValues);
                  }}
                  pattern="\d*"
                  min={0}
                  max={30}
                  />                
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr style={{ textAlign: "left"}}>
      <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
          <Col>a) Major Projects amount mobilized with grants above 20.0 lakhs 30 points</Col>
<Col>b) Major Projects amount mobilized with grants above 5.0 lakhs 20 points</Col>
<Col>c) Major Projects Amount mobilized with a minimum of Rs. 3.00 lakhs up to Rs. 5.00 lakhs 15 points</Col>
<Col>d) Minor Projects (Amount mobilized with grants above Rs. 25,000 up to Rs. 3 lakh 10 points</Col>
<Col>e) Consultancy Projects amount mobilized with grants above 2.0 lakhs 10 points</Col>
<Col>f) Consultancy Projects completed-Major above 5 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>g) Consultancy Projects completed- Minor below 3 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>h) Projects Outcome /Outputs in the form of Patent/Technology transfer/ Product/Process 30 points at the National level and 50 at the international level</Col>
<Col>i) Need-based projects of the college 10 points</Col>

      </td>
      </tr>
      </Table> 

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC3} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>

      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Projects (Completed)</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Amount</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {facultyData.ResearchProjectCOMP.map((data,index) => (
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td>
              <Col>Title: {data.title}</Col>
              <br/>
              <Col>Select: {data.whatis}</Col></td>
              <td>{data.agency}</td>
              <td>FROM: {data.periodfrom} <br/> TO: {data.periodto}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              <td>
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center"}}
                 value= {(ResearchProjectCOMPPhod && ResearchProjectCOMPPhod[index]) || '0'}
                  onChange= {(e) => {
                    const value = e.target.value;
                    const updatedValues = [...ResearchProjectCOMPPhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 30) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 30) {
                        updatedValues[index] = 30;
                      } else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      }
                    }
                    setResearchProjectCOMPPhod(updatedValues);
                  }}
                  pattern="\d*"
                  min={0}
                  max={30}
                  />
              </td>
              
            </tr>
          </tbody>
        ))
      }
      <tr style={{ textAlign: "left"}}>
      <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
          <Col>a) Major Projects amount mobilized with grants above 20.0 lakhs 30 points</Col>
<Col>b) Major Projects amount mobilized with grants above 5.0 lakhs 20 points</Col>
<Col>c) Major Projects Amount mobilized with a minimum of Rs. 3.00 lakhs up to Rs. 5.00 lakhs 15 points</Col>
<Col>d) Minor Projects (Amount mobilized with grants above Rs. 25,000 up to Rs. 3 lakh 10 points</Col>
<Col>e) Consultancy Projects amount mobilized with grants above 2.0 lakhs 10 points</Col>
<Col>f) Consultancy Projects completed-Major above 5 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>g) Consultancy Projects completed- Minor below 3 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>h) Projects Outcome /Outputs in the form of Patent/Technology transfer/ Product/Process 30 points at the National level and 50 at the international level</Col>
<Col>i) Need-based projects of the college 10 points</Col>

      </td>
      </tr>

      </Table>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC4} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>
      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>Need Based Projects of the Institute completed without Sponsorship and approved by Institute authorities</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Grant/Amount Mobilized (in Lakhs)</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {
        facultyData.ResearchNeedProject.map((data,index) => (
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td>Title: {data.title}</td>
              <td>{data.agency}</td>
              <td>FROM: {data.periodfrom} <br/> TO: {data.periodto}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              <td>
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center"}}
                  value={(ResearchNeedProjectPhod && ResearchNeedProjectPhod[index]) || '0'}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedValues = [...ResearchNeedProjectPhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 10) {
                        updatedValues[index] = 10;
                      } else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      }
                    }
                    setResearchNeedProjectPhod(updatedValues);
                  }}
                 pattern="\d*"
                  min={0}
                  max={10}
                 />
              </td>
              
            </tr>
          </tbody>
        ))
      }
      <tr  style={{ textAlign: "left"}}>
      <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
          <Col>a) Major Projects amount mobilized with grants above 20.0 lakhs 30 points</Col>
<Col>b) Major Projects amount mobilized with grants above 5.0 lakhs 20 points</Col>
<Col>c) Major Projects Amount mobilized with a minimum of Rs. 3.00 lakhs up to Rs. 5.00 lakhs 15 points</Col>
<Col>d) Minor Projects (Amount mobilized with grants above Rs. 25,000 up to Rs. 3 lakh 10 points</Col>
<Col>e) Consultancy Projects amount mobilized with grants above 2.0 lakhs 10 points</Col>
<Col>f) Consultancy Projects completed-Major above 5 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>g) Consultancy Projects completed- Minor below 3 lakhs (Acceptance from the funding agency) 20 points</Col>
<Col>h) Projects Outcome /Outputs in the form of Patent/Technology transfer/ Product/Process 30 points at the National level and 50 at the international level</Col>
<Col>i) Need-based projects of the college 10 points</Col>

      </td>
      </tr>
      </Table> 

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC5} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (d)</th>
      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Guidance</th>
      
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Enrolled</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Thesis Submitted</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Degree Awarded</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>
      
      { facultyData.ResearchGuidance.map((data,index) => (
       
          <tbody key={index}>
           <tr>
            <td>{index + 1}</td>
            <td>
            <Col>{data.enrolled}</Col>
            <br/>
            <Col>Is it M. Phil/ME or PhD: {data.cluster}</Col>
            </td>
            <td>{data.thesis}</td>
            <td>{data.degree}</td>
            <td>{data.selfscore}</td>
            <td>
              <Form.Control
              key={index}
                type="text"
                style={{ textAlign: "center"}}
                value={(ResearchGuidancePhod && ResearchGuidancePhod[index]) || '0'}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedValues = [...ResearchGuidancePhod];
                  
                  if (value === '') {
                    updatedValues[index] = 0; 
                  } else {
                    const numericValue = Number(value);
                    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 50) {
                      updatedValues[index] = numericValue;
                    } else if (numericValue > 50) {
                      updatedValues[index] = 50;
                    } else if (numericValue < 0) {
                      updatedValues[index] = 0;
                    }
                  }
                  setResearchGuidancePhod(updatedValues);
                }}
                max={50}
                pattern="\d*"
                min={0}
                />
            </td>
          </tr>
          </tbody>
        ))     
      }
      <tr style={{ textAlign: "left"}}>
        <td></td>
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
          <Col>1) M. Phil /ME     <Col>Degree awarded–5 /each candidate</Col>
                               <Col>Thesis submitted–2 /each candidate</Col></Col>

          <Col>2) PhD              <Col>Degree awarded	–10 /each candidate</Col> 
                                 <Col>Thesis submitted–7 /each candidate</Col></Col>

        </td>
      </tr>
      </Table> 

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC6} target="_blank">
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
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-i)</th>
      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>TRAINING COURSES AND Faculty Development Programs (not less than one week) max 30pts</th>
      </tr>
      <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Programme</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Criteria</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Duration</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>
      {facultyData.TrainingCourse.map((data,index) => (
        
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{data.programme}</td>
              <td>{data.criteria}</td>
              <td>FROM: {data.durationfrom} <br/> TO: {data.durationto} </td>
              <td>{data.organizedby}</td>
              <td>{data.selfscore}</td>
              <td>
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center"}}
                  value={(TrainingCoursePhod && TrainingCoursePhod[index]) || '0'}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedValues = [...TrainingCoursePhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 20) {
                        updatedValues[index] = 20;
                      } else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      }
                    }
                    setTrainingCoursePhod(updatedValues);
                  }}
                  max={20}
                  pattern="\d*"
                  min={0}
                  />
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr  style={{ textAlign: "left"}}>
        <td></td>
        <td colspan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC7} target="_blank">
            View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
        </div>

      <div className='content-box'>
              <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-ii)</th>
      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>PAPER PRESENTATIONS IN CONFERENCES AND SEMINARS</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of paper</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Seminar/Conference</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

    {facultyData.PaperPresentConference.map((data,index) => (
      
        <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>{data.titlepaper}</td>
            <td>{data.titleseminar}</td>
            <td>{data.organisedby}</td>
            <td>{data.level}</td>
            <td>{data.selfscore}</td>
            <td>
              <Form.Control
              key={index}
                type="text"
                style={{ textAlign: "center"}}
                value={(PaperPresentConferencePhod  && PaperPresentConferencePhod[index]) || '0'}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedValues = [...PaperPresentConferencePhod];
                  
                  if (value === '') {
                    updatedValues[index] = 0; 
                  } else {
                    const numericValue = Number(value);
                    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
                      updatedValues[index] = numericValue;
                    } else if (numericValue > 10) {
                      updatedValues[index] = 10;
                    } else if (numericValue < 0) {
                      updatedValues[index] = 0;
                    }
                  }
                  setPaperPresentConferencePhod(updatedValues);
                }}
                max={10}
                pattern="\d*"
                min={0}
                />
            </td>
          </tr>
        </tbody>
      ))
    }
    <tr  style={{ textAlign: "left"}}>
    <td></td>
      <td colSpan="6"><Col style={{ fontWeight: 'bold' }}>*Level – write I for International, N for National, S for state, R for regional, C for college or University</Col>
      <p></p>
      <Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC8} target="_blank">
            View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div> 
      </div>

      <div className='content-box'>
             <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-iii)</th>
      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>INVITED LECTURES AND CHAIRMANSHIP AT NATIONAL OR INTERNATIONAL CONFERENCE/SEMINAR</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Lecture</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Seminar/Conference</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {facultyData.InvitedLecture.map((data, index) => (
        
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{data.titlelecture}</td>
              <td>{data.titleconference}</td>
              <td>{data.organisedby}</td>
              <td>{data.level}</td>
              <td>{data.selfscore}</td>
              <td>
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center" }}
                  value={(InvitedLecturePhod && InvitedLecturePhod[index]) || '0'}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedValues = [...InvitedLecturePhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 10) {
                        updatedValues[index] = 10;
                      }
                      else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      }
                    }
                    setInvitedLecturePhod(updatedValues);
                  }}
                  max={10}
                  pattern="\d*"
                  min={0}
                 />
              </td>
            </tr>              
          </tbody>
        ))
      }

      <tr style={{ textAlign: "left" }}>
        <td></td>
        <td colspan="6"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
        <Col>a)	International / Foreign conference etc.,---10/ each</Col>
        <Col>b)	National	–-7.5 / each</Col>
        <Col>c)	Regional/State level/local	–-5/ each</Col>
</td>
      </tr>
      </Table> 

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC9} target="_blank">
            View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div>
      </div>

      <div className='content-box'>
             <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (F)</th>
      <th colSpan="6" style={{ textAlign: "center", verticalAlign: "middle" }}>AWARDS AND HONOURS (Maximum 50 points)</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Award</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency Involved</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Discipline</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Verified API Score</th>
        </tr>
      </thead>

      {facultyData.Award.map((data,index) => (
        
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{data.award}</td>
              <td>{data.agencyinvolved}</td>
              <td>{data.level}</td>
              <td>{data.discipline}</td>
              <td>{data.selfscore}</td>
              <td>
                <Form.Control
                key={index}
                  type="text"
                  style={{ textAlign: "center" }}
                  value={(AwardPhod && AwardPhod[index]) || '0'}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedValues = [...AwardPhod];
                    
                    if (value === '') {
                      updatedValues[index] = 0; 
                    } else {
                      const numericValue = Number(value);
                      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 50) {
                        updatedValues[index] = numericValue;
                      } else if (numericValue > 50) {
                        updatedValues[index] = 50;
                      } else if (numericValue < 0) {
                        updatedValues[index] = 0;
                      } 
                    }
                    setAwardPhod(updatedValues);
                  }}
                  max={50}
                  pattern="\d*"
                  min={0}
                 />
                </td>        
            </tr>           
          </tbody>
        ))
      }
      <tr style={{ textAlign: "left" }}>
        <td></td>
        <td colspan="6"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
        <Col style={{ fontWeight: 'bold' }}>III(F)(i) Discipline specific Awards:</Col>
        <Col>1.	Awards by Foreign Universities,AccreditedInternational Bodies-	--50 /each</Col>
        
        <Col>2.	By national bodies like by UGC,CSIR, DST, DBT, ICAR & other Government bodies and Professional Academies like Bhatnagar Award etc.	–- 50 /each</Col>
        <Col>3.	State level/university level	–-	20 /eachd) Regional / local		–- 10 /each</Col>
        <br/>

        <Col style={{ fontWeight: 'bold' }}>III(F)(ii) Honours/ Recognitions</Col>
        <Col>a.	Foreign countries Governments and International bodies like UNESCO etc. –--50 /each</Col>
        <Col>b.	National like Padma Sri etc.	–-- 50 /each</Col>
        <Col>c.	State level/university level	–-- 20 /each</Col>
        <Col>d.	Regional / local by GO/NGOs/Rotary/Lions etc.,	5 /each</Col>
        <Col>e.	Professional Subject Based associations	–-- 5 /each</Col>
        <br/>

        <Col style={{ fontWeight: 'bold' }}>III(F)(iii) Fellowship Titles</Col>
        <Col>a.	Foreign universities/bodies like FRCP, FRCS etc.,	50 /each</Col>
        <Col>b.	Indian Science and other Academies like Fellow of Indian National Science Academy FNA, FNASC, FAMS etc.,	50 /each</Col>
        <Col>c.	Discipline specific National level Associations	10 /each</Col>
        <br/>

        <Col style={{ fontWeight: 'bold' }}>III(F)(iv) Post-doctoral degrees</Col>
        <Col>d.	D.Sc from an university based on post-doctoral thesis	50 /each</Col></td>
      </tr>
      
      </Table> 

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Document</Form.Label>
            <br />
            <a href={facultyData.documentC10} target="_blank">
            View file here
            </a>

          </Form.Group>
          </Col>
          </Row>
          </div> 
      </div>
      
      <Table striped bordered hover>       
        <tbody>
          <tr>
            <td>Total of Category III</td>
            <td>{facultyData.IIISelfTotal}</td>
            <td>
              <Form.Text style={{fontSize:'17px'}}>
                {IIIActPhodTotal}
                </Form.Text>
            </td>
          </tr>
        </tbody>
      </Table>
       
      <div className='text-center mb-4'>

        <Row>
          
        </Row>
        <Row>
          
          <Col>
            <Button variant="primary"  >
            <Link onClick={handleForm2BHODPCNavigation} className="text-decoration-none text-white">
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
            <Button variant="primary" type="submit" onClick={handleSubmit} >
              <Link onClick= {handleForm3HODPCNavigation} className="text-decoration-none text-white">
                Next
              </Link>
            </Button>
          </Col>

        </Row>
          </div>
        </Col>
      </Row>
    </Container>


  )
}

export default Form2CPCH;