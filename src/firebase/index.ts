import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

export const googleAuthProvider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const usersRef = collection(db, "users");
