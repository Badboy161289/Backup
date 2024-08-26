import React, { useEffect, useState } from 'react';
import './form.css';
import { db } from '../firebase';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PDFComponent from './PDFComponent';

const Form = () => {
    const [Item, setItem] = useState('');
    const [Quntity, setQuntity] = useState(1);
    const [Price, setPrice] = useState(0);
    const [hsn, setHsn] = useState('');
    const [tax, setTax] = useState(0);
    const [fetch, setFetch] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [proddiscount, setProdDiscount] = useState(0);
    const [customer, setCustomer] = useState('');
    const [customeradd, setCustomerAdd] = useState('');
    const [quotation, setQuotation] = useState(15);
    const [details, setDetails] = useState('');
    const [tandc, setTandC] = useState('');
    const [showList, setShowList] = useState(true);
    const [product, setProduct] = useState([]);
    const [totaldiscount , setTotalDiscount] = useState(0);


    const [inputFields, setInputFields] = useState([
        { productdetails: '', quntity: 1, unitprice: 1, hsn: '', tax: 3, discount: 0, total: 0 }
    ]);
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const navigate = useNavigate();

    const handleAddFields = () => {
        setInputFields([...inputFields, { productdetails: '', quntity: 1, unitprice: 1, hsn: '', tax: 3, discount: 0, total: 0 }]);
        setShowList(true);
    };

    const handleChangeInput = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...inputFields];
        updatedFields[index] = {
            ...updatedFields[index],
            [name]: value
        };

        const matchedItem = data.find(item => item.name.toLowerCase() === value.toLowerCase());
        if (matchedItem) {
            updatedFields[index] = {
                ...updatedFields[index],
                productdetails: matchedItem.name,
                unitprice: matchedItem.price,
                hsn: matchedItem.hsn,
                tax: matchedItem.tax,
            };
        }

        setInputFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Input", inputFields);
    };

    const addcustomerdetails = () => {
        if (!customer || !customeradd) {
            alert('All fields are required!');
            return;
        }
        setIsDisabled(true);
        console.log(customer, customeradd, quotation, details, tandc);
    };

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'prod'));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(dataList);
        console.log(dataList);
    };

    const addfields = (index, item) => {
        const updatedFields = [...inputFields];
        updatedFields[index] = {
            ...updatedFields[index],
            productdetails: item.name,
            unitprice: item.price,
            hsn: item.hsn,
        };
        setInputFields(updatedFields);
        setShowList(false);
    };

    // useEffect(() => {
    //     const subtotal = inputFields.reduce((acc, curElm) => acc + (curElm.unitprice-curElm.discount) * curElm.quntity + (((curElm.unitprice - curElm.discount) * curElm.quntity * curElm.tax) / 100) , 0);
    //     const subdis = inputFields.reduce((acc,curElm)=> acc+curElm.discount)

    //     setTotalDiscount(subdis)
    //     setTotalPrice(subtotal);
        
    // }, [inputFields]);

    useEffect(() => {
        // Calculate subtotal and total discount
        const { subtotal, discountTotal } = inputFields.reduce(
          (acc, curElm) => {
            const discountedPrice = curElm.unitprice - curElm.discount;
            const itemTotal = discountedPrice * curElm.quntity;
            const taxAmount = (itemTotal * curElm.tax) / 100;
            const totalItemPrice = itemTotal + taxAmount;
    
            return {
              subtotal: acc.subtotal + totalItemPrice,
              discountTotal: acc.discountTotal + (curElm.discount * curElm.quntity),
            };
          },
          { subtotal: 0, discountTotal: 0 }
        );
    
        setTotalPrice(subtotal);
        setTotalDiscount(discountTotal);
      }, [inputFields]);

    useEffect(() => {
        fetchData();
    }, []);

    const tosave = async () => {
        console.log(product);
        console.log(customer);
        console.log(totalPrice);
        if (!customer || !inputFields.length || !customeradd) {
            alert('All fields are required!');
            return;
        }
        const data = await addDoc(collection(db, 'quotation'), {
            customer: customer,
            customeradd: customeradd,
            Quotevalid: quotation,
            anydetail: details,
            tandc: tandc,
            product: inputFields,
            totaldiscount: totaldiscount,
            total: totalPrice,
            date: Timestamp.fromDate(new Date())
        });
        console.log(data);
        navigate('/');
    };

    return (
        <>
            <div className='form'>
                <h2>Customer Details</h2><br />
                <div className='container'>
                    <label>Customer Name:</label>
                    <input type='text' disabled={isDisabled} name='Customername' placeholder='Enter Customer Name' value={customer} onChange={(e) => setCustomer(e.target.value)} required></input>

                    <label>Customer Address:</label>
                    <input type='text' disabled={isDisabled} name='Customeraddress' placeholder='Enter Customer Address' value={customeradd} onChange={(e) => setCustomerAdd(e.target.value)} required></input>

                    <label>Quotation Validity Period:</label>
                    <input type='number' disabled={isDisabled} name='QuoteValid' placeholder='Enter Quotation Validity Period:' value={quotation} onChange={(e) => setQuotation(e.target.value)} required ></input>

                    <label>Additional details (if any):</label>
                    <input type='text' disabled={isDisabled} name='details' placeholder='Enter Details' value={details} onChange={(e) => setDetails(e.target.value)} required ></input>

                    <label>Terms and Conditions:</label>
                    <input type='text' disabled={isDisabled} name='tandc' placeholder='Terms and Condition' value={tandc} onChange={(e) => setTandC(e.target.value)}></input>
                    <button onClick={addcustomerdetails} disabled={isDisabled}>Save and Continue</button>
                </div>
            </div>
            <br />
            <div className='form'>
                <h2>Add Product</h2><br />
                <div className='table-container'>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleAddFields}>Add Product</button>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Product Details</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>HSN/SAC</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputFields.map((inputField, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            list={`productList${index}`}
                                            type='text'
                                            name='productdetails'
                                            onChange={(e) => handleChangeInput(index, e)}
                                            value={inputField.productdetails}
                                        />
                                        <datalist id={`productList${index}`}>
                                            {inputField.productdetails === '' ? null :
                                                data.filter(item => item.name.toLowerCase().includes(inputField.productdetails.toLowerCase()))
                                                    .map(filteredItem => (
                                                        <option
                                                            key={filteredItem.id}
                                                            value={filteredItem.name}
                                                            onClick={() => addfields(index, filteredItem)}
                                                        />
                                                    ))
                                            }
                                        </datalist>
                                    </td>
                                    <td><input type='number' name='quntity' value={inputField.quntity} onChange={e => handleChangeInput(index, e)}></input></td>
                                    <td><input type='number' name='unitprice' value={inputField.unitprice} disabled></input></td>
                                    <td><input type='number' name='hsn' value={inputField.hsn} disabled></input></td>
                                    <td><input type='number' name='tax' value={inputField.tax} disabled></input></td>
                                    <td><input type='number' name='discount' value={inputField.discount} onChange={e => handleChangeInput(index, e)}></input></td>
                                    <td>{inputField.total = (inputField.unitprice-inputField.discount) * inputField.quntity + (((inputField.unitprice -inputField.discount) * inputField.quntity * inputField.tax) / 100) }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            <div className='align-data'>
                <p><strong>Grand Total:{totalPrice}₹</strong></p>
                <p><strong>Total Discount:{totaldiscount}₹</strong></p>
            </div>
            
            </div>
            
            
            <button className='save' onClick={tosave}> Save</button>
            <PDFComponent 
                customer={customer} 
                customeradd={customeradd} 
                quotation={quotation} 
                details={details} 
                tandc={tandc} 
                inputFields={inputFields} 
                totalPrice={totalPrice} 
                totaldiscount={totaldiscount} 
            />
           
        </>
    );
};

export default Form;
