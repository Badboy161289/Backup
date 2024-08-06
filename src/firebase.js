import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRrLBUSWJYgoPJ0kzLghRofmokj7cHsM0",
    authDomain: "test-crud-fdfff.firebaseapp.com",
    projectId: "test-crud-fdfff",
    storageBucket: "test-crud-fdfff.appspot.com",
    messagingSenderId: "423081823181",
    appId: "1:423081823181:web:3e495a4af8955443961284"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db};