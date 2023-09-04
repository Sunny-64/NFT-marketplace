// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIZ_2Y9-enMmYxGFK6UNCVd-zaovuC7kM",
  authDomain: "nft-marketplace-24d19.firebaseapp.com",
  projectId: "nft-marketplace-24d19",
  storageBucket: "nft-marketplace-24d19.appspot.com",
  messagingSenderId: "1045438110700",
  appId: "1:1045438110700:web:1d5166c6440fe0edc7bec9",
  measurementId: "G-M596X2KFM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

export default storage; 


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVrOk2URWr6W626XuGRrcEX9-u4nZXvjc",
//   authDomain: "nft-marketplace-d086d.firebaseapp.com",
//   projectId: "nft-marketplace-d086d",
//   storageBucket: "nft-marketplace-d086d.appspot.com",
//   messagingSenderId: "472455137207",
//   appId: "1:472455137207:web:cb7edafe08c4455bbe4a32",
//   measurementId: "G-JPHCT9ZCHN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);