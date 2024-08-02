import React, { useRef, useState,useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { storeInvoiceData } from "./firebase/storeInvoiceData";
import MainCompo from "./MainCompo";



const App = () => {  
  
  useEffect(() => {
    storeInvoiceData();
  }, []);
  return (
    <MainCompo/>
  );
};

export default App;
