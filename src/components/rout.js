import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './form';


const Rout = () => {
  return (
    <>
      <Routes>
        <Route  path='/' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default Rout
