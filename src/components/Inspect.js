import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './Inspect.css';
import { useNavigate } from 'react-router-dom';
const Inspect = () => {
    const [display,setDisplay] = useState([]);
    const [database, setDatabase] = useState([]);
    const [val, setVal] = useState([]);
    const [count, setCount]= useState(0);
    


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
      <h1><strong>All Data</strong></h1><br/>
      <h3><strong>select template Style</strong></h3>
      <select onChange={(e)=>{
                  const c = database?.find((x)=>x.id === e.target.value);
                  console.log(c);
                  setVal(c);
                  setCount(1);
                }}
                defaultValue="default"
                >
                  
                  {
                    database.map((ele)=>
                    {
                      return<option key={ele.id} value={ele.id}>{ele.Template}</option>
                    })
                  }
                  <option value="default" >Choose an Option</option>
      </select>
      {
        display.map(data =>(
            <div className='box' key={data.id}>
                <p><strong>Quotation ID:</strong> {data.id}</p><br></br>
                <p><strong>Date:</strong>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p><strong>Customer Name: </strong>{data.customer}</p>
                <p><strong>Total:</strong> ₹{data.total}</p>
                <button className='delete-btn' onClick={()=>deletData(data.id)}>Delete</button>
                <button onClick={()=>{  
                  
                    if(count !=0 && val != undefined)
                    {
                      navigate('/details',{state:{data,val}})
                    }
                    else{
                      alert('Template not selected')
                    }
                  }} className='view-btn'>View</button>
                
                
            </div>
        ))
      }
     <div>
      <button onClick={()=> navigate('/filldetails')}>Add Quote</button>
     </div>
    </div>
  )
}

export default Inspect
