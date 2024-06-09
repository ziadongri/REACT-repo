import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generatePDF = async (elementIds) => {
  const pdf = new jsPDF();
  for (const [index, id] of elementIds.entries()) {
    const element = document.getElementById(id);
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const imgProperties = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      if (index > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }
  }
  pdf.save("forms.pdf");
}
