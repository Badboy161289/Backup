import React, { useEffect, useState } from 'react';
import './form.css';
import { db } from '../firebase';
import { collection, addDoc,getDocs, doc } from 'firebase/firestore';



const Form = () => {
    // const [dataitem,setDataItem] = useState(
    //     {
    //         Item : '', Quntity: '' , Price : ''
    //     }
    // );
    // let name, value;
    // const data  = (e) =>
    // {
    //     name = e.target.name;
    //     value = e.target.value;

    //     setDataItem({...dataitem,[name]:value});
    // }
    // console.log(dataitem)
    const [Item, setItem] = useState();
    const [Quntity,setQuntity] = useState();
    const [Price, setPrice] = useState();
    const [fetch, setFetch] = useState([]);

    const dbref = collection(db, "ItemEntry");

    const addData = async () =>
    {
      try{
        const add_Data = await addDoc(dbref,{Item : Item, Quntity : Quntity, Price:Price });
        if(add_Data)
        {
          alert("Item Added");
          window.location.reload();
        }
      }catch(error)
      {
        alert("Error Occured");
      }
        
    }

    useEffect(()=>
    {
      fetch_data()
    },[])

    const fetch_data = async () =>
    {
       const get_data = await getDocs(dbref);
       const data_snap = get_data.docs.map((doc => ({id:doc.id, ...doc.data()})));
       //console.log(data_snap);
       setFetch(data_snap);
    }

  return (
    <>
      <div className='form'>
        <div className='container'>
            
                <input type='text' name='Item' placeholder='Enter Item Name' value={Item} required onChange={(e) => setItem(e.target.value)} ></input>
                <input type='number' name='Quntity' placeholder='Enter Item Quntity' value={Quntity} required onChange={(e) => setQuntity(e.target.value)} ></input>
                <input type='number' name='Price' placeholder='Enter Item Price' value={Price} required onChange={(e) => setPrice(e.target.value)} ></input>
                <button onClick={()=>addData()}>Submit</button>
                
            
        
        </div> 

      </div>
      <div>
        {
          fetch.map((curElm)=>
          {
            return(

              <div>
                <p>Item:{curElm.Item}</p><br/><br/>
                <p>Quntity:{curElm.Quntity}</p><br/><br/>
                <p>Price:{curElm.Price}</p><br/><br/>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default Form
