import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDFComponent = ({ customer, customeradd, quotation, details, tandc, inputFields, totalPrice, totaldiscount }) => {

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add customer details
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text('Customer Details', 10, 10);
        doc.setFontSize(12);




        // Define the starting Y position
        const startY = 30;
        let currentY = startY;

        // Function to add a line of text with mixed styles
        function addStyledText(doc, title, titleStyle, data, dataStyle, startX, startY) {
            doc.setFont("helvetica", titleStyle);
            doc.text(title, startX, startY);

            // Move X position after title text
            const titleWidth = doc.getTextWidth(title);
            const dataX = startX + titleWidth;

            doc.setFont("helvetica", dataStyle);
            doc.text(data, dataX, startY);
        }

        // Add lines with mixed styles
        addStyledText(doc, 'Customer Name:', 'bold', customer, 'normal', 10, currentY);
        currentY += 10;  // Move down for the next line

        addStyledText(doc, 'Customer Address:', 'bold', customeradd, 'normal', 10, currentY);
        currentY += 10;  // Move down for the next line

        addStyledText(doc, 'Quotation Validity:', 'bold', `${quotation} days`, 'normal', 10, currentY);
        currentY += 10;  // Move down for the next line

        addStyledText(doc, 'Additional Details:', 'bold', details, 'normal', 10, currentY);
        currentY += 10;  // Move down for the next line


        // Add a space before the table
        doc.text(' ', 10, 60);

        // Define the columns and data for the table
        const columns = ['Sr.No', 'Product Details', 'Quantity', 'Unit Price', 'HSN/SAC', 'Tax', 'Discount', 'Total'];
        const rows = inputFields.map((inputField, index) => [
            index + 1,
            inputField.productdetails,
            inputField.quntity,
            inputField.unitprice,
            inputField.hsn,
            inputField.tax,
            inputField.discount,
            inputField.total
        ]);

        // Add the table to the PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 70,
        });

        // Add total price and discount at the bottom
        
        doc.text(' ', 10, doc.lastAutoTable.finalY + 10);
        
        addStyledText(doc, 'Total Discount: ', 'bold', `${totaldiscount}₹`, 'normal', 150, doc.lastAutoTable.finalY+20);
        addStyledText(doc, 'Grand Total: ', 'bold', `${totalPrice}₹`, 'normal', 150, doc.lastAutoTable.finalY + 30);


        doc.setFont("helvetica", "bold");
        let x = 10;
        
        doc.text('Terms and Conditions:',x,doc.lastAutoTable.finalY+40)
        x += doc.getTextWidth("Terms and Conditions:");
        doc.setFont("helvetica", "normal");
        doc.text(`${tandc}`, 10, doc.lastAutoTable.finalY+50);
        // Save the PDF
        doc.save('quotation.pdf');
    };

    return (
        <button onClick={generatePDF}>Save and Download PDF</button>
    );
};

export default PDFComponent;
