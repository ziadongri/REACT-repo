// DownloadPage.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import Form1 from './screens/Form1'
import Form2A from './screens/Form2A'
import Form2B from './screens/Form2B'
import Form2C from './screens/Form2C'
import { db, doc, getDoc } from './firebase'; // Adjust the path as per your project setup

// function DownloadPage() {
//   const [form1Data, setForm1Data] = useState({});
//   const [form2Data, setForm2Data] = useState({});
//   const [form3Data, setForm3Data] = useState({});

//   const fetchData = async (uid, formPath) => {
//     try {
//       const docRef = doc(db, "faculty", uid, "partB", formPath);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const formData = docSnap.data();
//         // Update state with fetched form data
//         if (formPath === "CategoryA") {
//           // Update state for formA
//           setIActb(formData.IActb || "");
//           setIActc(formData.IActc || "");
//           // Update other state variables for formA
//         } else if (formPath === "CategoryB") {
//           // Update state for formB
//           setIIActaSem(formData.IIActaSem || "");
//           setIIActbSem(formData.IIActbSem || "");
//           // Update other state variables for formB
//         } else if (formPath === "CategoryC") {
//           // Update state for formC
//           setResearchPublication(formData.ResearchPublication || []);
//           setResearchArticle(formData.ResearchArticle || []);
//           // Update other state variables for formC
//         }
//       } else {
//         console.log("Document does not exist");
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };
  
//   useEffect(() => {
//     if (user) {
//       fetchData(user.uid, "CategoryA"); // Fetch data for formA
//       fetchData(user.uid, "CategoryB"); // Fetch data for formB
//       fetchData(user.uid, "CategoryC"); // Fetch data for formC
//     }
//   }, [user]);
  
  
//   useEffect(() => {
//     if (user) {
//       fetchData(user.uid);
//     }
//   }, [user]);
  

//   // const generatePDF = () => {
//   //   const doc = new jsPDF();
//   //   // Convert data to strings and format it as needed for PDF
//   //   const form1Content = JSON.stringify(form1Data, null, 2);
//   //   const form2Content = JSON.stringify(form2Data, null, 2);
//   //   const form3Content = JSON.stringify(form3Data, null, 2);

//   //   doc.text(form1Content, 10, 10);
//   //   doc.addPage();
//   //   doc.text(form2Content, 10, 10);
//   //   doc.addPage();
//   //   doc.text(form3Content, 10, 10);

//   //   doc.save('userdata.pdf');
//   // };

//   const generatePDF = () => {
//     try {
//       const doc = new jsPDF();
//       console.log("Form 1 Data:", form1Data);
//       console.log("Form 2 Data:", form2Data);
//       console.log("Form 3 Data:", form3Data);
  
//       // Convert data to strings and format it as needed for PDF
//       const form1Content = JSON.stringify(form1Data, null, 2);
//       const form2Content = JSON.stringify(form2Data, null, 2);
//       const form3Content = JSON.stringify(form3Data, null, 2);
  
//       doc.text(form1Content, 10, 10);
//       doc.addPage();
//       doc.text(form2Content, 10, 10);
//       doc.addPage();
//       doc.text(form3Content, 10, 10);
  
//       doc.save('userdata.pdf');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };
  
//   return (
//     <div>
//       <button onClick={generatePDF}>Download PDF</button>
//       {/* Optional: Display fetched data for debugging */}
//       <div>
//         <h2>Form 1 Data</h2>
//         <pre>{JSON.stringify(form1Data, null, 2)}</pre>
//       </div>
//       <div>
//         <h2>Form 2 Data</h2>
//         <pre>{JSON.stringify(form2Data, null, 2)}</pre>
//       </div>
//       <div>
//         <h2>Form 3 Data</h2>
//         <pre>{JSON.stringify(form3Data, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }

// export default DownloadPage;

const DownloadPage = () => {
  // Define state variables to store form data
  const [form1Data, setForm1Data] = useState({});
  const [form2AData, setForm2AData] = useState({});
  const [form2BData, setForm2BData] = useState({});
  const [form2CData, setForm2CData] = useState({});

  // Function to fetch data from Form 1
  const fetchForm1Data = async () => {
      try {
          const response = await fetch("api/form1");
          const data = await response.json();
          setForm1Data(data);
      } catch (error) {
          console.error("Error fetching Form 1 data:", error);
      }
  };

  // Function to fetch data from Form 2A
  const fetchForm2AData = async () => {
      try {
          const response = await fetch("api/form2A");
          const data = await response.json();
          setForm2AData(data);
      } catch (error) {
          console.error("Error fetching Form 2A data:", error);
      }
  };

  // Function to fetch data from Form 2B
  const fetchForm2BData = async () => {
      try {
          const response = await fetch("api/form2B");
          const data = await response.json();
          setForm2BData(data);
      } catch (error) {
          console.error("Error fetching Form 2B data:", error);
      }
  };

  // Function to fetch data from Form 2C
  const fetchForm2CData = async () => {
      try {
          const response = await fetch("api/form2C");
          const data = await response.json();
          setForm2CData(data);
      } catch (error) {
          console.error("Error fetching Form 2C data:", error);
      }
  };

  // Function will execute on click of button
  const onButtonClick = async () => {
      // Fetch data from all forms
      await fetchForm1Data();
      await fetchForm2AData();
      await fetchForm2BData();
      await fetchForm2CData();

      // Generate PDF using fetched data
      try {
          const doc = new jsPDF();
          // Add content from form data to PDF
          doc.text(JSON.stringify(form1Data), 10, 10);
          doc.addPage();
          doc.text(JSON.stringify(form2AData), 10, 10);
          doc.addPage();
          doc.text(JSON.stringify(form2BData), 10, 10);
          doc.addPage();
          doc.text(JSON.stringify(form2CData), 10, 10);
          // Save PDF
          doc.save('userdata.pdf');
      } catch (error) {
          console.error('Error generating PDF:', error);
      }
  };

  return (
      <>
          <center>
              <h1>Welcome to Geeks for Geeks</h1>
              <h3>Click on below button to download PDF file</h3>
              <button onClick={onButtonClick}>Download PDF</button>
          </center>
      </>
  );
};

export default DownloadPage;