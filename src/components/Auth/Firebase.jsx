import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import GoogleAuthProvider and signInWithPopup

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA96Bk8yXwQacn6c2bYOJhMsaLvs4rSM9g",
    authDomain: "bme-ssdi.firebaseapp.com",
    projectId: "bme-ssdi",
    storageBucket: "bme-ssdi.firebasestorage.app",
    messagingSenderId: "863867269412",
    appId: "1:863867269412:web:2cb71be555be77936dc3b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the auth service
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

// Export app, auth, provider, and signInWithPopup
export { app, auth, provider, signInWithPopup };
