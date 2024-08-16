import React from 'react';
import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import UserItem from './UserItem';
import Form from './form';
import Inspect from './Inspect';
import Details from './Details';

const Rout = () => {
  return (
    <>
      <Routes>
        <Route  path='/' element={<Form/>}/>
        <Route path='/display' element={<Inspect/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </>
  )
}

export default Rout
