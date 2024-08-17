import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './Inspect.css';
import { useNavigate } from 'react-router-dom';
const Inspect = () => {
    const [display,setDisplay] = useState([]);
    const [database, setDatabase] = useState([]);
    const [val, setVal] = useState([]);
    


    const navigate = useNavigate();


    useEffect(()=>
    {
        getData();
        getDatabase();
    },[])

    const getData = async () =>
    {
        const base = await getDocs(collection(db,'quotation'));
        const data = base.docs.map(doc=> (
            {
                id:doc.id,
                ...doc.data()
            }
        ))
        //console.log(data);
        setDisplay(data);
    }
    const getDatabase = async () =>
      {
          const base = await getDocs(collection(db,'Temp'));
          const data = base.docs.map(doc=> (
              {
                  id:doc.id,
                  ...doc.data()
              }
          ))
          console.log(data);
          setDatabase(data);
      }
  



    const deletData = async (id) =>
    {
      const confirmation = (window.confirm("You Sure You Want to Delete Data"));
      if(confirmation)
      {
        try {
          await deleteDoc(doc(db,'quotation',id));
          getData();
        } catch (error) {
         window.alert("Something Went Wrong"); 
        }
      }
      else{
        alert("Data Not Deleted")
      }
    }
  return (
    <div>
      <h1><strong>All Data</strong></h1>
      {
        display.map(data =>(
            <div className='box' key={data.id}>
                <p><strong>Quotation ID:</strong> {data.id}</p><br></br>
                <p><strong>Date:</strong>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p><strong>Customer Name: </strong>{data.customer}</p>
                <p><strong>Total:</strong> ₹{data.total}</p>
                <button className='delete-btn' onClick={()=>deletData(data.id)}>Delete</button>
                <button onClick={()=>{navigate('/details',{state:{data,val}})}} className='view-btn'>View</button>
                <select onChange={(e)=>{
                  const c = database?.find((x)=>x.id === e.target.value);
                  console.log(c);
                  setVal(c);
                }}>
                  <option>Choose an Option</option>
                  {
                    database.map((ele)=>
                    {
                      return<option key={ele.id} value={ele.id}>{ele.id}</option>
                    })
                  }
                </select>
                
            </div>
        ))
      }
     <img src={val.Image}></img> 
     <p> {val.Rules}</p> 
    </div>
  )
}

export default Inspect
