import React from "react";
import PropTypes from "prop-types";

const InvoicePreview = ({ invoiceData, calculateTotal }) => {
  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  return (
    <div className="invoice-preview">
      <h1>Invoice Preview</h1>
      <p>Date: {invoiceData.date}</p>
      <p>Company: {invoiceData.company}</p>
      <p>Address: {invoiceData.address}</p>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total</td>
            <td>{calculateTotal(invoiceData.items)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

InvoicePreview.propTypes = {
  invoiceData: PropTypes.shape({
    company: PropTypes.string,
    address: PropTypes.string,
    date: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
  }).isRequired,
  calculateTotal: PropTypes.func.isRequired,
};

export default InvoicePreview;
