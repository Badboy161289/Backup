import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Packer,
  Document as DocxDocument,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap"; // Add this line

import InvoicePreview from "./InvoicePreview";
import DownloadDropdown from "./DownloadDropdown";
import PreviewModal from "./PreviewModal";
import SignatureModal from "./SignatureModal";

import { invoiceData } from "./data";


const calculateTotal = (items, discount) => {
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * discount) / 100;
  return subtotal - discountAmount;
};

const App = () => {
  const contentRef = useRef();
  const [previewContent, setPreviewContent] = useState(null);
  const [signatureName, setSignatureName] = useState("");
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

  const generatePDF = (withSignature) => {
    const doc = new jsPDF();

    const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const total = subtotal - discountAmount;

    doc.text("Invoice", 10, 10);
    doc.text(`Date: ${invoiceData.date}`, 10, 20);
    doc.text(`Company: ${invoiceData.company}`, 10, 30);
    doc.text(`Address: ${invoiceData.address}`, 10, 40);
    doc.autoTable({
      startY: 50,
      head: [["Description", "Quantity", "Price", "Total"]],
      body: invoiceData.items.map((item) => [
        item.description,
        item.quantity,
        item.price,
        item.quantity * item.price,
      ]),
    });
    doc.text(`Subtotal: ${subtotal}`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Discount: ${invoiceData.discount}%`, 10, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: ${total}`, 10, doc.autoTable.previous.finalY + 30);
    if (withSignature && signatureName) {
      doc.text(`Signed by: ${signatureName}`, 10, doc.autoTable.previous.finalY + 40);
    }

    return doc.output("blob");
  };

  const generateWord = async (withSignature) => {
    const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const total = subtotal - discountAmount;

    const doc = new DocxDocument({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: "Invoice", heading: "Heading1" }),
            new Paragraph({ text: `Date: ${invoiceData.date}` }),
            new Paragraph({ text: `Company: ${invoiceData.company}` }),
            new Paragraph({ text: `Address: ${invoiceData.address}` }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "Description" })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Quantity" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Price" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Total" })],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                ...invoiceData.items.map(
                  (item) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: item.description })],
                          width: { size: 50, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: item.quantity.toString() }),
                          ],
                          width: { size: 15, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: item.price.toString() }),
                          ],
                          width: { size: 15, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: (item.quantity * item.price).toString(),
                            }),
                          ],
                          width: { size: 20, type: WidthType.PERCENTAGE },
                        }),
                      ],
                    })
                ),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Subtotal" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: subtotal.toString(),
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `Discount` })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: `${invoiceData.discount}%`,
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Total" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: total.toString(),
                        }),
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                withSignature && signatureName
                  ? new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "" })],
                          width: { size: 50, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "" })],
                          width: { size: 15, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "Signed by" })],
                          width: { size: 15, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: signatureName,
                            }),
                          ],
                          width: { size: 20, type: WidthType.PERCENTAGE },
                        }),
                      ],
                    })
                  : null,
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
  };

  const generateRTF = (withSignature) => {
    const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const total = subtotal - discountAmount;

    const rtfContent = `
      {\\rtf1\\ansi\\deff0
      {\\fonttbl{\\f0 Times New Roman;}}
      {\\colortbl;\\red0\\green0\\blue0;}
      \\f0\\fs24\\b Invoice\\b0\\line
      Date: ${invoiceData.date}\\line
      Company: ${invoiceData.company}\\line
      Address: ${invoiceData.address}\\line
      \\line
      \\b Description\\b0\\tab\\b Quantity\\b0\\tab\\b Price\\b0\\tab\\b Total\\b0\\line
      ${invoiceData.items
        .map(
          (item) =>
            `${item.description}\\tab ${item.quantity}\\tab ${item.price}\\tab ${
              item.quantity * item.price
            }\\line`
        )
        .join("")}
      \\line
      Subtotal: ${subtotal}\\line
      Discount: ${invoiceData.discount}%\\line
      Total: ${total}\\line
      ${withSignature && signatureName ? `Signed by: ${signatureName}\\line` : ""}
      }
    `;
    return new Blob([rtfContent], { type: "application/rtf" });
  };

  const handlePreview = async (type) => {
    if (!signatureName) {
      alert("Please add a signature before previewing the invoice.");
      handleShow();
      return;
    }

    setPreviewType(type);
    let blob;

    switch (type) {
      case "pdf":
        blob = generatePDF(true);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      case "word":
        blob = await generateWord(true);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      case "rtf":
        blob = generateRTF(true);
        setPreviewContent(URL.createObjectURL(blob));
        break;
      default:
        return;
    }
  };

  const handleDownload = () => {
    let blob;
    switch (previewType) {
      case "pdf":
        blob = generatePDF(true);
        saveAs(blob, "invoice.pdf");
        break;
      case "word":
        generateWord(true).then((blob) => saveAs(blob, "invoice.docx"));
        break;
      case "rtf":
        blob = generateRTF(true);
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
      />
    </div>
  );
};

export default App;
