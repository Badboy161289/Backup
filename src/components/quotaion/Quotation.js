//DRAFT-1
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebase';
// import { collection, getDocs, addDoc } from 'firebase/firestore';

// function Quotation() {
//   const [products, setProducts] = useState([]);
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [refNo, setRefNo] = useState('');
//   const [gstNo, setGstNo] = useState('');
//   const [termsAndConditions, setTermsAndConditions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const productsRef = collection(db, "products");
//       const productsSnapshot = await getDocs(productsRef);
//       setProducts(productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       })));

//       const termsRef = collection(db, 'termsAndConditions');
//       const termsSnapshot = await getDocs(termsRef);
//       setTermsAndConditions(termsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       })));
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const storeData = async (collectionName, data) => {
//       try {
//         const docRef = await addDoc(collection(db, collectionName), data);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     };

//     const data = {
//       name: "Battery",
//       particulars: "Make 15 KVA/240 V Online UPS three ph in three ph out with 20 number of 100 Ah/12 Volt batteries.",
//       hsnSacCode: "85044040",
//       quantity: "01",
//       rate: "85,500/-",
//       warranty: "42 months prorata from the date of supply."
//     };

//     storeData("products", data);
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const quotationRef = collection(db, 'quotations');
//     await addDoc(quotationRef, {
//       to,
//       date,
//       refNo,
//       gstNo,
//       products,
//       termsAndConditions,
//     });

//     alert('Quotation added successfully!');
//   };

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
//       <div style={{ textAlign: 'right', marginBottom: '20px' }}>
//         <img src="your-company-logo.png" alt="Company Logo" style={{ maxWidth: '200px' }} />
//       </div>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>QUOTATION</h2>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div>
//           <p>TO,</p>
//           <p>{to}</p>
//           <p>Nigadi</p>
//           <p>Ph. 020-12345678</p>
//           <p>Kind Attn: xyz</p>
//         </div>
//         <div>
//           <p>Date: {date}</p>
//           <p>Ref No: {refNo}</p>
//           <p>GST No: {gstNo}</p>
//         </div>
//       </div>
//       <p style={{ textAlign: 'center', marginBottom: '20px' }}>We thank you for your enquiry & are pleased to quote as follows:</p>
//       <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sr. No.</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Particulars</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>HSN/SAC Code</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={product.id}>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                 <p>Make {product.name} Online UPS three ph in three ph out with {product.number} number of {product.ah}{product.volt} Volt batteries.</p>
//                 <p>Battery warranty: {product.warranty}</p>
//               </td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.hsnSacCode}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.quantity}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.rate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Term & Conditions:</p>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {termsAndConditions.map((term, index) => (
//           <li key={term.id} style={{ padding: '5px 0' }}>
//             <p style={{ marginLeft: '20px' }}>{index + 1}] {term.description}</p>
//           </li>
//         ))}
//       </ul>
//       <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
//         <p style={{ textAlign: 'left' }}>Thanking you.</p>
//         <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Yours Truly,</p>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <p>Office 1: Ph: e Ch: ibers, Shiv
//         Tel: (10)242: 3, 26 14, Email: i
//         Marketed by
//         Chowk,
//         Pl e-4 (
//         @gmail.com Web: www.a
//         .com</p>
//       </div>
//     </div>
//   );
// }

// export default Quotation;





//DRAFT-2
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebase';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
// import { PDFDocument, rgb } from 'pdf-lib';

// function Quotation() {
//   const [products, setProducts] = useState([]);
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [refNo, setRefNo] = useState('');
//   const [gstNo, setGstNo] = useState('');
//   const [termsAndConditions, setTermsAndConditions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const productsRef = collection(db, "products");
//       const productsSnapshot = await getDocs(productsRef);
//       setProducts(productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       })));

//       const termsRef = collection(db, 'termsAndConditions');
//       const termsSnapshot = await getDocs(termsRef);
//       setTermsAndConditions(termsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       })));
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const storeData = async (collectionName, data) => {
//       try {
//         const docRef = await addDoc(collection(db, collectionName), data);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     };

//     const data = {
//       name: "Battery",
//       particulars: "Make 15 KVA/240 V Online UPS three ph in three ph out with 20 number of 100 Ah/12 Volt batteries.",
//       hsnSacCode: "85044040",
//       quantity: "01",
//       rate: "85,500/-",
//       warranty: "42 months prorata from the date of supply."
//     };

//     storeData("products", data);
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const quotationRef = collection(db, 'quotations');
//     await addDoc(quotationRef, {
//       to,
//       date,
//       refNo,
//       gstNo,
//       products,
//       termsAndConditions,
//     });

//     alert('Quotation added successfully!');
//   };

//   const handleDownload = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     const { width, height } = page.getSize();
//     const fontSize = 12;

//     // Add content to the PDF
//     page.drawText(`TO: ${to}`, { x: 50, y: height - 50, size: fontSize });
//     page.drawText(`Date: ${date}`, { x: 50, y: height - 70, size: fontSize });
//     page.drawText(`Ref No: ${refNo}`, { x: 50, y: height - 90, size: fontSize });
//     page.drawText(`GST No: ${gstNo}`, { x: 50, y: height - 110, size: fontSize });

//     let yPosition = height - 150;

//     products.forEach((product, index) => {
//       page.drawText(`${index + 1}. ${product.name}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 20;
//       page.drawText(`Particulars: ${product.particulars}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 20;
//       page.drawText(`HSN/SAC Code: ${product.hsnSacCode}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 20;
//       page.drawText(`Quantity: ${product.quantity}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 20;
//       page.drawText(`Rate: ${product.rate}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 40;
//     });

//     yPosition -= 20;
//     page.drawText('Terms & Conditions:', { x: 50, y: yPosition, size: fontSize, color: rgb(0, 0, 1) });
//     yPosition -= 20;

//     termsAndConditions.forEach((term, index) => {
//       page.drawText(`${index + 1}. ${term.description}`, { x: 50, y: yPosition, size: fontSize });
//       yPosition -= 20;
//     });

//     // Serialize the PDF document to bytes
//     const pdfBytes = await pdfDoc.save();

//     // Create a Blob and download the PDF
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'quotation.pdf';
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
//       <div style={{ textAlign: 'right', marginBottom: '20px' }}>
//         <img src="your-company-logo.png" alt="Company Logo" style={{ maxWidth: '200px' }} />
//       </div>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>QUOTATION</h2>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div>
//           <p>TO,</p>
//           <p>{to}</p>
//           <p>Nigadi</p>
//           <p>Ph. 020-12345678</p>
//           <p>Kind Attn: xyz</p>
//         </div>
//         <div>
//           <p>Date: {date}</p>
//           <p>Ref No: {refNo}</p>
//           <p>GST No: {gstNo}</p>
//         </div>
//       </div>
//       <p style={{ textAlign: 'center', marginBottom: '20px' }}>We thank you for your enquiry & are pleased to quote as follows:</p>
//       <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sr. No.</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Particulars</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>HSN/SAC Code</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={product.id}>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                 <p>Make {product.name} Online UPS three ph in three ph out with {product.number} number of {product.ah}{product.volt} Volt batteries.</p>
//                 <p>Battery warranty: {product.warranty}</p>
//               </td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.hsnSacCode}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.quantity}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.rate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Term & Conditions:</p>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {termsAndConditions.map((term, index) => (
//           <li key={term.id} style={{ padding: '5px 0' }}>
//             <p style={{ marginLeft: '20px' }}>{index + 1}] {term.description}</p>
//           </li>
//         ))}
//       </ul>
//       <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
//         <p style={{ textAlign: 'left' }}>Thanking you.</p>
//         <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Yours Truly,</p>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <p>Office 1: Ph: e Ch: ibers, Shiv Tel: (10)242: 3, 26 14, Email: i Marketed by Chowk, Pl e-4 (@gmail.com Web: www.a .com</p>
//       </div>
//       <button onClick={handleDownload} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
//         Download Quotation
//       </button>
//     </div>
//   );
// }

// export default Quotation;


//DRAFT-3
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { generateQuotation } from '../Format/generateQuotation ';

function Quotation() {
  const [products, setProducts] = useState([]);
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [refNo, setRefNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products and terms & conditions from Firestore
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);
      const fetchedProducts = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      if (fetchedProducts.length === 0) {
        // Add dummy data to the products collection if empty
        const dummyProduct = {
          name: "Battery",
          particulars: "Make 15 KVA/240 V Online UPS three ph in three ph out with 20 number of 100 Ah/12 Volt batteries.",
          hsnSacCode: "85044040",
          quantity: "01",
          rate: "85,500/-",
          warranty: "42 months prorata from the date of supply."
        };
        await addDoc(productsRef, dummyProduct);
        // Fetch the products again after adding the dummy data
        const updatedProductsSnapshot = await getDocs(productsRef);
        setProducts(updatedProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })));
      } else {
        setProducts(fetchedProducts);
      }

      const termsRef = collection(db, 'termsAndConditions');
      const termsSnapshot = await getDocs(termsRef);
      setTermsAndConditions(termsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })));

      // Check if "quotations" collection is empty before adding dummy data
      const quotationsRef = collection(db, 'quotations');
      console.log(quotationsRef)
      const quotationsSnapshot = await getDocs(quotationsRef);
      console.log("first")
      console.log(quotationsSnapshot)
      
      if (quotationsSnapshot.empty) {
        // Add dummy data to the quotations collection if empty
        await addDoc(quotationsRef, {
          to: 'Dummy Customer',
          date: '2024-08-08',
          refNo: 'DUMMY1234',
          gstNo: 'DUMMY5678',
          products: [],
          termsAndConditions: [],
        });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const quotationRef = collection(db, 'quotations');
    await addDoc(quotationRef, {
      to,
      date,
      refNo,
      gstNo,
      products,
      termsAndConditions,
    });

    alert('Quotation added successfully!');
  };

  const handleDownload = async () => {
    try {
      const blob = await generateQuotation({ to, date, refNo, gstNo, products, termsAndConditions });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quotation.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating quotation:", error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <img src="your-company-logo.png" alt="Company Logo" style={{ maxWidth: '200px' }} />
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>QUOTATION</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p>TO,</p>
          <p>{to}</p>
          <p>Nigadi</p>
          <p>Ph. 020-12345678</p>
          <p>Kind Attn: xyz</p>
        </div>
        <div>
          <p>Date: {date}</p>
          <p>Ref No: {refNo}</p>
          <p>GST No: {gstNo}</p>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>We thank you for your enquiry & are pleased to quote as follows:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sr. No.</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Particulars</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>HSN/SAC Code</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <p>Make {product.name} Online UPS three ph in three ph out with {product.number} number of {product.ah}{product.volt} Volt batteries.</p>
                <p>Battery warranty: {product.warranty}</p>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.hsnSacCode}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.quantity}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Term & Conditions:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {termsAndConditions.map((term, index) => (
          <li key={term.id} style={{ padding: '5px 0' }}>
            <p style={{ marginLeft: '20px' }}>{index + 1}] {term.description}</p>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <p style={{ textAlign: 'left' }}>Thanking you.</p>
        <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Yours Truly,</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>Office 1: Ph: e Ch: ibers, Shiv Tel: (10)242: 3, 26 14, Email: i Marketed by Chowk, Pl e-4 (@gmail.com Web: www.a .com</p>
      </div>
      <button onClick={handleDownload} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Download Quotation
      </button>
    </div>
  );
}

export default Quotation;
