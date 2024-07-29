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
    handleDownload();
    handleClose();
  };

  const generatePDF = () => {
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

    return doc.output("blob");
  };

  const generateWord = async () => {
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
              ],
            }),
          ],
        },
      ],
    });
  
    const blob = await Packer.toBlob(doc);
    return blob;
  };

  const generateRTF = () => {
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
      Address: ${invoiceData.address}\\line\\line
      \\trowd\\trgaph108\\trleft-108
      \\cellx2520\\cellx3780\\cellx5040\\cellx6300
      \\intbl\\b Description\\b0\\cell\\b Quantity\\b0\\cell\\b Price\\b0\\cell\\b Total\\b0\\cell\\row
      ${invoiceData.items
        .map(
          (item) => `
        \\intbl ${item.description}\\cell ${item.quantity}\\cell ${
            item.price
          }\\cell ${item.quantity * item.price}\\cell\\row
      `
        )
        .join("")}
      \\intbl\\cell\\cell\\b Subtotal\\b0\\cell ${subtotal}\\cell\\row
      \\intbl\\cell\\cell\\b Discount\\b0\\cell ${invoiceData.discount}%\\cell\\row
      \\intbl\\cell\\cell\\b Total\\b0\\cell ${total}\\cell\\row
      }
    `;
    const blob = new Blob([rtfContent], { type: "application/rtf" });
    return blob;
  };

  const handlePreview = async (type) => {
  let blob;
  switch (type) {
    case "pdf":
      blob = generatePDF();
      setPreviewContent(URL.createObjectURL(blob));
      setPreviewType(type);
      break;
    case "word":
      blob = await generateWord();
      saveAs(blob, `invoice.${type}`);
      break;
    case "rtf":
      blob = generateRTF();
      saveAs(blob, `invoice.${type}`);
      break;
    default:
      return;
  }
};
  

const handleDownload = async () => {
  let blob;
  switch (previewType) {
    case "pdf":
      blob = generatePDF();
      break;
    case "word":
      blob = await generateWord();
      break;
    case "rtf":
      blob = generateRTF();
      break;
    default:
      return;
  }

  if (signatureName && previewType === "pdf") {
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
    doc.text(`Signed by: ${signatureName}`, 10, doc.autoTable.previous.finalY + 40);

    blob = doc.output("blob");
  }

  saveAs(blob, `invoice.${previewType}`);
  setPreviewContent(null);
};
  return (
    <div className="container mt-5">
      <InvoicePreview invoiceData={invoiceData} calculateTotal={calculateTotal} />
      <DownloadDropdown handlePreview={handlePreview} />
      <PreviewModal
        previewType={previewType}
        previewContent={previewContent}
        handleDownload={handleDownload}
        handleClose={() => setPreviewContent(null)}
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

