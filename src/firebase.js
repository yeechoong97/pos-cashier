// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEiBuE4J4GC5pSM-fmt6dEnjBYCj4gjs8",
    authDomain: "pos-cashier-849de.firebaseapp.com",
    projectId: "pos-cashier-849de",
    storageBucket: "pos-cashier-849de.appspot.com",
    messagingSenderId: "63921018192",
    appId: "1:63921018192:web:a2916994fb49e027428855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

