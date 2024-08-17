import React, { useEffect, useState } from 'react';
import './form.css'
import { db, storage } from '../firebase';
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Template = () => {
    const [rules,setRules] = useState();
    const [img, setImg] = useState();  
    const [url, setUrl] = useState();
    const [fetch,setFetch] = useState([]);
    
    //database ref
    const dbref = collection(db,"Temp");

    const addData = async () =>
    {
        const adding_img = ref(storage,img.name)
         try {
            const img_snp = await uploadBytes(adding_img, img); // Upload the file
            const downloadUrl = await getDownloadURL(adding_img); // Get the download URL
            setUrl(downloadUrl)
            console.log(url)
            if(downloadUrl)
            {
                const add_data = await addDoc(dbref,{Rules:rules,Image:url})
                if(add_data)
                {
                    alert("Data Stored ");
                    setUrl();
                    fetch_data();
                }
            }
         } catch (error) {
            alert("Data Stored not ")
         }
    }

    useEffect(()=>
    {
        fetch_data()
    },[])

    const fetch_data = async () =>
    {
        const get_data = await getDocs(dbref);
        const data_snap = get_data.docs.map((doc => ({id:doc.id,...doc.data()})))
        setFetch(data_snap)
       // console.log(data_snap)
    }


    return (
    <>
        <div className='form'>
            <div className='container'>
            <input type='file' onChange={(e)=> setImg(e.target.files[0])}></input>
            <textarea name='Rules' rows={4} cols={40} placeholder='Terms and Conditions' value={rules} onChange={(e)=> setRules(e.target.value)}></textarea>
            <button onClick={addData}>Submit</button>
            </div>
        </div>
        <div className='card'>
            {
                fetch.map(
                    (curElm)=>{
                        return(
                            <>
                                <div className='contain'>
                                    <div>
                                        <img  src={curElm.Image}/>
                                    </div>
                                    <div>
                                        <p >{curElm.Rules}</p>
                                        
                                    </div>
                                    <button>Submit</button>
                                    <button>Submit</button>
                                    
                                </div>
                            </>
                        )
                    }
                )
            }
        </div>
       
    </>
  )
}

export default Template
