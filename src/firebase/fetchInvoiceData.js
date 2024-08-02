// // data.js
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";

// let invoices = [];

// const fetchInvoiceData = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "invoices"));
//     invoices = querySnapshot.docs.map((doc) => doc.data());
//   } catch (e) {
//     console.error("Error fetching documents: ", e);
//   }
// };

// // Immediately fetch data and export it
// fetchInvoiceData();

// export { invoices };
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchInvoiceData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "invoices"));
    const invoices = querySnapshot.docs.map((doc) => doc.data());
    console.log(invoices);
    return invoices;
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};
