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
    const [facultyData, setFacultyData] = useState(null);
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
  // const [documentCURL, setDocumentCURL] = useState("");

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
                case "documentC1":
                  setDocumentC1(url);
                  break;
                case "documentC2":
                  setDocumentC2(url);
                  break;
                case "documentC3":
                  setDocumentC3(url);
                  break;
                case "documentC4":
                  setDocumentC4(url);
                  break;
                case "documentC5":
                  setDocumentC5(url);
                  break;
                case "documentC6":
                  setDocumentC6(url);
                  break;
                case "documentC7":
                  setDocumentC7(url);
                  break;
                case "documentC8":
                  setDocumentC8(url);
                  break;
                case "documentC9":
                  setDocumentC9(url);
                  break;
                case "documentC10":
                  setDocumentC10(url);
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
      navigate('/login');
    }
    setLoading(false);
  });

  return unsubscribe;
}, [navigate]);


    const handleSave = async (e) => {
      e.preventDefault();
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
      //         setDocumentCURL(url);
      //         data.documentCURL = url;
      //         setDoc(docRef, data, { merge: true });
      //       });
      //     }
      //   );
      // }
      if (
        [
          ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP, ResearchNeedProject, ResearchGuidance, TrainingCourse,
          PaperPresentConference, InvitedLecture, Award, IIISelfTotal
        ].some(field => field === '' || (Array.isArray(field) && field.some(item => item === '')))
      ) {
        alert('Please fill in all the fields!');
        return;
      }
      else if (ResearchPublication < 0 || ResearchArticle < 0 || ResearchProjectON < 0 || ResearchProjectCOMP < 0 || ResearchNeedProject < 0 || ResearchGuidance < 0 || TrainingCourse < 0 || PaperPresentConference < 0 || InvitedLecture < 0 || Award < 0 || IIISelfTotal < 0) {
        alert('Please fill in all the fields with positive values only!');
        return;
      } 
      else if (isNaN(IIISelfTotal)) {
        alert('Please fill in numeric values only!');
      }

      else if (ResearchPublication.some((item) => item.title === '' || item.sci==='' || item.wos==='' || item.esci ==='' || item.scopus==='' || item.ugccare ==='' || item.isbnissn ==='' || item.proceedings ==='' || item.guidementor ==='' || item.selfscore === '')) {
        alert('Please fill all the fields in the research publication!');
        return;
      } else if (ResearchPublication.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }

        else if (ResearchArticle.some((item) => item.title === '' || item.booktitle === '' || item.isbn === '' || item.peerreview === '' || item.coauthor === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research article!');
        return;
      } else if (ResearchArticle.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }

      else if (ResearchProjectON.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      } else if (ResearchProjectON.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
       
      else  if (ResearchProjectCOMP.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      } else if (ResearchProjectCOMP.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
       
      else  if (ResearchNeedProject.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      }
      else if (ResearchNeedProject.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
  
      else if (TrainingCourse.some((item) => item.programme === '' || item.duration === '' || item.organizedby === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the training course!');
        return;
      }
      else if (TrainingCourse.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
  
      else if (PaperPresentConference.some((item) => item.titlepaper === '' || item.titleseminar === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the paper presented in conference!');
        return;
      }
      else if (PaperPresentConference.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
  
      else if (InvitedLecture.some((item) => item.titlelecture === '' || item.titleconference === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the invited lecture!');
        return;
      }
      else if (InvitedLecture.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
  
      else if (Award.some((item) => item.award === '' || item.agencyinvolved === '' || item.level === '' || item.discipline === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the award!');
        return;
      }
      else if (Award.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      // else if (!documentC1 || !documentC2 || !documentC3 || !documentC4 || !documentC5 || !documentC6 || !documentC7 || !documentC8 || !documentC9 || !documentC10) {
      //   alert("Please upload all the required documents");
      //   return;
      // }
      
      await setDoc(docRef, data);
      
      // navigate('/form2');
    };

    const handleSubmit = async (e) => {
      // e.preventDefault();
      // const facultyRef = doc(db, "faculty", user.uid);
      // const docRef = doc(facultyRef, "partB", "CategoryC");
      // const data = {
      //   ResearchPublication,
      //   ResearchArticle,
      //   ResearchProjectON,
      //   ResearchProjectCOMP,
      //   ResearchNeedProject,
      //   ResearchGuidance,
      //   TrainingCourse,
      //   PaperPresentConference,
      //   InvitedLecture,
      //   Award,
      //   IIISelfTotal,
      //   documentC1,
      //   documentC2,
      //   documentC3,
      //   documentC4,
      //   documentC5,
      //   documentC6,
      //   documentC7,
      //   documentC8,
      //   documentC9,
      //   documentC10
      // };
      
      // if (
      //   [
      //     ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP, ResearchNeedProject, ResearchGuidance, TrainingCourse,
      //     PaperPresentConference, InvitedLecture, Award, IIISelfTotal
      //   ].some(field => field === '' || (Array.isArray(field) && field.some(item => item === '')))
      // ) {
      //   alert('Please fill in all the fields!');
      //   return;
      // }
      // else if (ResearchPublication < 0 || ResearchArticle < 0 || ResearchProjectON < 0 || ResearchProjectCOMP < 0 || ResearchNeedProject < 0 || ResearchGuidance < 0 || TrainingCourse < 0 || PaperPresentConference < 0 || InvitedLecture < 0 || Award < 0 || IIISelfTotal < 0) {
      //   alert('Please fill in all the fields with positive values only!');
      //   return;
      // } 
      // else if (isNaN(IIISelfTotal)) {
      //   alert('Please fill in numeric values only!');
      // }

      // else if (ResearchPublication.some((item) => item.title === '' || item.sci==='' || item.wos==='' || item.esci ==='' || item.scopus==='' || item.ugccare ==='' || item.isbnissn ==='' || item.proceedings ==='' || item.guidementor ==='' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research publication!');
      //   return;
      // } else if (ResearchPublication.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }

      //   else if (ResearchArticle.some((item) => item.title === '' || item.booktitle === '' || item.isbn === '' || item.peerreview === '' || item.coauthor === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research article!');
      //   return;
      // } else if (ResearchArticle.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }

      // else if (ResearchProjectON.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // } else if (ResearchProjectON.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
       
      // else  if (ResearchProjectCOMP.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // } else if (ResearchProjectCOMP.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
       
      // else  if (ResearchNeedProject.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // }
      // else if (ResearchNeedProject.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (TrainingCourse.some((item) => item.programme === '' || item.duration === '' || item.organizedby === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the training course!');
      //   return;
      // }
      // else if (TrainingCourse.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (PaperPresentConference.some((item) => item.titlepaper === '' || item.titleseminar === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the paper presented in conference!');
      //   return;
      // }
      // else if (PaperPresentConference.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (InvitedLecture.some((item) => item.titlelecture === '' || item.titleconference === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the invited lecture!');
      //   return;
      // }
      // else if (InvitedLecture.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (Award.some((item) => item.award === '' || item.agencyinvolved === '' || item.level === '' || item.discipline === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the award!');
      //   return;
      // }
      // else if (Award.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
      
      // await setDoc(docRef, data);
      e.preventDefault();
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
      //         setDocumentCURL(url);
      //         data.documentCURL = url;
      //         setDoc(docRef, data, { merge: true });
      //       });
      //     }
      //   );
      // }
      // if (
      //   [
      //     ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP, ResearchNeedProject, ResearchGuidance, TrainingCourse,
      //     PaperPresentConference, InvitedLecture, Award, IIISelfTotal
      //   ].some(field => field === '' || (Array.isArray(field) && field.some(item => item === '')))
      // ) {
      //   alert('Please fill in all the fields!');
      //   return;
      // }
      // else if (ResearchPublication < 0 || ResearchArticle < 0 || ResearchProjectON < 0 || ResearchProjectCOMP < 0 || ResearchNeedProject < 0 || ResearchGuidance < 0 || TrainingCourse < 0 || PaperPresentConference < 0 || InvitedLecture < 0 || Award < 0 || IIISelfTotal < 0) {
      //   alert('Please fill in all the fields with positive values only!');
      //   return;
      // } 
      // else if (isNaN(IIISelfTotal)) {
      //   alert('Please fill in numeric values only!');
      // }

      // else if (ResearchPublication.some((item) => item.title === '' || item.sci==='' || item.wos==='' || item.esci ==='' || item.scopus==='' || item.ugccare ==='' || item.isbnissn ==='' || item.proceedings ==='' || item.guidementor ==='' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research publication!');
      //   return;
      // } else if (ResearchPublication.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }

      //   else if (ResearchArticle.some((item) => item.title === '' || item.booktitle === '' || item.isbn === '' || item.peerreview === '' || item.coauthor === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research article!');
      //   return;
      // } else if (ResearchArticle.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }

      // else if (ResearchProjectON.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // } else if (ResearchProjectON.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
       
      // else  if (ResearchProjectCOMP.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // } else if (ResearchProjectCOMP.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
       
      // else  if (ResearchNeedProject.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the research project!');
      //   return;
      // }
      // else if (ResearchNeedProject.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (TrainingCourse.some((item) => item.programme === '' || item.duration === '' || item.organizedby === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the training course!');
      //   return;
      // }
      // else if (TrainingCourse.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (PaperPresentConference.some((item) => item.titlepaper === '' || item.titleseminar === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the paper presented in conference!');
      //   return;
      // }
      // else if (PaperPresentConference.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (InvitedLecture.some((item) => item.titlelecture === '' || item.titleconference === '' || item.organisedby === '' || item.level === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the invited lecture!');
      //   return;
      // }
      // else if (InvitedLecture.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }
  
      // else if (Award.some((item) => item.award === '' || item.agencyinvolved === '' || item.level === '' || item.discipline === '' || item.selfscore === '')) {
      //   alert('Please fill all the fields in the award!');
      //   return;
      // }
      // else if (Award.some((item) => item.selfscore < 0)) {
      //   alert('Please fill all the fields with positive values only!');
      //   return;
      // }

      if (
        [
          ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP, ResearchNeedProject, ResearchGuidance, TrainingCourse,
          PaperPresentConference, InvitedLecture, Award, IIISelfTotal
        ].some(field => field === '' || (Array.isArray(field) && field.some(item => item === '')))
      ) {
        alert('Please fill in all the fields!');
        return;
      }
      else if (ResearchPublication < 0 || ResearchArticle < 0 || ResearchProjectON < 0 || ResearchProjectCOMP < 0 || ResearchNeedProject < 0 || ResearchGuidance < 0 || TrainingCourse < 0 || PaperPresentConference < 0 || InvitedLecture < 0 || Award < 0 || IIISelfTotal < 0) {
        alert('Please fill in all the fields with positive values only!');
        return;
      } 
      else if (isNaN(IIISelfTotal)) {
        alert('Please fill in numeric values only!');
        return;
      }

      // else if (!documentC1 || !documentC2 || !documentC3 || !documentC4 || !documentC5 || !documentC6 || !documentC7 || !documentC8 || !documentC9 || !documentC10) {
      //   alert("Please upload all the required documents");
      //   return;
      // }
      
      await setDoc(docRef, data);
       navigate('/formsubmission');
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
      Total()
    }, [ResearchPublication, ResearchArticle, ResearchProjectON, ResearchProjectCOMP,  ResearchNeedProject, ResearchGuidance, TrainingCourse, PaperPresentConference, InvitedLecture, Award])

    useEffect(() => {
      if (user) {
        fetchData(user.uid);
      }
    }, [user]);

    const handleAddResearchPublication = () => {
      if (ResearchPublication.some((item) => item.title === '' || item.sci==='' || item.wos==='' || item.esci ==='' || item.scopus==='' || item.ugccare ==='' || item.isbnissn ==='' || item.proceedings ==='' || item.guidementor ==='' || item.selfscore === '')) {
        alert('Please fill all the fields in the research publication!');
        return;
      } else if (ResearchPublication.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {
      setResearchPublication((prevResearchPublication) => [
        ...prevResearchPublication,
        { sci: '', wos: '', esci: '', scopus: '', ugccare: '', isbnissn: '', proceedings: '', guidementor: '', selfscore: '' },
      ]);}
    };

    const handleRemoveResearchPublication = (index) => {
      setResearchPublication((prevResearchPublication) => [
        ...prevResearchPublication.filter((item) => prevResearchPublication.indexOf(item) !== index),
      ]);
    };


    const handleAddResearchArticle = () => {
      if (ResearchArticle.some((item) => item.title === '' || item.booktitle === '' || item.isbn === '' || item.peerreview === '' || item.coauthor === '' || item.mainauthor==='' || item.selfscore === '')) {
        alert('Please fill all the fields in the research article!');
        return;
      } else if (ResearchArticle.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle,
        { title: '', booktitle: '', isbn: '', peerreview: '', coauthor: '', mainauthor: '', selfscore: '' },
      ]);
    }
    };

    const handleRemoveResearchArticle = (index) => {
      setResearchArticle((prevResearchArticle) => [
        ...prevResearchArticle.filter((item) => prevResearchArticle.indexOf(item) !== index),
      ]);
    };

    const handleAddResearchProjectON = () => {
      if (ResearchProjectON.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      } else if (ResearchProjectON.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {

      setResearchProjectON((prevResearchProjectON) => [

        ...prevResearchProjectON,
        { title: '', agency: '', period: '', amount:'', selfscore: '' , ResearchProjectONHOD:'' },
      ]);
    }
    }

    const handleRemoveResearchProjectON = (index) => {
      setResearchProjectON((prevResearchProjectON) => [
        ...prevResearchProjectON.filter((item) => prevResearchProjectON.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchProjectCOMP = () => {
      if (ResearchProjectCOMP.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      } else if (ResearchProjectCOMP.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP,
        { title: '', agency: '', period: '', amount: '', selfscore: '' },
      ]);
    }
    }

    const handleRemoveResearchProjectCOMP = (index) => {
      setResearchProjectCOMP((prevResearchProjectCOMP) => [
        ...prevResearchProjectCOMP.filter((item) => prevResearchProjectCOMP.indexOf(item) !== index),
      ]);
    }

    const handleAddResearchNeedProject = () => {
      if (ResearchNeedProject.some((item) => item.title === '' || item.agency === '' || item.period === '' || item.amount === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research project!');
        return;
      }
      else if (ResearchNeedProject.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {

      setResearchNeedProject((prevResearchNeedProject) => [
        ...prevResearchNeedProject,
        { title: '', agency: '', period: '', amount: '', selfscore: '' },
      ]);
    }
    }

    const handleRemoveResearchNeedProject = (index) => {
      setResearchNeedProject((prevResearchNeedProject) => [
        ...prevResearchNeedProject.filter((item) => prevResearchNeedProject.indexOf(item) !== index),
      ]);
    }    

    const handleAddResearchGuidance = () => {
      if (ResearchGuidance.some((item) => item.enrolled === '' || item.thesis === '' || item.degree === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the research guidance!');
        return;
      }
      else if (ResearchGuidance.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {

      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance,
        { enrolled: '', thesis: '', degree: '', selfscore: '' },
      ])}
    }

    const handleRemoveResearchGuidance = (index) => {
      setResearchGuidance((prevResearchGuidance) => [
        ...prevResearchGuidance.filter((item) => prevResearchGuidance.indexOf(item) !== index),
      ]);
    }

    const handleAddTrainingCourse = () => {
      if (TrainingCourse.some((item) => item.programme === '' || item.duration === '' || item.organizedby === '' || item.selfscore === '')) {
        alert('Please fill all the fields in the training course!');
        return;
      }
      else if (TrainingCourse.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
      else {
      setTrainingCourse((prevTrainingCourse) => [
        ...prevTrainingCourse,
        { programme: '', duration: '', organizedby: '', selfscore: '' },
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
        return;
      }
      else if (PaperPresentConference.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
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
        return;
      }
      else if (InvitedLecture.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
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
        return;
      }
      else if (Award.some((item) => item.selfscore < 0)) {
        alert('Please fill all the fields with positive values only!');
        return;
      }
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
        {/* style={{fontWeigth:'bold'}} */}
        <h4  style={{fontSize: 20}}>Category III: (Assessment must be based on evidence produced by the teacher such as: copy of publications, project sanction letter, utilization and completion certificates issued by the University and acknowledgements for patent filing and approval letters, students’ Ph.D. award letter, etc.)</h4>
        <Form onSubmit={handleSubmit}></Form>

        <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (a)</th>
      <th colSpan="1">Research Publications (Journals)</th>
      <th colSpan="2">Max API Score allotted: No maximum score. A percentage of three
years score is considered for promotion as per UGC notification Feb
2018</th>
    </tr>

    <tr>
      <th>Title with Journal name , Volume No., page No., ISS/ISBN No.</th>
      <th>Index (indicate serial numbers against applicable)</th>
      <th>Self Appraisal Score</th>
        </tr>
      </thead>

      {
        ResearchPublication.map((researchpublication,index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={researchpublication.title}
                  onChange={(e) => {
                    const newResearchPublication = [...ResearchPublication]
                    newResearchPublication[index].title = e.target.value
                    setResearchPublication(newResearchPublication)
                  }}
                  required/>
              </td>

              <td>
               
               
                <Form.Control
                
                type="text"
                placeholder="Enter sci"
                value={researchpublication.sci || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].sci = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>

                <Form.Control
                type="text"
                placeholder="Enter wos"
                value={researchpublication.wos || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].wos = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter esci"
                value={researchpublication.esci || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].esci = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter scopus"
                value={researchpublication.scopus || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].scopus = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter ugccare"
                value={researchpublication.ugccare || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].ugccare = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter isbnissn"
                value={researchpublication.isbnissn || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].isbnissn = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter proceedings"
                value={researchpublication.proceedings || ''}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].proceedings = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>
                <Form.Control
                type="text"
                placeholder="Enter guidementor"
                value={researchpublication.guidementor || ''  }
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].guidementor = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>

              </td>

              <td>
                <Form.Control
                type="number"
                placeholder="Enter selfscore"
                value={researchpublication.selfscore}
                onChange={(e) => {
                  const newResearchPublication = [...ResearchPublication]
                  newResearchPublication[index].selfscore = e.target.value
                  setResearchPublication(newResearchPublication)
                } }
                required/>

              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchPublication(index)}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC1')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

        <div className="text-center mb-3">
          <Row>
            <Col>
              <Button variant="primary" onClick={handleAddResearchPublication}>
                Add Research Publication
              </Button>
            </Col>
          </Row>
        </div>



        <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (b)</th>
      <th colSpan="3">Articles/ Chapters published in books</th>
      <th colSpan="3">Max API Score allotted</th>
    </tr>
    <tr>
      <th>Title with Page No.</th>
      <th>Book Title, editor and publisher</th>
      <th>ISS/ISBN No.</th>
      <th>Whether Peer Reviewed?</th>
      <th>No of Coauthors. Specify if main author.</th>
      <th>Self Appraisal Score</th>
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
                  } }
                  required/>
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
                  }}
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
                  }}
                  />
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
                <Form.Label>Main:</Form.Label>

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
                  }}
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
                  }}
                  />
              </td>

              <td>
                <Form.Control
                type="number"
                placeholder="Enter selfscore"
                value={researcharticle.selfscore}
                onChange={(e) =>{
                  const newResearchArticle = [...ResearchArticle]
                  newResearchArticle[index].selfscore = e.target.value
                  setResearchArticle(newResearchArticle)
                } }
                required/>

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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC2')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="5">Research Projects (Ongoing)</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Agency</th>
      <th>Period</th>
      <th>Grant/Amount Mobilized (in Lakhs)</th>
      <th>Self appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={researchprojecton.selfscore}
                onChange={(e) =>{
                  const newResearchProjectON = [...ResearchProjectON]
                  newResearchProjectON[index].selfscore = e.target.value
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
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }} >Evaluation Criteria:</Col>
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC3')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="5">Research Projects (Completed)</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Agency</th>
      <th>Period</th>
      <th>Grant/Amount Mobilized (in Lakhs)</th>
      <th>Self appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={researchprojectcomp.selfscore}
                onChange={(e) =>{
                  const newResearchProjectCOMP = [...ResearchProjectCOMP]
                  newResearchProjectCOMP[index].selfscore = e.target.value
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
        <td colSpan="5"><Col style={{ fontWeight: 'bold' }}>Evaluation Criteria:</Col>
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC4')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
        <th rowSpan="2">III (c)</th>
      <th colSpan="5">Need Based Projects of the Institute completed without Sponsorship and approved by Institute authorities</th>
    </tr>
    <tr>
      <th>Title</th>
      <th>Agency</th>
      <th>Period</th>
      <th>Grant/Amount Mobilized (in Lakhs)</th>
      <th>Self appraisal Score</th>

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
                  placeholder="Enter title"
                  value={researchneedproject.title}
                  onChange={(e) =>{
                    const newResearchNeedProject = [...ResearchNeedProject]
                    newResearchNeedProject[index].title = e.target.value
                    setResearchNeedProject(newResearchNeedProject)
                  } }/>
              </td>
              <td>
            
                <Form.Control
                type="text"
                placeholder="Enter agency"
                value={researchneedproject.agency}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].agency = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } }/>
              </td>
              <td>

                <Form.Control
                type="text"
                placeholder="Enter period"
                value={researchneedproject.period}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].period = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } }/>
              </td>
              <td>

                <Form.Control
                type="text"
                placeholder="Enter amount"
                value={researchneedproject.amount}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].amount = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } }/>
              </td>

              <td>
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={researchneedproject.selfscore}
                onChange={(e) =>{
                  const newResearchNeedProject = [...ResearchNeedProject]
                  newResearchNeedProject[index].selfscore = e.target.value
                  setResearchNeedProject(newResearchNeedProject)
                } }/>

              </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveResearchNeedProject(index)}
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC5')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddResearchNeedProject}>
            <Link className="text-decoration-none text-white">Add Need Based Project</Link>
          </Button>
          </Col>
          </Row>
          </div>



      <Table striped bordered hover>
        <thead>
        <tr>
        <th rowSpan="2">III (d)</th>
      <th colSpan="4">Research Guidance ( For ME and PhD guides only) </th>
      
    </tr>
    <tr>
      <th> No: Enrolled</th>
      <th>Thesis Submitted</th>
      <th>Degree Awarded</th>
      <th>Self appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={researchguidance.selfscore}
                onChange={(e) =>{
                  const newResearchGuidance = [...ResearchGuidance]
                  newResearchGuidance[index].selfscore = e.target.value
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC6')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="4">TRAINING COURSES AND Faculty Development Programs (not less than one week) max 30pts</th>
      </tr>
      <tr>
      <th>Programme</th>
      <th>Duration</th>
      <th>Organized by</th>
      <th>Self Appraisal Score</th>
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
                <Form.Control

                  type="text"
                  placeholder="Enter selfscore"
                  value={trainingcourse.selfscore}
                  onChange={(e) =>{
                    const newTrainingCourse = [...TrainingCourse]
                    newTrainingCourse[index].selfscore = e.target.value
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC7')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="5">PAPER PRESENTATIONS IN CONFERENCES AND SEMINARS</th>
    </tr>
    <tr>
      <th>Title of Paper Presented</th>
      <th>Title of Seminar/Conference</th>
      <th>Organized by</th>
      <th>Level</th>
      <th>Self Appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={paperpresentconference.selfscore}
                onChange={(e) =>{
                  const newPaperPresentConference = [...PaperPresentConference]
                  newPaperPresentConference[index].selfscore = e.target.value
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC8')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="5">INVITED LECTURES AND CHAIRMANSHIP AT NATIONAL OR INTERNATIONAL CONFERENCE/SEMINAR</th>
    </tr>
    <tr>
      <th>Title of Lecture</th>
      <th>Title of Seminar/Conference</th>
      <th>Organized by</th>
      <th>Level</th>
      <th>Self Appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={invitedlecture.selfscore}
                onChange={(e) =>{
                  const newInvitedLecture = [...InvitedLecture]
                  newInvitedLecture[index].selfscore = e.target.value
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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC9')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

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
      <th colSpan="5">AWARDS AND HONOURS (Maximum 50 points)</th>
    </tr>
    <tr>
      <th>Award</th>
      <th>Agency Involved</th>
      <th>Level</th>
      <th>Discipline</th>
      <th>Self Appraisal Score</th>
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
                <Form.Control
                type="text"
                placeholder="Enter selfscore"
                value={award.selfscore}
                onChange={(e) =>{
                  const newAward = [...Award]
                  newAward[index].selfscore = e.target.value
                  setAward(newAward)
                }
                }/>

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
            <Form.Control type="file" onChange={(e) => handleUpload(e, 'documentC10')} />
            
          </Form.Group>
            </Col>
            </Row>
          </div>

      <div className="text-center mb-3">
            <Row>
              <Col>
              <Button variant="primary" onClick={handleAddAward}>
            <Link className="text-decoration-none text-white">Add Award</Link>
          </Button>
          </Col>
          </Row>
          </div>

      <Table striped bordered hover>
        
        <tbody>
          <tr>
            <td>Total of Category III</td>
            <td>
              <Form.Text style={{fontSize:'17px'}}>{IIISelfTotal}</Form.Text>               
            </td>
          </tr>
          
        </tbody>
      </Table>



      {/* <div className="text-center mb-3">
            <Row>
              <Col>
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Upload supporting documents (pdf)</Form.Label>
            <Form.Control type="file" onChange={handleUpload} /> */}
            {/* {documentCURL && (
              <>
              <Form.Label>Doucment uploaded successfully</Form.Label>
              <br />
              <a href={documentCURL} target="_blank" rel="noreferrer">
                View Document
              </a>
              </>
            )}
            {!documentCURL && (
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
      <p>*If a paper presented in Conference/Seminar is published in the form of Proceedings, the points would accrue for the publication (III(a) and not under presentation (III(e)(ii))).</p>
       
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
    )
    }
    
export default Form2C;