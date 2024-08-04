import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { storeInvoiceData } from "./firebase/storeInvoiceData";
import MainCompo from "./MainCompo";

const App = () => {
  useEffect(() => {
    const initializeData = async () => {
      await storeInvoiceData();
    };

    initializeData();
  }, []); // Empty dependency array ensures this runs only once

  return <MainCompo />;
};

export default App;
