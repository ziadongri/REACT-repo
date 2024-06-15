import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table } from 'react-bootstrap'
import {auth, db, storage } from '../firebase'
import {doc, getDoc, setDoc, updateDoc , onSnapshot, collection, query, where, getDocs} from 'firebase/firestore'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Form2C(){
  const [isEditable, setIsEditable] = useState(true); // default to editable

    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(null)
    const [facultyData, setFacultyData] = useState({});
    const [ResearchPublication, setResearchPublication]= useState([])
    const [ ResearchArticle, setResearchArticle]= useState([])
    const [ ResearchProjectON, setResearchProjectON]= useState([])
    const [ ResearchProjectCOMP, setResearchProjectCOMP]= useState([])
    const [ResearchNeedProject, setResearchNeedProject]= useState([])
    const [ ResearchGuidance, setResearchGuidance]= useState([])
    const [ TrainingCourse, setTrainingCourse]= useState([])
    const [PaperPresentConference, setPaperPresentConference]= useState([])
    const[ InvitedLecture, setInvitedLecture]= useState([])
    const [Award, setAward]= useState([])
    const [IIISelfTotal, setIIISelfTotal] = useState(0)
    const [IActTotal, setIActTotal] = useState("");
    const [IIActTotal, setIIActTotal] = useState("");
    const [email, setEmail]= useState('')
    const [uploadedFile, setUploadedFile] = useState(null);
    const [documentC1, setDocumentC1] = useState("");
    const [documentC2, setDocumentC2] = useState("");
    const [documentC3, setDocumentC3] = useState("");
    const [documentC4, setDocumentC4] = useState("");
    const [documentC5, setDocumentC5] = useState("");
    const [documentC6, setDocumentC6] = useState("");
    const [documentC7, setDocumentC7] = useState("");
    const [documentC8, setDocumentC8] = useState("");
    const [documentC9, setDocumentC9] = useState("");
    const [documentC10, setDocumentC10] = useState("");
    
    const navigate = useNavigate()

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

    const [grandTotal, setGrandTotal] = useState(0);

    // Update grand total whenever individual totals change
    useEffect(() => {
      // Calculate grand total
      const total = IActTotal + IIActTotal + IIISelfTotal;
      // Update state
      setGrandTotal(total);
    }, [IActTotal, IIActTotal, IIISelfTotal]);


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
              // Update the corresponding document state based on the identifier
              switch (documentIdentifier) {
                case "documentC1":
                  setDocumentC1(url);
                alert("Document uploaded successfully!"); 
                break;
                case "documentC2":
                  setDocumentC2(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC3":
                  setDocumentC3(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC4":
                  setDocumentC4(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC5":
                  setDocumentC5(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC6":
                  setDocumentC6(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC7":
                  setDocumentC7(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC8":
                  setDocumentC8(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC9":
                  setDocumentC9(url);
                  alert("Document uploaded successfully!"); 
                  break;
                case "documentC10":
                  setDocumentC10(url);
                  alert("Document uploaded successfully!"); 
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
      navigate('/');
    }
    setLoading(false);
  });

  return unsubscribe;
}, [navigate]);


    const handleSave = async (e) => {
      e.preventDefault();
  
      // Define docRef and data variables
      const facultyRef = doc(db, "faculty", user.uid);
      const docRef = doc(facultyRef, "partB", "CategoryC");
      const data = {
          ResearchPublication,
          ResearchArticle,
          ResearchProjectON,
          ResearchProjectCOMP,
          ResearchNeedProject,
          ResearchGuidance,
          TrainingCourse,
          PaperPresentConference,
          InvitedLecture,
          Award,
          IIISelfTotal,
          documentC1,
          documentC2,
          documentC3,
          documentC4,
          documentC5,
          documentC6,
          documentC7,
          documentC8,
          documentC9,
          documentC10
      };
  
      // Check if any required array field is empty
      const requiredArrays = [
          { name: 'ResearchPublication', data: ResearchPublication },
          { name: 'ResearchArticle', data: ResearchArticle },
          { name: 'ResearchProjectON', data: ResearchProjectON },
          { name: 'ResearchProjectCOMP', data: ResearchProjectCOMP },
          { name: 'ResearchNeedProject', data: ResearchNeedProject },
          { name: 'ResearchGuidance', data: ResearchGuidance },
          { name: 'TrainingCourse', data: TrainingCourse },
          { name: 'PaperPresentConference', data: PaperPresentConference },
          { name: 'InvitedLecture', data: InvitedLecture },
          { name: 'Award', data: Award }
      ];
  
      for (const requiredArray of requiredArrays) {
          if (requiredArray.data.length === 0 || requiredArray.data.some(item => Object.values(item).some(value => value === ''))) {
              alert(`Please fill all the fields in the ${requiredArray.name} section!`);
              return;
          }
      }
  
      // Additional validation checks
      if (ResearchPublication.some(item => item.selfscore < 0) ||
          ResearchArticle.some(item => item.selfscore < 0) ||
          ResearchProjectON.some(item => item.selfscore < 0) ||
          ResearchProjectCOMP.some(item => item.selfscore < 0) ||
          ResearchNeedProject.some(item => item.selfscore < 0) ||
          TrainingCourse.some(item => item.selfscore < 0) ||
          PaperPresentConference.some(item => item.selfscore < 0) ||
          InvitedLecture.some(item => item.selfscore < 0) ||
          Award.some(item => item.selfscore < 0) ||
          IIISelfTotal < 0 ||
          isNaN(IIISelfTotal)
      ) {
          alert('Please fill all the numeric fields with positive values only!');
          return;
      }
  else {await setDoc(docRef, data);
    alert("Data saved successfully!");
    }  
    };

 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Define docRef and data variables
      const facultyRef = doc(db, "faculty", user.uid);
      const docRef = doc(facultyRef, "partB", "CategoryC");
      const data = {
          ResearchPublication,
          ResearchArticle,
          ResearchProjectON,
          ResearchProjectCOMP,
          ResearchNeedProject,
          ResearchGuidance,
          TrainingCourse,
          PaperPresentConference,
          InvitedLecture,
          Award,
          IIISelfTotal,
          documentC1,
          documentC2,
          documentC3,
          documentC4,
          documentC5,
          documentC6,
          documentC7,
          documentC8,
          documentC9,
          documentC10
      };
  
      // Check if any required array field is empty
      const requiredArrays = [
          { name: 'ResearchPublication', data: ResearchPublication },
          { name: 'ResearchArticle', data: ResearchArticle },
          { name: 'ResearchProjectON', data: ResearchProjectON },
          { name: 'ResearchProjectCOMP', data: ResearchProjectCOMP },
          { name: 'ResearchNeedProject', data: ResearchNeedProject },
          { name: 'ResearchGuidance', data: ResearchGuidance },
          { name: 'TrainingCourse', data: TrainingCourse },
          { name: 'PaperPresentConference', data: PaperPresentConference },
          { name: 'InvitedLecture', data: InvitedLecture },
          { name: 'Award', data: Award }
      ];
  
      for (const requiredArray of requiredArrays) {
          if (requiredArray.data.length === 0 || requiredArray.data.some(item => Object.values(item).some(value => value === ''))) {
              alert(`Please fill all the fields in the ${requiredArray.name} section!`);
              return;
          }
      }
  
      // Additional validation checks
      if (ResearchPublication.some(item => item.selfscore < 0) ||
          ResearchArticle.some(item => item.selfscore < 0) ||
          ResearchProjectON.some(item => item.selfscore < 0) ||
          ResearchProjectCOMP.some(item => item.selfscore < 0) ||
          ResearchNeedProject.some(item => item.selfscore < 0) ||
          TrainingCourse.some(item => item.selfscore < 0) ||
          PaperPresentConference.some(item => item.selfscore < 0) ||
          InvitedLecture.some(item => item.selfscore < 0) ||
          Award.some(item => item.selfscore < 0) ||
          IIISelfTotal < 0 ||
          isNaN(IIISelfTotal)
      ) {
          alert('Please fill all the numeric fields with positive values only!');
          return;
      }
  else {await setDoc(docRef, data);
    alert("Data saved successfully!");
      navigate('/formsubmission');
      // navigate('/download');
    }  
  };

    const fetchData = async (uid) => {
      const facultyRef = doc(db, "faculty", uid);
      const docRef = doc(facultyRef, "partB", "CategoryC");
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResearchPublication(data.ResearchPublication || []);
          setResearchArticle(data.ResearchArticle || []);
          setResearchProjectON(data.ResearchProjectON || []);
          setResearchProjectCOMP(data.ResearchProjectCOMP || []);
          setResearchNeedProject(data.ResearchNeedProject || []);
          setResearchGuidance(data.ResearchGuidance || []);
          setTrainingCourse(data.TrainingCourse || []);
          setPaperPresentConference(data.PaperPresentConference || []);
          setInvitedLecture(data.InvitedLecture || []);
          setAward(data.Award || []);
          setIIISelfTotal(data.IIISelfTotal || '');
          setDocumentC1(data.documentC1 || "");
          setDocumentC2(data.documentC2 || "");
          setDocumentC3(data.documentC3 || "");
          setDocumentC4(data.documentC4 || "");
          setDocumentC5(data.documentC5 || "");
          setDocumentC6(data.documentC6 || "");
          setDocumentC7(data.documentC7 || "");
          setDocumentC8(data.documentC8 || "");
          setDocumentC9(data.documentC9 || "");
          setDocumentC10(data.documentC10 || "");
        // } else {
        //   setError('User not found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const Total = () => {
      setIIISelfTotal(
        parseFloat(ResearchPublication.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(ResearchArticle.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(ResearchProjectON.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(ResearchProjectCOMP.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) + 
        parseFloat(ResearchNeedProject.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(ResearchGuidance.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(TrainingCourse.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(PaperPresentConference.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(InvitedLecture.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0)) +
        parseFloat(Award.reduce((acc, curr) => acc + parseFloat(curr.selfscore), 0))
      )
    }
    
    useEffect(() => {
      Total()}, [ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP,  ResearchNeedProject, ResearchGuidance, TrainingCourse, PaperPresentConference, InvitedLecture, Award])

    useEffect(() => {
      if (user) {
        fetchData(user.uid);
      }
    }, [user]);

    const handleAddResearchPublication = () => {
      if (ResearchPublication.some((item) => item.title === '' || item.journal==='' || item.volume===''|| item.page==='' || item.isbn==='' || item.sci==='' || item.wos==='' || item.esci ==='' || item.scopus==='' || item.ugccare ==='' || item.isbnissn ==='' || item.proceedings ==='' || item.guidementor ==='' || item.selfscore === '')) {
        alert('Please fill all the fields in the research publication!');
        return;     } 
        // else if (ResearchPublication.some((item) => item.selfscore < 0)) {
        // alert('Please fill all the fields with positive values only!');
        // return;
      // }
      else {
      setResearchPublication((prevResearchPublication) => [
        ...prevResearchPublication,
        { title:'', journal:'', volume:'', page:'', isbn:'', sci: '', wos: '', esci: '', scopus: '', ugccare: '', isbnissn: '', proceedings: '', guidementor: '', selfscore: '' },
      ]);}
    };

    const handleRemoveResearchPublication = (index) => {
      setResearchPublication((prevResearchPublication) => [
        ...prevResearchPublication.filter((item) => prevResearchPublication.indexOf(item) !== index),
      ]);
    };


    const handleAddResearchArticle = () => {
      if (ResearchArticle.some((item) => item.title === '' || item.whatis === '' || item.chapters ==='' || item.booktitle === '' || item.editor=== '' || item.publisher=== '' || item.isbn === '' || item.peerreview === '' || item.coauthor === '' || item.mainauthor==='' || item.selfscore === '')) {
        alert('Please fill all the fields in the research article!');
        return;
      } 
      // else if (ResearchArticle.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle,
        { title: '', whatis: '', chapters: '', booktitle: '', editor:'', publisher:'', isbn: '', peerreview: '', coauthor: '', mainauthor: '', selfscore: '' },
      ]);
    }
    };

    const handleRemoveResearchArticle = (index) => {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle.filter((item) => prevResearchArticle.indexOf(item) !== index),
      ]);
    };

    const handleAddResearchProjectON = () => {
      if (ResearchProjectON.some((item) => item.title === '' || item.whatis === '' || item.agency === '' || item.periodfrom === '' || item.periodto=== '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;      } 
      //   else if (ResearchProjectON.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setResearchProjectON((prevResearchProjectON) => [
        ...prevResearchProjectON,
        { title: '', whatis: '' ,agency: '', periodfrom: '', periodto:'', amount:'', selfscore: '' , ResearchProjectONHOD:'' },
      ]);
    }
    }

    const handleRemoveResearchProjectON = (index) => {
      setResearchProjectON((prevResearchProjectON) => [
        ...prevResearchProjectON.filter((item) => prevResearchProjectON.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchProjectCOMP = () => {
      if (ResearchProjectCOMP.some((item) => item.title === '' || item.whatis === '' || item.agency === '' || item.periodfrom === '' || item.periodto=== ''|| item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;      } 
      //   else if (ResearchProjectCOMP.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP,
        { title: '', whatis: '',agency: '', periodfrom: '', periodto:'', amount: '', selfscore: '' },
      ]);
    }
    }

    const handleRemoveResearchProjectCOMP = (index) => {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP.filter((item) => prevResearchProjectCOMP.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchNeedProject = () => {
      if (ResearchNeedProject.some((item) => item.title === '' || item.whatis === '' ||item.agency === '' || item.periodfrom === '' || item.periodto=== '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;      }
      // else if (ResearchNeedProject.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {

      setResearchNeedProject((prevResearchNeedProject) => [
        ...prevResearchNeedProject,
        { title: '', whatis: '',agency: '', periodfrom: '', periodto:'', amount: '', selfscore: '' },
      ]);
    }
    }

    const handleRemoveResearchNeedProject = (index) => {
      setResearchNeedProject((prevResearchNeedProject) => [
        ...prevResearchNeedProject.filter((item) => prevResearchNeedProject.indexOf(item) !== index),
      ]);
    }    

    const handleAddResearchGuidance = () => {
      if (ResearchGuidance.some((item) => item.enrolled === '' || item.cluster === '' || item.thesis === '' || item.degree === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research guidance!');
        return;      }
      // else if (ResearchGuidance.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {

      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance,
        { enrolled: '', cluster: '', thesis: '', degree: '', selfscore: '' },
      ])}
    }

    const handleRemoveResearchGuidance = (index) => {
      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance.filter((item) => prevResearchGuidance.indexOf(item) !== index),
      ]);
    }

    const handleAddTrainingCourse = () => {
      if (TrainingCourse.some((item) => item.programme === '' || item.criteria=== '' || item.durationfrom === '' || item.durationto=== '' || item.organizedby === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the training course!');
        return;      }
      // else if (TrainingCourse.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setTrainingCourse((prevTrainingCourse) => [
        ...prevTrainingCourse,
        { programme: '',criteria:'', durationfrom: '', durationto:'',organizedby: '', selfscore: '' },
      ]);}
    }

    const handleRemoveTrainingCourse = (index) => {
      setTrainingCourse((prevTrainingCourse) => [
        ...prevTrainingCourse.filter((item) => prevTrainingCourse.indexOf(item) !== index),
      ]);
    }

    const handleAddPaperPresentConference = () => {
      if (PaperPresentConference.some((item) => item.titlepaper === '' || item.titleseminar === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the paper presented in conference!');
        return;     }
      // else if (PaperPresentConference.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setPaperPresentConference((prevPaperPresentConference) => [
        ...prevPaperPresentConference,
        { titlepaper: '', titleseminar: '', organisedby: '', level: '', selfscore: '' },
      ]);}
    }

    const handleRemovePaperPresentConference = (index) => {
      setPaperPresentConference((prevPaperPresentConference) => [
        ...prevPaperPresentConference.filter((item) => prevPaperPresentConference.indexOf(item) !== index),
      ]);
    }

    const handleAddInvitedLecture = () => {
      if (InvitedLecture.some((item) => item.titlelecture === '' || item.titleconference === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the invited lecture!');
        return;      }
      // else if (InvitedLecture.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {
      setInvitedLecture((prevInvitedLecture) => [
        ...prevInvitedLecture,
        { titlelecture: '', titleconference: '', organisedby: '', level: '', selfscore: '' },
      ]); }
    }

    const handleRemoveInvitedLecture = (index) => {
      setInvitedLecture((prevInvitedLecture) => [
        ...prevInvitedLecture.filter((item) => prevInvitedLecture.indexOf(item) !== index),
      ]);
    }

    const handleAddAward = () => {
      if (Award.some((item) => item.award === '' || item.agencyinvolved === '' || item.level === '' || item.discipline === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the award!');
        return;     }
      // else if (Award.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      else {

      setAward((prevAward) => [
        ...prevAward,
        { award: '', agencyinvolved: '', level: '', discipline: '', selfscore: '' },
      ]); }
    }

    const handleRemoveAward = (index) => {
      setAward((prevAward) => [
        ...prevAward.filter((item) => prevAward.indexOf(item) !== index),
      ]);
    }


    return(
      <div >
              <Container fluid >
      <Row >
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

      <th colSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>Max API Score allotted: No maximum score. A percentage of three
years score is considered for promotion as per UGC notification Feb
2018</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title with Journal name , Volume No., page No., ISS/ISBN No.</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Index (indicate serial numbers against applicable)</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
        </tr>
      </thead>

      {
        ResearchPublication.map((researchpublication,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                Enter Title:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researchpublication.title}
                  onChange={(e) => {
                    const newResearchPublication = [...ResearchPublication]
                    newResearchPublication[index].title = e.target.value
                    setResearchPublication(newResearchPublication)
                  }} disabled={!isEditable}
                  required/>

                <br/>
                Enter Journal Name:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researchpublication.journal}
                  onChange={(e) => {
                    const newResearchPublication = [...ResearchPublication]
                    newResearchPublication[index].journal = e.target.value
                    setResearchPublication(newResearchPublication)
                  }} disabled={!isEditable}
                  required/>

                <br/>
                Enter Volume No.:
                {/* <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researchpublication.volume}
                  onChange={(e) => {
                    const newResearchPublication = [...ResearchPublication]
                    newResearchPublication[index].volume = e.target.value
                    setResearchPublication(newResearchPublication)
                  }} disabled={!isEditable}
                  required/> */}
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researchpublication.volume}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  
                  const newValue = /^\d*$/.test(inputValue) ? inputValue : '0';

                  const newResearchPublication = [...ResearchPublication];
                  newResearchPublication[index].volume = newValue; 
                  setResearchPublication(newResearchPublication);
                }}
                disabled={!isEditable}
                required
              />
                 
                <br/>
                Enter Page No.:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researchpublication.page}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const newValue = /^\d*$/.test(inputValue) ? inputValue : '0';
                    const newResearchPublication = [...ResearchPublication];
                    newResearchPublication[index].page = newValue;
                    setResearchPublication(newResearchPublication);
                  }} disabled={!isEditable}
                  required/>

                <br/>
                Enter ISBN/ISSN No.:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researchpublication.isbn}
                  onChange={(e) => {
                    const newResearchPublication = [...ResearchPublication]
                    newResearchPublication[index].isbn = e.target.value
                    setResearchPublication(newResearchPublication)
                  }} disabled={!isEditable}
                  required/>
              </td>

              <td>
                SCI:
                <tr>
                  <td><Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.sci === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].sci = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].sci = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                /></td>
                  <td><Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.sci === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].sci = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].sci = ''
                      setResearchPublication(newResearchPublication)
                    } }}
                  disabled={!isEditable}
                  /></td>
                </tr>
                
                <br/>
                WOS:
               <tr>
                <td>
                <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.wos === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].wos = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].wos = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />
                </td>
                <td>
                <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.wos === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].wos = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].wos = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />
                </td>
               </tr>

                <br/>
                ESCI:
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.esci === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].esci = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].esci = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />
                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.esci === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].esci = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].esci = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />
                  </td>
                </tr>

                <br/>
                SCOPUS:
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.scopus === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].scopus = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].scopus = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />
                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.scopus === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].scopus = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].scopus = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable}
                />

                  </td> </tr>

                <br/>
                 UGC CARE:
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.ugccare === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].ugccare = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].ugccare = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />
                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.ugccare === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].ugccare = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].ugccare = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />
                  </td>
                </tr>

                <br/>
               ISBN/ISSN:
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.isbnissn === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].isbnissn = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].isbnissn = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />

                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.isbnissn === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].isbnissn = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].isbnissn = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />

                  </td>
                </tr>

                <br/>
                Proceedings:
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.proceedings === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].proceedings = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].proceedings = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />

                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.proceedings === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].proceedings = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].proceedings = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />

                  </td>
                </tr>

                <br/>
                Guide/Mentor :
                <tr>
                  <td>
                  <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researchpublication.guidementor === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].guidementor = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].guidementor = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />

                  </td>
                  <td>
                  <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researchpublication.guidementor === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].guidementor = e.target.value
                      setResearchPublication(newResearchPublication)
                    } else {
                      const newResearchPublication = [...ResearchPublication]
                      newResearchPublication[index].guidementor = ''
                      setResearchPublication(newResearchPublication)
                    }
                  }} disabled={!isEditable} />
                
                  </td>
                </tr>

              </td>

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researchpublication.selfscore}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].selfscore = e.target.value
                  setResearchPublication(newResearchPublication)
                } } disabled={!isEditable}
                required/>

              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchPublication(index)}
                  disabled={!isEditable}
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
            
            {documentC1 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC1} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC1 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC1')}  disabled={!isEditable}/>
            
          </Form.Group>
            </Col>
            </Row>
          </div>

        <div className="text-center mb-3">
          <Row>
            <Col>
              <Button variant="primary" onClick={handleAddResearchPublication} disabled={!isEditable}>
                Add Research Publication
              </Button>
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

      <th colSpan="3" style={{ textAlign: "center", verticalAlign: "middle" }}>Max API Score allotted</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title with Page No.</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Book Title, editor and publisher</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>ISS/ISBN No.</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Whether Peer Reviewed?</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>No of Coauthors. Specify if first author.</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}> Self Appraisal Score</th>
        </tr>
      </thead>

      {
        ResearchArticle.map((researcharticle,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                Enter title with Page No.:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researcharticle.title}
                  onChange={(e) =>{
                    const newResearchArticle = [...ResearchArticle]
                    newResearchArticle[index].title = e.target.value
                    setResearchArticle(newResearchArticle)
                  } } disabled={!isEditable}
                  required/>

<br />
      <div>
        Is it a Book or Chapter:
        <Form.Check
          type="radio"
          label="Book"
          name={`article-${index}`}
          value="Book"
          checked={ResearchArticle[index].whatis === 'Book'}
          onChange={(e) => {
            const newResearchArticle = [...ResearchArticle];
            newResearchArticle[index].whatis = e.target.value;
            setResearchArticle(newResearchArticle);
          }}
          disabled={!isEditable}
        />

        <Form.Check
          type="radio"
          label="Chapter"
          name={`article-${index}`}
          value="Chapter"
          checked={ResearchArticle[index].whatis === 'Chapter'}
          onChange={(e) => {
            const newResearchArticle = [...ResearchArticle];
            newResearchArticle[index].whatis = e.target.value;
            setResearchArticle(newResearchArticle);
          }}
          disabled={!isEditable}
        />
      </div>              

                  <br/>
                Enter Chapters:
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={researcharticle.chapters}
                  onChange={(e) =>{
                    const newResearchArticle = [...ResearchArticle]
                    newResearchArticle[index].chapters = e.target.value
                    setResearchArticle(newResearchArticle)
                  } } disabled={!isEditable}
                  required/>
              </td>

              <td>
                Enter Book Title:  
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.booktitle}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].booktitle = e.target.value
                  setResearchArticle(newResearchArticle)
                } } disabled={!isEditable}/>
                
                <br/>
              Enter Editor/Editors:
              <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.editor}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].editor = e.target.value
                  setResearchArticle(newResearchArticle)
                } } disabled={!isEditable}/>

              <br/>
              Enter Publisher:
              <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.publisher}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].publisher = e.target.value
                  setResearchArticle(newResearchArticle)
                } } disabled={!isEditable} />
              </td>

              <td>
              
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.isbn}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].isbn = e.target.value
                  setResearchArticle(newResearchArticle)
                } }  disabled={!isEditable}/>
                
              </td>
              
              
              <td>
                <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researcharticle.peerreview === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].peerreview = e.target.value
                      setResearchArticle(newResearchArticle)
                    } else {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].peerreview = ''
                      setResearchArticle(newResearchArticle)
                    }
                  }} disabled={!isEditable}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researcharticle.peerreview === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].peerreview = e.target.value
                      setResearchArticle(newResearchArticle)
                    } else {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].peerreview = ''
                      setResearchArticle(newResearchArticle)
                    }
                  }} disabled={!isEditable}
                  />
              </td>
              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.coauthor}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].coauthor = e.target.value
                  setResearchArticle(newResearchArticle)
                } } disabled={!isEditable}/>
                <br/>
                <Form.Label>First Author:</Form.Label>

                <Form.Check
                  type="radio"
                  label="Yes"
                  value="Yes"
                  checked={researcharticle.mainauthor === 'Yes'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].mainauthor = e.target.value
                      setResearchArticle(newResearchArticle)
                    }
                  else {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].mainauthor = ''
                      setResearchArticle(newResearchArticle)
                    }
                  }} disabled={!isEditable}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  value="No"
                  checked={researcharticle.mainauthor === 'No'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].mainauthor = e.target.value
                      setResearchArticle(newResearchArticle)
                    } else {
                      const newResearchArticle = [...ResearchArticle]
                      newResearchArticle[index].mainauthor = ''
                      setResearchArticle(newResearchArticle)
                    }
                  }} disabled={!isEditable}
                  />
              </td>

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researcharticle.selfscore}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].selfscore = e.target.value
                  setResearchArticle(newResearchArticle)
                } } disabled={!isEditable}
                required/>

              </td>
              
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchArticle(index)} disabled={!isEditable}
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
              <td colspan="6" ><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC2 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC2} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC2 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC2')} disabled={!isEditable}/>
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchArticle} disabled={!isEditable} >
            <Link className="text-decoration-none text-white">Add Research Article</Link>
          </Button>
          </Col>
          </Row>
          </div>
         </div>

      <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Projects (Ongoing)</th>
    </tr>

    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Grant/Amount Mobilized (in Lakhs)</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self appraisal Score</th>
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
                  style={{ textAlign: "center"}}
                  value={researchprojecton.title}
                  onChange={(e) =>{
                    const newResearchProjectON = [...ResearchProjectON]
                    newResearchProjectON[index].title = e.target.value
                    setResearchProjectON(newResearchProjectON)
                  } } disabled={!isEditable}/>

                  <br/>
                  <div>
                    Select:
                     <Form.Check
                  type="radio"
                  label="Major/Minor Projects"
                  name={`ongoing-${index}`}
                  value="Major/Minor Projects"
                  checked={researchprojecton.whatis === 'Major/Minor Projects'}
                  onChange={(e) => {
                    const newResearchProjectON = [...ResearchProjectON];
                    newResearchProjectON[index].whatis = e.target.value;
                    setResearchProjectON(newResearchProjectON);
                  }}
                  disabled={!isEditable}
                />

                <Form.Check
                  type="radio"
                  label="Consultancy Projects"
                  name={`ongoing-${index}`}
                  value="Consultancy Projects"
                  checked={researchprojecton.whatis === 'Consultancy Projects'}
                  onChange={(e) => {
                    const newResearchProjectON = [...ResearchProjectON];
                    newResearchProjectON[index].whatis = e.target.value;
                    setResearchProjectON(newResearchProjectON);
                  }}
                  disabled={!isEditable} />

                  <Form.Check
                  type="radio"
                  label="Project Outcome/Outputs"
                  name={`ongoing-${index}`}
                  value="Project Outcome/Outputs"
                  checked={researchprojecton.whatis === 'Project Outcome/Outputs'}
                  onChange={(e) => {
                    const newResearchProjectON = [...ResearchProjectON];
                    newResearchProjectON[index].whatis = e.target.value;
                    setResearchProjectON(newResearchProjectON);
                  }}
                  disabled={!isEditable} />

                <Form.Check
                  type="radio"
                  label="Need-based projects"
                  name={`ongoing-${index}`}
                  value="Need-based projects"
                  checked={researchprojecton.whatis === 'Need-based projects'}
                  onChange={(e) => {
                    const newResearchProjectON = [...ResearchProjectON];
                    newResearchProjectON[index].whatis = e.target.value;
                    setResearchProjectON(newResearchProjectON);
                  }}
                  disabled={!isEditable} />
                  </div>
                                  
              </td> 

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojecton.agency}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].agency = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } } disabled={!isEditable}/>
              </td> 

              {/* <td>   
                From:          
                <Form.Control
                type="date"
                style={{ textAlign: "center"}}
                value={ResearchProjectON[0].periodfrom ? ResearchProjectON[0].periodfrom.split('-').reverse().join('-') : ''}
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split('-');
                  const newResearchProjectON = [...ResearchProjectON];
                  newResearchProjectON[0].periodfrom = `${day}-${month}-${year}`;
                  setResearchProjectON(newResearchProjectON);
                }} disabled={!isEditable}/> 

                <br/>
                To:
                <Form.Control
                type="date"
                style={{ textAlign: "center"}}
                value={ResearchProjectON[0].periodto ? ResearchProjectON[0].periodto.split('-').reverse().join('-') : ''}
                min={ResearchProjectON[0].periodfrom}
          onChange={(e) => {
            const [year, month, day] = e.target.value.split('-');
            const newResearchProjectON = [...ResearchProjectON];
            newResearchProjectON[0].periodto = `${day}-${month}-${year}`;
            setResearchProjectON(newResearchProjectON);
          }} disabled={!isEditable}/>
              </td> */}
            <td>
            From:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={
                ResearchProjectON[0].periodfrom || ''
              }
              onChange={(e) => {
                const newResearchProjectON = [...ResearchProjectON];
                newResearchProjectON[0].periodfrom = e.target.value;
                setResearchProjectON(newResearchProjectON);
              }}
              disabled={!isEditable}
            />

            <br />
            To:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={
                ResearchProjectON[0].periodto || ''
              }
              min={ResearchProjectON[0].periodfrom} // Set the min attribute
              onChange={(e) => {
                const newResearchProjectON = [...ResearchProjectON];
                newResearchProjectON[0].periodto = e.target.value;
                setResearchProjectON(newResearchProjectON);
              }}
              disabled={!isEditable}
            />
          </td>

              <td>            
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojecton.amount}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].amount = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } } disabled={!isEditable}/> 
              </td>

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojecton.selfscore}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].selfscore = e.target.value
                  setResearchProjectON(newResearchProjectON)
                } } disabled={!isEditable}/>

              </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchProjectON(index)} disabled={!isEditable}
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
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
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
            
            {documentC3 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC3} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC3 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC3')} disabled={!isEditable}/>
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchProjectON} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Research Project(Ongoing)</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Projects (Completed)</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Grant/Amount Mobilized (in Lakhs)</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self appraisal Score</th>
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
                  style={{ textAlign: "center"}}
                  value={researchprojectcomp.title}
                  onChange={(e) =>{
                    const newResearchProjectCOMP = [...ResearchProjectCOMP]
                    newResearchProjectCOMP[index].title = e.target.value
                    setResearchProjectCOMP(newResearchProjectCOMP)
                  } } disabled={!isEditable}/>

                  <br/>
                  <div>
                    Select:
                    <Form.Check
                  type="radio"
                  label="Major/Minor Projects"
                  name={`comp-${index}`}
                  value="Major/Minor Projects"
                  checked={researchprojectcomp.whatis === 'Major/Minor Projects'}
                  onChange={(e) => {
                    const newResearchProjectCOMP = [...ResearchProjectCOMP];
                    newResearchProjectCOMP[index].whatis = e.target.value;
                    setResearchProjectCOMP(newResearchProjectCOMP);
                  }} disabled={!isEditable} />

                  <Form.Check
                  type="radio"
                  label="Consultancy Projects"
                  name={`comp-${index}`}
                  value="Consultancy Projects"
                  checked={researchprojectcomp.whatis === 'Consultancy Projects'}
                  onChange={(e) => {
                    const newResearchProjectCOMP = [...ResearchProjectCOMP];
                    newResearchProjectCOMP[index].whatis = e.target.value;
                    setResearchProjectCOMP(newResearchProjectCOMP);
                  } } disabled={!isEditable} />

                  <Form.Check
                  type="radio"
                  label="Project Outcome/Outputs"
                  name={`comp-${index}`}
                  value="Project Outcome/Outputs"
                  checked={researchprojectcomp.whatis === 'Project Outcome/Outputs'}
                  onChange={(e) => {
                    const newResearchProjectCOMP = [...ResearchProjectCOMP];
                    newResearchProjectCOMP[index].whatis = e.target.value;
                    setResearchProjectCOMP(newResearchProjectCOMP);
                  }} disabled={!isEditable} />

                  <Form.Check
                  type="radio"
                  label="Need-based projects"
                  name={`comp-${index}`}
                  value="Need-based projects"
                  checked={researchprojectcomp.whatis === 'Need-based projects'}
                  onChange={(e) => {
                    const newResearchProjectCOMP = [...ResearchProjectCOMP];
                    newResearchProjectCOMP[index].whatis = e.target.value;
                    setResearchProjectCOMP(newResearchProjectCOMP);
                  }} disabled={!isEditable} />
                  
                  </div>
              </td> 
              <td>            
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojectcomp.agency}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].agency = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } } disabled={!isEditable}/>
              </td> 

              <td>
            From:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={ResearchProjectCOMP[0].periodfrom || ''}
              onChange={(e) => {
                const newResearchProjectCOMP = [...ResearchProjectCOMP];
                newResearchProjectCOMP[0].periodfrom = e.target.value;
                setResearchProjectCOMP(newResearchProjectCOMP);
              }}
              disabled={!isEditable}
            />

            <br />
            To:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={ResearchProjectCOMP[0].periodto || ''}
              min={ResearchProjectCOMP[0].periodfrom}
              onChange={(e) => {
                const newResearchProjectCOMP = [...ResearchProjectCOMP];
                newResearchProjectCOMP[0].periodto = e.target.value;
                setResearchProjectCOMP(newResearchProjectCOMP);
              }}
              disabled={!isEditable}
            />
          </td>

              <td>             
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojectcomp.amount}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].amount = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } } disabled={!isEditable}/> 
              </td>

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchprojectcomp.selfscore}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].selfscore = e.target.value
                  setResearchProjectCOMP(newResearchProjectCOMP)
                } } disabled={!isEditable}/>

              </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchProjectCOMP(index)} disabled={!isEditable}
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
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC4 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC4} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC4 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC4')} disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchProjectCOMP} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Research Project (Completed) </Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
          <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (c)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>Need Based Projects of the Institute completed without Sponsorship and approved by Institute authorities</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Period</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Grant/Amount Mobilized (in Lakhs)</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self appraisal Score</th>

        </tr>
      </thead>

      {
        ResearchNeedProject.map((researchneedproject,index) => (
          <tbody key={index}>
          <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control

                  type="text"
                  style={{ textAlign: "center"}}
                  value={researchneedproject.title}
                  onChange={(e) =>{
                    const newResearchNeedProject = [...ResearchNeedProject]
                    newResearchNeedProject[index].title = e.target.value
                    setResearchNeedProject(newResearchNeedProject)
                  } } disabled={!isEditable}
                  />
              </td>
              <td>
            
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchneedproject.agency}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].agency = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } } disabled={!isEditable}/>
              </td>

              <td>
            From:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={
                ResearchNeedProject[0].periodfrom || ''
              }
              onChange={(e) => {
                const newResearchNeedProject = [...ResearchNeedProject];
                newResearchNeedProject[0].periodfrom = e.target.value;
                setResearchNeedProject(newResearchNeedProject);
              }}
              disabled={!isEditable}
            />

            <br />
            To:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={
                ResearchNeedProject[0].periodto || ''
              }
              min={ResearchNeedProject[0].periodfrom} // Set the min attribute
              onChange={(e) => {
                const newResearchNeedProject = [...ResearchNeedProject];
                newResearchNeedProject[0].periodto = e.target.value;
                setResearchNeedProject(newResearchNeedProject);
              }}
              disabled={!isEditable}
            />
          </td>

              <td>

                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchneedproject.amount}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].amount = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } } disabled={!isEditable}/>
              </td>

              <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchneedproject.selfscore}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].selfscore = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } } disabled={!isEditable}/>

              </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchNeedProject(index)} disabled={!isEditable}
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
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC5 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC5} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC5 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC5')} disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchNeedProject} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Need Based Project</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (d)</th>

      <th colSpan="4" style={{ textAlign: "center", verticalAlign: "middle" }}>Research Guidance ( For ME and PhD guides only) </th>
      
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}> No: Enrolled</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Thesis Submitted</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Degree Awarded</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self appraisal Score</th>
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
                style={{ textAlign: "center" }}
                value={researchguidance.enrolled}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].enrolled = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } } disabled={!isEditable}/>

                <br/>
                Is it M. Phil/ME or PhD:
                <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researchguidance.cluster}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].cluster = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } } disabled={!isEditable}/>

            </td>
              
            <td>
              <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researchguidance.thesis}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].thesis = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } } disabled={!isEditable}/>
            </td>
            
            <td>
              <Form.Control
                type="text"
                style={{ textAlign: "center" }}
                value={researchguidance.degree}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].degree = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } } disabled={!isEditable}/>
            </td>

                <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={researchguidance.selfscore}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].selfscore = e.target.value
                  setResearchGuidance(newResearchGuidance)
                } } disabled={!isEditable}/>
                </td>

            <td>
              <Button
                variant="danger"
                onClick={() => handleRemoveResearchGuidance(index)} disabled={!isEditable}>
                Remove
              </Button>
            </td>               
           </tr>
          </tbody>
        ))     
      }
      <tr>
        <td></td>
        <td colSpan="4"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC6 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC6} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC6 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC6')} disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchGuidance} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Research Guidance</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-i)</th>

      <th colSpan="4" style={{ textAlign: "center", verticalAlign: "middle" }}>TRAINING COURSES AND Faculty Development Programs (not less than one week) max 30pts</th>
      </tr>
      <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Programme</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Criteria</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Duration</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
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
                  style={{ textAlign: "center"}}
                  value={trainingcourse.programme}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].programme = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } } disabled={!isEditable}/>
              </td>

              <td>
                <Form.Select
                style={{ textAlign: "center"}}
                value={trainingcourse.criteria}
                onChange={(e) =>{
                  const newTrainingCourse = [...TrainingCourse]
                  newTrainingCourse[index].criteria = e.target.value
                  setTrainingCourse(newTrainingCourse)
                } } disabled={!isEditable}> 
                <option value="">Select</option>
                <option value="Courses (not less than three Weeks)/Workshops of not less than one week">Courses (not less than three Weeks)/Workshops of not less than one week</option>
                <option value="International conference/Seminar / Symposia">International conference/Seminar / Symposia</option>
                <option value="National conference/Seminar / Symposia">National conference/Seminar / Symposia</option>
                <option value="State/University/College level conference/Seminar / Symposia">State level / university / college level conference/Seminar / Symposia</option>
                <option value="Online courses of a four weeks duration or more">Online courses of a four weeks duration or more</option>
                </Form.Select>
              </td>

              <td>
            From:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={TrainingCourse[0].durationfrom || ''}
              onChange={(e) => {
                const newTrainingCourse = [...TrainingCourse];
                newTrainingCourse[0].durationfrom = e.target.value;
                setTrainingCourse(newTrainingCourse);
              }}
              disabled={!isEditable}
            />

            <br />
            To:
            <Form.Control
              type="date"
              style={{ textAlign: 'center' }}
              value={TrainingCourse[0].durationto || ''}
              min={TrainingCourse[0].durationfrom}
              onChange={(e) => {
                const newTrainingCourse = [...TrainingCourse];
                newTrainingCourse[0].durationto = e.target.value;
                setTrainingCourse(newTrainingCourse);
              }}
              disabled={!isEditable}
            />
          </td>

              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={trainingcourse.organizedby}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].organizedby = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } } disabled={!isEditable}/>
              </td>

                  <td>
                <Form.Control

                  type="text"
                  style={{ textAlign: "center"}}
                  value={trainingcourse.selfscore}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].selfscore = e.target.value
                    setTrainingCourse(newTrainingCourse)
                  } } disabled={!isEditable}/>

                  </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveTrainingCourse(index)} disabled={!isEditable}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td colspan="4"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC7 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC7} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC7 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC7')} disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddTrainingCourse} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Training Course</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-ii)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>PAPER PRESENTATIONS IN CONFERENCES AND SEMINARS</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Paper Presented</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Seminar/Conference</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
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
                style={{ textAlign: "center" }}
                value={paperpresentconference.titlepaper}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].titlepaper = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } } disabled={!isEditable}/>
            </td>
            <td>
              <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={paperpresentconference.titleseminar}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].titleseminar = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } } disabled={!isEditable}/>
            </td>
            <td>
              <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={paperpresentconference.organisedby}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].organisedby = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } } disabled={!isEditable}/>
            </td>
            <td>
              {/* <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={paperpresentconference.level}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].level = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } }/> */}


                      <Form.Select
                        style={{ textAlign: "center" }}
                        value={paperpresentconference.level}
                        onChange={(e) => {
                          const newPaperPresentConference = [...PaperPresentConference];
                          newPaperPresentConference[index].level = e.target.value;
                          setPaperPresentConference(newPaperPresentConference);
                        }} disabled={!isEditable}
                      >
                        <option value="">Select Level</option>
                        <option value="International">International</option>
                        <option value="National">National</option>
                        <option value="State/Regional">State/Regional</option>
                        <option value="Local - University/College">Local - University/College</option>
                      </Form.Select>

            </td>

                <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={paperpresentconference.selfscore}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].selfscore = e.target.value
                  setPaperPresentConference(newPaperPresentConference)
                } } disabled={!isEditable}/>

                </td>

            <td>
              <Button
                variant="danger"
                onClick={() => handleRemovePaperPresentConference(index)} disabled={!isEditable}>
                Remove
              </Button>
            </td>
          </tr>
        </tbody>
      ))
    }
    <tr>
      <td></td>
      <td colSpan="5"><Col style={{ fontWeight: 'bold' }}>*Level – write I for International, N for National, S for state, R for regional, C for college or University</Col>
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
            
            {documentC8 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC8} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC8 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC8')} disabled={!isEditable}/>
            
          </Form.Group>
            </Col>
            </Row>
          </div>

    <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddPaperPresentConference} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Paper Present Conference</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
    <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (e-iii)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>INVITED LECTURES AND CHAIRMANSHIP AT NATIONAL OR INTERNATIONAL CONFERENCE/SEMINAR</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Lecture</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Title of Seminar/Conference</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Organized by</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
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
                  style={{ textAlign: "center"}}
                  value={invitedlecture.titlelecture}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].titlelecture = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } } disabled={!isEditable}/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={invitedlecture.titleconference}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].titleconference = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } } disabled={!isEditable}/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={invitedlecture.organisedby}
                  onChange={(e) =>{
                    const newInvitedLecture = [...InvitedLecture]
                    newInvitedLecture[index].organisedby = e.target.value
                    setInvitedLecture(newInvitedLecture)
                  } } disabled={!isEditable}/>
              </td>
              <td>
                  <Form.Select
                    style={{ textAlign: "center" }}
                    value={invitedlecture.level}
                    onChange={(e) => {
                      const newInvitedLecture = [...InvitedLecture];
                      newInvitedLecture[index].level = e.target.value;
                      setInvitedLecture(newInvitedLecture);
                    }} disabled={!isEditable}
                  >
                    <option value="">Select Level</option>
                        <option value="International">International</option>
                        <option value="National">National</option>
                        <option value="State/Regional">State/Regional</option>
                        <option value="Local - University/College">Local - University/College</option>
                  </Form.Select>

              </td>

                  <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={invitedlecture.selfscore}
                onChange={(e) =>{
                  const newInvitedLecture = [...InvitedLecture]
                  newInvitedLecture[index].selfscore = e.target.value
                  setInvitedLecture(newInvitedLecture)
                } } disabled={!isEditable}/>

                  </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveInvitedLecture(index)} disabled={!isEditable}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td colspan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            
            {documentC9 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC9} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC9 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC9')} disabled={!isEditable}/>
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddInvitedLecture} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Invited Lecture</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

          <div className="content-box">
      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>III (F)</th>

      <th colSpan="5" style={{ textAlign: "center", verticalAlign: "middle" }}>AWARDS AND HONOURS (Maximum 50 points)</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Award</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Agency Involved</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Level</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Discipline</th>

      <th style={{ textAlign: "center", verticalAlign: "middle" }}>Self Appraisal Score</th>
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
                  style={{ textAlign: "center"}}
                  value={award.award}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].award = e.target.value
                    setAward(newAward)
                  } } disabled={!isEditable}/>
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={award.agencyinvolved}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].agencyinvolved = e.target.value
                    setAward(newAward)
                  } } disabled={!isEditable}/>
              </td>
              <td>
                {/* <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={award.level}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].level = e.target.value
                    setAward(newAward)
                  } }/> */}
                  <Form.Select
                    style={{ textAlign: "center" }}
                    value={award.level}
                    onChange={(e) => {
                      const newAward = [...Award];
                      newAward[index].level = e.target.value;
                      setAward(newAward);
                    }} disabled={!isEditable}
                  >
                    <option value="">Select Level</option>
                        <option value="International">International</option>
                        <option value="National">National</option>
                        <option value="State/Regional">State/Regional</option>
                        <option value="Local - University/College">Local - University/College</option>
                  </Form.Select>

              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center"}}
                  value={award.discipline}
                  onChange={(e) =>{
                    const newAward = [...Award]
                    newAward[index].discipline = e.target.value
                    setAward(newAward)
                  } } disabled={!isEditable}/>
              </td>

                  <td>
                <Form.Control
                type="text"
                style={{ textAlign: "center"}}
                value={award.selfscore}
                onChange={(e) =>{
                  const newAward = [...Award]
                  newAward[index].selfscore = e.target.value
                  setAward(newAward)
                }
                } disabled={!isEditable}/>
                  </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveAward(index)} disabled={!isEditable}>
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>
        ))
      }
      <tr>
        <td></td>
        <td colspan="5"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
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
            
            {documentC10 && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentC10} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentC10 && (
              <Form.Label>Upload supporting documents (pdf)</Form.Label>
            )}
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC10')} disabled={!isEditable} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
              <Button variant="primary" onClick={handleAddAward} disabled={!isEditable}>
            <Link className="text-decoration-none text-white">Add Award</Link>
          </Button>
          </Col>
          </Row>
          </div>
          </div>

      <Table striped bordered hover>
        
        <tbody>
          <tr>
            <td style={{fontSize:'17px', textAlign: 'center'}}>Total of Category III</td>
            <td>
              <Form.Text style={{fontSize:'17px', textAlign: 'center'}}>{IIISelfTotal}</Form.Text>               
            </td>
          </tr>
         
        </tbody>
      </Table>


          
         
       
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
            <Button variant="primary" type="submit" onClick={handleSave}>
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
      </div>

    )
    }
    
export default Form2C;