// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realfy-estate.firebaseapp.com",
  projectId: "realfy-estate",
  storageBucket: "realfy-estate.firebasestorage.app",
  messagingSenderId: "422124190532",
  appId: "1:422124190532:web:7d617d4efc2d1c7aac3511",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
