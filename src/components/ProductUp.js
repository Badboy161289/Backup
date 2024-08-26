import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';

const ProductUp = () => {

    const [name,setName] = useState();
    const [hsn,sethsn] = useState();
    const [price,setPrice] = useState();
    const tosave = async() =>
    {
        console.log(name)
        console.log(hsn)
        console.log(price)
        try {
            const data = await addDoc(collection(db,'prod'),
            {
                name:name,
                price:price,
                hsn: hsn
            }
            
        );
        alert("Product Added");

        } catch (error) {
            alert("Error Occured");
        }

    }
  return (
    <div className='form'>
        <h2>Add Product</h2><br></br>
        <div className='container'>
        <label>Product Name</label>
        <input type='text' name='productname' value={name} onChange={(e)=> setName(e.target.value)}></input>
        <label>Product Price</label>
        <input type='number' name='productprice' value={price} onChange={(e)=> setPrice(e.target.value)}></input>
        <label>Product HSN/SAC</label>
        <input type='number' name='productHSN' value={hsn} onChange={(e)=> sethsn(e.target.value)} ></input>
            <button onClick={tosave}>Submit</button>
        </div>

    </div>
  )
}

export default ProductUp
