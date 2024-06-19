// import React, {useEffect, useState} from 'react';
// import {Container, Row, Col, Form, Button, Alert, Table} from 'react-bootstrap';
// import {auth, db , storage} from '../firebase';
// import {doc, collection, getDoc, setDoc, updateDoc, addDoc} from 'firebase/firestore';
// import {Link, useNavigate, useLocation} from 'react-router-dom';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

// const GrandTotal = () => {
//   const [IActTotal, setIActTotal] = useState(0);
//   const [IIActTotal, setIIActTotal] = useState(0);
//   const [IIISelfTotal, setIIISelfTotal] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const facultyUID = location.state?.facultyUID;

//   useEffect(() => {
//     if (!facultyUID) {
//       alert("Something went wrong: Faculty UID is not provided.");
//       navigate('/'); // Redirect to a safe page
//       return;
//     }

//     const fetchData = async (uid) => {
//       const facultyRef = doc(db, "faculty", uid);
//       const docRef = doc(facultyRef, "partB", "CategoryC");
//       try {
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setIActTotal(data.IActTotal || 0);
//           setIIActTotal(data.IIActTotal || 0);
//           setIIISelfTotal(data.IIISelfTotal || 0);
//           setGrandTotal((data.IActTotal || 0) + (data.IIActTotal || 0) + (data.IIISelfTotal || 0));
//         } else {
//           console.error("No such document!");
//           alert("Something went wrong: Document does not exist.");
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error);
//         alert("Something went wrong while fetching data.");
//       }
//     };

//     fetchData(facultyUID);
//   }, [facultyUID, navigate]);

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h1 className="text-center">Grand Total</h1>
//           <p className="text-center">Form 2A Total: {IActTotal}</p>
//           <p className="text-center">Form 2B Total: {IIActTotal}</p>
//           <p className="text-center">Form 2C Total: {IIISelfTotal}</p>
//           <h2 className="text-center">Grand Total: {grandTotal}</h2>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default GrandTotal;
