import React from 'react';
import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import Form from './form';
import Inspect from './Inspect';
import Details from './Details';
import Template from './Template';
import ProductUp from './ProductUp';


const Rout = () => {
  return (
    <>
      <Routes>
        <Route  path='/' element={<Inspect/>}/>
        <Route  path='/filldetails' element={<Form/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/template' element={<Template/>}/>
      </Routes>
    </>
  )
}

export default Rout
