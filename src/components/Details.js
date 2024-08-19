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
    <>
    <button onClick={downloadPDF} className="download-button">
      Download as PDF
    </button>
    <div className='datalink'>

      <div className='datalink-header'>
        <img className='dataimg' src={location.state.val.Image}></img>
        <h3 className='datatext'>{location.state.val.Template}</h3>
      </div>  
      <h2 className='title'>Quotation</h2>
      <div className='todata'>
            <div className='todata-send'>
              <p><strong>To</strong></p>
              <p><strong>Customer Name:</strong> {location.state.data.customer}</p>
              <br/><br/><br/>
              <p>We thank you</p>
            </div>
            <div className='todata-recive'>
              <p><strong>Date:</strong> {new Date(location.state.data.date.seconds * 1000).toLocaleDateString()}</p>
              <p><strong>Reference No:</strong> {location.state.data.id}</p>
              <p><strong>GST No:</strong> xxxxxx</p>
            </div>
      </div>
        <div className='datacontainer' >
          
        
          <div className='wrapper'>
              
              <table className='product-table'>
                <thead className='product-table-head'>
                  <tr>
                    <th className='table-header'>S.No</th>
                    <th className='table-header'>Product Name</th>
                    <th className='table-header'>HSN/SAC Code</th>
                    <th className='table-header'>Quantity</th>
                    <th className='table-header'>Price</th>
                    
                    <th className='table-header'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {location.state.data.product.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.Item}</td>
                      <td>code</td>
                      <td>{product.Quntity}</td>
                      <td>{product.Price}</td>
                      <td>{product.Quntity * product.Price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='table-header' colSpan="5">Total</td>
                    <td>{location.state.data.total}</td>
                  </tr>
                </tfoot>
              </table>
          </div>

        <br></br>
        <div className='termcond'>
          <h4>Term & Conditions</h4>
          <table className='termcell'>
            <tbody >
              {
                location.state.val.Term.map(
                  (term,index)=>
                  (
                    <tr key={term.id}>
                      <td>{index+1+"] "}</td>
                      <td><strong>{term.Title}</strong></td>
                      <td className='col'>:{term.Rules}</td>

                    </tr>
                  )
                )
              }
            </tbody>
          </table>
          
        </div>
        
      </div>
    </div>
      
      
    </>
  );
};

export default Details;
