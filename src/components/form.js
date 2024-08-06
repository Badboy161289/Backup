import React, { useState } from 'react';
import './form.css';


const Form = () => {
    const [dataitem,setDataItem] = useState(
        {
            Item : '', Quntity: '' , Price : ''
        }
    );
    let name, value;
    const data  = (e) =>
    {
        name = e.target.name;
        value = e.target.value;

        setDataItem({...dataitem,[name]:value});
    }
    console.log(dataitem)
  return (
    <>
      <div className='form'>
        <div className='container'>
            <form method='POST'>
                <input type='text' name='Item' placeholder='Enter Item Name' value={dataitem.Item} required onChange={data}></input>
                <input type='number' name='Quntity' placeholder='Enter Item Quntity' value={dataitem.Quntity} required onChange={data}></input>
                <input type='number' name='Price' placeholder='Enter Item Price' value={dataitem.Price} required onChange={data}></input>
                <button>Submit</button>
                
            </form>
        
        </div> 

      </div>
    </>
  )
}

export default Form
