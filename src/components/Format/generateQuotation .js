import { PDFDocument, rgb } from 'pdf-lib';

export const generateQuotation = async ({ to, date, refNo, gstNo, products = [], termsAndConditions = [] }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const fontSize = 12;
  const rowHeight = 40; // Height of each row in the table
  const columnWidths = {
    srNo: 50,
    particulars: 300,
    hsnSacCode: 100,
    quantity: 80,
    rate: 80,
  };

  // Embed fonts
  const titleFont = await pdfDoc.embedFont('Helvetica-Bold');
  const normalFont = await pdfDoc.embedFont('Helvetica');

  // Add Quotation Title
  page.drawText('QUOTATION', {
    x: width / 2 - 50,
    y: height - 50,
    size: 16,
    font: titleFont,
    color: rgb(0, 0, 0),
  });

  // Add Quotation Details
  page.drawText(`TO: ${to || ''}`, { x: 50, y: height - 80, size: fontSize, font: normalFont });
  page.drawText(`Date: ${date || ''}`, { x: 50, y: height - 100, size: fontSize, font: normalFont });
  page.drawText(`Ref No: ${refNo || ''}`, { x: 50, y: height - 120, size: fontSize, font: normalFont });
  page.drawText(`GST No: ${gstNo || ''}`, { x: 50, y: height - 140, size: fontSize, font: normalFont });

  // Add Table Headers
  let yPosition = height - 180;
  
  page.drawText('Sr. No.', { x: 50, y: yPosition, size: fontSize, font: titleFont });
  page.drawText('Particulars', { x: 100, y: yPosition, size: fontSize, font: titleFont });
  page.drawText('HSN/SAC Code', { x: 400, y: yPosition, size: fontSize, font: titleFont });
  page.drawText('Quantity', { x: 500, y: yPosition, size: fontSize, font: titleFont });
  page.drawText('Rate', { x: 550, y: yPosition, size: fontSize, font: titleFont });

  yPosition -= rowHeight;

  // Add Table Rows
  products.forEach((product, index) => {
    page.drawText(`${index + 1}`, { x: 50, y: yPosition, size: fontSize, font: normalFont });
    page.drawText(`Make ${product.name || ''} Online UPS three ph in three ph out with ${product.number || ''} number of ${product.ah || ''}${product.volt || ''} Volt batteries. Battery warranty: ${product.warranty || ''}`, { x: 100, y: yPosition, size: fontSize, font: normalFont, maxWidth: columnWidths.particulars });
    page.drawText(`${product.hsnSacCode || ''}`, { x: 400, y: yPosition, size: fontSize, font: normalFont });
    page.drawText(`${product.quantity || ''}`, { x: 500, y: yPosition, size: fontSize, font: normalFont });
    page.drawText(`${product.rate || ''}`, { x: 550, y: yPosition, size: fontSize, font: normalFont });
    yPosition -= rowHeight;
  });

  // Add Terms and Conditions
  yPosition -= 20;
  page.drawText('Terms & Conditions:', { x: 50, y: yPosition, size: fontSize, font: titleFont });
  yPosition -= 20;

  termsAndConditions.forEach((term, index) => {
    page.drawText(`${index + 1}. ${term.description || ''}`, { x: 50, y: yPosition, size: fontSize, font: normalFont });
    yPosition -= 20;
  });

  // Add Footer
  yPosition -= 20;
  page.drawText('Thanking you.', { x: 50, y: yPosition, size: fontSize, font: normalFont });
  page.drawText('Yours Truly,', { x: width - 150, y: yPosition, size: fontSize, font: normalFont });

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Return as a Blob
  return new Blob([pdfBytes], { type: 'application/pdf' });
};
