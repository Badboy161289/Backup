import React, { useEffect, useState } from 'react';
import './form.css';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const Form = ({refer}) => {
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
    const [Quntity,setQuntity] = useState(1);
    const [Price, setPrice] = useState();
    const [fetch, setFetch] = useState([]);
    const [updateId, setUpdateId] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const [customer, setCustomer] = useState();
    const [product,setProduct] = useState([]);

    const [index, setIndex] = useState();
    const [bolin, setBolin] = useState(false);

    //const dbref = collection(db, "ItemEntry");

    // const addData = async () =>
    // {
    //   try{
    //     const add_Data = await addDoc(dbref,{Item : Item, Quntity : Quntity, Price:Price });
    //     if(add_Data)
    //     {
    //       alert("Item Added");
    //       window.location.reload();
    //     }
    //   }catch(error)
    //   {
    //     alert("Error Occured");
    //   }
        
    // }

    // useEffect(()=>
    // {
    //   fetch_data();
      
    // },[])
    
    // const fetch_data = async () =>
    // {
    //    const get_data = await getDocs(dbref);
       
    //    let TotalPrice =0;
    //    const data_snap = get_data.docs.map((doc)=>{
    //     const data = doc.data();
    //     const stringDataItemQuantity = data.Quntity; // replace with your field name
    //     const numberData = Number(stringDataItemQuantity);
    //     const stringDataItemPrice = data.Price; // replace with your field name
    //     const numberData1 = Number(stringDataItemPrice);
    //     TotalPrice += numberData * numberData1;

    //     return { id: doc.id, ...data, numberField: numberData , numberField1: numberData1};
    //    });

       
    //    console.log(data_snap);
    //    setTotal(TotalPrice);
    //    setFetch(data_snap);
             
       


    // }

    //to find id in database for Updation function is needed
    // const update_data = async (id) =>
    // {
    //     const matchfId = fetch.find((data) =>
    //     {
    //       return data.id === id
    //     })
    //     setItem(matchfId.Item)
    //     setQuntity(matchfId.Quntity)
    //     setPrice(matchfId.Price)
    //     setUpdateId(matchfId.id)
    // }

    // const update = async() =>
    // {
    //   const updateraef = doc(dbref,updateId)
    //   try {
    //     await updateDoc(updateraef,{Item : Item, Quntity : Quntity, Price:Price })
    //     alert("Item Data Updated")
    //     window.location.reload()
    //   } catch (error) {
    //     alert("Item Data Not Updated")
    //   }
    // }

    // const delete_data= async (id) =>{
    //   const delete_ref = doc(dbref,id);
    //   try {
    //     await deleteDoc(delete_ref);
    //     alert("Item Deleted");
    //     window.location.reload();
    //   } catch (error) {
    //     alert("Item not deleted");
    //   }
    // } 

    const navigate = useNavigate();

    const addItem =() =>
    {
      if (!customer || !Item || !Quntity || !Price) {
        alert('All fields are required!');
        return;
      }
    
      
        setProduct([...product,{'id':product.length, 'Item':Item ,'Quntity':Quntity,'Price':Price}]);
      
        const t = Quntity * Price;
        setTotalPrice(totalPrice+t);
        setItem('');
        setPrice(0);
        setQuntity(1);
      
     
    }

    const deletedata =(i) =>
    {
      console.log(i)
      let total = [...product]
      total.splice(i,1)
      setProduct(total)
    }

    const updatedata = (i) =>
    {
      let{Item,Quntity,Price} = product[i];

      setItem(Item)
      setQuntity(Quntity)
      setPrice(Price)
      setBolin(true)
      setIndex(i)
    }

    const updateinfo = (i) =>
    {
      let upttotal=[...product]
      upttotal.splice(index,1,{'id':index,Item,Quntity,Price})
      setProduct(upttotal)
      setBolin(false)
      setItem('');
      setPrice(0);
      setQuntity(1);
    }
   

    useEffect(() => {
      // Calculate total price when items change
      const total = product.reduce((acc, curElm) => acc + curElm.Price * curElm.Quntity, 0);
      setTotalPrice(total);
      
    }, [product]);

    const tosave = async() =>
    {
      console.log(product);
      console.log(customer);
      console.log(totalPrice);
      if (!customer && !product) {
        alert('All fields are required!');
        return;
      }
      const data = await addDoc(collection(db,'quotation'),
      {
        customer : customer,
        product : product,
        total : totalPrice,
        date: Timestamp.fromDate(new Date())
      }
    );
    console.log(data);
    navigate('/display');  
  }

  const todisplay = () =>
  {
    navigate('/display');
  }
  const totemplate = () =>
    {
      navigate('/template');
    }

  return (
    <>
      <div className='form'>
        <div className='container'>
                <input type='text' name='Customername' placeholder='Enter Customer Name' value={customer} onChange={(e) => setCustomer(e.target.value)} required></input>
                <input type='text' name='Item' placeholder='Enter Item Name' value={Item}  onChange={(e) => setItem(e.target.value)}  required></input>
                <input type='number' name='Quntity' placeholder='Enter Item Quntity' value={Quntity}  onChange={(e) => setQuntity(e.target.value) } required></input>
                <input type='number' name='Price' placeholder='Enter Item Price' value={Price}  onChange={(e) => setPrice(e.target.value)} required></input>
                {/* <button onClick={()=>addData()}>Submit</button>
                <button onClick={()=>update()}>Update</button> */}
                <button onClick={!bolin ? addItem :updateinfo}>{!bolin ?'Submit':'Update Item'}</button>
                
                
            
        
        </div> 

      </div>
      <div className='table-container'>
      <table className="styled-table">
      <thead>
          <tr>
            <th>Sr.No</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
      </thead>
                    {
                      product.map((curElm,index)=>
                      {
                        return(

                          // <div>
                          //   <p>----------------------------------------</p>
                          //   <p>Item:{curElm.Item}</p><br/><br/>
                          //   <p>Quntity:{curElm.Quntity}</p><br/><br/>
                          //   <p>Price:{curElm.Price}</p><br/><br/>
                          //   <div>
                          //     <button onClick={()=> update_data(curElm.id)}>Update</button>
                          //     <p>-------------------------------------</p>
                          //   </div>
                          // </div>

                          < >
                                
                                
                                  <tbody>
                                  <tr key={index}>
                                  <td>{index+1}</td>
                                    <td>{curElm.Item}</td>
                                    <td>{curElm.Quntity}</td>
                                    <td>₹{curElm.Price}</td>
                                    <td>₹{curElm.Price * curElm.Quntity}</td>
                                    
                                    {/* <td>
                                      <button className="update-button" onClick={() => update_data(curElm.id)}>
                                        Update
                                      </button>
                                      <button className="delete-button" onClick={() => delete_data(curElm.id)}>
                                        Delete
                                      </button>
                                    </td> */}
                                    <td>
                                      <button className='delete-button'  onClick={()=>deletedata(index)}>Delete</button>
                                      <button className='update-button' onClick={()=>updatedata(index)}>Update</button>
                                    </td>
                                    

                                  
                                  </tr>
                                  
                                  
                                  </tbody>
                                
                                  
                          </>
                        );
                      })
                    
                    }
              
              
        
        </table>
        {
                 <strong><p className='total-set'>Total:{totalPrice}</p></strong>
               }
        
      </div>
      <button className='save' onClick={tosave}>Save</button>
      <button className='display-data' onClick={todisplay}>All Data Display</button>
      <button className='display-data' onClick={totemplate}>All Templates</button>
    </>
  )
}

export default Form
