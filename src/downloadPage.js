// DownloadPage.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import Form1 from './screens/Form1'
import Form2A from './screens/Form2A'
import Form2B from './screens/Form2B'
import Form2C from './screens/Form2C'
import { db, doc, getDoc } from './firebase'; // Adjust the path as per your project setup


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