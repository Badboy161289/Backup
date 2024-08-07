import React, { useEffect, useState } from 'react';
import './form.css';
import { db } from '../firebase';
import { collection, addDoc,getDocs, doc, updateDoc } from 'firebase/firestore';



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
    const [updateId, setUpdateId] = useState()

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
       console.log(data_snap);
       setFetch(data_snap);
    }

    const update_data = async (id) =>
    {
        const matchfId = fetch.find((data) =>
        {
          return data.id === id
        })
        setItem(matchfId.Item)
        setQuntity(matchfId.Quntity)
        setPrice(matchfId.Price)
        setUpdateId(matchfId.id)
    }

    const update = async() =>
    {
      const updateraef = doc(dbref,updateId)
      try {
        await updateDoc(updateraef,{Item : Item, Quntity : Quntity, Price:Price })
        alert("Item Data Updated")
        window.location.reload()
      } catch (error) {
        alert("Item Data Not Updated")
      }
    }


  return (
    <>
      <div className='form'>
        <div className='container'>
            
                <input type='text' name='Item' placeholder='Enter Item Name' value={Item} required onChange={(e) => setItem(e.target.value)} ></input>
                <input type='number' name='Quntity' placeholder='Enter Item Quntity' value={Quntity} required onChange={(e) => setQuntity(e.target.value)} ></input>
                <input type='number' name='Price' placeholder='Enter Item Price' value={Price} required onChange={(e) => setPrice(e.target.value)} ></input>
                <button onClick={()=>addData()}>Submit</button>
                <button onClick={()=>update()}>Update</button>
                
            
        
        </div> 

      </div>
      <div>
        {
          fetch.map((curElm)=>
          {
            return(

              <div>
                <p>----------------------------------------</p>
                <p>Item:{curElm.Item}</p><br/><br/>
                <p>Quntity:{curElm.Quntity}</p><br/><br/>
                <p>Price:{curElm.Price}</p><br/><br/>
                <div>
                  <button onClick={()=> update_data(curElm.id)}>Update</button>
                  <p>-------------------------------------</p>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default Form
