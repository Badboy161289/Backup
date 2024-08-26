import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For generating tables
import './Details.css'

const Details = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

  
  return (
    <>
    
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
              <p><strong>Customer Address:</strong> {location.state.data.customeradd}</p>
              <br/><br/><br/>
              <p>We thank you</p>
            </div>
            <div className='todata-recive'>
              <p><strong>Date:</strong> {new Date(location.state.data.date.seconds * 1000).toLocaleDateString()}</p>
              <p><strong>Reference No:</strong> {location.state.data.id}</p>
              <p><strong>GST No:</strong> xxxxxx</p>
              <p><strong>Validity of Quotation:</strong>{location.state.data.Quotevalid} days</p>
            </div>
      </div>
        <div className='datacontainer' >
          
        
          <div className='wrapper'>
              
              <table className='product-table'>
                <thead className='product-table-head'>
                  <tr>
                    <th className='table-header'>S.No</th>
                    <th className='table-header'>Product Details</th>
                    <th className='table-header'>Quantity</th>
                    <th className='table-header'>Price</th>
                    <th className='table-header'>HSN/SAC Code</th>
                    <th className='table-header'>Tax</th>
                    <th className='table-header'>Discount</th>
                    
                    
                    <th className='table-header'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {location.state.data.product.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.productdetails}</td>
                      <td>{product.quntity}</td>
                      <td>{product.unitprice}</td>
                      <td>{product.hsn}</td>
                      <td>{product.tax}%</td>
                      <td>{product.discount}rs</td>
                      
                      <td>{product.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  
                <tr>
                  <td className='total' colSpan="7"><strong>Total Discount</strong></td>
                  <td className='totalcolumn'>{location.state.data.totaldiscount}rs</td>
                  </tr>
                  <tr>
                    <td className='total' colSpan="7"><strong>Grand Total</strong></td>
                    <td className='totalcolumn'>{location.state.data.total}</td>
                    
                  </tr>
                  
                  
                </tfoot>
              </table>
          </div>

        <br></br>
        <div className='termcond'>
          <h4>Term & Conditions</h4>
          <table className='termcell'>
            <tbody >
              {/* {
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
              } */}
              {location.state.data.tandc}
            </tbody>
          </table>
          
        </div>
        
      </div>
      <br/>
      <div className='container-footer'>
        footer
      </div>
    </div>
      
      
    </>
  );
};

export default Details;
