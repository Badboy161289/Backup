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
