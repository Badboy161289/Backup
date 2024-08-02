// src/firebaseFunctions.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js"; // Import your initialized Firestore instance

const storeInvoiceData = async () => {
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      company: "Your Company",
      address: "123 Street, City, Country",
      date: "25-07-2024",
      items: [
        { description: "Item 1", quantity: 5, price: 50 },
        { description: "Item 2", quantity: 1, price: 100 },
        { description: "Item 3", quantity: 5, price: 30 },
        { description: "Item 4", quantity: 50, price: 50 },
        { description: "Item 5", quantity: 10, price: 50 },
        { description: "Item 6", quantity: 10, price: 50 },
        { description: "Item 7", quantity: 20, price: 50 }
      ],
      discount: 30,
      billing_address: "456 Another St, Another City, Country"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { storeInvoiceData };
