import InvoicePreview from "./InvoicePreview";
import DownloadDropdown from "./DownloadDropdown";
import PreviewModal from "./PreviewModal";
import SignatureModal from "./SignatureModal";
import { invoiceData } from "./data";
import { generatePDF } from "./GeneratePDF";
import { generateWord } from "./GenerateWord";
import { generateRTF } from "./GenerateRTF";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import React, { useState } from "react";

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
        blob = await generatePDF(invoiceData, signatureName, signatureImage, true);
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
        blob = await generatePDF(invoiceData, signatureName, signatureImage, true);
        saveAs(blob, "invoice.pdf");
        break;
      case "word":
        blob = await generateWord(invoiceData, signatureName, signatureImage, true);
        saveAs(blob, "invoice.docx");
        break;
      case "rtf":
        blob = await generateRTF(invoiceData, signatureName, signatureImage, true);
        saveAs(blob, "invoice.rtf");
        break;
      default:
        return;
    }
  };

  return (
    <div className="container mt-5">
      <InvoicePreview invoiceData={invoiceData} calculateTotal={calculateTotal} />
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
      />
    </div>
  );
}
