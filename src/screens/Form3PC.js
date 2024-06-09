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

const Form3PC = () => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [facultyData, setFacultyData] = useState(null);
    const [remarksPrincipal, setRemarksPrincipal] = useState("");
  
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
         const docRef = doc(facultyRef, "partC", "partC");
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
           setFacultyData(docSnap.data());
          //  console.log("Document data:", docSnap.data());
          console.log("Document data:", facultyData);
         } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
         }

         if (docSnap.exists()) {
          setRemarksPrincipal(docSnap.data().remarksPrincipal);
          }
          console.log("Document data:", docSnap.data());
        }
        fetchData();
      }, [facultyUID]);
  
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         const facultyRef = doc(db, "faculty", facultyUID);
//         const docRef = doc(facultyRef, "partC", "partC");
//         const docSnap = await getDoc(docRef);

// if(remarksPrincipal.length > 50 && remarksPrincipal.length < 500){
//         if (docSnap.exists()) {
//           await updateDoc(docRef, {
//             remarksPrincipal: remarksPrincipal
//           });
          
//         } else {
//           await setDoc(docRef, {
//                 remarksPrincipal: remarksPrincipal
//           });
//         }

//         navigate('/formsubmission', {state: {facultyUID: facultyUID}});
//       } else if (remarksPrincipal.length < 50 || remarksPrincipal.length > 500){
//         alert("Remarks should be between 50 to 500 characters");
//       }
//       }

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Ensure remarksPrincipal is defined before proceeding
  if (typeof remarksPrincipal === 'undefined' || remarksPrincipal === null) {
    alert("Remarks cannot be undefined");
    return;
  }
  
  if (remarksPrincipal.length < 50 || remarksPrincipal.length > 500) {
    alert("Remarks should be between 50 to 500 characters");
    return;
  }

  const facultyRef = doc(db, "faculty", facultyUID);
  const docRef = doc(facultyRef, "partC", "partC");
  const docSnap = await getDoc(docRef);

  try {
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        remarksPrincipal: remarksPrincipal
      });
    } else {
      await setDoc(docRef, {
        remarksPrincipal: remarksPrincipal
      });
    }
    navigate('/formsubmission', { state: { facultyUID: facultyUID } });
  } catch (error) {
    console.error("Error updating document: ", error);
    alert("An error occurred while submitting the form. Please try again.");
  }
}

  
      const handleForm2APCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form2aprincipal', { state: { facultyUID: facultyUID } });
      }
  
      const handleForm2BPCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form2bprincipal', { state: { facultyUID: facultyUID } });
      }
  
      const handleForm2CPCNavigation = async (e) => {
        e.preventDefault();
        navigate('/form2cprincipal', { state: { facultyUID: facultyUID } });
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
                <th rowSpan="2">Grade</th>
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
                <th>Grade</th>
                
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Teaching</td>
              <td>{facultyData && facultyData.teaching}</td>
              {/* <td>
                <Form.Control
                  type="text"
                  value={facultyData.teaching}
                  // onChange={(e) => setFacultyData(e.target.value)}                 
                />
              </td> */}
            </tr>
  
            <tr>
              <td>Extension</td>
              <td>{facultyData && facultyData.extension}</td>
              {/* <td>
                <Form.Control
                  type="text"
                  value={facultyData.extension || ""}
                  // onChange={(e) => setFacultyData(e.target.value)}
                  
                />
              </td> */}
            </tr>
  
            <tr>
              <td>Research</td>
              <td>{facultyData && facultyData.research}</td>
              {/* <td>
                <Form.Control
                  type="text"
                  value={facultyData.research || ""}
                  // onChange={(e) => setFacultyData(e.target.value)}                  
                />
              </td> */}
            </tr>
  
            <tr>
              <td>Administration</td>
              <td>{facultyData && facultyData.administration}</td>
              {/* <td>
                <Form.Control
                  type="text"
                  value={facultyData && facultyData.administration}
                  // onChange={(e) => setFacultyData(e.target.value)}
                  
                />
              </td> */}
            </tr>
  
            </tbody>
          </Table>
  
          <br/>
          <br/>
  
          <p style= {{fontWeight:"bold"} }>(c) Justification of assessment of work as outstanding/below average :</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Text className="text-muted">
              (Minimum characters: 100, Maximum characters: 500)
            </Form.Text>
            <Form.Control
              as="textarea"
              rows={3}
              value={facultyData && facultyData.justification}
              readOnly
              
            />
          </Form.Group>
  
          <br/>
          <br/>
  
          <p style= {{fontWeight:"bold"} }>Comments of the Head of the Department on (b) and (c) :</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Text className="text-muted">
              (Minimum characters: 100, Maximum characters: 500)
            </Form.Text>
            <Form.Control
              as="textarea"
              rows={3}
              value={facultyData && facultyData.commentsHOD}
              readOnly
              
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
              value={facultyData && facultyData.suggestion}
              readOnly
              
            />
          </Form.Group>

            <br/>
            <br/>

            <p style= {{fontWeight:"bold"} }>Remarks of the Principal:</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Text className="text-muted">
                (Minimum characters: 50, Maximum characters: 500)
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={remarksPrincipal}
                onChange={(e) => setRemarksPrincipal(e.target.value)}
                minLength={50}
                maxLength={500}
              />
            </Form.Group>
          
          </Form>
  
          <div className="text-center mb-4" >
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                <Link onClick={handleForm2CPCNavigation}  className="text-decoration-none text-white">
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
  
      </Col>
      </Row>
      </Container>
  
  
    )
  }
  
  export default Form3PC;
  
