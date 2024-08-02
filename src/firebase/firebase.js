// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj_FDq_YziODvFMvEss5OJnlnpBlFIAEA",
  authDomain: "invoicegen-9107f.firebaseapp.com",
  projectId: "invoicegen-9107f",
  storageBucket: "invoicegen-9107f.appspot.com",
  messagingSenderId: "528967463157",
  appId: "1:528967463157:web:e150ff32ee62dd072695bc",
  measurementId: "G-WS32P7KT8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };