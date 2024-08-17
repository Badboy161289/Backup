import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For generating tables
import './Details.css'

const Details = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Quotation', 14, 20);

    // Add customer name
    doc.setFontSize(14);
    doc.text(`Customer Name: ${location.state.data.customer}`, 14, 30);

    // Add table
    doc.autoTable({
      startY: 40,
      head: [['S.No', 'Product Name', 'Price', 'Quantity', 'Total']],
      body: location.state.data.product.map((product, index) => [
        index + 1,
        product.Item,
        product.Price,
        product.Quntity,
        product.Quntity * product.Price,
      ]),
      foot: [['Total', '', '', '', location.state.data.total]],
      theme: 'striped',
    });

    // Save the PDF
    doc.save('quotation.pdf');
  };

  return (
    <div>
      <h2>Quotation</h2>
      <img src={location.state.val.Image}></img>
      
      <div className='wrapper'>
        <div className='header-wrapper'>
          <p><strong>Customer Name:</strong> {location.state.data.customer}</p>
        </div>
        <table className='product-table'>
          <thead>
            <tr>
              <th className='table-header'>S.No</th>
              <th className='table-header'>Product Name</th>
              <th className='table-header'>Price</th>
              <th className='table-header'>Quantity</th>
              <th className='table-header'>Total</th>
            </tr>
          </thead>
          <tbody>
            {location.state.data.product.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.Item}</td>
                <td>{product.Price}</td>
                <td>{product.Quntity}</td>
                <td>{product.Quntity * product.Price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='table-header' colSpan="4">Total</td>
              <td>{location.state.data.total}</td>
            </tr>
          </tfoot>
        </table>
        <button onClick={downloadPDF} className="download-button">
        Download as PDF
      </button>
      </div>
      
      <p>{location.state.val.Rules}</p>
      
    </div>
  );
};

export default Details;
