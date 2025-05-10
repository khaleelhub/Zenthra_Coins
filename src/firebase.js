// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // 🔥 NEW: Firestore added

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM3IHJa2WgKLS7RegjFb76T2TR7fq-ovI",
  authDomain: "international-3ccc8.firebaseapp.com",
  databaseURL: "https://international-3ccc8-default-rtdb.firebaseio.com",
  projectId: "international-3ccc8",
  storageBucket: "international-3ccc8.appspot.com",
  messagingSenderId: "494935398567",
  appId: "1:494935398567:web:620101d2a9bccbc7192382",
  measurementId: "G-RV7NEFHSFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app); 
const storage = getStorage(app);

// Google provider for Google Sign-In
const googleProvider = new GoogleAuthProvider();

// Export all services
export { app, auth, database, db, storage, googleProvider, RecaptchaVerifier, onAuthStateChanged, doc, getDoc, setDoc };
