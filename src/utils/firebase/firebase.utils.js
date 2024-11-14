import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCarN3QYZQakaA9v5VwpFFtQ090RjN_PLc",
  authDomain: "crwn-clothing-db-ddd78.firebaseapp.com",
  projectId: "crwn-clothing-db-ddd78",
  storageBucket: "crwn-clothing-db-ddd78.firebasestorage.app",
  messagingSenderId: "48278681586",
  appId: "1:48278681586:web:3f0bc02ee1379b1fb61d6b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("Error creating the user", error.message);
        }
    }

    return userDocRef;

    // if user data exists
    // return userDocRef

    // if user data das not exist
    // create /set 
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};