import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { storeInvoiceData } from "./firebase/storeInvoiceData";
import MainCompo from "./components/Main/MainCompo";
import Quotation from "./components/quotaion/Quotation.js";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Start with null or undefined

  useEffect(() => {
    const initializeData = async () => {
      await storeInvoiceData();
    };

    initializeData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="selection">Choose an option:</label>
        <select
          id="selection"
          className="form-control"
          value={selectedOption || ""}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Select an option</option>
          <option value="invoice">Invoice</option>
          <option value="quotation">Quotation</option>
        </select>
      </div>

      {selectedOption === "invoice" && <MainCompo />}
      {selectedOption === "quotation" && <Quotation />}
    </div>
  );
};

export default App;
