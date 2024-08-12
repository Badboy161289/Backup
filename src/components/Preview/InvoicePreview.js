import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css"; 

const InvoicePreview = ({ invoiceData, calculateTotal, invoiceIDGenerate }) => {
  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  const subtotal = invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const total = calculateTotal(invoiceData.items, invoiceData.discount);

  return (
    <div className="container mt-5 invoice-preview">
      <h1 className="text-center mb-4">Invoice Preview</h1>
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <p><strong>Date:</strong> {invoiceData.date}</p>
          <p><strong>Invoice ID:</strong> {invoiceIDGenerate}</p>
          <p><strong>Company:</strong> {invoiceData.company}</p>
          <p><strong>Address:</strong> {invoiceData.address}</p>
          <p><strong>Billing Address:</strong> {invoiceData.billing_address}</p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
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
              <td colSpan="3" className="text-end"><strong>Sub-Total</strong></td>
              <td>{subtotal}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end"><strong>Discount ({invoiceData.discount}%)</strong></td>
              <td>{discountAmount}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end"><strong>Total</strong></td>
              <td><strong>{total}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

InvoicePreview.propTypes = {
  invoiceData: PropTypes.shape({
    company: PropTypes.string,
    address: PropTypes.string,
    billing_address: PropTypes.string,
    date: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    discount: PropTypes.number,
  }).isRequired,
  calculateTotal: PropTypes.func.isRequired,
  invoiceIDGenerate: PropTypes.string.isRequired,
};

export default InvoicePreview;
