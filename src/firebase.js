// firebaseConfig.js
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

// La tua configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyByFzlVlR70cs9WLQh7ROTkFeDDf-P0ANU",
    authDomain: "tempbase2.firebaseapp.com",
};
if (firebaseConfig.apiKey === "AIzaSyByFzlVlR70cs9WLQh7ROTkFeDDf-P0ANU") { console.error('Settare firebaseConfig') }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail }