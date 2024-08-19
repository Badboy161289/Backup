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

    const [template, setTemplate] = useState();
    const [title,setTitle] = useState();
    const [term, setTerm] = useState([]);
    
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
                const add_data = await addDoc(dbref,{Template:template,Term:term,Image:url})
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
    
    const termview = () =>
    {
        setTerm([...term,{'id':term.length,'Title':title,'Rules':rules}]);
        setRules(''); 
        setTitle('');
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
            <input type='text' name='template' placeholder='Enter Template Name' value={template}  onChange={(e)=> setTemplate(e.target.value)}  required></input>
            <input type='text' name='title' placeholder='Enter Policy Title' value={title}  onChange={(e)=> setTitle(e.target.value)}  required></input>
            <textarea name='Rules' rows={4} cols={40} placeholder='Terms and Conditions' value={rules} onChange={(e)=> setRules(e.target.value)}></textarea>
            <button onClick={termview}>Submit</button>
            <button onClick={addData}>Save</button>
            </div>
        </div>


        <div>
            <table>
                <thead>
                <th>Sr.No</th>
                <th>Title</th>
                <th>Rules</th>
                </thead>
            
                {
                    term.map((curElm,index)=>
                    {
                        return(
                            <>
                                <tbody>
                                    <tr key={index}>

                                        <td>{index+1}</td>
                                        <td>{curElm.Title}</td>
                                        <td>{curElm.Rules}</td>

                                        

                                    </tr>
                                </tbody>
                            </>
                        )

                    })
                }
           
            </table>
        </div>  
        <br/>
        <br/>
        <br/>
        <br/>


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
                                        <p>Name:{curElm.Template}</p>
                                        
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
