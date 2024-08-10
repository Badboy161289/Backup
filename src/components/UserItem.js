import { addDoc, collection,collectionGroup,doc,query, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './form.css';
import { useState, useEffect } from 'react';
import Form from './form';

const UserItem = () =>
{
    const [user, setUser] = useState();
     const [fetch,setFetch] = useState([]);
   

    const addData = async () =>
        {
          try{
            const dbref = doc(db,"User",user);
            
           const add_Data =  collection(dbref,"Item")
            const added = await addDoc(add_Data,{Item:user})
            alert("Item Added");
          }catch(error)
          {
            alert("Error Occured");
          }
            
        }

        useEffect(()=>
            {
              fetch_data();
              
            },[])
        
        const dbre = collection(db,"User");

        const fetch_data = async () =>{
            
            const get_data = await getDocs(dbre);
            const data_snap = get_data.docs.map((doc=> ({id:doc.id})))
            console.log(data_snap);
            setFetch(data_snap);
          

        }

    return(
        <>
            <div className='form'>
                <div className='container'>
                    <input type='text' name='User' placeholder='Enter User Name' value={user} onChange={(e) => setUser(e.target.value)} required></input>
                    <button onClick={()=>addData()}>Submit</button>
                </div>

                {
                    <ul>
                    {fetch.map(user => (
                        <li key={user.id}>
                            <strong>ID:</strong> {user.id} <br />
                            <strong>User Field:</strong> {user.Item}
                        </li>
                    ))}
                </ul>
                }
                
            </div>
        </>
    );
}
export default UserItem