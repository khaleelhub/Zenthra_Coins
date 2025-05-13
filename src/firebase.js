// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // 🔥 NEW: Firestore added

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BORKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MASSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MASUREMENT_ID
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
