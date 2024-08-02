import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (invoiceData, signatureName, signatureImage, withSignature,invoiceId) => {
  const doc = new jsPDF();

  const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const total = subtotal - discountAmount;

  doc.text("Invoice", 10, 10);
  doc.text(`Date: ${invoiceData.date}`, 10, 20);
  doc.text(`InvoiceID: ${invoiceId}`, 10, 30);
  doc.text(`Company: ${invoiceData.company}`, 10, 40);
  doc.text(`Address: ${invoiceData.address}`, 10, 50);
  doc.autoTable({
    startY: 60,
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

    if (signatureImage) {
      doc.addImage(signatureImage, 'PNG', 10, doc.autoTable.previous.finalY + 50, 30, 20); // Adjust dimensions and position as needed
    }
  }

  return doc.output("blob");
};
