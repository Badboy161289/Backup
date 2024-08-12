import React, { useState, useEffect } from "react";
import InvoicePreview from "../Preview/InvoicePreview.js";
import DownloadDropdown from "../Dropdown/DownloadDropdown.js";
import PreviewModal from "../Preview/PreviewModal.js";
import SignatureModal from "../signature/SignatureModal.js";
import { fetchInvoiceData } from '../../firebase/fetchInvoiceData.js'
import { generatePDF } from "../Format/GeneratePDF.js";
import { generateWord } from "../Format/GenerateWord.js";
import { generateRTF } from "../Format/GenerateRTF.js";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

const calculateTotal = (items, discount) => {
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * discount) / 100;
  return subtotal - discountAmount;
};

export default function MainCompo() {
  const [previewContent, setPreviewContent] = useState(null);
  const [signatureName, setSignatureName] = useState("");
  const [signatureImage, setSignatureImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [previewType, setPreviewType] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceId, setInvoiceId] = useState("");
  const [signatureOption, setSignatureOption] = useState("digital");
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(0);

  fetchInvoiceData().then((data) => setInvoiceData(data[0]));

  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      const id = await generateInvoiceID();
      setInvoiceId(id);
    };
    fetchInvoiceNumber();
  }, []);

  async function generateInvoiceID() {
    const invoiceDocRef = doc(db, "invoices", "invoiceMeta");
    const invoiceDoc = await getDoc(invoiceDocRef);
    let lastInvoiceNumber = 0;

    if (invoiceDoc.exists()) {
      lastInvoiceNumber = invoiceDoc.data().lastInvoiceNumber;
    }

    const newInvoiceNumber = lastInvoiceNumber + 1;
    setLastInvoiceNumber(newInvoiceNumber);

    const d = new Date();
    let day = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    let date = `${day}/${month}/${year}`;
    let id = `${newInvoiceNumber}`;

    await updateDoc(invoiceDocRef, {
      lastInvoiceNumber: newInvoiceNumber
    });

    return id;
  }

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSignatureNameChange = (e) => setSignatureName(e.target.value);

  const addSignature = () => {
    if (!signatureName) {
      alert("Please enter your name to sign the document.");
      return;
    }
    handleClose();
  };

  const handlePreview = async (type) => {
    if (!signatureName || !signatureImage) {
      alert("Please add a signature before previewing the invoice.");
      handleShow();
      return;
    }

    setPreviewType(type);
    let blob;

    switch (type) {
      case "pdf":
        blob = await generatePDF(invoiceData, signatureName, signatureImage, true, invoiceId);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      case "word":
        blob = await generateWord(invoiceData, signatureName, signatureImage, true);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      case "rtf":
        blob = await generateRTF(invoiceData, signatureName, signatureImage, true);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      default:
        return;
    }
  };

  const handleDownload = async () => {
    let blob;
    switch (previewType) {
      case "pdf":
        blob = await generatePDF(invoiceData, signatureName, signatureImage, true, invoiceId);
        saveAs(blob, "invoice.pdf");
        break;
      case "word":
        blob = await generateWord(invoiceData, signatureName, signatureImage, true,invoiceId);
        saveAs(blob, "invoice.docx");
        break;
      case "rtf":
        blob = await generateRTF(invoiceData, signatureName, signatureImage, true,invoiceId);
        saveAs(blob, "invoice.rtf");
        break;
      default:
        return;
    }

    // Update Firestore with the new last invoice number
    const invoiceDocRef = doc(db, "invoices", "invoiceMeta");
    await updateDoc(invoiceDocRef, {
      lastInvoiceNumber: lastInvoiceNumber
    });
  };

  return (
    <div className="container mt-5">
      <InvoicePreview invoiceData={invoiceData} calculateTotal={calculateTotal} invoiceIDGenerate={invoiceId} />
      <div className="text-center my-3">
        <Button variant="primary" onClick={handleShow}>
          Add Signature
        </Button>
      </div>
      <DownloadDropdown handlePreview={handlePreview} />
      <PreviewModal
        previewType={previewType}
        previewContent={previewContent}
        handleDownload={handleDownload}
        handleClose={() => setPreviewContent(null)}
        handleShowSignature={handleShow}
      />
      <SignatureModal
        showModal={showModal}
        handleClose={handleClose}
        signatureName={signatureName}
        handleSignatureNameChange={handleSignatureNameChange}
        addSignature={addSignature}
        setSignatureImage={setSignatureImage}
        signatureOption={signatureOption}
        setSignatureOption={setSignatureOption}
      />
    </div>
  );
}
