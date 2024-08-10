import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './Inspect.css';
const Inspect = () => {
    const [display,setDisplay] = useState([]);

    useEffect(()=>
    {
        getData();
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
  return (
    <div>
      {
        display.map(data =>(
            <div className='box' key={data.id}>
                <p>{data.id}</p><br></br>
                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p>{data.customer}</p>
                <p>{data.total}</p>

            </div>
        ))
      }
    </div>
  )
}

export default Inspect
