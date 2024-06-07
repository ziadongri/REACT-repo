import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert, Table} from 'react-bootstrap';
import {auth, db , storage} from '../firebase';
import {doc, collection, getDoc, setDoc, updateDoc, addDoc} from 'firebase/firestore';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Form2CPC() {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState(null);

    const location = useLocation();
    const facultyUID = location.state.facultyUID;
    console.log(facultyUID);
    let navigate = useNavigate();

    if(!facultyUID){  
      alert("Something went wrong!");
    }
    


    useEffect(() => {
      const unsubscribe= auth.onAuthStateChanged (async (user) => {
        if (user) {
          setUser(user);}
        else{
          navigate('/login');
        }
        setLoading(false);
      });
      return unsubscribe;
    }, [navigate]);

    useEffect(() => {
      const fetchData = async () => {
       const facultyRef = doc(db, "faculty", facultyUID);
       const docRef = doc(facultyRef, "partB", "CategoryC");
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
         setFacultyData(docSnap.data());
         console.log("Document data:", docSnap.data());
       } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
       }
        

      }
      fetchData();
    }, [facultyUID]);

    const handleSubmit = async () => {
      navigate('/form3principal', {state: {facultyUID: facultyUID}});
    }

    const handleForm2APCNavigation = async (e) => {
      e.preventDefault();
      navigate('/form2aprincipal', { state: { facultyUID: facultyUID } });
    }

    const handleForm2BPCNavigation = async (e) => {  
      e.preventDefault();
      navigate('/form2bprincipal', { state: { facultyUID: facultyUID } });
    }

  
    const handleForm3PCNavigation = async (e) => {
      e.preventDefault();
      navigate('/form3principal', { state: { facultyUID: facultyUID } });
    } 

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (!facultyData) {
      return <p>Faculty not found!</p>;
    }


  return (
    <Container fluid>
      <Row>

  <Col  md={11} className="mx-auto text-center" >

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
      <Col>• Enter Journal Name: {data.journal}</Col>
      <Col>• Enter Volume No.: {data.volume}</Col>
     <Col>• Enter Page No.: {data.page}</Col>
      <Col>• Enter ISBN/ISSN No.: {data.isbn}</Col></td>

      <td><Col>• SCI: {data.sci || ''}</Col>
      <Col>• WOS: {data.wos || ''}</Col>
      <Col>• ESCI: {data.esci || ''}</Col>
      <Col>• SCOPUS: {data.scopus || ''}</Col>
      <Col>• UGC CARE: {data.ugccare || ''}</Col>
      <Col>• Having ISBN/ISSN: {data.isbnissn || ''}</Col>
      <Col>• Proceedings: {data.proceedings || ''}</Col>
      <Col>• Guide/Mentor (mention serial number of paper): {data.guidementor || ''}</Col> </td>     
      
      
      <td style={{ textAlign: "center" }}>{data.selfscore}</td>
      {/* <td style={{ textAlign: "center" }}> {facultyData.ResearchPublicationHOD }</td> */}
      <td style={{ textAlign: "center" }}>{facultyData.ResearchPublicationHOD[index]}</td> 
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
      <td>• Enter title with Page No.:{data.title}</td>
      <td>
      <Col>• Enter Book Title:{data.booktitle}</Col>
      <Col>• Enter Editor/Editors: {data.editor}</Col>
      <Col>• Enter Publisher: {data.publisher}</Col></td>
      <td style={{ textAlign: "center" }}>{data.isbn}</td>
      <td style={{ textAlign: "center" }}>{data.peerreview}</td>
      <td style={{ textAlign: "center" }}><Col>{data.coauthor}</Col>
      <Col>• First Author: {data.mainauthor}</Col></td> 
      <td style={{ textAlign: "center" }}>{data.selfscore}</td>
      {/* <td style={{ textAlign: "center" }}>{facultyData.ResearchArticleHOD}</td>  */}
      <td style={{ textAlign: "center" }}>{facultyData.ResearchArticleHOD[index]}</td>   
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
              <td >{data.title}</td>
              <td>{data.agency}</td>
              <td>{data.period}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              {/* <td>{data.ResearchProjectONHOD}</td>  */}
              <td style={{ textAlign: "center" }}>{facultyData.ResearchProjectONHOD[index]}</td>               
            </tr>
          </tbody>
        ))
      }

<tr style={{ textAlign: "left"}}>
        <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
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
              <td>{data.title}</td>
              <td>{data.agency}</td>
              <td>{data.period}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              {/* <td>{data.ResearchProjectCOMPHOD}</td>*/}
              <td style={{ textAlign: "center" }}>{facultyData.ResearchProjectCOMPHOD[index]}</td> 
            </tr>
          </tbody>
        ))}
     
<tr style={{ textAlign: "left"}}>
        <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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

      {facultyData.ResearchNeedProject.map((data,index) => (
        
          <tbody key={index}> 
          <tr>
              <td>{index + 1}</td>
              <td>{data.title}</td>
              <td>{data.agency}</td>
              <td>{data.period}</td>
              <td>{data.amount}</td>
              <td>{data.selfscore}</td>
              {/* <td>{data.ResearchNeedProjectHOD} </td>   */}
              <td style={{ textAlign: "center" }}>{facultyData.ResearchNeedProjectHOD[index]}</td>
            </tr>
          </tbody>
        ))
      }
      <tr  style={{ textAlign: "left"}}>
        <td></td>
        <td colSpan="6"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
         <td>{data.enrolled}</td>
         <td>{data.thesis}</td>
         <td>{data.degree}</td>
         <td>{data.selfscore}</td>
         {/* <td>{data.ResearchGuidanceHOD}</td>  */}
          <td>{facultyData.ResearchGuidanceHOD[index]}</td>
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
            <td>{data.duration}</td>
            <td>{data.organizedby}</td>
            <td>{data.selfscore}</td>
            {/* <td>{data.TrainingCourseHOD}</td>*/}
            <td>{facultyData.TrainingCourseHOD[index]}</td>
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

      <div className="content-box">
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
          {/* <td> {data.PaperPresentConferenceHOD}</td>*/}
          <td>{facultyData.PaperPresentConferenceHOD[index]}</td>
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
     
      <div className="content-box"> 
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
            {/* <td>{data.InvitedLectureHOD} </td> */}
            <td>{facultyData.InvitedLectureHOD[index]}</td>
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

    <div className="content-box">
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
            {/* <td>{data.AwardHOD} </td> */}
            <td>{facultyData.AwardHOD[index]}</td>
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
                {facultyData.IIIActHODTotal}  
            </td>
          </tr>
        </tbody>
      </Table>
       
      <div className='text-center mb-4'>
        <Row>
          
          <Col>
            <Button variant="primary" >
            <Link to="/form2bprincipal" className="text-decoration-none text-white">
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
              Next
            </Button>
          </Col>

        </Row>
          </div>
         
        </Col>
      </Row>
    </Container>


  )
}

export default Form2CPC