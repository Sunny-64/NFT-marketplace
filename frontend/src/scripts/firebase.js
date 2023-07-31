// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVrOk2URWr6W626XuGRrcEX9-u4nZXvjc",
  authDomain: "nft-marketplace-d086d.firebaseapp.com",
  projectId: "nft-marketplace-d086d",
  storageBucket: "nft-marketplace-d086d.appspot.com",
  messagingSenderId: "472455137207",
  appId: "1:472455137207:web:e9aa01f1cf9dfb04be4a32",
  measurementId: "G-L4FSB01KWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export default storage; 