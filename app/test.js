
// "use client"
// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// import Tesseract from "tesseract.js";
// import { saveAs } from "file-saver";
// import { Document, Packer, Paragraph } from "docx";

// // Use the local worker file for PDF.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry");

// const PDFToWordOCR = () => {
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setLoading(true);
//       const extractedTexts = await convertPDFToText(file);
//       createAndDownloadWordFile(extractedTexts);
//       setLoading(false);
//     }
//   };

//   const convertPDFToText = async (file) => {
//     const extractedTexts = [];
//     try {
//       const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
//       const numPages = pdf.numPages;

//       for (let i = 1; i <= numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 1.5 });
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };

//         await page.render(renderContext).promise;
//         const imageURL = canvas.toDataURL("image/jpeg");

//         const { data: { text } } = await Tesseract.recognize(imageURL, "eng", {
//           logger: (m) => console.log(m), 
//         });
//         extractedTexts.push(text);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     return extractedTexts;
//   };

//   const createAndDownloadWordFile = async (extractedTexts) => {
//     const doc = new Document({
//       sections: [
//         {
//           children: extractedTexts.map((text) => new Paragraph(text)),
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "ExtractedText.docx");
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileUpload} />
//       {loading && <p>Processing PDF and extracting text, please wait...</p>}
//     </div>
//   );
// };

// export default PDFToWordOCR;




// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// import Tesseract from "tesseract.js";

// // Use the local worker file
// pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry");

// const PDFToOCR = () => {
//   const [ocrResults, setOcrResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setLoading(true);
//       const extractedTexts = await convertPDFToText(file);
//       setOcrResults(extractedTexts);
//       setLoading(false);
//     }
//   };

//   const convertPDFToText = async (file) => {
//     const extractedTexts = [];
//     try {
//       const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
//       const numPages = pdf.numPages;

//       for (let i = 1; i <= numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 1.5 });
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };

//         await page.render(renderContext).promise;
//         const imageURL = canvas.toDataURL("image/jpeg");

//         // Perform OCR on the image
//         const { data: { text } } = await Tesseract.recognize(imageURL, "eng", {
//           logger: (m) => console.log(m), // Logs Tesseract.js progress
//         });
//         extractedTexts.push(text);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     return extractedTexts;
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileUpload} />
//       {loading && <p>Processing PDF and extracting text, please wait...</p>}
//       {!loading && ocrResults.length > 0 && (
//         <div>
//           <h3>Extracted Text:</h3>
//           {ocrResults.map((text, index) => (
//             <p key={index}>{text}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PDFToOCR;



// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// import Tesseract from "tesseract.js";

// // Use the local worker file
// pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry");

// const PDFToOCR = () => {
//   const [ocrResults, setOcrResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setLoading(true);
//       const extractedTexts = await convertPDFToText(file);
//       setOcrResults(extractedTexts);
//       setLoading(false);
//     }
//   };

//   const convertPDFToText = async (file) => {
//     const extractedTexts = [];
//     try {
//       const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
//       const numPages = pdf.numPages;

//       for (let i = 1; i <= numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 1.5 });
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };

//         await page.render(renderContext).promise;
//         const imageURL = canvas.toDataURL("image/jpeg");

//         // Perform OCR on the image
//         const { data: { text } } = await Tesseract.recognize(imageURL, "eng");
//         extractedTexts.push(text);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     return extractedTexts;
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileUpload} />
//       {loading && <p>Processing PDF and extracting text, please wait...</p>}
//       {!loading && ocrResults.length > 0 && (
//         <div>
//           <h3>Extracted Text:</h3>
//           {ocrResults.map((text, index) => (
//             <p key={index}>{text}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PDFToOCR;




// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';
// import * as pdfjsLib from 'pdfjs-dist/webpack';

// // Manually set the worker path
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// const OcrPdfComponent = () => {
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [text, setText] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePdfUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedPdf(file);
//     }
//   };

//   const handleOcr = async () => {
//     if (selectedPdf) {
//       setIsProcessing(true);
//       const pdfData = await selectedPdf.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

//       let fullText = '';
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 1 });
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };
//         await page.render(renderContext).promise;

//         const imageUrl = canvas.toDataURL('image/png');
//         const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng');
//         fullText += text + '\n';
//       }

//       setText(fullText);
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div>
//         <p>mm</p>
//       <h2>OCR for PDF in React</h2>
//       <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
//       {selectedPdf && (
//         <div>
//           <button onClick={handleOcr} style={{ display: 'block', margin: '20px 0' }}>
//             {isProcessing ? 'Processing...' : 'Convert PDF to Text'}
//           </button>
//         </div>
//       )}
//       {text && (
//         <div>
//           <h3>Recognized Text:</h3>
//           <pre>{text}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OcrPdfComponent;
