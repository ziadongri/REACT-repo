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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

function Form3PCH() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState(null);
  const [teachingDataPC, setTeachingDataPC] = useState("");
  const [extensionDataPC, setExtensionDataPC] = useState("");
  const [researchDataPC, setResearchDataPC] = useState("");
  const [administrationDataPC, setAdministrationDataPC] = useState("");
  const [justificationPC, setJustificationPC] = useState("");
  const [commentshodPC, setCommentsHODPC] = useState("");
  const [suggestionPC, setSuggestionPC] = useState("");

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
        navigate('/');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigate]);


  useEffect(() => {
    const fetchData = async () => {
     const facultyRef = doc(db, "faculty", facultyUID);
     const docRef = doc(facultyRef, "partC", "partC");
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
       setFacultyData(docSnap.data());
       console.log("Document data:", docSnap.data());
     } else {
       // doc.data() will be undefined in this case
       console.log("No such document!");
     }

     if (docSnap.exists()) {
      setTeachingDataPC(docSnap.data().teaching || "");
      setExtensionDataPC(docSnap.data().extension || "");
      setResearchDataPC(docSnap.data().research || "");
      setAdministrationDataPC(docSnap.data().administration || "");
      setJustificationPC(docSnap.data().justification || "");
      setCommentsHODPC(docSnap.data().commentsHOD || "");
      setSuggestionPC(docSnap.data().suggestion || "");
      }
      console.log("Document data:", docSnap.data());

    }
    fetchData();
  }, [facultyUID]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const facultyRef = doc(db, "faculty", facultyUID);
  //   const docRef = doc(facultyRef, "partC", "partC");
  //   const docSnap = await getDoc(docRef);

  //   if((justificationPC.length > 50 && justificationPC.length < 500) && (commentshodPC.length > 50 && commentshodPC.length < 500) && (suggestionPC.length > 50 && suggestionPC.length < 500)){
  //     if (docSnap.exists()) {
  //       await updateDoc(docRef, {
  //         teaching: teachingDataPC,
  //         extension: extensionDataPC,
  //         research: researchDataPC,
  //         administration: administrationDataPC,
  //         justification: justificationPC,
  //         commentsHOD: commentshodPC,
  //         suggestion: suggestionPC,
  //       });
        
  //     } else {
  //       await setDoc(docRef, {
  //         teaching: teachingDataPC,
  //         extension: extensionDataPC,
  //         research: researchDataPC,
  //         administration: administrationDataPC,
  //         justification: justificationPC,
  //         commentsHOD: commentshodPC,
  //         suggestion: suggestionPC,

  //       });
  //     }
  //     navigate('/formsubmission', {state: {facultyUID: facultyUID}});
  //   } else if(justificationPC.length < 50 || justificationPC.length > 500){
  //     alert("Justification should be between 50 and 500 characters");
  //    } else if(commentshodPC.length < 50 || commentshodPC.length > 500){  
  //       alert("Comments should be between 50 and 500 characters");
  //     } else if(suggestionPC.length < 50 || suggestionPC.length > 500){
  //       alert("Suggestions should be between 50 and 500 characters");
  //     }
  // }

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   const facultyRef = doc(db, "faculty", facultyUID);
  //   const docRef = doc(facultyRef, "partC", "partC");
  //   const docSnap = await getDoc(docRef);

  //   if((justificationPC.length > 50 && justificationPC.length < 500) && (commentshodPC.length > 50 && commentshodPC.length < 500) && (suggestionPC.length > 50 && suggestionPC.length < 500)){
  //     if (docSnap.exists()) {
  //       await updateDoc(docRef, {
  //         teachingpc: teachingDataPC,
  //         extensionpc: extensionDataPC,
  //         researchpc: researchDataPC,
  //         administrationpc: administrationDataPC,
  //         justificationpc: justificationPC,
  //         commentsHODpc: commentshodPC,
  //         suggestionpc: suggestionPC,
  //       });
        
  //     } else {
  //       await setDoc(docRef, {
  //         teachingpc: teachingDataPC,
  //         extensionpc: extensionDataPC,
  //         researchpc: researchDataPC,
  //         administrationpc: administrationDataPC,
  //         justificationpc: justificationPC,
  //         commentsHODpc: commentshodPC,
  //         suggestionpc: suggestionPC,

  //       });
  //     }
  //   alert("Data saved successfully!");
  // } else if(justificationPC.length < 50 || justificationPC.length > 500){
  //   alert("Justification should be between 50 and 500 characters");
  //   } else if(commentshodPC.length < 50 || commentshodPC.length > 500){  
  //     alert("Comments should be between 50 and 500 characters");
  //   } else if(suggestionPC.length < 50 || suggestionPC.length > 500){
  //     alert("Suggestions should be between 50 and 500 characters");
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partC", "partC");
    
    try {
      const docSnap = await getDoc(docRef);
      console.log('Document Snapshot:', docSnap);
  
      if (
        teachingDataPC === "" ||
        extensionDataPC === "" ||
        researchDataPC === "" ||
        administrationDataPC === ""
      ) {
        alert("Please fill in all the required fields (Teaching, Extension, Research, Administration).");
        return;
      }
  
      if (
        justificationPC.length < 50 ||
        justificationPC.length > 500 ||
        commentshodPC.length < 50 ||
        commentshodPC.length > 500 ||
        suggestionPC.length < 50 ||
        suggestionPC.length > 500
      ) {
        alert("Justification, Comments, and Suggestions should each be between 50 and 500 characters.");
        return;
      }
  
      const data = {
        teaching: teachingDataPC,
        extension: extensionDataPC,
        research: researchDataPC,
        administration: administrationDataPC,
        justification: justificationPC,
        commentsHOD: commentshodPC,
        suggestion: suggestionPC,
      };
  
      if (docSnap.exists()) {
        console.log('Updating document...');
        await updateDoc(docRef, data);
      } else {
        console.log('Setting new document...');
        await setDoc(docRef, data);
      }
  
      alert("Form submitted successfully!");
      navigate('/formsubmission', { state: { facultyUID: facultyUID } });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    const facultyRef = doc(db, "faculty", facultyUID);
    const docRef = doc(facultyRef, "partC", "partC");
    
    try {
      const docSnap = await getDoc(docRef);
      console.log('Document Snapshot:', docSnap);
  
      if (
        teachingDataPC === "" ||
        extensionDataPC === "" ||
        researchDataPC === "" ||
        administrationDataPC === ""
      ) {
        alert("Please fill in all the required fields (Teaching, Extension, Research, Administration).");
        return;
      }
  
      if (
        justificationPC.length < 50 ||
        justificationPC.length > 500 ||
        commentshodPC.length < 50 ||
        commentshodPC.length > 500 ||
        suggestionPC.length < 50 ||
        suggestionPC.length > 500
      ) {
        alert("Justification, Comments, and Suggestions should each be between 50 and 500 characters.");
        return;
      }
  
      const data = {
        teaching: teachingDataPC,
        extension: extensionDataPC,
        research: researchDataPC,
        administration: administrationDataPC,
        justification: justificationPC,
        commentsHOD: commentshodPC,
        suggestion: suggestionPC,
      };
  
      if (docSnap.exists()) {
        console.log('Updating document...');
        await updateDoc(docRef, data);
      } else {
        console.log('Setting new document...');
        await setDoc(docRef, data);
      }
  
      alert("Data saved successfully!");
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleForm2AHODNavigation = async (e) => {
    e.preventDefault();
    navigate('/form2ahod', { state: { facultyUID: facultyUID } });
  }

  const handleForm2BHODNavigation = async (e) => {
    e.preventDefault();
    navigate('/form2bhod', { state: { facultyUID: facultyUID } });
  }

  const handleForm2CHODPCNavigation = async (e) => {
    e.preventDefault();
    navigate('/form2cpch', { state: { facultyUID: facultyUID } });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return(
    <Container>
      <Row>
        <Col md={11} className="mx-auto text-center">
          <h1 className="text-center">Part C: Assessment by Head of Department</h1>
          <p>(Adverse remarks as well as remarks of appreciation of any outstanding work shall be brought to the notice of the person concerned by the Principal or Head of the Department with a view to make improvement in the work, by the person concerned.)</p>
          <p style= {{fontWeight:"bold"} }>(a) Assessment by the Head of the Department of the work done under each head of activity : Assessment of Teaching, Extension and Research activities should be based on Verified API Score under respective category as mentioned in Part "A" and shall be made in the following manner.</p>
          <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>Grade</th>
                  <th colSpan="2">Verified API Score</th>
                </tr>
                <tr>
                  <td>Teaching [Category I of Part 'B']</td>
                  <td>Extension [Category II of Part 'B']</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Outstanding (A+)</td>
                  <td>120-150</td>
                  <td>80-100</td>
                </tr>
                <tr>
                  <td>Very Good (A)</td>
                  <td>100-119</td>
                  <td>60-79</td>
                </tr>
                <tr>
                  <td>Positively Good (B+)</td>
                  <td>80-99</td>
                  <td>50-59</td>
                </tr>
                <tr>
                  <td>Good (B)</td>
                  <td>70-79</td>
                  <td>40-49</td>
                </tr>
                <tr>
                  <td>Average (B-)</td>
                  <td>60-69</td>
                  <td>30-39</td>
                </tr>
                <tr>
                  <td>Below Average (C)</td>
                  <td>0-59</td>
                  <td>0-30</td>
                </tr>
              </tbody>
            </Table>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Research [Category III of Part 'B']</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Expected minimum score of 20. Form among Conference paper /needbased project / FDP</td>
                </tr>
              </tbody>
            </Table>
            <br/>
            <br/>
            <p style= {{fontWeight:"bold"} }>
            (b)	Grading : [General Assessment on the basis of the assessment made in Clause 2(a) above]</p>
            <p>
            (A+) Outstanding, (A) Very Good, (B+) Positively Good, (B) Good, (B-) Average, (C) Below Average
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Activity</th>
                  
                  <th>Grade </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <td>Teaching</td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center"}}
                      value={teachingDataPC}
                      onChange={(e) => setTeachingDataPC(e.target.value)}
                    />
                  </td>
                 
                </tr>
                <tr>
                  <td>Extension</td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center"}}
                      value={extensionDataPC}
                      onChange={(e) => setExtensionDataPC(e.target.value)}
                    />
                  </td>
                  
                </tr>
                <tr>
                  <td>Research</td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center"}}
                      value={researchDataPC}
                      onChange={(e) => setResearchDataPC(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Administration</td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center"}}
                      value={administrationDataPC}
                      onChange={(e) => setAdministrationDataPC(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <br/>
            <br/>
            <p style= {{fontWeight:"bold"} }>(c) Justification of assessment of work as outstanding/below average :</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Text className="text-muted">
                (Minimum characters: 50, Maximum characters: 500)
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={justificationPC}
                onChange={(e) => setJustificationPC(e.target.value)}
                minLength={50}
                maxLength={500}
              />
            </Form.Group>
            <br/>
            <br/>
            <p style= {{fontWeight:"bold"} }>Comments of the Head of the Department on (b) and (c) :</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Text className="text-muted">
                (Minimum characters: 50, Maximum characters: 500)
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={commentshodPC}
                onChange={(e) => setCommentsHODPC(e.target.value)}
                minLength={50}
                maxLength={500}
              />
            </Form.Group>
            <br/>
            <br/>
            <p style= {{fontWeight:"bold"} }>Remarks & Suggestions:</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Text className="text-muted">
                (Minimum characters: 50, Maximum characters: 500)
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={suggestionPC}
                onChange={(e) => setSuggestionPC(e.target.value)}
                minLength={50}
                maxLength={500}
              />
            </Form.Group>
          </Form>
          <div className="text-center mb-4" >
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  <Link onClick={handleForm2CHODPCNavigation}  className="text-decoration-none text-white">
                    Previous
                  </Link>
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Form3PCH;
