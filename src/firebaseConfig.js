import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// LOGIN
export const onSignIn = async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const onSignInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        return response
    } catch (error) {
        console.error(error)
    }
}

// REGISTER
export const onSignUp = async ({ email, password }) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        return response
    } catch (error) {
        console.error(error);
    }
}

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
    const response = await sendPasswordResetEmail(auth, email);
    return response;
}

// LOGOUT
export const onLogOut = () => {
    signOut(auth);
}


