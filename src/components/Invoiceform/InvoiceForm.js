// src/components/InvoiceForm.js
import React, { useState } from 'react';
import { storeInvoice } from '../api/invoiceService';

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        client: '',
        amount: '',
        items: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const invoiceId = await storeInvoice(formData);
            console.log('Invoice stored with ID:', invoiceId);
        } catch (error) {
            console.error('Error storing invoice:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Client Name" required />
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
            {/* Additional form fields for items, etc. */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default InvoiceForm;
